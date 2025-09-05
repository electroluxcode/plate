'use client';

import * as React from 'react';

import { PlaygroundPreview } from '@/components/playground-preview';

const title = 'Build your rich-text editor';
const description =
  'A set of beautifully-designed, customizable plugins and components to help you build your rich-text editor. Open Source.';

// 由于使用了 'use client'，metadata 需要移除或者移到 layout 中
// export const metadata: Metadata = { ... }

export type SearchParams = Promise<{
  locale: string;
}>;

export default function IndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return <PlaygroundPreview />;
}
