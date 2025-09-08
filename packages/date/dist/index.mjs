// src/lib/BaseDatePlugin.ts
import { bindFirst, createSlatePlugin, KEYS as KEYS2 } from "platejs";

// src/lib/transforms/insertDate.ts
import { KEYS } from "platejs";
var insertDate = (editor, { date, ...options } = {}) => {
  editor.tf.insertNodes(
    [
      {
        children: [{ text: "" }],
        date: date ?? (/* @__PURE__ */ new Date()).toDateString(),
        type: editor.getType(KEYS.date)
      },
      // FIXME: for not losing the editor focus
      {
        text: " "
      }
    ],
    options
  );
};

// src/lib/BaseDatePlugin.ts
var BaseDatePlugin = createSlatePlugin({
  key: KEYS2.date,
  node: {
    isElement: true,
    isInline: true,
    isSelectable: false,
    isVoid: true
  }
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    date: bindFirst(insertDate, editor)
  }
}));

// src/lib/queries/isPointNextToNode.ts
import { PathApi } from "platejs";
var isPointNextToNode = (editor, options) => {
  let { at, nodeType, reverse = false } = options;
  if (!at) {
    at = editor.selection?.anchor;
  }
  if (!at) {
    throw new Error("No valid selection point found");
  }
  const selectedRange = editor.api.range(at.path);
  const boundary = (() => {
    let isStart = false;
    let isEnd = false;
    if (editor.api.isStart(at, selectedRange)) {
      isStart = true;
    }
    if (editor.api.isEnd(at, selectedRange)) {
      isEnd = true;
    }
    if (isStart && isEnd) {
      return "single";
    }
    if (isStart) {
      return "start";
    }
    if (isEnd) {
      return "end";
    }
    return null;
  })();
  if (!boundary) return false;
  const adjacentPathFn = (path) => {
    try {
      if (reverse && boundary === "start") return PathApi.previous(path);
      if (!reverse && boundary === "end") return PathApi.next(path);
      if (boundary === "single") {
        return reverse ? PathApi.previous(path) : PathApi.next(path);
      }
    } catch {
      return null;
    }
  };
  if (!adjacentPathFn) return false;
  const adjacentPath = adjacentPathFn(at.path);
  if (!adjacentPath) return false;
  const nextNodeEntry = editor.api.node(adjacentPath) ?? null;
  return !!(nextNodeEntry && nextNodeEntry[0].type === nodeType);
};
export {
  BaseDatePlugin,
  insertDate,
  isPointNextToNode
};
//# sourceMappingURL=index.mjs.map