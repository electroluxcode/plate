'use client';

import * as React from 'react';

import { Plate, PlateContent, usePlateEditor } from '@udecode/plate/react';

export default function BasicEditorDefaultDemo() {
  const editor = usePlateEditor();

  return (
    <Plate editor={editor}>
      <PlateContent placeholder="Type..." />
    </Plate>
  );
}
