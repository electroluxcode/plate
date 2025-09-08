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
  BaseCalloutPlugin: () => BaseCalloutPlugin,
  CALLOUT_STORAGE_KEY: () => CALLOUT_STORAGE_KEY,
  insertCallout: () => insertCallout
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseCalloutPlugin.ts
var import_platejs2 = require("platejs");

// src/lib/transforms/insertCallout.ts
var import_platejs = require("platejs");
var CALLOUT_STORAGE_KEY = `plate-storage-callout`;
var insertCallout = (editor, {
  icon,
  variant,
  ...options
} = {}) => {
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      icon: icon ?? localStorage.getItem(CALLOUT_STORAGE_KEY) ?? "\u{1F4A1}",
      type: editor.getType(import_platejs.KEYS.callout),
      variant
    },
    options
  );
};

// src/lib/BaseCalloutPlugin.ts
var BaseCalloutPlugin = (0, import_platejs2.createSlatePlugin)({
  key: import_platejs2.KEYS.callout,
  node: {
    isElement: true
  },
  rules: {
    break: {
      default: "lineBreak",
      empty: "reset",
      emptyLineEnd: "deleteExit"
    },
    delete: {
      start: "reset"
    }
  }
}).extendEditorTransforms(({ editor }) => ({
  insert: { callout: (0, import_platejs2.bindFirst)(insertCallout, editor) }
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseCalloutPlugin,
  CALLOUT_STORAGE_KEY,
  insertCallout
});
//# sourceMappingURL=index.js.map