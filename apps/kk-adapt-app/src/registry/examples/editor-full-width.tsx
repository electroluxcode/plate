'use client';

import { Plate, usePlateEditor } from 'platejs/react';

import { EditorKit } from '@/kk-adapt-plugin-kit';
import { Editor, EditorContainer } from '@/registry/ui/editor';

export default function EditorDefault() {
  const editor = usePlateEditor({
    plugins: EditorKit,
  });

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="fullWidth" placeholder="Type your message here." />
      </EditorContainer>
    </Plate>
  );
}
