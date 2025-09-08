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
  MentionInputPlugin: () => MentionInputPlugin,
  MentionPlugin: () => MentionPlugin
});
module.exports = __toCommonJS(react_exports);

// src/react/MentionPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseMentionPlugin.ts
var import_combobox = require("@platejs/combobox");
var import_platejs = require("platejs");
var BaseMentionInputPlugin = (0, import_platejs.createSlatePlugin)({
  key: import_platejs.KEYS.mentionInput,
  node: { isElement: true, isInline: true, isVoid: true }
});
var BaseMentionPlugin = (0, import_platejs.createTSlatePlugin)({
  key: import_platejs.KEYS.mention,
  node: { isElement: true, isInline: true, isMarkableVoid: true, isVoid: true },
  options: {
    trigger: "@",
    triggerPreviousCharPattern: /^\s?$/,
    createComboboxInput: (trigger) => ({
      children: [{ text: "" }],
      trigger,
      type: import_platejs.KEYS.mentionInput
    })
  },
  plugins: [BaseMentionInputPlugin]
}).extendEditorTransforms(({ editor, type }) => ({
  insert: {
    mention: ({ key, value }) => {
      editor.tf.insertNodes({
        key,
        children: [{ text: "" }],
        type,
        value
      });
    }
  }
})).overrideEditor(import_combobox.withTriggerCombobox);

// src/react/MentionPlugin.tsx
var MentionPlugin = (0, import_react.toPlatePlugin)(BaseMentionPlugin);
var MentionInputPlugin = (0, import_react.toPlatePlugin)(BaseMentionInputPlugin);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MentionInputPlugin,
  MentionPlugin
});
//# sourceMappingURL=index.js.map