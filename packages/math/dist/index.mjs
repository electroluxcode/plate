// src/lib/BaseEquationPlugin.ts
import { bindFirst, createSlatePlugin, KEYS as KEYS3 } from "platejs";

// src/lib/transforms/insertEquation.ts
import { KEYS } from "platejs";
var insertEquation = (editor, options) => {
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      texExpression: "",
      type: editor.getType(KEYS.equation)
    },
    options
  );
};

// src/lib/transforms/insertInlineEquation.ts
import { KEYS as KEYS2 } from "platejs";
var insertInlineEquation = (editor, texExpression, options) => {
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      texExpression: texExpression ?? editor.api.string(editor.selection),
      type: editor.getType(KEYS2.inlineEquation)
    },
    options
  );
};

// src/lib/BaseEquationPlugin.ts
import "katex/dist/katex.min.css";
var BaseEquationPlugin = createSlatePlugin({
  key: KEYS3.equation,
  node: { isElement: true, isVoid: true }
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    equation: bindFirst(insertEquation, editor)
  }
}));

// src/lib/BaseInlineEquationPlugin.ts
import { bindFirst as bindFirst2, createSlatePlugin as createSlatePlugin2, KEYS as KEYS4 } from "platejs";
var BaseInlineEquationPlugin = createSlatePlugin2({
  key: KEYS4.inlineEquation,
  node: { isElement: true, isInline: true, isVoid: true }
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    inlineEquation: bindFirst2(insertInlineEquation, editor)
  }
}));

// src/lib/utils/getEquationHtml.ts
import katex from "katex";
var getEquationHtml = ({
  element,
  options
}) => katex.renderToString(element.texExpression, options);
export {
  BaseEquationPlugin,
  BaseInlineEquationPlugin,
  getEquationHtml,
  insertEquation,
  insertInlineEquation
};
//# sourceMappingURL=index.mjs.map