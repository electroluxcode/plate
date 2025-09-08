// src/lib/BaseTagPlugin.ts
import {
  createSlatePlugin,
  KEYS
} from "platejs";
var BaseTagPlugin = createSlatePlugin({
  key: KEYS.tag,
  node: {
    isElement: true,
    isInline: true,
    isVoid: true
  }
}).extendEditorTransforms(({ editor, type }) => ({
  insert: {
    tag: (props, options) => {
      editor.tf.insertNodes(
        [
          {
            children: [{ text: "" }],
            type,
            ...props
          },
          { text: "" }
        ],
        options
      );
    }
  }
}));

// src/lib/isEqualTags.ts
import {
  KEYS as KEYS2
} from "platejs";
function isEqualTags(editor, newTags) {
  const currentTags = [
    ...editor.api.nodes({
      at: [],
      match: { type: KEYS2.tag }
    })
  ].map(([node]) => node);
  const current = currentTags.reduce(
    (acc, tag) => {
      acc[tag.value] = true;
      return acc;
    },
    {}
  );
  const next = (newTags ?? []).reduce(
    (acc, tag) => {
      acc[tag.value] = true;
      return acc;
    },
    {}
  );
  return Object.keys(current).length === Object.keys(next).length && Object.keys(current).every((key) => next[key]);
}
export {
  BaseTagPlugin,
  isEqualTags
};
//# sourceMappingURL=index.mjs.map