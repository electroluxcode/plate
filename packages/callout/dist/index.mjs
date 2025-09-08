// src/lib/BaseCalloutPlugin.ts
import { bindFirst, createSlatePlugin, KEYS as KEYS2 } from "platejs";

// src/lib/transforms/insertCallout.ts
import { KEYS } from "platejs";
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
      type: editor.getType(KEYS.callout),
      variant
    },
    options
  );
};

// src/lib/BaseCalloutPlugin.ts
var BaseCalloutPlugin = createSlatePlugin({
  key: KEYS2.callout,
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
  insert: { callout: bindFirst(insertCallout, editor) }
}));
export {
  BaseCalloutPlugin,
  CALLOUT_STORAGE_KEY,
  insertCallout
};
//# sourceMappingURL=index.mjs.map