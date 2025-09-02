import type { OverrideEditor } from '@platejs/core';

import { PathApi, queryNode } from '@platejs/slate';

import type { TrailingBlockConfig } from './TrailingBlockPlugin';

/**
 * Add a trailing block when the last node type is not `type` and when the
 * editor has .
 */
export const withTrailingBlock: OverrideEditor<TrailingBlockConfig> = ({
  editor,
  getOptions,
  tf: { normalizeNode },
}) => ({
  transforms: {
    normalizeNode([currentNode, currentPath]) {
      const { level, type, match, ...query } = getOptions();

      if (currentPath.length === 0) {
        const lastChild = editor.api.last([], { level });
        const lastChildNode = lastChild?.[0];

        if (
          !lastChildNode ||
          (lastChildNode.type !== type && queryNode(lastChild, query)) || 
          (match?.(lastChildNode))
        ) {
          const at = lastChild ? PathApi.next(lastChild[1]) : [0];

          editor.tf.insertNodes(editor.api.create.block({ type }, at), { at });

          return;
        }
      }

      return normalizeNode([currentNode, currentPath]);
    },
  },
});
