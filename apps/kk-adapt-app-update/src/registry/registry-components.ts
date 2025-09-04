import type { Registry } from 'shadcn/registry';

import { registryKits } from './registry-kits';

const registryApi: Registry['items'] = [
  {
    dependencies: [
      '@ai-sdk/openai@1.3.23',
      'ai@4.3.19',
      '@ai-sdk/provider@1.1.3',
      '@ai-sdk/provider-utils@2.2.8',
    ],
    files: [
      {
        path: 'app/api/ai/command/route.ts',
        target: 'app/api/ai/command/route.ts',
        type: 'registry:file',
      },
    ],
    name: 'ai-api',
    registryDependencies: ['copilot-api', 'markdown-joiner-transform'],
    type: 'registry:file',
  },
  {
    dependencies: ['@ai-sdk/openai@1.3.23', 'ai@4.3.19'],
    files: [
      {
        path: 'app/api/ai/copilot/route.ts',
        target: 'app/api/ai/copilot/route.ts',
        type: 'registry:file',
      },
    ],
    name: 'copilot-api',
    registryDependencies: [],
    type: 'registry:file',
  },
  {
    dependencies: ['uploadthing@7.7.2'],
    files: [
      {
        path: 'app/api/uploadthing/route.ts',
        target: 'app/api/uploadthing/route.ts',
        type: 'registry:file',
      },
    ],
    name: 'media-uploadthing-api',
    registryDependencies: ['uploadthing'],
    type: 'registry:file',
  },
];

export const registryComponents: Registry['items'] = [
  ...registryKits,
  ...registryApi,
  {
    dependencies: ['@platejs/ai'],
    files: [
      {
        path: 'components/editor/settings-dialog.tsx',
        type: 'registry:component',
      },
    ],
    name: 'settings-dialog',
    registryDependencies: [
      'ai-kit',
      'shadcn/button',
      'shadcn/command',
      'shadcn/dialog',
      'shadcn/input',
      'shadcn/popover',
    ],
    type: 'registry:component',
  },
  {
    dependencies: ['@ai-sdk/react@1.2.12', '@faker-js/faker'],
    files: [
      {
        path: 'components/editor/use-chat.ts',
        type: 'registry:component',
      },
    ],
    name: 'use-chat',
    registryDependencies: ['ai-kit'],
    type: 'registry:component',
  },
  {
    dependencies: [
      '@platejs/callout',
      '@platejs/code-block',
      '@platejs/date',
      '@platejs/toc',
      '@platejs/layout',
      '@platejs/link',
      '@platejs/math',
      '@platejs/media',
      '@platejs/table',
    ],
    files: [
      {
        path: 'components/editor/transforms.ts',
        type: 'registry:component',
      },
    ],
    name: 'transforms',
    type: 'registry:component',
  },
  {
    dependencies: [
      '@platejs/callout',
      '@platejs/code-block',
      '@platejs/date',
      '@platejs/layout',
      '@platejs/link',
      '@platejs/list-classic',
      '@platejs/math',
      '@platejs/media',
      '@platejs/table',
    ],
    files: [
      {
        path: 'components/editor/transforms-classic.ts',
        type: 'registry:component',
      },
    ],
    name: 'transforms-classic',
    type: 'registry:component',
  },
  {
    dependencies: [
      '@platejs/comment',
      '@platejs/excalidraw',
      '@platejs/link',
      '@platejs/media',
      '@platejs/mention',
      '@platejs/table',
      '@platejs/toggle',
    ],
    files: [
      {
        path: 'components/editor/plate-types.ts',
        type: 'registry:component',
      },
    ],
    name: 'plate-types',
    type: 'registry:component',
  },
];
