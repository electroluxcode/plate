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
  BaseSuggestionPlugin: () => BaseSuggestionPlugin,
  acceptSuggestion: () => acceptSuggestion,
  addMarkSuggestion: () => addMarkSuggestion,
  deleteFragmentSuggestion: () => deleteFragmentSuggestion,
  deleteSuggestion: () => deleteSuggestion,
  diffToSuggestions: () => diffToSuggestions,
  findInlineSuggestionNode: () => findInlineSuggestionNode,
  findSuggestionProps: () => findSuggestionProps,
  getActiveSuggestionDescriptions: () => getActiveSuggestionDescriptions,
  getInlineSuggestionData: () => getInlineSuggestionData,
  getSuggestionKey: () => getSuggestionKey,
  getSuggestionKeyId: () => getSuggestionKeyId,
  getSuggestionKeys: () => getSuggestionKeys,
  getSuggestionNodeEntries: () => getSuggestionNodeEntries,
  getSuggestionProps: () => getSuggestionProps,
  getSuggestionUserId: () => getSuggestionUserId,
  getSuggestionUserIdByKey: () => getSuggestionUserIdByKey,
  getSuggestionUserIds: () => getSuggestionUserIds,
  insertFragmentSuggestion: () => insertFragmentSuggestion,
  insertTextSuggestion: () => insertTextSuggestion,
  isCurrentUserSuggestion: () => isCurrentUserSuggestion,
  isSuggestionKey: () => isSuggestionKey,
  keyId2SuggestionId: () => keyId2SuggestionId,
  rejectSuggestion: () => rejectSuggestion,
  removeMarkSuggestion: () => removeMarkSuggestion,
  removeNodesSuggestion: () => removeNodesSuggestion,
  setSuggestionNodes: () => setSuggestionNodes,
  withSuggestion: () => withSuggestion
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseSuggestionPlugin.ts
var import_platejs13 = require("platejs");

// src/lib/utils/getSuggestionKeys.ts
var import_platejs2 = require("platejs");

// src/lib/utils/getSuggestionId.ts
var import_platejs = require("platejs");
var getSuggestionKeyId = (node) => {
  const ids = Object.keys(node).filter((key) => {
    return key.startsWith(`${import_platejs.KEYS.suggestion}_`);
  });
  return ids.at(-1);
};
var getInlineSuggestionData = (node) => {
  const keyId = getSuggestionKeyId(node);
  if (!keyId) return;
  return node[keyId];
};
var keyId2SuggestionId = (keyId) => {
  return keyId.replace(`${import_platejs.KEYS.suggestion}_`, "");
};

// src/lib/utils/getSuggestionKeys.ts
var getSuggestionKey = (id = "0") => `${import_platejs2.KEYS.suggestion}_${id}`;
var isSuggestionKey = (key) => key.startsWith(`${import_platejs2.KEYS.suggestion}_`);
var getSuggestionKeys = (node) => {
  const keys = [];
  Object.keys(node).forEach((key) => {
    if (isSuggestionKey(key)) keys.push(key);
  });
  return keys;
};
var getSuggestionUserIdByKey = (key) => (0, import_platejs2.isDefined)(key) ? key.split(`${import_platejs2.KEYS.suggestion}_`)[1] : null;
var getSuggestionUserIds = (node) => {
  return getSuggestionKeys(node).map(
    (key) => getSuggestionUserIdByKey(key)
  );
};
var getSuggestionUserId = (node) => {
  return getSuggestionUserIds(node)[0];
};
var isCurrentUserSuggestion = (editor, node) => {
  const { currentUserId } = editor.getOptions(BaseSuggestionPlugin);
  return getInlineSuggestionData(node)?.userId === currentUserId;
};

// src/lib/utils/getSuggestionNodeEntries.ts
var import_platejs3 = require("platejs");
var getSuggestionNodeEntries = (editor, suggestionId, { at = [], ...options } = {}) => editor.api.nodes({
  at,
  ...options,
  match: (0, import_platejs3.combineMatchOptions)(
    editor,
    (n) => n.suggestionId === suggestionId,
    options
  )
});

// src/lib/utils/getActiveSuggestionDescriptions.ts
var getActiveSuggestionDescriptions = (editor) => {
  const aboveEntry = editor.getApi(BaseSuggestionPlugin).suggestion.node({
    isText: true
  });
  if (!aboveEntry) return [];
  const aboveNode = aboveEntry[0];
  const suggestionId = editor.getApi(BaseSuggestionPlugin).suggestion.nodeId(aboveNode);
  if (!suggestionId) return [];
  const userIds = getSuggestionUserIds(aboveNode);
  return userIds.map((userId) => {
    const nodes = Array.from(
      getSuggestionNodeEntries(editor, suggestionId, {
        match: (n) => n[getSuggestionKey(userId)]
      })
    ).map(([node]) => node);
    const insertions = nodes.filter((node) => !node.suggestionDeletion);
    const deletions = nodes.filter((node) => node.suggestionDeletion);
    const insertedText = insertions.map((node) => node.text).join("");
    const deletedText = deletions.map((node) => node.text).join("");
    if (insertions.length > 0 && deletions.length > 0) {
      return {
        deletedText,
        insertedText,
        suggestionId,
        type: "replacement",
        userId
      };
    }
    if (deletions.length > 0) {
      return {
        deletedText,
        suggestionId,
        type: "deletion",
        userId
      };
    }
    return {
      insertedText,
      suggestionId,
      type: "insertion",
      userId
    };
  });
};

// src/lib/withSuggestion.ts
var import_platejs12 = require("platejs");

// src/lib/queries/findSuggestionNode.ts
var import_platejs4 = require("platejs");
var findInlineSuggestionNode = (editor, options = {}) => editor.api.node({
  ...options,
  match: (0, import_platejs4.combineMatchOptions)(
    editor,
    (n) => import_platejs4.TextApi.isText(n) && n[import_platejs4.KEYS.suggestion],
    options
  )
});

// src/lib/queries/findSuggestionProps.ts
var import_platejs5 = require("platejs");
var findSuggestionProps = (editor, { at, type }) => {
  const defaultProps = {
    id: (0, import_platejs5.nanoid)(),
    createdAt: Date.now()
  };
  const api = editor.getApi(BaseSuggestionPlugin);
  let entry = api.suggestion.node({
    at,
    isText: true
  });
  if (!entry) {
    let start;
    let end;
    try {
      [start, end] = editor.api.edges(at);
    } catch {
      return defaultProps;
    }
    const nextPoint = editor.api.after(end);
    if (nextPoint) {
      entry = api.suggestion.node({
        at: nextPoint,
        isText: true
      });
      if (!entry) {
        const prevPoint = editor.api.before(start);
        if (prevPoint) {
          entry = api.suggestion.node({
            at: prevPoint,
            isText: true
          });
        }
        if (!entry && editor.api.isStart(start, at)) {
          const _at = prevPoint ?? at;
          const lineBreak = editor.api.above({ at: _at });
          const lineBreakData = lineBreak?.[0].suggestion;
          if (lineBreakData?.isLineBreak) {
            return {
              id: lineBreakData?.id ?? (0, import_platejs5.nanoid)(),
              createdAt: lineBreakData?.createdAt ?? Date.now()
            };
          }
        }
      }
    }
  }
  if (entry && getInlineSuggestionData(entry[0])?.type === type && isCurrentUserSuggestion(editor, entry[0])) {
    return {
      id: api.suggestion.nodeId(entry[0]) ?? (0, import_platejs5.nanoid)(),
      createdAt: getInlineSuggestionData(entry[0])?.createdAt ?? Date.now()
    };
  }
  return defaultProps;
};

// src/lib/transforms/addMarkSuggestion.ts
var import_platejs6 = require("platejs");
var getAddMarkProps = () => {
  const defaultProps = {
    id: (0, import_platejs6.nanoid)(),
    createdAt: Date.now()
  };
  return defaultProps;
};
var addMarkSuggestion = (editor, key, value) => {
  editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
    const { id, createdAt } = getAddMarkProps();
    const match = (n) => {
      if (!import_platejs6.TextApi.isText(n)) return false;
      if (n[import_platejs6.KEYS.suggestion]) {
        const data = getInlineSuggestionData(n);
        if (data?.type === "update") {
          return true;
        }
        return false;
      }
      return true;
    };
    editor.tf.setNodes(
      {
        [key]: value,
        [getSuggestionKey(id)]: {
          id,
          createdAt,
          newProperties: {
            [key]: value
          },
          type: "update",
          userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
        },
        [import_platejs6.KEYS.suggestion]: true
      },
      {
        match,
        split: true
      }
    );
  });
};

// src/lib/transforms/deleteSuggestion.ts
var import_platejs8 = require("platejs");

// src/lib/transforms/setSuggestionNodes.ts
var import_platejs7 = require("platejs");
var setSuggestionNodes = (editor, options) => {
  const at = (0, import_platejs7.getAt)(editor, options?.at) ?? editor.selection;
  if (!at) return;
  const { suggestionId = (0, import_platejs7.nanoid)() } = options ?? {};
  const _nodeEntries = editor.api.nodes({
    match: (n) => import_platejs7.ElementApi.isElement(n) && editor.api.isInline(n),
    ...options
  });
  const nodeEntries = [..._nodeEntries];
  editor.tf.withoutNormalizing(() => {
    const data = {
      id: suggestionId,
      createdAt: options?.createdAt ?? Date.now(),
      type: "remove",
      userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
    };
    const props = {
      [getSuggestionKey(suggestionId)]: data,
      [import_platejs7.KEYS.suggestion]: true
    };
    editor.tf.setNodes(props, {
      at,
      marks: true
    });
    nodeEntries.forEach(([, path]) => {
      editor.tf.setNodes(props, {
        at: path,
        match: (n) => import_platejs7.ElementApi.isElement(n) && editor.api.isInline(n),
        ...options
      });
    });
  });
};

// src/lib/transforms/deleteSuggestion.ts
var deleteSuggestion = (editor, at, {
  reverse
} = {}) => {
  let resId;
  editor.tf.withoutNormalizing(() => {
    const { anchor: from, focus: to } = at;
    const { id, createdAt } = findSuggestionProps(editor, {
      at: from,
      type: "remove"
    });
    resId = id;
    const toRef = editor.api.pointRef(to);
    let pointCurrent;
    while (true) {
      pointCurrent = editor.selection?.anchor;
      if (!pointCurrent) break;
      const pointTarget = toRef.current;
      if (!pointTarget) break;
      if (!editor.api.isAt({
        at: { anchor: pointCurrent, focus: pointTarget },
        blocks: true
      })) {
        const str = editor.api.string(
          reverse ? {
            anchor: pointTarget,
            focus: pointCurrent
          } : {
            anchor: pointCurrent,
            focus: pointTarget
          }
        );
        if (str.length === 0) break;
      }
      const getPoint = reverse ? editor.api.before : editor.api.after;
      const pointNext = getPoint(pointCurrent, {
        unit: "character"
      });
      if (!pointNext) break;
      let range = reverse ? {
        anchor: pointNext,
        focus: pointCurrent
      } : {
        anchor: pointCurrent,
        focus: pointNext
      };
      range = editor.api.unhangRange(range, { character: true });
      const entryBlock = editor.api.node({
        at: pointCurrent,
        block: true,
        match: (n) => n[import_platejs8.KEYS.suggestion] && import_platejs8.TextApi.isText(n) && getInlineSuggestionData(n)?.type === "insert" && isCurrentUserSuggestion(editor, n)
      });
      if (entryBlock && editor.api.isStart(pointCurrent, entryBlock[1]) && editor.api.isEmpty(entryBlock[0])) {
        editor.tf.removeNodes({
          at: entryBlock[1]
        });
        continue;
      }
      if (editor.api.isAt({ at: range, blocks: true })) {
        const previousAboveNode = editor.api.above({ at: range.anchor });
        if (previousAboveNode && import_platejs8.ElementApi.isElement(previousAboveNode[0])) {
          const isBlockSuggestion = editor.getApi(BaseSuggestionPlugin).suggestion.isBlockSuggestion(previousAboveNode[0]);
          if (isBlockSuggestion) {
            const node = previousAboveNode[0];
            if (node.suggestion.type === "insert") {
              editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
                editor.tf.unsetNodes([import_platejs8.KEYS.suggestion], {
                  at: previousAboveNode[1]
                });
                editor.tf.mergeNodes({
                  at: import_platejs8.PathApi.next(previousAboveNode[1])
                });
              });
            }
            if (node.suggestion.type === "remove") {
              editor.tf.move({
                reverse,
                unit: "character"
              });
            }
            break;
          }
          if (!isBlockSuggestion) {
            editor.tf.setNodes(
              {
                [import_platejs8.KEYS.suggestion]: {
                  id,
                  createdAt,
                  type: "remove",
                  userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
                }
              },
              { at: previousAboveNode[1] }
            );
            editor.tf.move({
              reverse,
              unit: "character"
            });
            break;
          }
        }
        break;
      }
      if (import_platejs8.PointApi.equals(pointCurrent, editor.selection.anchor)) {
        editor.tf.move({
          reverse,
          unit: "character"
        });
      }
      const entryText = editor.getApi(BaseSuggestionPlugin).suggestion.node({
        at: range,
        isText: true,
        match: (n) => import_platejs8.TextApi.isText(n) && getInlineSuggestionData(n)?.type === "insert" && isCurrentUserSuggestion(editor, n)
      });
      if (entryText) {
        editor.tf.delete({ at: range, unit: "character" });
        continue;
      }
      setSuggestionNodes(editor, {
        at: range,
        createdAt,
        suggestionDeletion: true,
        suggestionId: id
      });
    }
  });
  return resId;
};

// src/lib/transforms/deleteFragmentSuggestion.ts
var deleteFragmentSuggestion = (editor, { reverse } = {}) => {
  let resId;
  editor.tf.withoutNormalizing(() => {
    const selection = editor.selection;
    const [start, end] = editor.api.edges(selection);
    if (reverse) {
      editor.tf.collapse({ edge: "end" });
      resId = deleteSuggestion(
        editor,
        { anchor: end, focus: start },
        { reverse: true }
      );
    } else {
      editor.tf.collapse({ edge: "start" });
      resId = deleteSuggestion(editor, { anchor: start, focus: end });
    }
  });
  return resId;
};

// src/lib/transforms/insertFragmentSuggestion.ts
var import_platejs9 = require("platejs");
var insertFragmentSuggestion = (editor, fragment, {
  insertFragment = editor.tf.insertFragment
} = {}) => {
  editor.tf.withoutNormalizing(() => {
    deleteFragmentSuggestion(editor);
    const { id, createdAt } = findSuggestionProps(editor, {
      at: editor.selection,
      type: "insert"
    });
    fragment.forEach((n) => {
      if (import_platejs9.TextApi.isText(n)) {
        if (!n[import_platejs9.KEYS.suggestion]) {
          n[import_platejs9.KEYS.suggestion] = true;
        }
        const otherUserKeys = getSuggestionKeys(n);
        otherUserKeys.forEach((key) => {
          delete n[key];
        });
        n[getSuggestionKey(id)] = {
          id,
          createdAt,
          type: "insert",
          userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
        };
      } else {
        n[import_platejs9.KEYS.suggestion] = {
          id,
          createdAt,
          type: "insert",
          userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
        };
      }
    });
    editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
      insertFragment(fragment);
    });
  });
};

// src/lib/transforms/insertTextSuggestion.ts
var insertTextSuggestion = (editor, text) => {
  editor.tf.withoutNormalizing(() => {
    let resId;
    const { id, createdAt } = findSuggestionProps(editor, {
      at: editor.selection,
      type: "insert"
    });
    if (editor.api.isExpanded()) {
      resId = deleteFragmentSuggestion(editor);
    }
    editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
      editor.tf.insertNodes(
        {
          [getSuggestionKey(resId ?? id)]: {
            id: resId ?? id,
            createdAt,
            type: "insert",
            userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
          },
          suggestion: true,
          text
        },
        {
          at: editor.selection,
          select: true
        }
      );
    });
  });
};

// src/lib/transforms/removeMarkSuggestion.ts
var import_platejs10 = require("platejs");
var getRemoveMarkProps = () => {
  const defaultProps = {
    id: (0, import_platejs10.nanoid)(),
    createdAt: Date.now()
  };
  return defaultProps;
};
var removeMarkSuggestion = (editor, key) => {
  editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
    const { id, createdAt } = getRemoveMarkProps();
    const match = (n) => {
      if (!import_platejs10.TextApi.isText(n)) return false;
      if (n[import_platejs10.KEYS.suggestion]) {
        const data = getInlineSuggestionData(n);
        if (data?.type === "update") {
          return true;
        }
        return false;
      }
      return true;
    };
    editor.tf.unsetNodes(key, {
      match
    });
    editor.tf.setNodes(
      {
        [getSuggestionKey(id)]: {
          id,
          createdAt,
          properties: {
            [key]: void 0
          },
          type: "update",
          userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
        },
        [import_platejs10.KEYS.suggestion]: true
      },
      {
        match
      }
    );
  });
};

// src/lib/transforms/removeNodesSuggestion.ts
var import_platejs11 = require("platejs");
var removeNodesSuggestion = (editor, nodes) => {
  if (nodes.length === 0) return;
  const { id, createdAt } = findSuggestionProps(editor, {
    at: editor.selection,
    type: "remove"
  });
  nodes.forEach(([, blockPath]) => {
    editor.tf.setNodes(
      {
        [import_platejs11.KEYS.suggestion]: {
          id,
          createdAt,
          type: "remove"
        }
      },
      { at: blockPath }
    );
  });
};

// src/lib/withSuggestion.ts
var withSuggestion = ({
  api,
  editor,
  getOptions,
  tf: {
    addMark,
    apply,
    deleteBackward,
    deleteForward,
    deleteFragment,
    insertBreak,
    insertFragment,
    insertNodes,
    insertText,
    normalizeNode,
    removeMark,
    removeNodes
  }
}) => ({
  transforms: {
    addMark(key, value) {
      if (getOptions().isSuggesting && api.isExpanded()) {
        return addMarkSuggestion(editor, key, value);
      }
      return addMark(key, value);
    },
    apply(operation) {
      return apply(operation);
    },
    deleteBackward(unit) {
      const selection = editor.selection;
      const pointTarget = editor.api.before(selection, { unit });
      if (getOptions().isSuggesting) {
        const node = editor.api.above();
        if (node?.[0][import_platejs12.KEYS.suggestion] && !node?.[0].suggestion.isLineBreak) {
          return deleteBackward(unit);
        }
        if (!pointTarget) return;
        deleteSuggestion(
          editor,
          { anchor: selection.anchor, focus: pointTarget },
          { reverse: true }
        );
        return;
      } else {
        if (pointTarget) {
          const isCrossBlock = editor.api.isAt({
            at: { anchor: selection.anchor, focus: pointTarget },
            blocks: true
          });
          if (isCrossBlock) {
            editor.tf.unsetNodes([import_platejs12.KEYS.suggestion], {
              at: pointTarget
            });
          }
        }
      }
      deleteBackward(unit);
    },
    deleteForward(unit) {
      if (getOptions().isSuggesting) {
        const selection = editor.selection;
        const pointTarget = editor.api.after(selection, { unit });
        if (!pointTarget) return;
        deleteSuggestion(editor, {
          anchor: selection.anchor,
          focus: pointTarget
        });
        return;
      }
      deleteForward(unit);
    },
    deleteFragment(direction) {
      if (getOptions().isSuggesting) {
        deleteFragmentSuggestion(editor, { reverse: true });
        return;
      }
      deleteFragment(direction);
    },
    insertBreak() {
      if (getOptions().isSuggesting) {
        const [node, path] = editor.api.above();
        if (path.length > 1 || node.type !== editor.getType(import_platejs12.KEYS.p)) {
          return insertTextSuggestion(editor, "\n");
        }
        const { id, createdAt } = findSuggestionProps(editor, {
          at: editor.selection,
          type: "insert"
        });
        insertBreak();
        editor.tf.withoutMerging(() => {
          editor.tf.setNodes(
            {
              [import_platejs12.KEYS.suggestion]: {
                id,
                createdAt,
                isLineBreak: true,
                type: "insert",
                userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
              }
            },
            { at: path }
          );
        });
        return;
      }
      insertBreak();
    },
    insertFragment(fragment) {
      if (getOptions().isSuggesting) {
        insertFragmentSuggestion(editor, fragment, { insertFragment });
        return;
      }
      insertFragment(fragment);
    },
    insertNodes(nodes, options) {
      if (getOptions().isSuggesting) {
        const nodesArray = Array.isArray(nodes) ? nodes : [nodes];
        if (nodesArray.some((n) => n.type === "slash_input")) {
          api.suggestion.withoutSuggestions(() => {
            insertNodes(nodes, options);
          });
          return;
        }
        const suggestionNodes = nodesArray.map((node) => {
          return {
            ...node,
            [import_platejs12.KEYS.suggestion]: {
              id: (0, import_platejs12.nanoid)(),
              createdAt: Date.now(),
              type: "insert",
              userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
            }
          };
        });
        return insertNodes(suggestionNodes, options);
      }
      return insertNodes(nodes, options);
    },
    insertText(text, options) {
      if (getOptions().isSuggesting) {
        const node = editor.api.above();
        if (node?.[0][import_platejs12.KEYS.suggestion] && !node?.[0].suggestion.isLineBreak) {
          return insertText(text, options);
        }
        insertTextSuggestion(editor, text);
        return;
      }
      insertText(text, options);
    },
    normalizeNode(entry) {
      api.suggestion.withoutSuggestions(() => {
        const [node, path] = entry;
        if (node[import_platejs12.KEYS.suggestion] && // Unset suggestion when there is no suggestion id
        import_platejs12.TextApi.isText(node) && !getSuggestionKeyId(node)) {
          editor.tf.unsetNodes([import_platejs12.KEYS.suggestion, "suggestionData"], {
            at: path
          });
          return;
        }
        if (node[import_platejs12.KEYS.suggestion] && import_platejs12.TextApi.isText(node) && !getInlineSuggestionData(node)?.userId) {
          if (getInlineSuggestionData(node)?.type === "remove") {
            editor.tf.unsetNodes([import_platejs12.KEYS.suggestion, getSuggestionKeyId(node)], {
              at: path
            });
          } else {
            editor.tf.removeNodes({ at: path });
          }
          return;
        }
        normalizeNode(entry);
      });
    },
    removeMark(key) {
      if (getOptions().isSuggesting && api.isExpanded()) {
        return removeMarkSuggestion(editor, key);
      }
      return removeMark(key);
    },
    // Remove nodes by block selection
    removeNodes(options) {
      if (getOptions().isSuggesting) {
        const nodes = [...editor.api.nodes(options)];
        if (nodes.some(([n]) => n.type === "slash_input")) {
          api.suggestion.withoutSuggestions(() => {
            removeNodes(options);
          });
          return;
        }
        return removeNodesSuggestion(editor, nodes);
      }
      return removeNodes(options);
    }
  }
});

// src/lib/BaseSuggestionPlugin.ts
var BaseSuggestionPlugin = (0, import_platejs13.createTSlatePlugin)({
  key: import_platejs13.KEYS.suggestion,
  node: { isLeaf: true },
  options: {
    currentUserId: "alice",
    isSuggesting: false
  },
  rules: { selection: { affinity: "outward" } }
}).overrideEditor(withSuggestion).extendApi(
  ({ api, editor, getOption, setOption, type }) => ({
    dataList: (node) => {
      return Object.keys(node).filter((key) => {
        return key.startsWith(`${import_platejs13.KEYS.suggestion}_`);
      }).map((key) => node[key]);
    },
    isBlockSuggestion: (node) => import_platejs13.ElementApi.isElement(node) && "suggestion" in node,
    node: (options = {}) => {
      const { id, isText, ...rest } = options;
      const result = editor.api.node({
        match: (n) => {
          if (!n[type]) return false;
          if (isText && !import_platejs13.TextApi.isText(n)) return false;
          if (id) {
            if (import_platejs13.TextApi.isText(n)) {
              return !!n[getSuggestionKey(id)];
            }
            if (import_platejs13.ElementApi.isElement(n) && api.suggestion.isBlockSuggestion(n)) {
              return n.suggestion.id === id;
            }
          }
          return true;
        },
        ...rest
      });
      return result;
    },
    nodeId: (node) => {
      if (import_platejs13.TextApi.isText(node)) {
        const keyId = getSuggestionKeyId(node);
        if (!keyId) return;
        return keyId.replace(`${type}_`, "");
      }
      if (api.suggestion.isBlockSuggestion(node)) {
        return node.suggestion.id;
      }
    },
    nodes: (options = {}) => {
      const at = (0, import_platejs13.getAt)(editor, options.at) ?? [];
      return [
        ...editor.api.nodes({
          ...options,
          at,
          mode: "all",
          match: (n) => n[type]
        })
      ];
    },
    suggestionData: (node) => {
      if (import_platejs13.TextApi.isText(node)) {
        const keyId = getSuggestionKeyId(node);
        if (!keyId) return;
        return node[keyId];
      }
      if (api.suggestion.isBlockSuggestion(node)) {
        return node.suggestion;
      }
    },
    withoutSuggestions: (fn) => {
      const prev = getOption("isSuggesting");
      setOption("isSuggesting", false);
      fn();
      setOption("isSuggesting", prev);
    }
  })
);

// src/lib/diffToSuggestions.ts
var import_diff = require("@platejs/diff");
var import_platejs17 = require("platejs");

// src/lib/transforms/acceptSuggestion.ts
var import_platejs14 = require("platejs");
var acceptSuggestion = (editor, description) => {
  editor.tf.withoutNormalizing(() => {
    const mergeNodes = [
      ...editor.api.nodes({
        at: [],
        match: (n) => {
          if (!import_platejs14.ElementApi.isElement(n)) return false;
          if (editor.getApi(BaseSuggestionPlugin).suggestion.isBlockSuggestion(n)) {
            const suggestionElement = n;
            return suggestionElement.suggestion.type === "remove" && suggestionElement.suggestion.isLineBreak && suggestionElement.suggestion.id === description.suggestionId;
          }
          return false;
        }
      })
    ];
    mergeNodes.reverse().forEach(([, path]) => {
      editor.tf.mergeNodes({ at: import_platejs14.PathApi.next(path) });
    });
    editor.tf.unsetNodes([description.keyId, import_platejs14.KEYS.suggestion], {
      at: [],
      mode: "all",
      match: (n) => {
        if (import_platejs14.TextApi.isText(n)) {
          const suggestionDataList = editor.getApi(BaseSuggestionPlugin).suggestion.dataList(n);
          const includeUpdate = suggestionDataList.some(
            (data) => data.type === "update"
          );
          if (includeUpdate) {
            return suggestionDataList.some(
              (d) => d.id === description.suggestionId
            );
          } else {
            const suggestionData = getInlineSuggestionData(n);
            if (suggestionData)
              return suggestionData.type === "insert" && suggestionData.id === description.suggestionId;
          }
          return false;
        }
        if (import_platejs14.ElementApi.isElement(n) && editor.getApi(BaseSuggestionPlugin).suggestion.isBlockSuggestion(n)) {
          const suggestionElement = n;
          const suggestionData = suggestionElement.suggestion;
          if (suggestionData) {
            const isLineBreak = suggestionData.isLineBreak;
            if (isLineBreak)
              return suggestionData.id === description.suggestionId;
            return suggestionData.type === "insert" && suggestionData.id === description.suggestionId;
          }
        }
        return false;
      }
    });
    editor.tf.removeNodes({
      at: [],
      mode: "all",
      match: (n) => {
        if (import_platejs14.TextApi.isText(n)) {
          const suggestionData = getInlineSuggestionData(n);
          if (suggestionData) {
            return suggestionData.type === "remove" && suggestionData.id === description.suggestionId;
          }
          return false;
        }
        if (import_platejs14.ElementApi.isElement(n) && editor.getApi(BaseSuggestionPlugin).suggestion.isBlockSuggestion(n)) {
          const suggestionElement = n;
          const suggestionData = suggestionElement.suggestion;
          if (suggestionData) {
            const isLineBreak = suggestionData.isLineBreak;
            return suggestionData.type === "remove" && suggestionData.id === description.suggestionId && !isLineBreak;
          }
        }
        return false;
      }
    });
  });
};

// src/lib/transforms/getSuggestionProps.ts
var import_platejs15 = require("platejs");
var getSuggestionProps = (editor, id, {
  createdAt = Date.now(),
  suggestionDeletion,
  suggestionUpdate
} = {}) => {
  const type = suggestionDeletion ? "remove" : suggestionUpdate ? "update" : "insert";
  const res = {
    [getSuggestionKey(id)]: {
      id,
      createdAt,
      type,
      userId: editor.getOptions(BaseSuggestionPlugin).currentUserId
    },
    [import_platejs15.KEYS.suggestion]: true
  };
  return res;
};

// src/lib/transforms/rejectSuggestion.ts
var import_platejs16 = require("platejs");
var rejectSuggestion = (editor, description) => {
  editor.tf.withoutNormalizing(() => {
    const mergeNodes = [
      ...editor.api.nodes({
        at: [],
        match: (n) => {
          if (!import_platejs16.ElementApi.isElement(n)) return false;
          if (editor.getApi(BaseSuggestionPlugin).suggestion.isBlockSuggestion(n)) {
            const suggestionElement = n;
            return suggestionElement.suggestion.type === "insert" && suggestionElement.suggestion.isLineBreak && suggestionElement.suggestion.id === description.suggestionId;
          }
          return false;
        }
      })
    ];
    mergeNodes.reverse().forEach(([, path]) => {
      editor.tf.mergeNodes({ at: import_platejs16.PathApi.next(path) });
    });
    editor.tf.unsetNodes([description.keyId, import_platejs16.KEYS.suggestion], {
      at: [],
      mode: "all",
      match: (n) => {
        if (import_platejs16.TextApi.isText(n)) {
          const node = n;
          const suggestionData = getInlineSuggestionData(node);
          if (suggestionData)
            return suggestionData.type === "remove" && suggestionData.id === description.suggestionId;
          return false;
        }
        if (import_platejs16.ElementApi.isElement(n) && editor.getApi(BaseSuggestionPlugin).suggestion.isBlockSuggestion(n)) {
          const suggestionElement = n;
          const isLineBreak = suggestionElement.suggestion.isLineBreak;
          if (isLineBreak)
            return suggestionElement.suggestion.id === description.suggestionId;
          return suggestionElement.suggestion.type === "remove" && suggestionElement.suggestion.id === description.suggestionId;
        }
        return false;
      }
    });
    editor.tf.removeNodes({
      at: [],
      mode: "all",
      match: (n) => {
        if (import_platejs16.TextApi.isText(n)) {
          const node = n;
          const suggestionData = getInlineSuggestionData(node);
          if (suggestionData)
            return suggestionData.type === "insert" && suggestionData.id === description.suggestionId;
          return false;
        }
        if (import_platejs16.ElementApi.isElement(n) && editor.getApi(BaseSuggestionPlugin).suggestion.isBlockSuggestion(n)) {
          const suggestionElement = n;
          return suggestionElement.suggestion.type === "insert" && suggestionElement.suggestion.id === description.suggestionId && !suggestionElement.suggestion.isLineBreak;
        }
        return false;
      }
    });
    const updateNodes = [
      ...editor.api.nodes({
        at: [],
        match: (n) => {
          if (import_platejs16.ElementApi.isElement(n)) return false;
          if (import_platejs16.TextApi.isText(n)) {
            const datalist = editor.getApi(BaseSuggestionPlugin).suggestion.dataList(n);
            if (datalist.length > 0)
              return datalist.some(
                (data) => data.type === "update" && data.id === description.suggestionId
              );
            return false;
          }
        }
      })
    ];
    updateNodes.forEach(([node, path]) => {
      const datalist = editor.getApi(BaseSuggestionPlugin).suggestion.dataList(node);
      const targetData = datalist.find(
        (data) => data.type === "update" && data.id === description.suggestionId
      );
      if (!targetData) return;
      if ("newProperties" in targetData) {
        const unsetProps = Object.keys(targetData.newProperties).filter(
          (key) => targetData.newProperties[key]
        );
        editor.tf.unsetNodes([...unsetProps], {
          at: path
        });
      }
      if ("properties" in targetData) {
        const addProps = Object.keys(targetData.properties).filter(
          (key) => !targetData.properties[key]
        );
        editor.tf.setNodes(
          Object.fromEntries(addProps.map((key) => [key, true])),
          {
            at: path
          }
        );
      }
      editor.tf.unsetNodes([getSuggestionKey(targetData.id)], {
        at: path
      });
    });
  });
};

// src/lib/diffToSuggestions.ts
function diffToSuggestions(editor, doc0, doc1, {
  getDeleteProps = () => getSuggestionProps(editor, (0, import_platejs17.nanoid)(), {
    suggestionDeletion: true
  }),
  getInsertProps = () => getSuggestionProps(editor, (0, import_platejs17.nanoid)()),
  getUpdateProps = (_node, _properties, newProperties) => getSuggestionProps(editor, (0, import_platejs17.nanoid)(), {
    suggestionUpdate: newProperties
  }),
  isInline = editor.api.isInline,
  ...options
} = {}) {
  const values = (0, import_diff.computeDiff)(doc0, doc1, {
    getDeleteProps,
    getInsertProps,
    getUpdateProps,
    isInline,
    ...options
  });
  const traverseNodes = (nodes) => {
    return nodes.map((node, index) => {
      if (import_platejs17.ElementApi.isElement(node) && "children" in node) {
        return {
          ...node,
          children: traverseNodes(node.children)
        };
      }
      if (import_platejs17.TextApi.isText(node) && node[import_platejs17.KEYS.suggestion]) {
        const api = editor.getApi(BaseSuggestionPlugin);
        const currentNodeData = api.suggestion.suggestionData(node);
        if (currentNodeData?.type === "insert") {
          const previousNode = index > 0 ? nodes[index - 1] : null;
          if (previousNode?.[import_platejs17.KEYS.suggestion]) {
            const previousData = api.suggestion.suggestionData(
              previousNode
            );
            if (previousData?.type === "remove") {
              const updatedNode = {
                ...node,
                [getSuggestionKey(previousData.id)]: {
                  ...currentNodeData,
                  id: previousData.id,
                  createdAt: previousData.createdAt
                }
              };
              const key = getSuggestionKey(currentNodeData.id);
              delete updatedNode[key];
              return updatedNode;
            }
          }
        }
        return node;
      }
      return node;
    });
  };
  return traverseNodes(values);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseSuggestionPlugin,
  acceptSuggestion,
  addMarkSuggestion,
  deleteFragmentSuggestion,
  deleteSuggestion,
  diffToSuggestions,
  findInlineSuggestionNode,
  findSuggestionProps,
  getActiveSuggestionDescriptions,
  getInlineSuggestionData,
  getSuggestionKey,
  getSuggestionKeyId,
  getSuggestionKeys,
  getSuggestionNodeEntries,
  getSuggestionProps,
  getSuggestionUserId,
  getSuggestionUserIdByKey,
  getSuggestionUserIds,
  insertFragmentSuggestion,
  insertTextSuggestion,
  isCurrentUserSuggestion,
  isSuggestionKey,
  keyId2SuggestionId,
  rejectSuggestion,
  removeMarkSuggestion,
  removeNodesSuggestion,
  setSuggestionNodes,
  withSuggestion
});
//# sourceMappingURL=index.js.map