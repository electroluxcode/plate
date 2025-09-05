'use client';

import * as React from 'react';

import { KEYS } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';
import { TrailingBlockPlugin } from '@platejs/utils-custom';
import { useLocale } from '@/hooks/useLocale';
import { getI18nValues } from '@/i18n/getI18nValues';
import { EditorKit } from '@/registry/components/editor/editor-kit';
import { Editor, EditorContainer } from '@/registry/ui/editor';
import { ReactEditor } from 'slate-react';

export default function PlaygroundDemo({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const locale = useLocale();
  const value = getI18nValues(locale).playground;

  const editor = usePlateEditor(
    {
      override: {
        enabled: {
          [KEYS.copilot]: id === 'copilot',
          [KEYS.indent]: id !== 'listClassic',
          [KEYS.list]: id !== 'listClassic',
          [KEYS.listClassic]: id === 'listClassic',
          [KEYS.playwright]: process.env.NODE_ENV !== 'production',
        },
      },
      plugins: [
        // ...CopilotKit,
        ...EditorKit,
        TrailingBlockPlugin.configure({
          options: {
            type: 'p', // 段落块
            match: (e)=>{
              return e.listStyleType
            },
            filter: () => {
              const isend = editor.api.isAt({ end: true })
              return isend;
            }
          },
        }),

        // Testing
        // PlaywrightPlugin,
      ],
      value,
    },
    []
  );

  // editor.api.toDOMNode = ReactEditor.toDOMNode;
  window.editor = editor;
  return (
    <Plate editor={editor}>
      <EditorContainer className={className}>
        <Editor
          variant="demo"
          className="pb-[20vh]"
          placeholder="Type something..."
          spellCheck={false}
        />
      </EditorContainer>
    </Plate>
  );
}
