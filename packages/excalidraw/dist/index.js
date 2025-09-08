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
  BaseExcalidrawPlugin: () => BaseExcalidrawPlugin,
  insertExcalidraw: () => insertExcalidraw
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseExcalidrawPlugin.ts
var import_platejs = require("platejs");
var BaseExcalidrawPlugin = (0, import_platejs.createSlatePlugin)({
  key: import_platejs.KEYS.excalidraw,
  node: { isElement: true, isVoid: true }
});

// src/lib/transforms/insertExcalidraw.ts
var import_platejs2 = require("platejs");
var insertExcalidraw = (editor, props = {}, options = {}) => {
  if (!editor.selection) return;
  const selectionParentEntry = editor.api.parent(editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      type: editor.getType(import_platejs2.KEYS.excalidraw),
      ...props
    },
    { at: path, nextBlock: true, ...options }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseExcalidrawPlugin,
  insertExcalidraw
});
//# sourceMappingURL=index.js.map