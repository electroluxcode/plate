// src/react/SuggestionPlugin.tsx
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseSuggestionPlugin.ts
import {
  createTSlatePlugin,
  ElementApi as ElementApi3,
  getAt as getAt2,
  KEYS as KEYS10,
  TextApi as TextApi6
} from "platejs";

// src/lib/utils/getSuggestionKeys.ts
import {
  isDefined,
  KEYS as KEYS2
} from "platejs";

// src/lib/utils/getSuggestionId.ts
import { KEYS } from "platejs";
var getSuggestionKeyId = (node) => {
  const ids = Object.keys(node).filter((key) => {
    return key.startsWith(`${KEYS.suggestion}_`);
  });
  return ids.at(-1);
};
var getInlineSuggestionData = (node) => {
  const keyId = getSuggestionKeyId(node);
  if (!keyId) return;
  return node[keyId];
};

// src/lib/utils/getSuggestionKeys.ts
var getSuggestionKey = (id = "0") => `${KEYS2.suggestion}_${id}`;
var isSuggestionKey = (key) => key.startsWith(`${KEYS2.suggestion}_`);
var getSuggestionKeys = (node) => {
  const keys = [];
  Object.keys(node).forEach((key) => {
    if (isSuggestionKey(key)) keys.push(key);
  });
  return keys;
};
var isCurrentUserSuggestion = (editor, node) => {
  const { currentUserId } = editor.getOptions(BaseSuggestionPlugin);
  return getInlineSuggestionData(node)?.userId === currentUserId;
};

// src/lib/withSuggestion.ts
import {
  KEYS as KEYS9,
  nanoid as nanoid5,
  TextApi as TextApi5
} from "platejs";

// src/lib/queries/findSuggestionProps.ts
import {
  nanoid
} from "platejs";
var findSuggestionProps = (editor, { at, type }) => {
  const defaultProps = {
    id: nanoid(),
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
              id: lineBreakData?.id ?? nanoid(),
              createdAt: lineBreakData?.createdAt ?? Date.now()
            };
          }
        }
      }
    }
  }
  if (entry && getInlineSuggestionData(entry[0])?.type === type && isCurrentUserSuggestion(editor, entry[0])) {
    return {
      id: api.suggestion.nodeId(entry[0]) ?? nanoid(),
      createdAt: getInlineSuggestionData(entry[0])?.createdAt ?? Date.now()
    };
  }
  return defaultProps;
};

// src/lib/transforms/addMarkSuggestion.ts
import { KEYS as KEYS8, nanoid as nanoid4, TextApi as TextApi4 } from "platejs";

// src/lib/transforms/deleteSuggestion.ts
import {
  ElementApi as ElementApi2,
  KEYS as KEYS4,
  PathApi,
  PointApi,
  TextApi
} from "platejs";

// src/lib/transforms/setSuggestionNodes.ts
import {
  ElementApi,
  getAt,
  KEYS as KEYS3,
  nanoid as nanoid2
} from "platejs";
var setSuggestionNodes = (editor, options) => {
  const at = getAt(editor, options?.at) ?? editor.selection;
  if (!at) return;
  const { suggestionId = nanoid2() } = options ?? {};
  const _nodeEntries = editor.api.nodes({
    match: (n) => ElementApi.isElement(n) && editor.api.isInline(n),
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
      [KEYS3.suggestion]: true
    };
    editor.tf.setNodes(props, {
      at,
      marks: true
    });
    nodeEntries.forEach(([, path]) => {
      editor.tf.setNodes(props, {
        at: path,
        match: (n) => ElementApi.isElement(n) && editor.api.isInline(n),
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
        match: (n) => n[KEYS4.suggestion] && TextApi.isText(n) && getInlineSuggestionData(n)?.type === "insert" && isCurrentUserSuggestion(editor, n)
      });
      if (entryBlock && editor.api.isStart(pointCurrent, entryBlock[1]) && editor.api.isEmpty(entryBlock[0])) {
        editor.tf.removeNodes({
          at: entryBlock[1]
        });
        continue;
      }
      if (editor.api.isAt({ at: range, blocks: true })) {
        const previousAboveNode = editor.api.above({ at: range.anchor });
        if (previousAboveNode && ElementApi2.isElement(previousAboveNode[0])) {
          const isBlockSuggestion = editor.getApi(BaseSuggestionPlugin).suggestion.isBlockSuggestion(previousAboveNode[0]);
          if (isBlockSuggestion) {
            const node = previousAboveNode[0];
            if (node.suggestion.type === "insert") {
              editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
                editor.tf.unsetNodes([KEYS4.suggestion], {
                  at: previousAboveNode[1]
                });
                editor.tf.mergeNodes({
                  at: PathApi.next(previousAboveNode[1])
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
                [KEYS4.suggestion]: {
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
      if (PointApi.equals(pointCurrent, editor.selection.anchor)) {
        editor.tf.move({
          reverse,
          unit: "character"
        });
      }
      const entryText = editor.getApi(BaseSuggestionPlugin).suggestion.node({
        at: range,
        isText: true,
        match: (n) => TextApi.isText(n) && getInlineSuggestionData(n)?.type === "insert" && isCurrentUserSuggestion(editor, n)
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
import { KEYS as KEYS5, TextApi as TextApi2 } from "platejs";
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
      if (TextApi2.isText(n)) {
        if (!n[KEYS5.suggestion]) {
          n[KEYS5.suggestion] = true;
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
        n[KEYS5.suggestion] = {
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
import { KEYS as KEYS6, nanoid as nanoid3, TextApi as TextApi3 } from "platejs";
var getRemoveMarkProps = () => {
  const defaultProps = {
    id: nanoid3(),
    createdAt: Date.now()
  };
  return defaultProps;
};
var removeMarkSuggestion = (editor, key) => {
  editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
    const { id, createdAt } = getRemoveMarkProps();
    const match = (n) => {
      if (!TextApi3.isText(n)) return false;
      if (n[KEYS6.suggestion]) {
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
        [KEYS6.suggestion]: true
      },
      {
        match
      }
    );
  });
};

// src/lib/transforms/removeNodesSuggestion.ts
import { KEYS as KEYS7 } from "platejs";
var removeNodesSuggestion = (editor, nodes) => {
  if (nodes.length === 0) return;
  const { id, createdAt } = findSuggestionProps(editor, {
    at: editor.selection,
    type: "remove"
  });
  nodes.forEach(([, blockPath]) => {
    editor.tf.setNodes(
      {
        [KEYS7.suggestion]: {
          id,
          createdAt,
          type: "remove"
        }
      },
      { at: blockPath }
    );
  });
};

// src/lib/transforms/addMarkSuggestion.ts
var getAddMarkProps = () => {
  const defaultProps = {
    id: nanoid4(),
    createdAt: Date.now()
  };
  return defaultProps;
};
var addMarkSuggestion = (editor, key, value) => {
  editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
    const { id, createdAt } = getAddMarkProps();
    const match = (n) => {
      if (!TextApi4.isText(n)) return false;
      if (n[KEYS8.suggestion]) {
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
        [KEYS8.suggestion]: true
      },
      {
        match,
        split: true
      }
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
        if (node?.[0][KEYS9.suggestion] && !node?.[0].suggestion.isLineBreak) {
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
            editor.tf.unsetNodes([KEYS9.suggestion], {
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
        if (path.length > 1 || node.type !== editor.getType(KEYS9.p)) {
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
              [KEYS9.suggestion]: {
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
            [KEYS9.suggestion]: {
              id: nanoid5(),
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
        if (node?.[0][KEYS9.suggestion] && !node?.[0].suggestion.isLineBreak) {
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
        if (node[KEYS9.suggestion] && // Unset suggestion when there is no suggestion id
        TextApi5.isText(node) && !getSuggestionKeyId(node)) {
          editor.tf.unsetNodes([KEYS9.suggestion, "suggestionData"], {
            at: path
          });
          return;
        }
        if (node[KEYS9.suggestion] && TextApi5.isText(node) && !getInlineSuggestionData(node)?.userId) {
          if (getInlineSuggestionData(node)?.type === "remove") {
            editor.tf.unsetNodes([KEYS9.suggestion, getSuggestionKeyId(node)], {
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
var BaseSuggestionPlugin = createTSlatePlugin({
  key: KEYS10.suggestion,
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
        return key.startsWith(`${KEYS10.suggestion}_`);
      }).map((key) => node[key]);
    },
    isBlockSuggestion: (node) => ElementApi3.isElement(node) && "suggestion" in node,
    node: (options = {}) => {
      const { id, isText, ...rest } = options;
      const result = editor.api.node({
        match: (n) => {
          if (!n[type]) return false;
          if (isText && !TextApi6.isText(n)) return false;
          if (id) {
            if (TextApi6.isText(n)) {
              return !!n[getSuggestionKey(id)];
            }
            if (ElementApi3.isElement(n) && api.suggestion.isBlockSuggestion(n)) {
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
      if (TextApi6.isText(node)) {
        const keyId = getSuggestionKeyId(node);
        if (!keyId) return;
        return keyId.replace(`${type}_`, "");
      }
      if (api.suggestion.isBlockSuggestion(node)) {
        return node.suggestion.id;
      }
    },
    nodes: (options = {}) => {
      const at = getAt2(editor, options.at) ?? [];
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
      if (TextApi6.isText(node)) {
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

// src/react/SuggestionPlugin.tsx
var SuggestionPlugin = toPlatePlugin(BaseSuggestionPlugin);
export {
  SuggestionPlugin
};
//# sourceMappingURL=index.mjs.map