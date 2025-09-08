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
  BaseTagPlugin: () => BaseTagPlugin,
  isEqualTags: () => isEqualTags
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseTagPlugin.ts
var import_platejs = require("platejs");
var BaseTagPlugin = (0, import_platejs.createSlatePlugin)({
  key: import_platejs.KEYS.tag,
  node: {
    isElement: true,
    isInline: true,
    isVoid: true
  }
}).extendEditorTransforms(({ editor, type }) => ({
  insert: {
    tag: (props, options) => {
      editor.tf.insertNodes(
        [
          {
            children: [{ text: "" }],
            type,
            ...props
          },
          { text: "" }
        ],
        options
      );
    }
  }
}));

// src/lib/isEqualTags.ts
var import_platejs2 = require("platejs");
function isEqualTags(editor, newTags) {
  const currentTags = [
    ...editor.api.nodes({
      at: [],
      match: { type: import_platejs2.KEYS.tag }
    })
  ].map(([node]) => node);
  const current = currentTags.reduce(
    (acc, tag) => {
      acc[tag.value] = true;
      return acc;
    },
    {}
  );
  const next = (newTags ?? []).reduce(
    (acc, tag) => {
      acc[tag.value] = true;
      return acc;
    },
    {}
  );
  return Object.keys(current).length === Object.keys(next).length && Object.keys(current).every((key) => next[key]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseTagPlugin,
  isEqualTags
});
//# sourceMappingURL=index.js.map