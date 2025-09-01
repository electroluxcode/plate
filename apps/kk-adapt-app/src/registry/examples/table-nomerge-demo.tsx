'use client';

import * as React from 'react';

import { TablePlugin } from '@platejs/table/react';
import { Plate, usePlateEditor } from 'platejs/react';

import { EditorKit } from '@/registry/components/editor/kk-adapt-plugin-kit';
import { tableValue } from '@/registry/examples/values/table-value';
import { Editor, EditorContainer } from '@/registry/ui/editor';

export default function TableNoMergeDemo() {
  const editor = usePlateEditor({
    plugins: [
      ...EditorKit,
      TablePlugin.configure({
        options: {
          disableMerge: true,
        },
      }),
    ],
    value: tableValue,
  });

  return (
    <Plate editor={editor}>
      <EditorContainer variant="demo">
        <Editor />
      </EditorContainer>
    </Plate>
  );
}
