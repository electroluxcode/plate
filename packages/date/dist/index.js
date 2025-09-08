"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BaseDatePlugin: () => BaseDatePlugin,
  insertDate: () => insertDate,
  isPointNextToNode: () => isPointNextToNode
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseDatePlugin.ts
var import_platejs2 = require("platejs");

// src/lib/transforms/insertDate.ts
var import_platejs = require("platejs");
var insertDate = (editor, { date, ...options } = {}) => {
  editor.tf.insertNodes(
    [
      {
        children: [{ text: "" }],
        date: date ?? (/* @__PURE__ */ new Date()).toDateString(),
        type: editor.getType(import_platejs.KEYS.date)
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
var BaseDatePlugin = (0, import_platejs2.createSlatePlugin)({
  key: import_platejs2.KEYS.date,
  node: {
    isElement: true,
    isInline: true,
    isSelectable: false,
    isVoid: true
  }
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    date: (0, import_platejs2.bindFirst)(insertDate, editor)
  }
}));

// src/lib/queries/isPointNextToNode.ts
var import_platejs3 = require("platejs");
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
      if (reverse && boundary === "start") return import_platejs3.PathApi.previous(path);
      if (!reverse && boundary === "end") return import_platejs3.PathApi.next(path);
      if (boundary === "single") {
        return reverse ? import_platejs3.PathApi.previous(path) : import_platejs3.PathApi.next(path);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseDatePlugin,
  insertDate,
  isPointNextToNode
});
//# sourceMappingURL=index.js.map