// src/react/DatePlugin.tsx
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseDatePlugin.ts
import { bindFirst, createSlatePlugin, KEYS as KEYS2 } from "platejs";

// src/lib/transforms/insertDate.ts
import { KEYS } from "platejs";
var insertDate = (editor, { date, ...options } = {}) => {
  editor.tf.insertNodes(
    [
      {
        children: [{ text: "" }],
        date: date ?? (/* @__PURE__ */ new Date()).toDateString(),
        type: editor.getType(KEYS.date)
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
var BaseDatePlugin = createSlatePlugin({
  key: KEYS2.date,
  node: {
    isElement: true,
    isInline: true,
    isSelectable: false,
    isVoid: true
  }
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    date: bindFirst(insertDate, editor)
  }
}));

// src/react/DatePlugin.tsx
var DatePlugin = toPlatePlugin(BaseDatePlugin);
export {
  DatePlugin
};
//# sourceMappingURL=index.mjs.map