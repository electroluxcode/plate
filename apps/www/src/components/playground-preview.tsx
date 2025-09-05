'use client';

import type { ComponentProps } from 'react';
import * as React from 'react';

import type { ImperativePanelHandle } from 'react-resizable-panels';

import { useLiftMode } from '@/hooks/use-lift-mode';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/lib/utils';
import PlaygroundDemo from '@/registry/examples/playground-demo';

import { PlaygroundPreviewToolbar } from './playground-preview-toolbar';
import { ThemeWrapper } from './theme-wrapper';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable';

const i18n = {
  cn: {
    description: 'AI 编辑器',
  },
  en: {
    description: 'An AI editor',
  },
};

// TODO: sync
export function PlaygroundPreview({
  children,
  className,
  ...props
}: {
  block?: any;
} & ComponentProps<'div'>) {
  const locale = useLocale();
  const content = i18n[locale as keyof typeof i18n];

  const block: any = {
    description: content.description,
    name: 'editor-ai',
    src: '/blocks/playground',
  };

  const { isLiftMode } = useLiftMode(block.name);
  // const [isLoading, setIsLoading] = React.useState(true);
  const ref = React.useRef<ImperativePanelHandle>(null);
  // const [fullScreen, setFullScreen] = useState(false);

  return (
   
    <PlaygroundDemo className="h-[650px]" />
  );
}
