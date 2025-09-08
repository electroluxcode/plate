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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BaseEquationPlugin: () => BaseEquationPlugin,
  BaseInlineEquationPlugin: () => BaseInlineEquationPlugin,
  getEquationHtml: () => getEquationHtml,
  insertEquation: () => insertEquation,
  insertInlineEquation: () => insertInlineEquation
});
module.exports = __toCommonJS(index_exports);

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

// src/lib/utils/getEquationHtml.ts
var import_katex = __toESM(require("katex"));
var getEquationHtml = ({
  element,
  options
}) => import_katex.default.renderToString(element.texExpression, options);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseEquationPlugin,
  BaseInlineEquationPlugin,
  getEquationHtml,
  insertEquation,
  insertInlineEquation
});
//# sourceMappingURL=index.js.map