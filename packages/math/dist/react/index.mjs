// src/react/EquationPlugin.tsx
import { toPlatePlugin } from "platejs/react";

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

// src/react/EquationPlugin.tsx
var EquationPlugin = toPlatePlugin(BaseEquationPlugin);

// src/react/InlineEquationPlugin.tsx
import { toPlatePlugin as toPlatePlugin2 } from "platejs/react";
var InlineEquationPlugin = toPlatePlugin2(BaseInlineEquationPlugin);

// src/react/hooks/useEquationElement.ts
import React from "react";
import katex from "katex";
var useEquationElement = ({
  element,
  katexRef,
  options
}) => {
  React.useEffect(() => {
    if (!katexRef.current) return;
    katex.render(element.texExpression, katexRef.current, options);
  }, [element.texExpression]);
};

// src/react/hooks/useEquationInput.ts
import React2, { useEffect, useRef } from "react";
import { isHotkey } from "platejs";
import { useEditorRef, useElement } from "platejs/react";
var useEquationInput = ({
  isInline,
  open,
  onClose
}) => {
  const editor = useEditorRef();
  const element = useElement();
  const inputRef = useRef(null);
  const [expressionInput, setExpressionInput] = React2.useState(
    element.texExpression
  );
  const initialExpressionRef = useRef(element.texExpression);
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
          if (isInline) {
            initialExpressionRef.current = element.texExpression;
          }
        }
      }, 0);
    }
  }, [open]);
  useEffect(() => {
    const setExpression = () => {
      editor.tf.setNodes(
        {
          texExpression: expressionInput || ""
        },
        { at: element }
      );
    };
    isInline ? editor.tf.withMerging(setExpression) : setExpression();
  }, [expressionInput]);
  const onSubmit = () => {
    onClose?.();
  };
  const onDismiss = () => {
    if (isInline) {
      editor.tf.setNodes(
        {
          texExpression: initialExpressionRef.current
        },
        { at: element }
      );
    }
    onClose?.();
  };
  return {
    props: {
      value: expressionInput,
      onChange: (e) => {
        setExpressionInput(e.target.value);
      },
      onKeyDown: (e) => {
        if (isHotkey("enter")(e)) {
          e.preventDefault();
          onSubmit();
        } else if (isHotkey("escape")(e)) {
          e.preventDefault();
          onDismiss();
        }
        if (isInline) {
          const { selectionEnd, selectionStart, value } = e.target;
          if (selectionStart === 0 && selectionEnd === 0 && isHotkey("ArrowLeft")(e)) {
            e.preventDefault();
            editor.tf.select(element, {
              focus: true,
              previous: true
            });
          }
          if (selectionEnd === value.length && selectionStart === value.length && isHotkey("ArrowRight")(e)) {
            e.preventDefault();
            editor.tf.select(element, {
              focus: true,
              next: true
            });
          }
        }
      }
    },
    ref: inputRef,
    onDismiss,
    onSubmit
  };
};
export {
  EquationPlugin,
  InlineEquationPlugin,
  useEquationElement,
  useEquationInput
};
//# sourceMappingURL=index.mjs.map