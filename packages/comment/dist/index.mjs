// src/lib/BaseCommentPlugin.ts
import {
  createTSlatePlugin,
  KEYS as KEYS7,
  TextApi
} from "platejs";

// src/lib/utils/getDraftCommentKey.ts
import { KEYS } from "platejs";
var getDraftCommentKey = () => `${KEYS.comment}_draft`;

// src/lib/utils/isCommentKey.ts
import { KEYS as KEYS2 } from "platejs";
var isCommentKey = (key) => key.startsWith(`${KEYS2.comment}_`);

// src/lib/utils/getCommentCount.ts
var getCommentCount = (node) => {
  let commentCount = 0;
  Object.keys(node).forEach((key) => {
    if (isCommentKey(key) && key !== getDraftCommentKey()) commentCount++;
  });
  return commentCount;
};

// src/lib/utils/getCommentKey.ts
import { KEYS as KEYS3 } from "platejs";
var getCommentKey = (id) => `${KEYS3.comment}_${id}`;

// src/lib/utils/getCommentKeyId.ts
import { KEYS as KEYS4 } from "platejs";
var getCommentKeyId = (key) => key.replace(`${KEYS4.comment}_`, "");

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

// src/lib/utils/isCommentText.ts
import { KEYS as KEYS5 } from "platejs";
var isCommentText = (node) => {
  return !!node[KEYS5.comment];
};

// src/lib/withComments.ts
import { KEYS as KEYS6 } from "platejs";
var withComment = ({
  editor,
  tf: { normalizeNode }
}) => ({
  transforms: {
    normalizeNode(entry) {
      const [node, path] = entry;
      if (node[KEYS6.comment] && !node[getDraftCommentKey()] && getCommentCount(node) < 1) {
        editor.tf.unsetNodes(KEYS6.comment, { at: path });
        return;
      }
      return normalizeNode(entry);
    }
  }
});

// src/lib/BaseCommentPlugin.ts
var BaseCommentPlugin = createTSlatePlugin({
  key: KEYS7.comment,
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
        editor.tf.removeMark(KEYS7.comment);
      });
    },
    setDraft: (options = {}) => {
      tf.setNodes(
        {
          [getDraftCommentKey()]: true,
          [type]: true
        },
        { match: TextApi.isText, split: true, ...options }
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
          unsetKeys = [KEYS7.comment, getDraftCommentKey(), getCommentKey(id)];
        }
        editor.tf.unsetNodes(unsetKeys, {
          at: [],
          match: (n) => n === node
        });
      });
    }
  })
);
export {
  BaseCommentPlugin,
  getCommentCount,
  getCommentKey,
  getCommentKeyId,
  getCommentKeys,
  getDraftCommentKey,
  isCommentKey,
  isCommentNodeById,
  isCommentText,
  withComment
};
//# sourceMappingURL=index.mjs.map