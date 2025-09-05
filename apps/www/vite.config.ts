import { nodeResolve } from "@rollup/plugin-node-resolve";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { type UserConfig, defineConfig, loadEnv, normalizePath } from "vite";

const entryFileNamesFn = (chunkInfo: any) => {
  return '[name].js';
}

export default defineConfig((config): UserConfig => {
  process.env = {
    ...process.env,
    ...loadEnv(config.mode, process.cwd(), ["PORT"]),
  };
  const { PORT } = process.env;
  const isProd = config.mode === "production";
  return {
    build: {
      lib: {
        entry: ["./src/kk-adapt-export.ts"],
      },
      // 压缩
      minify: false,
      // 禁用 CSS 压缩
      cssMinify: false,
      // 打包文件目录
      outDir: "./dist",
      // 确保 CSS 被内联到 JS 中
      rollupOptions: {
        external: [
          // React 生态系统
          "react",
          "react-dom",
          "react/jsx-runtime",
          
          // UI 组件库
          "antd",
          "@ant-design/icons",
         
          // Plate.js 相关
          // /^@platejs\/.*/,
          // "platejs",
          // /^@udecode\/.*/,
          // "@radix-ui/react-accordion",
          // "@radix-ui/react-alert-dialog",
          // "@radix-ui/react-aspect-ratio",
          // "@radix-ui/react-avatar",
          // "@radix-ui/react-checkbox",
          // "@radix-ui/react-collapsible",
          // "@radix-ui/react-context-menu",
          // "@radix-ui/react-dialog",
          // "@radix-ui/react-dropdown-menu",
          // "@radix-ui/react-hover-card",
          // "@radix-ui/react-icons",
          // "@radix-ui/react-label",
          // "@radix-ui/react-menubar",
          // "@radix-ui/react-popover",
          // "@radix-ui/react-radio-group",
          // "@radix-ui/react-scroll-area",
          // "@radix-ui/react-select",
          // "@radix-ui/react-separator",
          // "@radix-ui/react-slot",
          // "@radix-ui/react-tabs",
          // "@radix-ui/react-toggle",
          // "@radix-ui/react-toggle-group",
          // "@radix-ui/react-toolbar",
          // "@radix-ui/react-tooltip",
        ],
        input: "./src/kk-adapt-export.ts",
        output: [
          {
            // 配置打包根目录
            dir: "./dist/es",
            // 打包后文件名
            entryFileNames: entryFileNamesFn,
            exports: "named",
            // 打包格式
            format: "es",
            inlineDynamicImports: false, // true会将动态导入的文件打包到一起
            preserveModules:false,
            // 让打包目录和我们目录对应
            preserveModulesRoot: "src"
            // manualChunks(id) {
            //   // 将第三方库分离到 vendor chunk
            //   if (id.includes('node_modules')) {
            //     return id.split("/")?.at?.(-1)
            //   }
            // },
          },
        ],
        // plugins: [nodeResolve()],
      },
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      // PostCSS 配置会自动从 postcss.config.js 读取
    },
    optimizeDeps: {
      esbuildOptions: {
        drop: ["console"],
      },
      holdUntilCrawlEnd: true,
    },
    plugins: [
      react(),
      // dts({
      //   entryRoot: "./src",
      //   outDir: ["./dist/es", "./dist/lib"],
      //   tsconfigPath: "./tsconfig.json",
      // }),

      // imp({
      //   libList: [
      //     {
      //       libName: "antd",
      //       style: (name) => `antd/es/${name}/style`,
      //     },
      //   ],
      // }),
    ],
    resolve: {
      alias: [
        {
          find: "~antd",
          replacement: "antd",
        },
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    },
    server: {
      port: Number(PORT || 8080),
    },
  };
});
