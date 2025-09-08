// src/react/MentionPlugin.tsx
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseMentionPlugin.ts
import {
  withTriggerCombobox
} from "@platejs/combobox";
import {
  createSlatePlugin,
  createTSlatePlugin,
  KEYS
} from "platejs";
var BaseMentionInputPlugin = createSlatePlugin({
  key: KEYS.mentionInput,
  node: { isElement: true, isInline: true, isVoid: true }
});
var BaseMentionPlugin = createTSlatePlugin({
  key: KEYS.mention,
  node: { isElement: true, isInline: true, isMarkableVoid: true, isVoid: true },
  options: {
    trigger: "@",
    triggerPreviousCharPattern: /^\s?$/,
    createComboboxInput: (trigger) => ({
      children: [{ text: "" }],
      trigger,
      type: KEYS.mentionInput
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
})).overrideEditor(withTriggerCombobox);

// src/react/MentionPlugin.tsx
var MentionPlugin = toPlatePlugin(BaseMentionPlugin);
var MentionInputPlugin = toPlatePlugin(BaseMentionInputPlugin);
export {
  MentionInputPlugin,
  MentionPlugin
};
//# sourceMappingURL=index.mjs.map