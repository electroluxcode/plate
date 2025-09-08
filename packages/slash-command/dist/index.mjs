// src/lib/BaseSlashPlugin.ts
import {
  withTriggerCombobox
} from "@platejs/combobox";
import {
  createSlatePlugin,
  createTSlatePlugin,
  KEYS
} from "platejs";
var BaseSlashInputPlugin = createSlatePlugin({
  key: KEYS.slashInput,
  editOnly: true,
  node: { isElement: true, isInline: true, isVoid: true }
});
var BaseSlashPlugin = createTSlatePlugin({
  key: KEYS.slashCommand,
  editOnly: true,
  options: {
    trigger: "/",
    triggerPreviousCharPattern: /^\s?$/,
    createComboboxInput: () => ({
      children: [{ text: "" }],
      type: KEYS.slashInput
    })
  },
  plugins: [BaseSlashInputPlugin]
}).overrideEditor(withTriggerCombobox);
export {
  BaseSlashInputPlugin,
  BaseSlashPlugin
};
//# sourceMappingURL=index.mjs.map