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
  FindReplacePlugin: () => FindReplacePlugin,
  decorateFindReplace: () => decorateFindReplace
});
module.exports = __toCommonJS(index_exports);

// src/lib/FindReplacePlugin.ts
var import_platejs2 = require("platejs");

// src/lib/decorateFindReplace.ts
var import_platejs = require("platejs");
var decorateFindReplace = ({
  entry: [node, path],
  getOptions,
  type
}) => {
  const { search } = getOptions();
  if (!(search && import_platejs.ElementApi.isElement(node) && node.children.every(import_platejs.TextApi.isText))) {
    return [];
  }
  const texts = node.children.map((it) => it.text);
  const str = texts.join("").toLowerCase();
  const searchLower = search.toLowerCase();
  let start = 0;
  const matches = [];
  while ((start = str.indexOf(searchLower, start)) !== -1) {
    matches.push(start);
    start += searchLower.length;
  }
  if (matches.length === 0) {
    return [];
  }
  const ranges = [];
  let cumulativePosition = 0;
  let matchIndex = 0;
  for (const [textIndex, text] of texts.entries()) {
    const textStart = cumulativePosition;
    const textEnd = textStart + text.length;
    while (matchIndex < matches.length && matches[matchIndex] < textEnd) {
      const matchStart = matches[matchIndex];
      const matchEnd = matchStart + search.length;
      if (matchEnd <= textStart) {
        matchIndex++;
        continue;
      }
      const overlapStart = Math.max(matchStart, textStart);
      const overlapEnd = Math.min(matchEnd, textEnd);
      if (overlapStart < overlapEnd) {
        const anchorOffset = overlapStart - textStart;
        const focusOffset = overlapEnd - textStart;
        const searchOverlapStart = overlapStart - matchStart;
        const searchOverlapEnd = overlapEnd - matchStart;
        const textNodePath = [...path, textIndex];
        ranges.push({
          anchor: {
            offset: anchorOffset,
            path: textNodePath
          },
          focus: {
            offset: focusOffset,
            path: textNodePath
          },
          search: search.slice(searchOverlapStart, searchOverlapEnd),
          [type]: true
        });
      }
      if (matchEnd <= textEnd) {
        matchIndex++;
      } else {
        break;
      }
    }
    cumulativePosition = textEnd;
  }
  return ranges;
};

// src/lib/FindReplacePlugin.ts
var FindReplacePlugin = (0, import_platejs2.createTSlatePlugin)({
  key: import_platejs2.KEYS.searchHighlight,
  decorate: decorateFindReplace,
  node: { isLeaf: true },
  options: { search: "" }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindReplacePlugin,
  decorateFindReplace
});
//# sourceMappingURL=index.js.map