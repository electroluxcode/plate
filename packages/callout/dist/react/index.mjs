// src/react/CalloutPlugin.tsx
import { toPlatePlugin } from "platejs/react";

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

// src/react/CalloutPlugin.tsx
var CalloutPlugin = toPlatePlugin(BaseCalloutPlugin);

// src/react/hooks/useCalloutEmojiPicker.ts
import { useEditorReadOnly, useEditorRef, useElement } from "platejs/react";
var useCalloutEmojiPicker = ({
  isOpen,
  setIsOpen
}) => {
  const editor = useEditorRef();
  const readOnly = useEditorReadOnly();
  const element = useElement();
  return {
    emojiToolbarDropdownProps: {
      isOpen,
      setIsOpen: (v) => {
        if (readOnly) return;
        setIsOpen(v);
      }
    },
    props: {
      isOpen,
      setIsOpen,
      onSelectEmoji: (emojiValue) => {
        const icon = emojiValue.skins?.[0]?.native ?? emojiValue.icon;
        editor.tf.setNodes(
          {
            icon
          },
          { at: element }
        );
        localStorage.setItem(CALLOUT_STORAGE_KEY, icon);
        setIsOpen(false);
      }
    }
  };
};
export {
  CalloutPlugin,
  useCalloutEmojiPicker
};
//# sourceMappingURL=index.mjs.map