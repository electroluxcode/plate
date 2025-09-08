// src/lib/BaseTocPlugin.ts
import {
  createTSlatePlugin,
  KEYS
} from "platejs";
var BaseTocPlugin = createTSlatePlugin({
  key: KEYS.toc,
  node: { isElement: true, isVoid: true },
  options: {
    isScroll: true,
    topOffset: 80
  }
});

// src/lib/transforms/insertToc.ts
import { KEYS as KEYS2 } from "platejs";
var insertToc = (editor, options) => {
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      type: editor.getType(KEYS2.toc)
    },
    options
  );
};

// src/lib/utils/isHeading.ts
import { KEYS as KEYS3 } from "platejs";
var isHeading = (node) => {
  return node.type && KEYS3.heading.includes(node.type);
};
export {
  BaseTocPlugin,
  insertToc,
  isHeading
};
//# sourceMappingURL=index.mjs.map