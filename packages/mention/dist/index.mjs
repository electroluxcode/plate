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

// src/lib/getMentionOnSelectItem.ts
import { getEditorPlugin, KEYS as KEYS2 } from "platejs";
var getMentionOnSelectItem = ({
  key = KEYS2.mention
} = {}) => (editor, item, search = "") => {
  const { getOptions, tf } = getEditorPlugin(editor, {
    key
  });
  const { insertSpaceAfterMention } = getOptions();
  tf.insert.mention({ key: item.key, search, value: item.text });
  editor.tf.move({ unit: "offset" });
  const pathAbove = editor.api.block()?.[1];
  const isBlockEnd = editor.selection && pathAbove && editor.api.isEnd(editor.selection.anchor, pathAbove);
  if (isBlockEnd && insertSpaceAfterMention) {
    editor.tf.insertText(" ");
  }
};
export {
  BaseMentionInputPlugin,
  BaseMentionPlugin,
  getMentionOnSelectItem
};
//# sourceMappingURL=index.mjs.map