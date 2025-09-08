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

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  CommentPlugin: () => CommentPlugin,
  useCommentId: () => useCommentId
});
module.exports = __toCommonJS(react_exports);

// src/react/CommentPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseCommentPlugin.ts
var import_platejs6 = require("platejs");

// src/lib/utils/getDraftCommentKey.ts
var import_platejs = require("platejs");
var getDraftCommentKey = () => `${import_platejs.KEYS.comment}_draft`;

// src/lib/utils/isCommentKey.ts
var import_platejs2 = require("platejs");
var isCommentKey = (key) => key.startsWith(`${import_platejs2.KEYS.comment}_`);

// src/lib/utils/getCommentCount.ts
var getCommentCount = (node) => {
  let commentCount = 0;
  Object.keys(node).forEach((key) => {
    if (isCommentKey(key) && key !== getDraftCommentKey()) commentCount++;
  });
  return commentCount;
};

// src/lib/utils/getCommentKey.ts
var import_platejs3 = require("platejs");
var getCommentKey = (id) => `${import_platejs3.KEYS.comment}_${id}`;

// src/lib/utils/getCommentKeyId.ts
var import_platejs4 = require("platejs");
var getCommentKeyId = (key) => key.replace(`${import_platejs4.KEYS.comment}_`, "");

// src/lib/utils/getCommentKeys.ts
var getCommentKeys = (node) => {
  const keys = [];
  Object.keys(node).forEach((key) => {
    if (isCommentKey(key)) keys.push(key);
  });
  return keys;
};

// src/lib/utils/isCommentNodeById.ts
var isCommentNodeById = (node, id) => !!node[getCommentKey(id)];

// src/lib/withComments.ts
var import_platejs5 = require("platejs");
var withComment = ({
  editor,
  tf: { normalizeNode }
}) => ({
  transforms: {
    normalizeNode(entry) {
      const [node, path] = entry;
      if (node[import_platejs5.KEYS.comment] && !node[getDraftCommentKey()] && getCommentCount(node) < 1) {
        editor.tf.unsetNodes(import_platejs5.KEYS.comment, { at: path });
        return;
      }
      return normalizeNode(entry);
    }
  }
});

// src/lib/BaseCommentPlugin.ts
var BaseCommentPlugin = (0, import_platejs6.createTSlatePlugin)({
  key: import_platejs6.KEYS.comment,
  node: {
    isLeaf: true
  },
  rules: { selection: { affinity: "outward" } }
}).overrideEditor(withComment).extendApi(({ editor, type }) => ({
  has: (options) => {
    const { id } = options;
    const regex = new RegExp(`"${getCommentKey(id)}":true`);
    return regex.test(JSON.stringify(editor.children));
  },
  node: (options = {}) => {
    const { id, isDraft, ...rest } = options;
    return editor.api.node({
      ...rest,
      match: (n) => {
        if (isDraft) return n[type] && n[getDraftCommentKey()];
        return id ? isCommentNodeById(n, id) : n[type];
      }
    });
  },
  nodeId: (leaf) => {
    const ids = [];
    const keys = Object.keys(leaf);
    if (keys.includes(getDraftCommentKey())) return;
    keys.forEach((key) => {
      if (!isCommentKey(key) || key === getDraftCommentKey()) return;
      const id = getCommentKeyId(key);
      ids.push(id);
    });
    return ids.at(-1);
  },
  nodes: (options = {}) => {
    const { id, isDraft, ...rest } = options;
    return [
      ...editor.api.nodes({
        ...rest,
        match: (n) => {
          if (isDraft) return n[type] && n[getDraftCommentKey()];
          return id ? isCommentNodeById(n, id) : n[type];
        }
      })
    ];
  }
})).extendTransforms(
  ({ api, editor, tf, type }) => ({
    removeMark: () => {
      const nodeEntry = api.comment.node();
      if (!nodeEntry) return;
      const keys = getCommentKeys(nodeEntry[0]);
      editor.tf.withoutNormalizing(() => {
        keys.forEach((key) => {
          editor.tf.removeMark(key);
        });
        editor.tf.removeMark(import_platejs6.KEYS.comment);
      });
    },
    setDraft: (options = {}) => {
      tf.setNodes(
        {
          [getDraftCommentKey()]: true,
          [type]: true
        },
        { match: import_platejs6.TextApi.isText, split: true, ...options }
      );
    },
    unsetMark: (options) => {
      const { id } = options;
      const nodes = api.comment.nodes({ id, at: [] });
      if (!nodes) return;
      nodes.forEach(([node]) => {
        const isOverlapping = getCommentCount(node) > 1;
        let unsetKeys = [];
        if (isOverlapping) {
          unsetKeys = [getDraftCommentKey(), getCommentKey(id)];
        } else {
          unsetKeys = [import_platejs6.KEYS.comment, getDraftCommentKey(), getCommentKey(id)];
        }
        editor.tf.unsetNodes(unsetKeys, {
          at: [],
          match: (n) => n === node
        });
      });
    }
  })
);

// src/react/CommentPlugin.tsx
var CommentPlugin = (0, import_react.toPlatePlugin)(BaseCommentPlugin);

// src/react/hooks/useCommentId.ts
var import_react2 = require("platejs/react");
var useCommentId = () => {
  return (0, import_react2.useEditorSelector)((editor) => {
    if (!editor.selection) return;
    if (editor.api.isExpanded()) return;
    const api = editor.getApi(BaseCommentPlugin);
    const commentNode = api.comment.node();
    if (!commentNode) return;
    const [commentLeaf] = commentNode;
    return api.comment.nodeId(commentLeaf);
  }, []);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommentPlugin,
  useCommentId
});
//# sourceMappingURL=index.js.map