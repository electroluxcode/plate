// src/lib/BaseListPlugin.tsx
import React from "react";
import {
  createTSlatePlugin,
  isDefined as isDefined8,
  isHtmlBlockElement,
  KEYS as KEYS23,
  postCleanHtml,
  traverseHtmlElements
} from "platejs";

// src/lib/queries/areEqListStyleType.ts
import { KEYS } from "platejs";

// src/lib/types.ts
var ListStyleType = /* @__PURE__ */ ((ListStyleType2) => {
  ListStyleType2["ArabicIndic"] = "arabic-indic";
  ListStyleType2["Armenian"] = "armenian";
  ListStyleType2["Bengali"] = "bengali";
  ListStyleType2["Cambodian"] = "cambodian";
  ListStyleType2["Circle"] = "circle";
  ListStyleType2["CjkDecimal"] = "cjk-decimal";
  ListStyleType2["CjkEarthlyBranch"] = "cjk-earthly-branch";
  ListStyleType2["CjkHeavenlyStem"] = "cjk-heavenly-stem";
  ListStyleType2["Decimal"] = "decimal";
  ListStyleType2["DecimalLeadingZero"] = "decimal-leading-zero";
  ListStyleType2["Devanagari"] = "devanagari";
  ListStyleType2["Disc"] = "disc";
  ListStyleType2["DisclosureClosed"] = "disclosure-closed";
  ListStyleType2["DisclosureOpen"] = "disclosure-open";
  ListStyleType2["EthiopicNumeric"] = "ethiopic-numeric";
  ListStyleType2["Georgian"] = "georgian";
  ListStyleType2["Gujarati"] = "gujarati";
  ListStyleType2["Gurmukhi"] = "gurmukhi";
  ListStyleType2["Hebrew"] = "hebrew";
  ListStyleType2["Hiragana"] = "hiragana";
  ListStyleType2["HiraganaIroha"] = "hiragana-iroha";
  ListStyleType2["Inherit"] = "inherit";
  ListStyleType2["Initial"] = "initial";
  ListStyleType2["JapaneseFormal"] = "japanese-formal";
  ListStyleType2["JapaneseInformal"] = "japanese-informal";
  ListStyleType2["Kannada"] = "kannada";
  ListStyleType2["Katakana"] = "katakana";
  ListStyleType2["KatakanaIroha"] = "katakana-iroha";
  ListStyleType2["Khmer"] = "khmer";
  ListStyleType2["KoreanHangulFormal"] = "korean-hangul-formal";
  ListStyleType2["KoreanHanjaFormal"] = "korean-hanja-formal";
  ListStyleType2["KoreanHanjaInformal"] = "korean-hanja-informal";
  ListStyleType2["Lao"] = "lao";
  ListStyleType2["LowerAlpha"] = "lower-alpha";
  ListStyleType2["LowerArmenian"] = "lower-armenian";
  ListStyleType2["LowerGreek"] = "lower-greek";
  ListStyleType2["LowerLatin"] = "lower-latin";
  ListStyleType2["LowerRoman"] = "lower-roman";
  ListStyleType2["Malayalam"] = "malayalam";
  ListStyleType2["Mongolian"] = "mongolian";
  ListStyleType2["Myanmar"] = "myanmar";
  ListStyleType2["None"] = "none";
  ListStyleType2["Oriya"] = "oriya";
  ListStyleType2["Persian"] = "persian";
  ListStyleType2["SimpChineseFormal"] = "simp-chinese-formal";
  ListStyleType2["SimpChineseInformal"] = "simp-chinese-informal";
  ListStyleType2["Square"] = "square";
  ListStyleType2["Tamil"] = "tamil";
  ListStyleType2["Telugu"] = "telugu";
  ListStyleType2["Thai"] = "thai";
  ListStyleType2["Tibetan"] = "tibetan";
  ListStyleType2["TradChineseFormal"] = "trad-chinese-formal";
  ListStyleType2["TradChineseInformal"] = "trad-chinese-informal";
  ListStyleType2["UpperAlpha"] = "upper-alpha";
  ListStyleType2["UpperArmenian"] = "upper-armenian";
  ListStyleType2["UpperLatin"] = "upper-latin";
  ListStyleType2["UpperRoman"] = "upper-roman";
  return ListStyleType2;
})(ListStyleType || {});
var ULIST_STYLE_TYPES = [
  "disc" /* Disc */,
  "circle" /* Circle */,
  "square" /* Square */,
  "disclosure-open" /* DisclosureOpen */,
  "disclosure-closed" /* DisclosureClosed */
];

// src/lib/queries/areEqListStyleType.ts
var areEqListStyleType = (editor, entries, {
  listStyleType = "disc" /* Disc */
}) => {
  let eqListStyleType = true;
  for (const entry of entries) {
    const [block] = entry;
    if (listStyleType === KEYS.listTodo) {
      if (!block.hasOwnProperty(KEYS.listChecked)) {
        eqListStyleType = false;
        break;
      }
      continue;
    }
    if (!block[KEYS.listType] || block[KEYS.listType] !== listStyleType) {
      eqListStyleType = false;
      break;
    }
  }
  return eqListStyleType;
};

// src/lib/queries/expandListItemsWithChildren.ts
import { isDefined as isDefined2, KEYS as KEYS3 } from "platejs";

// src/lib/queries/getListChildren.ts
import { isDefined, KEYS as KEYS2, NodeApi, PathApi } from "platejs";
var getListChildren = (editor, entry) => {
  const children = [];
  const [node, path] = entry;
  const parentIndent = node[KEYS2.indent];
  if (!isDefined(parentIndent) || !isDefined(node[KEYS2.listType])) {
    return children;
  }
  let currentPath = path;
  while (true) {
    const nextPath = PathApi.next(currentPath);
    if (!nextPath) break;
    const nextNode = NodeApi.get(editor, nextPath);
    if (!nextNode) break;
    const nextIndent = nextNode[KEYS2.indent];
    if (!isDefined(nextIndent) || !isDefined(nextNode[KEYS2.listType])) {
      break;
    }
    if (nextIndent <= parentIndent) {
      break;
    }
    children.push([nextNode, nextPath]);
    currentPath = nextPath;
  }
  return children;
};

// src/lib/queries/expandListItemsWithChildren.ts
var expandListItemsWithChildren = (editor, entries) => {
  const expandedEntries = [];
  const processedIds = /* @__PURE__ */ new Set();
  entries.forEach((entry) => {
    const [node] = entry;
    if (processedIds.has(node.id)) return;
    expandedEntries.push(entry);
    processedIds.add(node.id);
    const isListItem = isDefined2(node[KEYS3.listType]) && isDefined2(node[KEYS3.indent]);
    if (isListItem) {
      const children = getListChildren(editor, entry);
      children.forEach((childEntry) => {
        if (!processedIds.has(childEntry[0].id)) {
          expandedEntries.push(childEntry);
          processedIds.add(childEntry[0].id);
        }
      });
    }
  });
  return expandedEntries;
};

// src/lib/queries/getListAbove.ts
import {
  isDefined as isDefined3,
  KEYS as KEYS4
} from "platejs";
var getListAbove = (editor, options) => {
  return editor.api.above({
    ...options,
    match: (node) => isDefined3(node[KEYS4.listType])
  });
};

// src/lib/queries/getListSiblings.ts
import { KEYS as KEYS6 } from "platejs";

// src/lib/queries/getNextList.ts
import {
  NodeApi as NodeApi2,
  PathApi as PathApi2
} from "platejs";

// src/lib/queries/getSiblingList.ts
import {
  isDefined as isDefined4,
  KEYS as KEYS5
} from "platejs";
var getSiblingList = (editor, [node, path], {
  breakOnEqIndentNeqListStyleType = true,
  breakOnListRestart = false,
  breakOnLowerIndent = true,
  breakQuery,
  eqIndent = true,
  getNextEntry,
  getPreviousEntry,
  query
}) => {
  if (!getPreviousEntry && !getNextEntry) return;
  const getSiblingEntry = getNextEntry ?? getPreviousEntry;
  let nextEntry = getSiblingEntry([node, path]);
  while (true) {
    if (!nextEntry) return;
    const [nextNode, nextPath] = nextEntry;
    const indent = node[KEYS5.indent];
    const nextIndent = nextNode[KEYS5.indent];
    if (breakQuery?.(nextNode, node)) return;
    if (!isDefined4(nextIndent)) return;
    if (breakOnListRestart) {
      if (getPreviousEntry && node[KEYS5.listRestart]) {
        return;
      }
      if (getNextEntry && nextNode[KEYS5.listRestart]) {
        return;
      }
    }
    if (breakOnLowerIndent && nextIndent < indent) return;
    if (breakOnEqIndentNeqListStyleType && nextIndent === indent && nextNode[KEYS5.listType] !== node[KEYS5.listType])
      return;
    let valid = !query || query(nextNode, node);
    if (valid) {
      valid = !eqIndent || nextIndent === indent;
      if (valid) return [nextNode, nextPath];
    }
    nextEntry = getSiblingEntry(nextEntry);
  }
};

// src/lib/queries/getNextList.ts
var getNextList = (editor, entry, options) => {
  return getSiblingList(editor, entry, {
    getNextEntry: ([, currPath]) => {
      const nextPath = PathApi2.next(currPath);
      const nextNode = NodeApi2.get(editor, nextPath);
      if (!nextNode) return;
      return [nextNode, nextPath];
    },
    ...options,
    getPreviousEntry: void 0
  });
};

// src/lib/queries/getPreviousList.ts
import {
  NodeApi as NodeApi3,
  PathApi as PathApi3
} from "platejs";
var getPreviousList = (editor, entry, options) => {
  return getSiblingList(editor, entry, {
    getPreviousEntry: ([, currPath]) => {
      const prevPath = PathApi3.previous(currPath);
      if (!prevPath) return;
      const prevNode = NodeApi3.get(editor, prevPath);
      if (!prevNode) return;
      return [prevNode, prevPath];
    },
    ...options,
    getNextEntry: void 0
  });
};

// src/lib/queries/getListSiblings.ts
var getListSiblings = (editor, entry, {
  current = true,
  next = true,
  previous = true,
  ...options
} = {}) => {
  const siblings = [];
  const node = entry[0];
  if (!node[KEYS6.listType] && !node.hasOwnProperty(KEYS6.listChecked)) {
    return siblings;
  }
  let iterEntry = entry;
  if (previous) {
    while (true) {
      const prevEntry = getPreviousList(editor, iterEntry, options);
      if (!prevEntry) break;
      siblings.push(prevEntry);
      iterEntry = prevEntry;
    }
  }
  if (current) {
    siblings.push(entry);
  }
  if (next) {
    iterEntry = entry;
    while (true) {
      const nextEntry = getNextList(editor, iterEntry, options);
      if (!nextEntry) break;
      siblings.push(nextEntry);
      iterEntry = nextEntry;
    }
  }
  return siblings;
};

// src/lib/queries/getSiblingListStyleType.ts
import { KEYS as KEYS7 } from "platejs";
var getSiblingListStyleType = (editor, {
  entry,
  indent,
  ...options
}) => {
  const siblingEntry = [{ ...entry[0], indent }, entry[1]];
  const siblings = getListSiblings(editor, siblingEntry, {
    breakOnEqIndentNeqListStyleType: false,
    current: false,
    eqIndent: true,
    ...options
  });
  return siblings.length > 0 ? siblings[0][0][KEYS7.listType] : entry[0][KEYS7.listType];
};

// src/lib/queries/isOrderedList.ts
function isOrderedList(element) {
  return !!element.listStyleType && !ULIST_STYLE_TYPES.includes(element.listStyleType);
}

// src/lib/queries/someList.ts
import { KEYS as KEYS8 } from "platejs";
var someList = (editor, type) => {
  return !!editor.selection && editor.api.some({
    match: (n) => {
      const isHasProperty = n.hasOwnProperty(KEYS8.listChecked);
      if (isHasProperty) {
        return false;
      }
      const list = n[KEYS8.listType];
      return Array.isArray(type) ? type.includes(list) : list === type;
    }
  });
};

// src/lib/queries/someTodoList.ts
import { KEYS as KEYS9 } from "platejs";
var someTodoList = (editor) => {
  return editor.api.some({
    at: editor.selection,
    match: (n) => {
      const list = n[KEYS9.listType];
      const isHasProperty = n.hasOwnProperty(KEYS9.listChecked);
      return n.type === "p" && isHasProperty && list === KEYS9.listTodo;
    }
  });
};

// src/lib/withList.ts
import {
  KEYS as KEYS22,
  PathApi as PathApi4
} from "platejs";

// src/lib/normalizers/normalizeListNotIndented.ts
import { isDefined as isDefined5, KEYS as KEYS10 } from "platejs";
var normalizeListNotIndented = (editor, [node, path]) => {
  if (!isDefined5(node[KEYS10.indent]) && (node[KEYS10.listType] || node[KEYS10.listStart])) {
    editor.tf.unsetNodes([KEYS10.listType, KEYS10.listStart], {
      at: path
    });
    return true;
  }
};

// src/lib/normalizers/normalizeListStart.ts
import {
  isDefined as isDefined6,
  KEYS as KEYS11
} from "platejs";
var getListExpectedListStart = (entry, prevEntry) => {
  const [node] = entry;
  const [prevNode] = prevEntry ?? [null];
  const restart = node[KEYS11.listRestart] ?? null;
  const restartPolite = node[KEYS11.listRestartPolite] ?? null;
  if (restart) {
    return restart;
  }
  if (restartPolite && !prevNode) {
    return restartPolite;
  }
  if (prevNode) {
    const prevListStart = prevNode[KEYS11.listStart] ?? 1;
    return prevListStart + 1;
  }
  return 1;
};
var normalizeListStart = (editor, entry, options) => {
  return editor.tf.withoutNormalizing(() => {
    const [node, path] = entry;
    const listStyleType = node[KEYS11.listType];
    const listStart = node[KEYS11.listStart];
    if (!listStyleType) return;
    const prevEntry = getPreviousList(editor, entry, options);
    const expectedListStart = getListExpectedListStart(entry, prevEntry);
    if (isDefined6(listStart) && expectedListStart === 1) {
      editor.tf.unsetNodes(KEYS11.listStart, { at: path });
      return true;
    }
    if (listStart !== expectedListStart && expectedListStart > 1) {
      editor.tf.setNodes({ [KEYS11.listStart]: expectedListStart }, { at: path });
      return true;
    }
    return false;
  });
};

// src/lib/normalizers/withInsertBreakList.ts
import { isDefined as isDefined7, KEYS as KEYS12 } from "platejs";
var withInsertBreakList = ({
  editor,
  tf: { insertBreak }
}) => {
  return {
    transforms: {
      insertBreak() {
        const nodeEntry = editor.api.above();
        if (!nodeEntry) return insertBreak();
        const [node, path] = nodeEntry;
        if (!isDefined7(node[KEYS12.listType]) || node[KEYS12.listType] !== KEYS12.listTodo || editor.api.isExpanded() || !editor.api.isEnd(editor.selection?.focus, path)) {
          return insertBreak();
        }
        editor.tf.withoutNormalizing(() => {
          insertBreak();
          const newEntry = editor.api.above();
          if (newEntry) {
            editor.tf.setNodes(
              {
                checked: false
              },
              { at: newEntry[1] }
            );
          }
        });
      }
    }
  };
};

// src/lib/transforms/indentList.ts
import { setIndent } from "@platejs/indent";
import { KEYS as KEYS13 } from "platejs";
var indentList = (editor, { listStyleType = "disc" /* Disc */, ...options } = {}) => {
  setIndent(editor, {
    offset: 1,
    setNodesProps: () => ({
      [KEYS13.listType]: listStyleType
    }),
    ...options
  });
};
var indentTodo = (editor, { listStyleType = "disc" /* Disc */, ...options } = {}) => {
  setIndent(editor, {
    offset: 1,
    setNodesProps: () => ({
      [KEYS13.listChecked]: false,
      [KEYS13.listType]: listStyleType
    }),
    ...options
  });
};

// src/lib/transforms/outdentList.ts
import { setIndent as setIndent2 } from "@platejs/indent";
import { KEYS as KEYS14 } from "platejs";
var outdentList = (editor, options = {}) => {
  setIndent2(editor, {
    offset: -1,
    unsetNodesProps: [KEYS14.listType, KEYS14.listChecked],
    ...options
  });
};

// src/lib/transforms/setListNode.ts
import { KEYS as KEYS15 } from "platejs";
var setListNode = (editor, {
  at,
  indent = 0,
  listStyleType = "disc" /* Disc */
}) => {
  const newIndent = indent || indent + 1;
  editor.tf.setNodes(
    {
      [KEYS15.indent]: newIndent,
      [KEYS15.listType]: listStyleType
    },
    { at }
  );
};
var setIndentTodoNode = (editor, {
  at,
  indent = 0,
  listStyleType = KEYS15.listTodo
}) => {
  const newIndent = indent || indent + 1;
  editor.tf.setNodes(
    {
      [KEYS15.indent]: newIndent,
      [KEYS15.listChecked]: false,
      [KEYS15.listType]: listStyleType
    },
    { at }
  );
};

// src/lib/transforms/setListNodes.ts
import { KEYS as KEYS16 } from "platejs";
var setListNodes = (editor, entries, {
  listStyleType = "disc" /* Disc */
}) => {
  editor.tf.withoutNormalizing(() => {
    entries.forEach((entry) => {
      const [node, path] = entry;
      let indent = node[KEYS16.indent] ?? 0;
      indent = node[KEYS16.listType] || node.hasOwnProperty(KEYS16.listChecked) ? indent : indent + 1;
      if (listStyleType === "todo") {
        editor.tf.unsetNodes(KEYS16.listType, { at: path });
        setIndentTodoNode(editor, {
          at: path,
          indent,
          listStyleType
        });
        return;
      }
      editor.tf.unsetNodes(KEYS16.listChecked, { at: path });
      setListNode(editor, {
        at: path,
        indent,
        listStyleType
      });
    });
  });
};

// src/lib/transforms/setListSiblingNodes.ts
import { KEYS as KEYS17 } from "platejs";
var setListSiblingNodes = (editor, entry, {
  getSiblingListOptions,
  listStyleType = "disc" /* Disc */
}) => {
  editor.tf.withoutNormalizing(() => {
    const siblings = getListSiblings(editor, entry, getSiblingListOptions);
    siblings.forEach(([node, path]) => {
      if (listStyleType === KEYS17.listTodo) {
        editor.tf.unsetNodes(KEYS17.listType, { at: path });
        setIndentTodoNode(editor, {
          at: path,
          indent: node[KEYS17.indent],
          listStyleType
        });
      } else {
        editor.tf.unsetNodes(KEYS17.listChecked, { at: path });
        setListNode(editor, {
          at: path,
          indent: node[KEYS17.indent],
          listStyleType
        });
      }
    });
  });
};

// src/lib/transforms/toggleList.ts
import { getInjectMatch, KEYS as KEYS20 } from "platejs";

// src/lib/transforms/toggleListSet.ts
import { KEYS as KEYS18 } from "platejs";
var toggleListSet = (editor, [node, _path], { listStyleType = "disc" /* Disc */, ...options }) => {
  if (node.hasOwnProperty(KEYS18.listChecked) || node[KEYS18.listType]) return;
  if (listStyleType === "todo") {
    indentTodo(editor, {
      listStyleType,
      ...options
    });
  } else {
    indentList(editor, {
      listStyleType,
      ...options
    });
  }
  return true;
};

// src/lib/transforms/toggleListUnset.ts
import { KEYS as KEYS19 } from "platejs";
var toggleListUnset = (editor, [node, path], {
  listStyleType = "disc" /* Disc */
}) => {
  if (listStyleType === KEYS19.listTodo && node.hasOwnProperty(KEYS19.listChecked)) {
    editor.tf.unsetNodes(KEYS19.listChecked, { at: path });
    outdentList(editor, { listStyleType });
    return true;
  }
  if (listStyleType === node[KEYS19.listType]) {
    editor.tf.unsetNodes([KEYS19.listType], {
      at: path
    });
    outdentList(editor, { listStyleType });
    return true;
  }
};

// src/lib/transforms/toggleList.ts
var toggleList = (editor, options, getSiblingListOptions) => {
  const { listRestart, listRestartPolite, listStyleType } = options;
  const setList = (() => {
    const { getSiblingListOptions: _getSiblingListOptions } = editor.getOptions(BaseListPlugin);
    if (editor.api.isCollapsed()) {
      const entry = editor.api.block();
      if (!entry) return null;
      if (toggleListSet(editor, entry, options)) {
        return true;
      }
      if (toggleListUnset(editor, entry, { listStyleType })) {
        return false;
      }
      setListSiblingNodes(editor, entry, {
        getSiblingListOptions: {
          ..._getSiblingListOptions,
          ...getSiblingListOptions
        },
        listStyleType
      });
      return true;
    }
    if (editor.api.isExpanded()) {
      const match = getInjectMatch(
        editor,
        editor.getPlugin({ key: KEYS20.list })
      );
      const _entries = editor.api.nodes({ block: true, match });
      const entries = [..._entries];
      const eqListStyleType = areEqListStyleType(editor, entries, {
        listStyleType
      });
      if (eqListStyleType) {
        editor.tf.withoutNormalizing(() => {
          entries.forEach((entry) => {
            const [node, path] = entry;
            const indent = node[KEYS20.indent];
            editor.tf.unsetNodes(KEYS20.listType, { at: path });
            if (indent > 1) {
              editor.tf.setNodes({ [KEYS20.indent]: indent - 1 }, { at: path });
            } else {
              editor.tf.unsetNodes([KEYS20.indent, KEYS20.listChecked], {
                at: path
              });
            }
          });
        });
        return false;
      }
      setListNodes(editor, entries, { listStyleType });
      return true;
    }
    return null;
  })();
  const restartValue = listRestart || listRestartPolite;
  const isRestart = !!listRestart;
  if (setList && restartValue) {
    const atStart = editor.api.start(editor.selection);
    const entry = getListAbove(editor, { at: atStart });
    if (!entry) return;
    const isFirst = !getPreviousList(editor, entry);
    if (!isRestart && (!isFirst || restartValue <= 0)) return;
    if (isRestart && restartValue === 1 && isFirst) return;
    const prop = isRestart ? KEYS20.listRestart : KEYS20.listRestartPolite;
    editor.tf.setNodes({ [prop]: restartValue }, { at: entry[1] });
  }
};

// src/lib/transforms/toggleListByPath.ts
import { KEYS as KEYS21 } from "platejs";
var toggleListByPath = (editor, [node, path], listStyleType) => {
  editor.tf.setNodes(
    {
      [KEYS21.indent]: node.indent ?? 1,
      // TODO: normalized if not todo remove this property.
      [KEYS21.listChecked]: false,
      [KEYS21.listType]: listStyleType,
      type: KEYS21.p
    },
    {
      at: path
    }
  );
};
var toggleListByPathUnSet = (editor, [, path]) => editor.tf.unsetNodes([KEYS21.listType, KEYS21.indent, KEYS21.listChecked], {
  at: path
});

// src/lib/withNormalizeList.ts
var withNormalizeList = ({
  editor,
  getOptions,
  tf: { normalizeNode }
}) => {
  return {
    transforms: {
      normalizeNode([node, path]) {
        const normalized = editor.tf.withoutNormalizing(() => {
          if (normalizeListNotIndented(editor, [node, path])) return true;
          if (normalizeListStart(
            editor,
            [node, path],
            getOptions().getSiblingListOptions
          ))
            return true;
        });
        if (normalized) return;
        return normalizeNode([node, path]);
      }
    }
  };
};

// src/lib/withList.ts
var withList = (ctx) => {
  const {
    editor,
    getOptions,
    tf: { apply, resetBlock }
  } = ctx;
  return {
    transforms: {
      resetBlock(options) {
        if (editor.api.block(options)?.[0]?.[KEYS22.listType]) {
          outdentList(editor);
          return;
        }
        return resetBlock(options);
      },
      ...withNormalizeList(ctx).transforms,
      // ...withDeleteBackwardList(ctx).transforms,
      ...withInsertBreakList(ctx).transforms,
      apply(operation) {
        const { getSiblingListOptions } = getOptions();
        if (operation.type === "insert_node") {
          const listStyleType = operation.node[KEYS22.listType];
          if (listStyleType && ["lower-roman", "upper-roman"].includes(
            listStyleType
          )) {
            const prevNodeEntry = getPreviousList(
              editor,
              [operation.node, operation.path],
              {
                breakOnEqIndentNeqListStyleType: false,
                eqIndent: false,
                ...getSiblingListOptions
              }
            );
            if (prevNodeEntry) {
              const prevListStyleType = prevNodeEntry[0][KEYS22.listType];
              if (prevListStyleType === "lower-alpha" /* LowerAlpha */ && listStyleType === "lower-roman" /* LowerRoman */) {
                operation.node[KEYS22.listType] = "lower-alpha" /* LowerAlpha */;
              } else if (prevListStyleType === "upper-alpha" /* UpperAlpha */ && listStyleType === "upper-roman" /* UpperRoman */) {
                operation.node[KEYS22.listType] = "upper-alpha" /* UpperAlpha */;
              }
            }
          }
        }
        if (operation.type === "split_node" && operation.properties[KEYS22.listType]) {
          operation.properties[KEYS22.listRestart] = void 0;
          operation.properties[KEYS22.listRestartPolite] = void 0;
        }
        apply(operation);
        const affectedPaths = [];
        switch (operation.type) {
          case "insert_node":
          case "remove_node":
          case "set_node": {
            affectedPaths.push(operation.path);
            break;
          }
          case "merge_node": {
            affectedPaths.push(PathApi4.previous(operation.path));
            break;
          }
          case "move_node": {
            affectedPaths.push(operation.path, operation.newPath);
            break;
          }
          case "split_node": {
            affectedPaths.push(operation.path, PathApi4.next(operation.path));
            break;
          }
        }
        const isListItem = (node) => KEYS22.listType in node;
        affectedPaths.forEach((affectedPath) => {
          let entry = editor.api.node(affectedPath);
          if (!entry) return;
          if (!isListItem(entry[0])) {
            entry = editor.api.node(PathApi4.next(affectedPath));
          }
          while (entry && isListItem(entry[0])) {
            const normalized = normalizeListStart(
              editor,
              entry,
              getSiblingListOptions
            );
            if (normalized) break;
            entry = getNextList(
              editor,
              entry,
              {
                ...getSiblingListOptions,
                breakOnEqIndentNeqListStyleType: false,
                breakOnLowerIndent: false,
                eqIndent: false
              }
            );
          }
        });
      }
    }
  };
};

// src/lib/BaseListPlugin.tsx
var BaseListPlugin = createTSlatePlugin({
  key: KEYS23.list,
  inject: {
    plugins: {
      [KEYS23.html]: {
        parser: {
          transformData: ({ data }) => {
            const document = new DOMParser().parseFromString(data, "text/html");
            const { body } = document;
            const lisWithNestedLists = [];
            traverseHtmlElements(body, (element) => {
              if (element.tagName === "LI") {
                const nestedLists = [];
                Array.from(element.children).forEach((child) => {
                  if (child.tagName === "UL" || child.tagName === "OL") {
                    nestedLists.push(child);
                  }
                });
                if (nestedLists.length > 0) {
                  lisWithNestedLists.push({ li: element, nestedLists });
                }
              }
              return true;
            });
            lisWithNestedLists.forEach(({ li, nestedLists }) => {
              nestedLists.forEach((nestedList) => {
                nestedList.remove();
                if (li.parentNode) {
                  li.parentNode.insertBefore(nestedList, li.nextSibling);
                }
              });
            });
            traverseHtmlElements(body, (element) => {
              if (element.tagName === "LI") {
                const htmlElement = element;
                const { childNodes } = element;
                const liChildren = [];
                childNodes.forEach((child) => {
                  if (child.nodeType === Node.ELEMENT_NODE) {
                    const childElement = child;
                    if (isHtmlBlockElement(childElement)) {
                      liChildren.push(...childElement.childNodes);
                      return;
                    }
                  }
                  liChildren.push(child);
                });
                element.replaceChildren(...liChildren);
                const ariaLevel = element.getAttribute("aria-level");
                if (ariaLevel) {
                  htmlElement.dataset.indent = ariaLevel;
                } else {
                  let indent = 0;
                  let parent = element.parentElement;
                  while (parent && parent !== body) {
                    if (parent.tagName === "UL" || parent.tagName === "OL") {
                      indent++;
                    }
                    parent = parent.parentElement;
                  }
                  if (indent > 0) {
                    htmlElement.dataset.indent = String(indent);
                  }
                }
                const listStyleType = htmlElement.style.listStyleType;
                if (listStyleType) {
                  htmlElement.dataset.listStyleType = listStyleType;
                } else {
                  const listParent = element.closest("ul, ol");
                  if (listParent) {
                    const parentListStyleType = listParent.style.listStyleType;
                    if (parentListStyleType) {
                      htmlElement.dataset.listStyleType = parentListStyleType;
                    } else if (listParent.tagName === "UL") {
                      htmlElement.dataset.listStyleType = "disc";
                    } else if (listParent.tagName === "OL") {
                      htmlElement.dataset.listStyleType = "decimal";
                    }
                  }
                }
                return false;
              }
              return true;
            });
            return postCleanHtml(body.innerHTML);
          }
        }
      }
    },
    targetPlugins: [KEYS23.p]
  },
  options: {
    getListStyleType: (element) => element.style.listStyleType
  },
  parsers: {
    html: {
      deserializer: {
        isElement: true,
        rules: [
          {
            validNodeName: "LI"
          }
        ],
        parse: ({ editor, element, getOptions }) => {
          const dataIndent = element.dataset.indent;
          const ariaLevel = element.getAttribute("aria-level");
          const indent = dataIndent ? Number(dataIndent) : Number(ariaLevel);
          const dataListStyleType = element.dataset.listStyleType;
          const listStyleType = dataListStyleType || getOptions().getListStyleType?.(element);
          return {
            indent: indent || void 0,
            listStyleType: listStyleType || void 0,
            type: editor.getType(KEYS23.p)
          };
        }
      }
    }
  },
  render: {
    belowNodes: (props) => {
      if (!props.element.listStyleType) return;
      return (props2) => /* @__PURE__ */ React.createElement(List, { ...props2 });
    }
  },
  rules: {
    break: {
      empty: "reset",
      splitReset: false
    },
    delete: {
      start: "reset"
    },
    merge: {
      removeEmpty: false
    },
    match: ({ node }) => {
      return isDefined8(node[KEYS23.listType]);
    }
  }
}).overrideEditor(withList);
function List(props) {
  const { listStart, listStyleType } = props.element;
  const List2 = isOrderedList(props.element) ? "ol" : "ul";
  return /* @__PURE__ */ React.createElement(
    List2,
    {
      style: { listStyleType, margin: 0, padding: 0, position: "relative" },
      start: listStart
    },
    /* @__PURE__ */ React.createElement("li", null, props.children)
  );
}
export {
  BaseListPlugin,
  ListStyleType,
  ULIST_STYLE_TYPES,
  areEqListStyleType,
  expandListItemsWithChildren,
  getListAbove,
  getListChildren,
  getListExpectedListStart,
  getListSiblings,
  getNextList,
  getPreviousList,
  getSiblingList,
  getSiblingListStyleType,
  indentList,
  indentTodo,
  isOrderedList,
  normalizeListNotIndented,
  normalizeListStart,
  outdentList,
  setIndentTodoNode,
  setListNode,
  setListNodes,
  setListSiblingNodes,
  someList,
  someTodoList,
  toggleList,
  toggleListByPath,
  toggleListByPathUnSet,
  toggleListSet,
  toggleListUnset,
  withInsertBreakList,
  withList,
  withNormalizeList
};
//# sourceMappingURL=index.mjs.map