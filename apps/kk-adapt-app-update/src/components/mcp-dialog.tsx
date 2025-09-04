'use client';

import { useState } from 'react';

import { Code } from '@/components/code';
import { CodeBlock } from '@/components/codeblock';
import { Icons } from '@/components/icons';
import { Link } from '@/components/link';
import { Steps } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { siteConfig } from '@/config/site';

export function SetupMCPDialog() {
  const [open, setOpen] = useState(false);

  const initCommand = `npx shadcn@latest add ${siteConfig.registryUrl}editor-basic`;
  const cursorConfig = `{
  "mcpServers": {
    "plate": {
      "description": "Plate editors, plugins and components",
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "shadcn@canary", "registry:mcp"],
      "env": {
        "REGISTRY_URL": "${siteConfig.registryUrl}registry.json"
      }
    }
  }
}`;

  const vscodeConfig = `{
  "servers": {
    "plate": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "shadcn@canary", "registry:mcp"],
      "env": {
        "REGISTRY_URL": "${siteConfig.registryUrl}registry.json"
      }
    }
  },
  "inputs": []
}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="!px-2">
          <Icons.mcp className="size-4" />
          <span>MCP</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-y-auto sm:max-w-3xl">
        <DialogHeader className="w-full">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Setup MCP</DialogTitle>
          </div>
          <p className="mt-2 text-muted-foreground">
            <Link onClick={() => setOpen(false)} href="/docs/installation/mcp">
              Learn more about our MCP registry
            </Link>
          </p>
        </DialogHeader>

        <Steps>
          <h3 className="!mt-0">Start from our basic template</h3>
          <CodeBlock
            className="overflow-x-auto"
            value={initCommand}
            language="bash"
          />

          <h3>Add MCP config</h3>
          <Tabs className="mt-2" defaultValue="cursor">
            <TabsList>
              <TabsTrigger value="cursor">Cursor</TabsTrigger>
              <TabsTrigger value="vscode">VS Code</TabsTrigger>
            </TabsList>
            <TabsContent className="mt-0" value="cursor">
              <p>
                Copy and paste the code into <Code>.cursor/mcp.json</Code>
              </p>
              <CodeBlock
                className="mt-2 overflow-x-auto"
                value={cursorConfig}
                language="json"
              />
            </TabsContent>
            <TabsContent className="mt-0" value="vscode">
              <p>
                Copy and paste the code into <Code>.vscode/mcp.json</Code> in
                your workspace
              </p>
              <CodeBlock
                className="mt-2 overflow-x-auto"
                value={vscodeConfig}
                language="json"
              />
            </TabsContent>
          </Tabs>

          <h3 className="!mb-0">
            That's it! You can now ask anything about Plate.{' '}
            <Link
              className="ml-auto font-semibold"
              href="https://github.com/udecode/plate/discussions/new?category=mcp"
              rel="noopener noreferrer"
              target="_blank"
            >
              Report any issues here
            </Link>
          </h3>
        </Steps>
      </DialogContent>
    </Dialog>
  );
}
