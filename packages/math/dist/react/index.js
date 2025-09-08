"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  EquationPlugin: () => EquationPlugin,
  InlineEquationPlugin: () => InlineEquationPlugin,
  useEquationElement: () => useEquationElement,
  useEquationInput: () => useEquationInput
});
module.exports = __toCommonJS(react_exports);

// src/react/EquationPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseEquationPlugin.ts
var import_platejs3 = require("platejs");

// src/lib/transforms/insertEquation.ts
var import_platejs = require("platejs");
var insertEquation = (editor, options) => {
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      texExpression: "",
      type: editor.getType(import_platejs.KEYS.equation)
    },
    options
  );
};

// src/lib/transforms/insertInlineEquation.ts
var import_platejs2 = require("platejs");
var insertInlineEquation = (editor, texExpression, options) => {
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      texExpression: texExpression ?? editor.api.string(editor.selection),
      type: editor.getType(import_platejs2.KEYS.inlineEquation)
    },
    options
  );
};

// src/lib/BaseEquationPlugin.ts
var import_katex_min = require("katex/dist/katex.min.css");
var BaseEquationPlugin = (0, import_platejs3.createSlatePlugin)({
  key: import_platejs3.KEYS.equation,
  node: { isElement: true, isVoid: true }
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    equation: (0, import_platejs3.bindFirst)(insertEquation, editor)
  }
}));

// src/lib/BaseInlineEquationPlugin.ts
var import_platejs4 = require("platejs");
var BaseInlineEquationPlugin = (0, import_platejs4.createSlatePlugin)({
  key: import_platejs4.KEYS.inlineEquation,
  node: { isElement: true, isInline: true, isVoid: true }
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    inlineEquation: (0, import_platejs4.bindFirst)(insertInlineEquation, editor)
  }
}));

// src/react/EquationPlugin.tsx
var EquationPlugin = (0, import_react.toPlatePlugin)(BaseEquationPlugin);

// src/react/InlineEquationPlugin.tsx
var import_react2 = require("platejs/react");
var InlineEquationPlugin = (0, import_react2.toPlatePlugin)(BaseInlineEquationPlugin);

// src/react/hooks/useEquationElement.ts
var import_react3 = __toESM(require("react"));
var import_katex = __toESM(require("katex"));
var useEquationElement = ({
  element,
  katexRef,
  options
}) => {
  import_react3.default.useEffect(() => {
    if (!katexRef.current) return;
    import_katex.default.render(element.texExpression, katexRef.current, options);
  }, [element.texExpression]);
};

// src/react/hooks/useEquationInput.ts
var import_react4 = __toESM(require("react"));
var import_platejs5 = require("platejs");
var import_react5 = require("platejs/react");
var useEquationInput = ({
  isInline,
  open,
  onClose
}) => {
  const editor = (0, import_react5.useEditorRef)();
  const element = (0, import_react5.useElement)();
  const inputRef = (0, import_react4.useRef)(null);
  const [expressionInput, setExpressionInput] = import_react4.default.useState(
    element.texExpression
  );
  const initialExpressionRef = (0, import_react4.useRef)(element.texExpression);
  (0, import_react4.useEffect)(() => {
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
  (0, import_react4.useEffect)(() => {
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
        if ((0, import_platejs5.isHotkey)("enter")(e)) {
          e.preventDefault();
          onSubmit();
        } else if ((0, import_platejs5.isHotkey)("escape")(e)) {
          e.preventDefault();
          onDismiss();
        }
        if (isInline) {
          const { selectionEnd, selectionStart, value } = e.target;
          if (selectionStart === 0 && selectionEnd === 0 && (0, import_platejs5.isHotkey)("ArrowLeft")(e)) {
            e.preventDefault();
            editor.tf.select(element, {
              focus: true,
              previous: true
            });
          }
          if (selectionEnd === value.length && selectionStart === value.length && (0, import_platejs5.isHotkey)("ArrowRight")(e)) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EquationPlugin,
  InlineEquationPlugin,
  useEquationElement,
  useEquationInput
});
//# sourceMappingURL=index.js.map