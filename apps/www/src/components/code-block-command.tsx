'use client';

import * as React from 'react';

import type { NpmCommands } from '@/types/unist';

import { CheckIcon, ClipboardIcon } from 'lucide-react';

import { copyToClipboardWithMeta } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConfig } from '@/hooks/use-config';

export function CodeBlockCommand({
  __bunCommand__,
  __npmCommand__,
  __pnpmCommand__,
  __yarnCommand__,
}: React.ComponentProps<'pre'> & NpmCommands) {
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);
  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);
  const packageManager = config.packageManager || 'pnpm';
  const tabs = React.useMemo(() => {
    return {
      bun: __bunCommand__,
      npm: __npmCommand__,
      pnpm: __pnpmCommand__,
      yarn: __yarnCommand__,
    };
  }, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__]);
  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager];
    if (!command) {
      return;
    }
    copyToClipboardWithMeta(command, {
      name: 'copy_npm_command',
      properties: {
        command,
        pm: packageManager,
      },
    });
    setHasCopied(true);
  }, [packageManager, tabs]);
  return (
    <div className="relative mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 dark:bg-zinc-900">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as 'bun' | 'npm' | 'pnpm' | 'yarn',
          });
        }}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 pt-2.5">
          <TabsList className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  className="rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
                  value={key}
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        {Object.entries(tabs).map(([key, value]) => {
          return (
            <TabsContent key={key} className="mt-0" value={key}>
              <pre className="px-4 py-5">
                <code
                  className="relative font-mono text-sm leading-none"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          );
        })}
      </Tabs>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2.5 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
      </Button>
    </div>
  );
}
