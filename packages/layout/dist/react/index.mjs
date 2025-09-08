// src/react/ColumnPlugin.tsx
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseColumnPlugin.ts
import { createSlatePlugin, KEYS as KEYS2 } from "platejs";

// src/lib/withColumn.ts
import {
  ElementApi,
  KEYS,
  PathApi
} from "platejs";
var withColumn = ({
  editor,
  tf: { apply, normalizeNode, selectAll },
  type
}) => ({
  transforms: {
    normalizeNode([n, path]) {
      if (ElementApi.isElement(n) && n.type === editor.getType(KEYS.columnGroup)) {
        const node = n;
        const firstChild = node.children[0];
        if (node.children.length === 1 && firstChild.type === editor.getType(KEYS.p)) {
          editor.tf.unwrapNodes({ at: PathApi.child(path, 0) });
        }
        if (!node.children.some(
          (child) => ElementApi.isElement(child) && child.type === type
        )) {
          editor.tf.removeNodes({ at: path });
          return;
        }
        if (node.children.length < 2) {
          editor.tf.withoutNormalizing(() => {
            editor.tf.unwrapNodes({ at: path });
            editor.tf.unwrapNodes({ at: path });
          });
          return;
        }
        editor.tf.withoutNormalizing(() => {
          const totalColumns = node.children.length;
          let widths = node.children.map((col) => {
            const parsed = Number.parseFloat(col.width);
            return Number.isNaN(parsed) ? 0 : parsed;
          });
          const sum = widths.reduce((acc, w) => acc + w, 0);
          if (sum !== 100) {
            const diff = 100 - sum;
            const adjustment = diff / totalColumns;
            widths = widths.map((w) => w + adjustment);
            widths.forEach((w, i) => {
              const columnPath = path.concat([i]);
              editor.tf.setNodes(
                { width: `${w}%` },
                { at: columnPath }
              );
            });
          }
        });
      }
      if (ElementApi.isElement(n) && n.type === type) {
        const node = n;
        if (node.children.length === 0) {
          editor.tf.removeNodes({ at: path });
          return;
        }
      }
      return normalizeNode([n, path]);
    },
    selectAll: () => {
      const apply2 = () => {
        const at = editor.selection;
        if (!at) return;
        const column = editor.api.above({
          match: { type }
        });
        if (!column) return;
        let targetPath = column[1];
        if (editor.api.isStart(editor.api.start(at), targetPath) && editor.api.isEnd(editor.api.end(at), targetPath)) {
          targetPath = PathApi.parent(targetPath);
        }
        if (targetPath.length === 0) return;
        editor.tf.select(targetPath);
        return true;
      };
      if (apply2()) return true;
      return selectAll();
    }
  }
});

// src/lib/BaseColumnPlugin.ts
var BaseColumnItemPlugin = createSlatePlugin({
  key: KEYS2.column,
  node: { isContainer: true, isElement: true, isStrictSiblings: true }
}).overrideEditor(withColumn);
var BaseColumnPlugin = createSlatePlugin({
  key: KEYS2.columnGroup,
  node: { isContainer: true, isElement: true },
  plugins: [BaseColumnItemPlugin]
});

// src/react/ColumnPlugin.tsx
var ColumnItemPlugin = toPlatePlugin(BaseColumnItemPlugin);
var ColumnPlugin = toPlatePlugin(BaseColumnPlugin, {
  plugins: [ColumnItemPlugin]
});

// src/react/hooks/useDebouncePopoverOpen.ts
import { useEditorSelector, useReadOnly, useSelected } from "platejs/react";
var useDebouncePopoverOpen = () => {
  const readOnly = useReadOnly();
  const selected = useSelected();
  const selectionCollapsed = useEditorSelector(
    (editor) => editor.api.isCollapsed(),
    []
  );
  return !readOnly && selected && selectionCollapsed;
};
export {
  ColumnItemPlugin,
  ColumnPlugin,
  useDebouncePopoverOpen
};
//# sourceMappingURL=index.mjs.map