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

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  DatePlugin: () => DatePlugin
});
module.exports = __toCommonJS(react_exports);

// src/react/DatePlugin.tsx
var import_react = require("platejs/react");

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

// src/react/DatePlugin.tsx
var DatePlugin = (0, import_react.toPlatePlugin)(BaseDatePlugin);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatePlugin
});
//# sourceMappingURL=index.js.map