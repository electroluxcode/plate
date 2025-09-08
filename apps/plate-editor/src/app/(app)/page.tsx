import * as React from 'react';

import type { Metadata } from 'next';

import { PlaygroundPreview } from '@/components/playground-preview';


const title = 'Build your rich-text editor';
const description =
  'A set of beautifully-designed, customizable plugins and components to help you build your rich-text editor. Open Source.';

export const metadata: Metadata = {
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  title,
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
};

export type SearchParams = Promise<{
  locale: string;
}>;

// SYNC

export default async function IndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {

  return (
    <>
      <PlaygroundPreview />
    </>
  );
}
