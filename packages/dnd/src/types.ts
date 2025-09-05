import type { TElement } from 'platejs';

export type DragItemNode = ElementDragItemNode | FileDragItemNode;

export type DropDirection = 'bottom' | 'left' | 'right' | 'top' | undefined;

export type DropLineDirection = '' | 'bottom' | 'left' | 'right' | 'top';

export interface ElementDragItemNode {
  /** Required to identify the node(s). */
  id: string[] | string;
  [key: string]: unknown;
  editorId: string;
  element: TElement;
}

export interface FileDragItemNode {
  dataTransfer: DataTransfer[];
  files: FileList;
  items: DataTransferItemList;
}
