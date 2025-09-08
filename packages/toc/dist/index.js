"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BaseTocPlugin: () => BaseTocPlugin,
  insertToc: () => insertToc,
  isHeading: () => isHeading
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseTocPlugin.ts
var import_platejs = require("platejs");
var BaseTocPlugin = (0, import_platejs.createTSlatePlugin)({
  key: import_platejs.KEYS.toc,
  node: { isElement: true, isVoid: true },
  options: {
    isScroll: true,
    topOffset: 80
  }
});

// src/lib/transforms/insertToc.ts
var import_platejs2 = require("platejs");
var insertToc = (editor, options) => {
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      type: editor.getType(import_platejs2.KEYS.toc)
    },
    options
  );
};

// src/lib/utils/isHeading.ts
var import_platejs3 = require("platejs");
var isHeading = (node) => {
  return node.type && import_platejs3.KEYS.heading.includes(node.type);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseTocPlugin,
  insertToc,
  isHeading
});
//# sourceMappingURL=index.js.map