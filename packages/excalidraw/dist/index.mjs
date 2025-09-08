// src/lib/BaseExcalidrawPlugin.ts
import { createSlatePlugin, KEYS } from "platejs";
var BaseExcalidrawPlugin = createSlatePlugin({
  key: KEYS.excalidraw,
  node: { isElement: true, isVoid: true }
});

// src/lib/transforms/insertExcalidraw.ts
import { KEYS as KEYS2 } from "platejs";
var insertExcalidraw = (editor, props = {}, options = {}) => {
  if (!editor.selection) return;
  const selectionParentEntry = editor.api.parent(editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      type: editor.getType(KEYS2.excalidraw),
      ...props
    },
    { at: path, nextBlock: true, ...options }
  );
};
export {
  BaseExcalidrawPlugin,
  insertExcalidraw
};
//# sourceMappingURL=index.mjs.map