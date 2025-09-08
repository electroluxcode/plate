// src/lib/FindReplacePlugin.ts
import { createTSlatePlugin, KEYS } from "platejs";

// src/lib/decorateFindReplace.ts
import { ElementApi, TextApi } from "platejs";
var decorateFindReplace = ({
  entry: [node, path],
  getOptions,
  type
}) => {
  const { search } = getOptions();
  if (!(search && ElementApi.isElement(node) && node.children.every(TextApi.isText))) {
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
var FindReplacePlugin = createTSlatePlugin({
  key: KEYS.searchHighlight,
  decorate: decorateFindReplace,
  node: { isLeaf: true },
  options: { search: "" }
});
export {
  FindReplacePlugin,
  decorateFindReplace
};
//# sourceMappingURL=index.mjs.map