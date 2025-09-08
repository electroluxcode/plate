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
  BaseSlashInputPlugin: () => BaseSlashInputPlugin,
  BaseSlashPlugin: () => BaseSlashPlugin
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseSlashPlugin.ts
var import_combobox = require("@platejs/combobox");
var import_platejs = require("platejs");
var BaseSlashInputPlugin = (0, import_platejs.createSlatePlugin)({
  key: import_platejs.KEYS.slashInput,
  editOnly: true,
  node: { isElement: true, isInline: true, isVoid: true }
});
var BaseSlashPlugin = (0, import_platejs.createTSlatePlugin)({
  key: import_platejs.KEYS.slashCommand,
  editOnly: true,
  options: {
    trigger: "/",
    triggerPreviousCharPattern: /^\s?$/,
    createComboboxInput: () => ({
      children: [{ text: "" }],
      type: import_platejs.KEYS.slashInput
    })
  },
  plugins: [BaseSlashInputPlugin]
}).overrideEditor(import_combobox.withTriggerCombobox);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseSlashInputPlugin,
  BaseSlashPlugin
});
//# sourceMappingURL=index.js.map