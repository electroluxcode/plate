'use client';

import * as React from 'react';

import { Plate, usePlateEditor } from '@udecode/plate/react';

import { Editor, EditorContainer } from '@/registry/ui/editor';

export default function BasicEditorStylingDemo() {
  const editor = usePlateEditor();

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor placeholder="Type..." />
      </EditorContainer>
    </Plate>
  );
}
