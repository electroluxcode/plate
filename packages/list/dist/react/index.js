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
  ListPlugin: () => ListPlugin,
  useIndentTodoToolBarButton: () => useIndentTodoToolBarButton,
  useIndentTodoToolBarButtonState: () => useIndentTodoToolBarButtonState,
  useListToolbarButton: () => useListToolbarButton,
  useListToolbarButtonState: () => useListToolbarButtonState,
  useTodoListElement: () => useTodoListElement,
  useTodoListElementState: () => useTodoListElementState
});
module.exports = __toCommonJS(react_exports);

// src/react/ListPlugin.tsx
var import_react2 = require("platejs/react");

// src/lib/BaseListPlugin.tsx
var import_react = __toESM(require("react"));
var import_platejs21 = require("platejs");

// src/lib/queries/areEqListStyleType.ts
var import_platejs = require("platejs");

// src/lib/types.ts
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

// src/lib/queries/getListAbove.ts
var import_platejs2 = require("platejs");
var getListAbove = (editor, options) => {
  return editor.api.above({
    ...options,
    match: (node) => (0, import_platejs2.isDefined)(node[import_platejs2.KEYS.listType])
  });
};

// src/lib/queries/getListSiblings.ts
var import_platejs6 = require("platejs");

// src/lib/queries/getNextList.ts
var import_platejs4 = require("platejs");

// src/lib/queries/getSiblingList.ts
var import_platejs3 = require("platejs");
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
    const indent = node[import_platejs3.KEYS.indent];
    const nextIndent = nextNode[import_platejs3.KEYS.indent];
    if (breakQuery?.(nextNode, node)) return;
    if (!(0, import_platejs3.isDefined)(nextIndent)) return;
    if (breakOnListRestart) {
      if (getPreviousEntry && node[import_platejs3.KEYS.listRestart]) {
        return;
      }
      if (getNextEntry && nextNode[import_platejs3.KEYS.listRestart]) {
        return;
      }
    }
    if (breakOnLowerIndent && nextIndent < indent) return;
    if (breakOnEqIndentNeqListStyleType && nextIndent === indent && nextNode[import_platejs3.KEYS.listType] !== node[import_platejs3.KEYS.listType])
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
      const nextPath = import_platejs4.PathApi.next(currPath);
      const nextNode = import_platejs4.NodeApi.get(editor, nextPath);
      if (!nextNode) return;
      return [nextNode, nextPath];
    },
    ...options,
    getPreviousEntry: void 0
  });
};

// src/lib/queries/getPreviousList.ts
var import_platejs5 = require("platejs");
var getPreviousList = (editor, entry, options) => {
  return getSiblingList(editor, entry, {
    getPreviousEntry: ([, currPath]) => {
      const prevPath = import_platejs5.PathApi.previous(currPath);
      if (!prevPath) return;
      const prevNode = import_platejs5.NodeApi.get(editor, prevPath);
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
  if (!node[import_platejs6.KEYS.listType] && !node.hasOwnProperty(import_platejs6.KEYS.listChecked)) {
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

// src/lib/queries/isOrderedList.ts
function isOrderedList(element) {
  return !!element.listStyleType && !ULIST_STYLE_TYPES.includes(element.listStyleType);
}

// src/lib/queries/someList.ts
var import_platejs7 = require("platejs");
var someList = (editor, type) => {
  return !!editor.selection && editor.api.some({
    match: (n) => {
      const isHasProperty = n.hasOwnProperty(import_platejs7.KEYS.listChecked);
      if (isHasProperty) {
        return false;
      }
      const list = n[import_platejs7.KEYS.listType];
      return Array.isArray(type) ? type.includes(list) : list === type;
    }
  });
};

// src/lib/queries/someTodoList.ts
var import_platejs8 = require("platejs");
var someTodoList = (editor) => {
  return editor.api.some({
    at: editor.selection,
    match: (n) => {
      const list = n[import_platejs8.KEYS.listType];
      const isHasProperty = n.hasOwnProperty(import_platejs8.KEYS.listChecked);
      return n.type === "p" && isHasProperty && list === import_platejs8.KEYS.listTodo;
    }
  });
};

// src/lib/withList.ts
var import_platejs20 = require("platejs");

// src/lib/normalizers/normalizeListNotIndented.ts
var import_platejs9 = require("platejs");
var normalizeListNotIndented = (editor, [node, path]) => {
  if (!(0, import_platejs9.isDefined)(node[import_platejs9.KEYS.indent]) && (node[import_platejs9.KEYS.listType] || node[import_platejs9.KEYS.listStart])) {
    editor.tf.unsetNodes([import_platejs9.KEYS.listType, import_platejs9.KEYS.listStart], {
      at: path
    });
    return true;
  }
};

// src/lib/normalizers/normalizeListStart.ts
var import_platejs10 = require("platejs");
var getListExpectedListStart = (entry, prevEntry) => {
  const [node] = entry;
  const [prevNode] = prevEntry ?? [null];
  const restart = node[import_platejs10.KEYS.listRestart] ?? null;
  const restartPolite = node[import_platejs10.KEYS.listRestartPolite] ?? null;
  if (restart) {
    return restart;
  }
  if (restartPolite && !prevNode) {
    return restartPolite;
  }
  if (prevNode) {
    const prevListStart = prevNode[import_platejs10.KEYS.listStart] ?? 1;
    return prevListStart + 1;
  }
  return 1;
};
var normalizeListStart = (editor, entry, options) => {
  return editor.tf.withoutNormalizing(() => {
    const [node, path] = entry;
    const listStyleType = node[import_platejs10.KEYS.listType];
    const listStart = node[import_platejs10.KEYS.listStart];
    if (!listStyleType) return;
    const prevEntry = getPreviousList(editor, entry, options);
    const expectedListStart = getListExpectedListStart(entry, prevEntry);
    if ((0, import_platejs10.isDefined)(listStart) && expectedListStart === 1) {
      editor.tf.unsetNodes(import_platejs10.KEYS.listStart, { at: path });
      return true;
    }
    if (listStart !== expectedListStart && expectedListStart > 1) {
      editor.tf.setNodes({ [import_platejs10.KEYS.listStart]: expectedListStart }, { at: path });
      return true;
    }
    return false;
  });
};

// src/lib/normalizers/withInsertBreakList.ts
var import_platejs11 = require("platejs");
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
        if (!(0, import_platejs11.isDefined)(node[import_platejs11.KEYS.listType]) || node[import_platejs11.KEYS.listType] !== import_platejs11.KEYS.listTodo || editor.api.isExpanded() || !editor.api.isEnd(editor.selection?.focus, path)) {
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
var import_platejs12 = require("platejs");
var indentList = (editor, { listStyleType = "disc" /* Disc */, ...options } = {}) => {
  (0, import_indent.setIndent)(editor, {
    offset: 1,
    setNodesProps: () => ({
      [import_platejs12.KEYS.listType]: listStyleType
    }),
    ...options
  });
};
var indentTodo = (editor, { listStyleType = "disc" /* Disc */, ...options } = {}) => {
  (0, import_indent.setIndent)(editor, {
    offset: 1,
    setNodesProps: () => ({
      [import_platejs12.KEYS.listChecked]: false,
      [import_platejs12.KEYS.listType]: listStyleType
    }),
    ...options
  });
};

// src/lib/transforms/outdentList.ts
var import_indent2 = require("@platejs/indent");
var import_platejs13 = require("platejs");
var outdentList = (editor, options = {}) => {
  (0, import_indent2.setIndent)(editor, {
    offset: -1,
    unsetNodesProps: [import_platejs13.KEYS.listType, import_platejs13.KEYS.listChecked],
    ...options
  });
};

// src/lib/transforms/setListNode.ts
var import_platejs14 = require("platejs");
var setListNode = (editor, {
  at,
  indent = 0,
  listStyleType = "disc" /* Disc */
}) => {
  const newIndent = indent || indent + 1;
  editor.tf.setNodes(
    {
      [import_platejs14.KEYS.indent]: newIndent,
      [import_platejs14.KEYS.listType]: listStyleType
    },
    { at }
  );
};
var setIndentTodoNode = (editor, {
  at,
  indent = 0,
  listStyleType = import_platejs14.KEYS.listTodo
}) => {
  const newIndent = indent || indent + 1;
  editor.tf.setNodes(
    {
      [import_platejs14.KEYS.indent]: newIndent,
      [import_platejs14.KEYS.listChecked]: false,
      [import_platejs14.KEYS.listType]: listStyleType
    },
    { at }
  );
};

// src/lib/transforms/setListNodes.ts
var import_platejs15 = require("platejs");
var setListNodes = (editor, entries, {
  listStyleType = "disc" /* Disc */
}) => {
  editor.tf.withoutNormalizing(() => {
    entries.forEach((entry) => {
      const [node, path] = entry;
      let indent = node[import_platejs15.KEYS.indent] ?? 0;
      indent = node[import_platejs15.KEYS.listType] || node.hasOwnProperty(import_platejs15.KEYS.listChecked) ? indent : indent + 1;
      if (listStyleType === "todo") {
        editor.tf.unsetNodes(import_platejs15.KEYS.listType, { at: path });
        setIndentTodoNode(editor, {
          at: path,
          indent,
          listStyleType
        });
        return;
      }
      editor.tf.unsetNodes(import_platejs15.KEYS.listChecked, { at: path });
      setListNode(editor, {
        at: path,
        indent,
        listStyleType
      });
    });
  });
};

// src/lib/transforms/setListSiblingNodes.ts
var import_platejs16 = require("platejs");
var setListSiblingNodes = (editor, entry, {
  getSiblingListOptions,
  listStyleType = "disc" /* Disc */
}) => {
  editor.tf.withoutNormalizing(() => {
    const siblings = getListSiblings(editor, entry, getSiblingListOptions);
    siblings.forEach(([node, path]) => {
      if (listStyleType === import_platejs16.KEYS.listTodo) {
        editor.tf.unsetNodes(import_platejs16.KEYS.listType, { at: path });
        setIndentTodoNode(editor, {
          at: path,
          indent: node[import_platejs16.KEYS.indent],
          listStyleType
        });
      } else {
        editor.tf.unsetNodes(import_platejs16.KEYS.listChecked, { at: path });
        setListNode(editor, {
          at: path,
          indent: node[import_platejs16.KEYS.indent],
          listStyleType
        });
      }
    });
  });
};

// src/lib/transforms/toggleList.ts
var import_platejs19 = require("platejs");

// src/lib/transforms/toggleListSet.ts
var import_platejs17 = require("platejs");
var toggleListSet = (editor, [node, _path], { listStyleType = "disc" /* Disc */, ...options }) => {
  if (node.hasOwnProperty(import_platejs17.KEYS.listChecked) || node[import_platejs17.KEYS.listType]) return;
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
var import_platejs18 = require("platejs");
var toggleListUnset = (editor, [node, path], {
  listStyleType = "disc" /* Disc */
}) => {
  if (listStyleType === import_platejs18.KEYS.listTodo && node.hasOwnProperty(import_platejs18.KEYS.listChecked)) {
    editor.tf.unsetNodes(import_platejs18.KEYS.listChecked, { at: path });
    outdentList(editor, { listStyleType });
    return true;
  }
  if (listStyleType === node[import_platejs18.KEYS.listType]) {
    editor.tf.unsetNodes([import_platejs18.KEYS.listType], {
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
      const match = (0, import_platejs19.getInjectMatch)(
        editor,
        editor.getPlugin({ key: import_platejs19.KEYS.list })
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
            const indent = node[import_platejs19.KEYS.indent];
            editor.tf.unsetNodes(import_platejs19.KEYS.listType, { at: path });
            if (indent > 1) {
              editor.tf.setNodes({ [import_platejs19.KEYS.indent]: indent - 1 }, { at: path });
            } else {
              editor.tf.unsetNodes([import_platejs19.KEYS.indent, import_platejs19.KEYS.listChecked], {
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
    const prop = isRestart ? import_platejs19.KEYS.listRestart : import_platejs19.KEYS.listRestartPolite;
    editor.tf.setNodes({ [prop]: restartValue }, { at: entry[1] });
  }
};

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
        if (editor.api.block(options)?.[0]?.[import_platejs20.KEYS.listType]) {
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
          const listStyleType = operation.node[import_platejs20.KEYS.listType];
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
              const prevListStyleType = prevNodeEntry[0][import_platejs20.KEYS.listType];
              if (prevListStyleType === "lower-alpha" /* LowerAlpha */ && listStyleType === "lower-roman" /* LowerRoman */) {
                operation.node[import_platejs20.KEYS.listType] = "lower-alpha" /* LowerAlpha */;
              } else if (prevListStyleType === "upper-alpha" /* UpperAlpha */ && listStyleType === "upper-roman" /* UpperRoman */) {
                operation.node[import_platejs20.KEYS.listType] = "upper-alpha" /* UpperAlpha */;
              }
            }
          }
        }
        if (operation.type === "split_node" && operation.properties[import_platejs20.KEYS.listType]) {
          operation.properties[import_platejs20.KEYS.listRestart] = void 0;
          operation.properties[import_platejs20.KEYS.listRestartPolite] = void 0;
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
            affectedPaths.push(import_platejs20.PathApi.previous(operation.path));
            break;
          }
          case "move_node": {
            affectedPaths.push(operation.path, operation.newPath);
            break;
          }
          case "split_node": {
            affectedPaths.push(operation.path, import_platejs20.PathApi.next(operation.path));
            break;
          }
        }
        const isListItem = (node) => import_platejs20.KEYS.listType in node;
        affectedPaths.forEach((affectedPath) => {
          let entry = editor.api.node(affectedPath);
          if (!entry) return;
          if (!isListItem(entry[0])) {
            entry = editor.api.node(import_platejs20.PathApi.next(affectedPath));
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
var BaseListPlugin = (0, import_platejs21.createTSlatePlugin)({
  key: import_platejs21.KEYS.list,
  inject: {
    plugins: {
      [import_platejs21.KEYS.html]: {
        parser: {
          transformData: ({ data }) => {
            const document = new DOMParser().parseFromString(data, "text/html");
            const { body } = document;
            const lisWithNestedLists = [];
            (0, import_platejs21.traverseHtmlElements)(body, (element) => {
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
            (0, import_platejs21.traverseHtmlElements)(body, (element) => {
              if (element.tagName === "LI") {
                const htmlElement = element;
                const { childNodes } = element;
                const liChildren = [];
                childNodes.forEach((child) => {
                  if (child.nodeType === Node.ELEMENT_NODE) {
                    const childElement = child;
                    if ((0, import_platejs21.isHtmlBlockElement)(childElement)) {
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
            return (0, import_platejs21.postCleanHtml)(body.innerHTML);
          }
        }
      }
    },
    targetPlugins: [import_platejs21.KEYS.p]
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
            type: editor.getType(import_platejs21.KEYS.p)
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
      return (0, import_platejs21.isDefined)(node[import_platejs21.KEYS.listType]);
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

// src/react/ListPlugin.tsx
var ListPlugin = (0, import_react2.toPlatePlugin)(BaseListPlugin);

// src/react/hooks/useListToolbarButton.ts
var import_react3 = require("platejs/react");
var useListToolbarButtonState = ({
  nodeType = "disc" /* Disc */
} = {}) => {
  const pressed = (0, import_react3.useEditorSelector)(
    (editor) => someList(editor, nodeType),
    [nodeType]
  );
  return {
    nodeType,
    pressed
  };
};
var useListToolbarButton = ({
  nodeType,
  pressed
}) => {
  const editor = (0, import_react3.useEditorRef)();
  return {
    props: {
      pressed,
      onClick: () => {
        toggleList(editor, {
          listStyleType: nodeType
        });
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};

// src/react/hooks/useTodoListElement.ts
var import_react4 = require("platejs/react");
var useTodoListElementState = ({ element }) => {
  const editor = (0, import_react4.useEditorRef)();
  const { checked } = element;
  const readOnly = (0, import_react4.useReadOnly)();
  return {
    checked,
    editor,
    element,
    readOnly
  };
};
var useTodoListElement = (state) => {
  const { checked, editor, element, readOnly } = state;
  return {
    checkboxProps: {
      checked: !!checked,
      onCheckedChange: (value) => {
        if (readOnly) return;
        const path = editor.api.findPath(element);
        if (!path) return;
        editor.tf.setNodes({ checked: value }, { at: path });
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};

// src/react/hooks/useTodoListToolbarButton.ts
var import_react5 = require("platejs/react");
var useIndentTodoToolBarButtonState = ({
  nodeType = "disc" /* Disc */
} = {}) => {
  const pressed = (0, import_react5.useEditorSelector)(
    (editor) => someTodoList(editor),
    [nodeType]
  );
  return {
    nodeType,
    pressed
  };
};
var useIndentTodoToolBarButton = ({
  nodeType,
  pressed
}) => {
  const editor = (0, import_react5.useEditorRef)();
  return {
    props: {
      pressed,
      onClick: () => {
        toggleList(editor, {
          listStyleType: nodeType
        });
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListPlugin,
  useIndentTodoToolBarButton,
  useIndentTodoToolBarButtonState,
  useListToolbarButton,
  useListToolbarButtonState,
  useTodoListElement,
  useTodoListElementState
});
//# sourceMappingURL=index.js.map