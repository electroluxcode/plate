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
  BaseListPlugin: () => BaseListPlugin,
  ListStyleType: () => ListStyleType,
  ULIST_STYLE_TYPES: () => ULIST_STYLE_TYPES,
  areEqListStyleType: () => areEqListStyleType,
  expandListItemsWithChildren: () => expandListItemsWithChildren,
  getListAbove: () => getListAbove,
  getListChildren: () => getListChildren,
  getListExpectedListStart: () => getListExpectedListStart,
  getListSiblings: () => getListSiblings,
  getNextList: () => getNextList,
  getPreviousList: () => getPreviousList,
  getSiblingList: () => getSiblingList,
  getSiblingListStyleType: () => getSiblingListStyleType,
  indentList: () => indentList,
  indentTodo: () => indentTodo,
  isOrderedList: () => isOrderedList,
  normalizeListNotIndented: () => normalizeListNotIndented,
  normalizeListStart: () => normalizeListStart,
  outdentList: () => outdentList,
  setIndentTodoNode: () => setIndentTodoNode,
  setListNode: () => setListNode,
  setListNodes: () => setListNodes,
  setListSiblingNodes: () => setListSiblingNodes,
  someList: () => someList,
  someTodoList: () => someTodoList,
  toggleList: () => toggleList,
  toggleListByPath: () => toggleListByPath,
  toggleListByPathUnSet: () => toggleListByPathUnSet,
  toggleListSet: () => toggleListSet,
  toggleListUnset: () => toggleListUnset,
  withInsertBreakList: () => withInsertBreakList,
  withList: () => withList,
  withNormalizeList: () => withNormalizeList
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseListPlugin.tsx
var import_react = __toESM(require("react"));
var import_platejs25 = require("platejs");

// src/lib/queries/areEqListStyleType.ts
var import_platejs = require("platejs");

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
    if (listStyleType === import_platejs.KEYS.listTodo) {
      if (!block.hasOwnProperty(import_platejs.KEYS.listChecked)) {
        eqListStyleType = false;
        break;
      }
      continue;
    }
    if (!block[import_platejs.KEYS.listType] || block[import_platejs.KEYS.listType] !== listStyleType) {
      eqListStyleType = false;
      break;
    }
  }
  return eqListStyleType;
};

// src/lib/queries/expandListItemsWithChildren.ts
var import_platejs3 = require("platejs");

// src/lib/queries/getListChildren.ts
var import_platejs2 = require("platejs");
var getListChildren = (editor, entry) => {
  const children = [];
  const [node, path] = entry;
  const parentIndent = node[import_platejs2.KEYS.indent];
  if (!(0, import_platejs2.isDefined)(parentIndent) || !(0, import_platejs2.isDefined)(node[import_platejs2.KEYS.listType])) {
    return children;
  }
  let currentPath = path;
  while (true) {
    const nextPath = import_platejs2.PathApi.next(currentPath);
    if (!nextPath) break;
    const nextNode = import_platejs2.NodeApi.get(editor, nextPath);
    if (!nextNode) break;
    const nextIndent = nextNode[import_platejs2.KEYS.indent];
    if (!(0, import_platejs2.isDefined)(nextIndent) || !(0, import_platejs2.isDefined)(nextNode[import_platejs2.KEYS.listType])) {
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
    const isListItem = (0, import_platejs3.isDefined)(node[import_platejs3.KEYS.listType]) && (0, import_platejs3.isDefined)(node[import_platejs3.KEYS.indent]);
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
var import_platejs4 = require("platejs");
var getListAbove = (editor, options) => {
  return editor.api.above({
    ...options,
    match: (node) => (0, import_platejs4.isDefined)(node[import_platejs4.KEYS.listType])
  });
};

// src/lib/queries/getListSiblings.ts
var import_platejs8 = require("platejs");

// src/lib/queries/getNextList.ts
var import_platejs6 = require("platejs");

// src/lib/queries/getSiblingList.ts
var import_platejs5 = require("platejs");
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
    const indent = node[import_platejs5.KEYS.indent];
    const nextIndent = nextNode[import_platejs5.KEYS.indent];
    if (breakQuery?.(nextNode, node)) return;
    if (!(0, import_platejs5.isDefined)(nextIndent)) return;
    if (breakOnListRestart) {
      if (getPreviousEntry && node[import_platejs5.KEYS.listRestart]) {
        return;
      }
      if (getNextEntry && nextNode[import_platejs5.KEYS.listRestart]) {
        return;
      }
    }
    if (breakOnLowerIndent && nextIndent < indent) return;
    if (breakOnEqIndentNeqListStyleType && nextIndent === indent && nextNode[import_platejs5.KEYS.listType] !== node[import_platejs5.KEYS.listType])
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
      const nextPath = import_platejs6.PathApi.next(currPath);
      const nextNode = import_platejs6.NodeApi.get(editor, nextPath);
      if (!nextNode) return;
      return [nextNode, nextPath];
    },
    ...options,
    getPreviousEntry: void 0
  });
};

// src/lib/queries/getPreviousList.ts
var import_platejs7 = require("platejs");
var getPreviousList = (editor, entry, options) => {
  return getSiblingList(editor, entry, {
    getPreviousEntry: ([, currPath]) => {
      const prevPath = import_platejs7.PathApi.previous(currPath);
      if (!prevPath) return;
      const prevNode = import_platejs7.NodeApi.get(editor, prevPath);
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
  if (!node[import_platejs8.KEYS.listType] && !node.hasOwnProperty(import_platejs8.KEYS.listChecked)) {
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
var import_platejs9 = require("platejs");
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
  return siblings.length > 0 ? siblings[0][0][import_platejs9.KEYS.listType] : entry[0][import_platejs9.KEYS.listType];
};

// src/lib/queries/isOrderedList.ts
function isOrderedList(element) {
  return !!element.listStyleType && !ULIST_STYLE_TYPES.includes(element.listStyleType);
}

// src/lib/queries/someList.ts
var import_platejs10 = require("platejs");
var someList = (editor, type) => {
  return !!editor.selection && editor.api.some({
    match: (n) => {
      const isHasProperty = n.hasOwnProperty(import_platejs10.KEYS.listChecked);
      if (isHasProperty) {
        return false;
      }
      const list = n[import_platejs10.KEYS.listType];
      return Array.isArray(type) ? type.includes(list) : list === type;
    }
  });
};

// src/lib/queries/someTodoList.ts
var import_platejs11 = require("platejs");
var someTodoList = (editor) => {
  return editor.api.some({
    at: editor.selection,
    match: (n) => {
      const list = n[import_platejs11.KEYS.listType];
      const isHasProperty = n.hasOwnProperty(import_platejs11.KEYS.listChecked);
      return n.type === "p" && isHasProperty && list === import_platejs11.KEYS.listTodo;
    }
  });
};

// src/lib/withList.ts
var import_platejs24 = require("platejs");

// src/lib/normalizers/normalizeListNotIndented.ts
var import_platejs12 = require("platejs");
var normalizeListNotIndented = (editor, [node, path]) => {
  if (!(0, import_platejs12.isDefined)(node[import_platejs12.KEYS.indent]) && (node[import_platejs12.KEYS.listType] || node[import_platejs12.KEYS.listStart])) {
    editor.tf.unsetNodes([import_platejs12.KEYS.listType, import_platejs12.KEYS.listStart], {
      at: path
    });
    return true;
  }
};

// src/lib/normalizers/normalizeListStart.ts
var import_platejs13 = require("platejs");
var getListExpectedListStart = (entry, prevEntry) => {
  const [node] = entry;
  const [prevNode] = prevEntry ?? [null];
  const restart = node[import_platejs13.KEYS.listRestart] ?? null;
  const restartPolite = node[import_platejs13.KEYS.listRestartPolite] ?? null;
  if (restart) {
    return restart;
  }
  if (restartPolite && !prevNode) {
    return restartPolite;
  }
  if (prevNode) {
    const prevListStart = prevNode[import_platejs13.KEYS.listStart] ?? 1;
    return prevListStart + 1;
  }
  return 1;
};
var normalizeListStart = (editor, entry, options) => {
  return editor.tf.withoutNormalizing(() => {
    const [node, path] = entry;
    const listStyleType = node[import_platejs13.KEYS.listType];
    const listStart = node[import_platejs13.KEYS.listStart];
    if (!listStyleType) return;
    const prevEntry = getPreviousList(editor, entry, options);
    const expectedListStart = getListExpectedListStart(entry, prevEntry);
    if ((0, import_platejs13.isDefined)(listStart) && expectedListStart === 1) {
      editor.tf.unsetNodes(import_platejs13.KEYS.listStart, { at: path });
      return true;
    }
    if (listStart !== expectedListStart && expectedListStart > 1) {
      editor.tf.setNodes({ [import_platejs13.KEYS.listStart]: expectedListStart }, { at: path });
      return true;
    }
    return false;
  });
};

// src/lib/normalizers/withInsertBreakList.ts
var import_platejs14 = require("platejs");
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
        if (!(0, import_platejs14.isDefined)(node[import_platejs14.KEYS.listType]) || node[import_platejs14.KEYS.listType] !== import_platejs14.KEYS.listTodo || editor.api.isExpanded() || !editor.api.isEnd(editor.selection?.focus, path)) {
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
var import_indent = require("@platejs/indent");
var import_platejs15 = require("platejs");
var indentList = (editor, { listStyleType = "disc" /* Disc */, ...options } = {}) => {
  (0, import_indent.setIndent)(editor, {
    offset: 1,
    setNodesProps: () => ({
      [import_platejs15.KEYS.listType]: listStyleType
    }),
    ...options
  });
};
var indentTodo = (editor, { listStyleType = "disc" /* Disc */, ...options } = {}) => {
  (0, import_indent.setIndent)(editor, {
    offset: 1,
    setNodesProps: () => ({
      [import_platejs15.KEYS.listChecked]: false,
      [import_platejs15.KEYS.listType]: listStyleType
    }),
    ...options
  });
};

// src/lib/transforms/outdentList.ts
var import_indent2 = require("@platejs/indent");
var import_platejs16 = require("platejs");
var outdentList = (editor, options = {}) => {
  (0, import_indent2.setIndent)(editor, {
    offset: -1,
    unsetNodesProps: [import_platejs16.KEYS.listType, import_platejs16.KEYS.listChecked],
    ...options
  });
};

// src/lib/transforms/setListNode.ts
var import_platejs17 = require("platejs");
var setListNode = (editor, {
  at,
  indent = 0,
  listStyleType = "disc" /* Disc */
}) => {
  const newIndent = indent || indent + 1;
  editor.tf.setNodes(
    {
      [import_platejs17.KEYS.indent]: newIndent,
      [import_platejs17.KEYS.listType]: listStyleType
    },
    { at }
  );
};
var setIndentTodoNode = (editor, {
  at,
  indent = 0,
  listStyleType = import_platejs17.KEYS.listTodo
}) => {
  const newIndent = indent || indent + 1;
  editor.tf.setNodes(
    {
      [import_platejs17.KEYS.indent]: newIndent,
      [import_platejs17.KEYS.listChecked]: false,
      [import_platejs17.KEYS.listType]: listStyleType
    },
    { at }
  );
};

// src/lib/transforms/setListNodes.ts
var import_platejs18 = require("platejs");
var setListNodes = (editor, entries, {
  listStyleType = "disc" /* Disc */
}) => {
  editor.tf.withoutNormalizing(() => {
    entries.forEach((entry) => {
      const [node, path] = entry;
      let indent = node[import_platejs18.KEYS.indent] ?? 0;
      indent = node[import_platejs18.KEYS.listType] || node.hasOwnProperty(import_platejs18.KEYS.listChecked) ? indent : indent + 1;
      if (listStyleType === "todo") {
        editor.tf.unsetNodes(import_platejs18.KEYS.listType, { at: path });
        setIndentTodoNode(editor, {
          at: path,
          indent,
          listStyleType
        });
        return;
      }
      editor.tf.unsetNodes(import_platejs18.KEYS.listChecked, { at: path });
      setListNode(editor, {
        at: path,
        indent,
        listStyleType
      });
    });
  });
};

// src/lib/transforms/setListSiblingNodes.ts
var import_platejs19 = require("platejs");
var setListSiblingNodes = (editor, entry, {
  getSiblingListOptions,
  listStyleType = "disc" /* Disc */
}) => {
  editor.tf.withoutNormalizing(() => {
    const siblings = getListSiblings(editor, entry, getSiblingListOptions);
    siblings.forEach(([node, path]) => {
      if (listStyleType === import_platejs19.KEYS.listTodo) {
        editor.tf.unsetNodes(import_platejs19.KEYS.listType, { at: path });
        setIndentTodoNode(editor, {
          at: path,
          indent: node[import_platejs19.KEYS.indent],
          listStyleType
        });
      } else {
        editor.tf.unsetNodes(import_platejs19.KEYS.listChecked, { at: path });
        setListNode(editor, {
          at: path,
          indent: node[import_platejs19.KEYS.indent],
          listStyleType
        });
      }
    });
  });
};

// src/lib/transforms/toggleList.ts
var import_platejs22 = require("platejs");

// src/lib/transforms/toggleListSet.ts
var import_platejs20 = require("platejs");
var toggleListSet = (editor, [node, _path], { listStyleType = "disc" /* Disc */, ...options }) => {
  if (node.hasOwnProperty(import_platejs20.KEYS.listChecked) || node[import_platejs20.KEYS.listType]) return;
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
var import_platejs21 = require("platejs");
var toggleListUnset = (editor, [node, path], {
  listStyleType = "disc" /* Disc */
}) => {
  if (listStyleType === import_platejs21.KEYS.listTodo && node.hasOwnProperty(import_platejs21.KEYS.listChecked)) {
    editor.tf.unsetNodes(import_platejs21.KEYS.listChecked, { at: path });
    outdentList(editor, { listStyleType });
    return true;
  }
  if (listStyleType === node[import_platejs21.KEYS.listType]) {
    editor.tf.unsetNodes([import_platejs21.KEYS.listType], {
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
      const match = (0, import_platejs22.getInjectMatch)(
        editor,
        editor.getPlugin({ key: import_platejs22.KEYS.list })
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
            const indent = node[import_platejs22.KEYS.indent];
            editor.tf.unsetNodes(import_platejs22.KEYS.listType, { at: path });
            if (indent > 1) {
              editor.tf.setNodes({ [import_platejs22.KEYS.indent]: indent - 1 }, { at: path });
            } else {
              editor.tf.unsetNodes([import_platejs22.KEYS.indent, import_platejs22.KEYS.listChecked], {
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
    const prop = isRestart ? import_platejs22.KEYS.listRestart : import_platejs22.KEYS.listRestartPolite;
    editor.tf.setNodes({ [prop]: restartValue }, { at: entry[1] });
  }
};

// src/lib/transforms/toggleListByPath.ts
var import_platejs23 = require("platejs");
var toggleListByPath = (editor, [node, path], listStyleType) => {
  editor.tf.setNodes(
    {
      [import_platejs23.KEYS.indent]: node.indent ?? 1,
      // TODO: normalized if not todo remove this property.
      [import_platejs23.KEYS.listChecked]: false,
      [import_platejs23.KEYS.listType]: listStyleType,
      type: import_platejs23.KEYS.p
    },
    {
      at: path
    }
  );
};
var toggleListByPathUnSet = (editor, [, path]) => editor.tf.unsetNodes([import_platejs23.KEYS.listType, import_platejs23.KEYS.indent, import_platejs23.KEYS.listChecked], {
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
        if (editor.api.block(options)?.[0]?.[import_platejs24.KEYS.listType]) {
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
          const listStyleType = operation.node[import_platejs24.KEYS.listType];
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
              const prevListStyleType = prevNodeEntry[0][import_platejs24.KEYS.listType];
              if (prevListStyleType === "lower-alpha" /* LowerAlpha */ && listStyleType === "lower-roman" /* LowerRoman */) {
                operation.node[import_platejs24.KEYS.listType] = "lower-alpha" /* LowerAlpha */;
              } else if (prevListStyleType === "upper-alpha" /* UpperAlpha */ && listStyleType === "upper-roman" /* UpperRoman */) {
                operation.node[import_platejs24.KEYS.listType] = "upper-alpha" /* UpperAlpha */;
              }
            }
          }
        }
        if (operation.type === "split_node" && operation.properties[import_platejs24.KEYS.listType]) {
          operation.properties[import_platejs24.KEYS.listRestart] = void 0;
          operation.properties[import_platejs24.KEYS.listRestartPolite] = void 0;
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
            affectedPaths.push(import_platejs24.PathApi.previous(operation.path));
            break;
          }
          case "move_node": {
            affectedPaths.push(operation.path, operation.newPath);
            break;
          }
          case "split_node": {
            affectedPaths.push(operation.path, import_platejs24.PathApi.next(operation.path));
            break;
          }
        }
        const isListItem = (node) => import_platejs24.KEYS.listType in node;
        affectedPaths.forEach((affectedPath) => {
          let entry = editor.api.node(affectedPath);
          if (!entry) return;
          if (!isListItem(entry[0])) {
            entry = editor.api.node(import_platejs24.PathApi.next(affectedPath));
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
var BaseListPlugin = (0, import_platejs25.createTSlatePlugin)({
  key: import_platejs25.KEYS.list,
  inject: {
    plugins: {
      [import_platejs25.KEYS.html]: {
        parser: {
          transformData: ({ data }) => {
            const document = new DOMParser().parseFromString(data, "text/html");
            const { body } = document;
            const lisWithNestedLists = [];
            (0, import_platejs25.traverseHtmlElements)(body, (element) => {
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
            (0, import_platejs25.traverseHtmlElements)(body, (element) => {
              if (element.tagName === "LI") {
                const htmlElement = element;
                const { childNodes } = element;
                const liChildren = [];
                childNodes.forEach((child) => {
                  if (child.nodeType === Node.ELEMENT_NODE) {
                    const childElement = child;
                    if ((0, import_platejs25.isHtmlBlockElement)(childElement)) {
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
            return (0, import_platejs25.postCleanHtml)(body.innerHTML);
          }
        }
      }
    },
    targetPlugins: [import_platejs25.KEYS.p]
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
            type: editor.getType(import_platejs25.KEYS.p)
          };
        }
      }
    }
  },
  render: {
    belowNodes: (props) => {
      if (!props.element.listStyleType) return;
      return (props2) => /* @__PURE__ */ import_react.default.createElement(List, { ...props2 });
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
      return (0, import_platejs25.isDefined)(node[import_platejs25.KEYS.listType]);
    }
  }
}).overrideEditor(withList);
function List(props) {
  const { listStart, listStyleType } = props.element;
  const List2 = isOrderedList(props.element) ? "ol" : "ul";
  return /* @__PURE__ */ import_react.default.createElement(
    List2,
    {
      style: { listStyleType, margin: 0, padding: 0, position: "relative" },
      start: listStart
    },
    /* @__PURE__ */ import_react.default.createElement("li", null, props.children)
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.js.map