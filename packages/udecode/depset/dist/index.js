#!/usr/bin/env node
import { Command } from 'commander';
import { z, ZodError } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { exec, execSync } from 'child_process';
import { promisify } from 'util';
import prompts from 'prompts';
import { yellow, green, cyan, red } from 'kleur/colors';
import ora from 'ora';
import { detect } from '@antfu/ni';

var highlighter = {
  error: red,
  info: cyan,
  success: green,
  warn: yellow
};
var logger = {
  break() {
    console.log("");
  },
  error(...args) {
    console.log(highlighter.error(args.join(" ")));
  },
  info(...args) {
    console.log(highlighter.info(args.join(" ")));
  },
  log(...args) {
    console.log(args.join(" "));
  },
  success(...args) {
    console.log(highlighter.success(args.join(" ")));
  },
  warn(...args) {
    console.log(highlighter.warn(args.join(" ")));
  }
};
function handleError(error) {
  logger.error(
    "Something went wrong. Please check the error below for more details."
  );
  if (typeof error === "string") {
    logger.error(error);
  } else if (error instanceof ZodError) {
    logger.error("Validation failed:");
    for (const [key, value] of Object.entries(error.flatten().fieldErrors)) {
      logger.error(
        `- ${highlighter.info(key)}: ${value.join(", ")}`
      );
    }
  } else if (error instanceof Error) {
    logger.error(error.message);
  }
  logger.break();
  process.exit(1);
}
function spinner(text, options) {
  return ora({
    isSilent: options?.silent,
    text
  });
}
async function getPackageManager(targetDir, {
  programmatic = true,
  // ni specific
  withFallback = true
} = {}) {
  const detected = await detect({ cwd: targetDir, programmatic });
  if (detected) {
    if (detected.startsWith("yarn")) return "yarn";
    if (detected.startsWith("pnpm")) return "pnpm";
    if (detected === "bun") return "bun";
    if (detected === "npm") return "npm";
  }
  if (withFallback) {
    const userAgent = process.env.npm_config_user_agent || "";
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    }
    if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    }
    if (userAgent.startsWith("bun")) {
      return "bun";
    }
  }
  return "npm";
}

// package.json
var package_default = {
  version: "0.1.1"};

// src/index.ts
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
var execPromise = promisify(exec);
var DepSyncOptionsSchema = z.object({
  packageSpecifier: z.string().min(1, "Package specifier is required."),
  targetVersion: z.string().optional(),
  install: z.boolean().default(false),
  yes: z.boolean().default(false),
  cwd: z.string().default(process.cwd()),
  silent: z.boolean().default(false),
  // Added for global silent control
  latest: z.boolean().optional()
  // Added for --latest flag
});
async function getPackageJson(cwd, options) {
  const targetPath = path.join(cwd, "./package.json");
  const sp = spinner(`Reading package.json from ${targetPath}`, { silent: options.silent })?.start();
  try {
    const fileContent = await fs.readFile(targetPath, "utf8");
    sp?.succeed(`Successfully read package.json`);
    return JSON.parse(fileContent);
  } catch (error) {
    sp?.fail(`Error reading package.json at ${targetPath}`);
    handleError(error);
    return null;
  }
}
async function fetchPackageVersion(pkg, targetVersionString) {
  try {
    const versionSpecifier = targetVersionString ? `${pkg}@"<=${targetVersionString}"` : pkg;
    const { stdout } = await execPromise(
      `npm view ${versionSpecifier} version --json`
    );
    const versions = JSON.parse(stdout);
    const latestMatchingVersion = Array.isArray(versions) ? versions[versions.length - 1] : versions;
    if (latestMatchingVersion) {
      return latestMatchingVersion.trim();
    }
    return null;
  } catch (error) {
    logger.error(error.message);
    return null;
  }
}
async function fetchPackageVersions(packagesToFetch, currentPackageJson, options) {
  const specifierDisplay = options.packageSpecifier ? ` matching "${options.packageSpecifier}"` : "";
  const fetchingMessage = options.targetVersion ? `Fetching latest package versions${specifierDisplay} (up to ${options.targetVersion})` : `Fetching latest package versions${specifierDisplay}`;
  logger.info(fetchingMessage);
  const sp = spinner("Fetching package versions in parallel...", { silent: options.silent })?.start();
  const versionPromises = packagesToFetch.map(async (pkg) => {
    const version = await fetchPackageVersion(pkg, options.targetVersion);
    if (version) {
      const currentVersion = currentPackageJson.dependencies?.[pkg]?.replace(/^\D*/, "") || currentPackageJson.devDependencies?.[pkg]?.replace(/^\D*/, "") || "Not installed";
      return [pkg, { currentVersion, version }];
    }
    return null;
  });
  const results = await Promise.all(versionPromises);
  const versionMap = new Map(results.filter(Boolean));
  sp?.succeed("Finished fetching package versions.");
  return versionMap;
}
async function preparePackageUpdates(currentPackageJson, versionMap) {
  const updatedPackages = [];
  const newPackageJson = JSON.parse(JSON.stringify(currentPackageJson));
  for (const [name, versions] of Array.from(versionMap.entries())) {
    let changed = false;
    if (newPackageJson.dependencies?.[name]) {
      if (newPackageJson.dependencies[name].replace(/^\D*/, "") !== versions.version) {
        newPackageJson.dependencies[name] = versions.version;
        changed = true;
      }
    }
    if (newPackageJson.devDependencies?.[name]) {
      if (newPackageJson.devDependencies[name].replace(/^\D*/, "") !== versions.version) {
        newPackageJson.devDependencies[name] = versions.version;
        changed = true;
      }
    }
    if (changed) {
      updatedPackages.push({ name, currentVersion: versions.currentVersion, newVersion: versions.version });
    }
  }
  return {
    updatedPackages,
    newPackageJsonString: JSON.stringify(newPackageJson, null, 2)
  };
}
async function runSync(options) {
  let mainSpinner = spinner("Starting dependency synchronization...", { silent: options.silent })?.start();
  let packageFilterFn;
  let matchDescription;
  if (options.packageSpecifier.endsWith("*")) {
    const prefix = options.packageSpecifier.slice(0, -1);
    packageFilterFn = (pkgName) => pkgName.startsWith(prefix);
    matchDescription = `packages starting with "${prefix}"`;
  } else if (options.packageSpecifier.startsWith("@") && !options.packageSpecifier.includes("/")) {
    const scopeAsExact = options.packageSpecifier;
    const scopeAsPrefix = options.packageSpecifier + "/";
    packageFilterFn = (pkgName) => pkgName.startsWith(scopeAsPrefix) || pkgName === scopeAsExact;
    matchDescription = `packages in scope "${options.packageSpecifier}"`;
  } else {
    packageFilterFn = (pkgName) => pkgName === options.packageSpecifier;
    matchDescription = `package "${options.packageSpecifier}"`;
  }
  logger.info(`
Synchronizing ${matchDescription}`);
  if (options.targetVersion) {
    logger.info(`Targeting version: ${options.targetVersion}`);
  }
  logger.info(`Working directory: ${options.cwd}`);
  if (!options.yes) {
    mainSpinner.stop();
    mainSpinner.clear();
    mainSpinner = spinner("Processing packages...", { silent: options.silent })?.start();
  }
  const currentPackageJson = await getPackageJson(options.cwd, options);
  if (!currentPackageJson) return;
  const allDependencies = {
    ...currentPackageJson.dependencies || {},
    ...currentPackageJson.devDependencies || {}
  };
  const packagesToFetch = Object.keys(allDependencies).filter(packageFilterFn);
  if (packagesToFetch.length === 0) {
    mainSpinner.warn(`No packages found in dependencies for ${matchDescription}.`);
    if (options.packageSpecifier && !options.packageSpecifier.endsWith("*") && !options.packageSpecifier.includes("/")) {
      logger.info(`Did you mean '${options.packageSpecifier}/*' or an exact package name like '${options.packageSpecifier}/some-package'?`);
    }
    return;
  }
  logger.info(`Found ${packagesToFetch.length} package${packagesToFetch.length === 1 ? "" : "s"} to check: ${packagesToFetch.join(", ")}`);
  const versionMap = await fetchPackageVersions(
    packagesToFetch,
    currentPackageJson,
    options
  );
  if (versionMap.size === 0 && packagesToFetch.length > 0) {
    mainSpinner.warn("Could not fetch versions for any of the targeted packages.");
    return;
  }
  if (versionMap.size === 0 && packagesToFetch.length === 0) {
    mainSpinner.info("No packages matched the specifier.");
    return;
  }
  const { updatedPackages, newPackageJsonString } = await preparePackageUpdates(
    currentPackageJson,
    versionMap
  );
  mainSpinner.succeed("Package analysis complete.");
  if (updatedPackages.length > 0) {
    logger.info("The following packages will be updated:");
    updatedPackages.forEach(({ name, currentVersion, newVersion }) => {
      logger.log(`  ${name}: ${currentVersion} -> ${newVersion}`);
    });
    logger.break();
    let proceed = options.yes;
    if (!options.yes) {
      const { confirmUpdate } = await prompts({
        type: "confirm",
        name: "confirmUpdate",
        message: "Apply these changes to package.json?",
        initial: true
      });
      proceed = confirmUpdate;
    }
    if (proceed) {
      let writeSpinner = spinner("Updating package.json...", { silent: options.silent })?.start();
      try {
        await fs.writeFile(path.join(options.cwd, "./package.json"), newPackageJsonString);
        writeSpinner?.succeed("package.json updated successfully.");
      } catch (error) {
        writeSpinner?.fail("Error writing to package.json.");
        handleError(error);
        return;
      }
      let shouldRunInstall = false;
      if (options.install) {
        shouldRunInstall = true;
      } else {
        if (!options.yes) {
          const { confirmInstall } = await prompts({
            type: "confirm",
            name: "confirmInstall",
            message: "Run package manager install command to apply these changes?",
            initial: true
          });
          shouldRunInstall = confirmInstall;
        } else {
          shouldRunInstall = true;
        }
      }
      if (shouldRunInstall) {
        const pm = await getPackageManager(options.cwd);
        const installCommand = `${pm} install`;
        const installSpinner = spinner(`Running \`${installCommand}\`...`, { silent: options.silent })?.start();
        try {
          execSync(installCommand, { cwd: options.cwd, stdio: options.silent ? "pipe" : "inherit" });
          installSpinner?.succeed(`Successfully ran \`${installCommand}\``);
        } catch (error) {
          installSpinner?.fail(`Error running \`${installCommand}\``);
          handleError(error);
          return;
        }
      } else if (updatedPackages.length > 0 && !options.install && options.yes) {
        logger.info("Skipping package installation as --install was not provided with --yes.");
      } else if (updatedPackages.length > 0 && !shouldRunInstall) {
        logger.info("Skipping package installation.");
      }
    } else {
      logger.info("Changes to package.json were not applied by user.");
    }
  } else {
    logger.success("All specified packages are already up to date.");
  }
  logger.break();
}
async function main() {
  const program = new Command();
  program.name("depset").description(
    "Synchronize package dependencies to their latest or a specific version."
  ).version(
    package_default.version,
    "-v, --version",
    "display the version number"
  ).argument(
    "[package-specifier]",
    'Package name or pattern (e.g., "@scope/foo*", "my-package", "@myorg")'
  ).argument(
    "[target-version]",
    'Target version (e.g., "1.2.3") - defaults to latest if omitted'
  ).option(
    "-i, --install",
    "Automatically run install after updating package.json",
    false
  ).option("-y, --yes", "Skip all confirmation prompts", false).option(
    "-c, --cwd <path>",
    "Set the current working directory",
    process.cwd()
  ).option("-s, --silent", "Silence all output except for errors", false).option("-L, --latest", "Use the latest version, skip version prompt", false).action(async (packageSpecifierArg, targetVersionArg, cliOpts) => {
    try {
      let pkgSpec = packageSpecifierArg;
      let targetVer = targetVersionArg;
      if (!pkgSpec && !cliOpts.yes) {
        const response = await prompts({
          type: "text",
          name: "packageSpecifier",
          message: "Enter the package name or pattern to synchronize:",
          validate: (value) => value && value.trim().length > 0 ? true : "Package specifier cannot be empty."
        });
        if (!response.packageSpecifier) {
          logger.warn("Package specifier is required. Exiting.");
          return;
        }
        pkgSpec = response.packageSpecifier;
      } else if (!pkgSpec && cliOpts.yes) {
        logger.error("Error: package-specifier is required.");
        process.exit(1);
      }
      if (!targetVer && !cliOpts.yes && !cliOpts.latest) {
        const versionResponse = await prompts({
          type: "text",
          name: "targetVersion",
          message: 'Enter the target version (e.g., "1.2.3", or leave blank for latest):'
        });
        targetVer = versionResponse.targetVersion || void 0;
      } else if (cliOpts.latest) {
        targetVer = void 0;
      }
      const rawOptions = {
        packageSpecifier: pkgSpec,
        targetVersion: targetVer,
        install: cliOpts.install,
        yes: cliOpts.yes,
        cwd: cliOpts.cwd,
        silent: cliOpts.silent,
        latest: cliOpts.latest
        // Added latest to rawOptions
      };
      const options = DepSyncOptionsSchema.parse(rawOptions);
      if (options.silent) {
        logger.info = () => {
        };
        logger.success = () => {
        };
        logger.warn = () => {
        };
        logger.log = () => {
        };
        logger.break = () => {
        };
      }
      await runSync(options);
    } catch (error) {
      const originalLogger = { ...logger };
      if (cliOpts.silent) {
        logger.error = console.error;
        logger.break = () => console.log("");
      }
      handleError(error);
      if (cliOpts.silent) {
        Object.assign(logger, originalLogger);
      }
    }
  });
  await program.parseAsync(process.argv);
}
main();
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map