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
  ColumnItemPlugin: () => ColumnItemPlugin,
  ColumnPlugin: () => ColumnPlugin,
  useDebouncePopoverOpen: () => useDebouncePopoverOpen
});
module.exports = __toCommonJS(react_exports);

// src/react/ColumnPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseColumnPlugin.ts
var import_platejs2 = require("platejs");

// src/lib/withColumn.ts
var import_platejs = require("platejs");
var withColumn = ({
  editor,
  tf: { apply, normalizeNode, selectAll },
  type
}) => ({
  transforms: {
    normalizeNode([n, path]) {
      if (import_platejs.ElementApi.isElement(n) && n.type === editor.getType(import_platejs.KEYS.columnGroup)) {
        const node = n;
        const firstChild = node.children[0];
        if (node.children.length === 1 && firstChild.type === editor.getType(import_platejs.KEYS.p)) {
          editor.tf.unwrapNodes({ at: import_platejs.PathApi.child(path, 0) });
        }
        if (!node.children.some(
          (child) => import_platejs.ElementApi.isElement(child) && child.type === type
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
      if (import_platejs.ElementApi.isElement(n) && n.type === type) {
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
          targetPath = import_platejs.PathApi.parent(targetPath);
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
var BaseColumnItemPlugin = (0, import_platejs2.createSlatePlugin)({
  key: import_platejs2.KEYS.column,
  node: { isContainer: true, isElement: true, isStrictSiblings: true }
}).overrideEditor(withColumn);
var BaseColumnPlugin = (0, import_platejs2.createSlatePlugin)({
  key: import_platejs2.KEYS.columnGroup,
  node: { isContainer: true, isElement: true },
  plugins: [BaseColumnItemPlugin]
});

// src/react/ColumnPlugin.tsx
var ColumnItemPlugin = (0, import_react.toPlatePlugin)(BaseColumnItemPlugin);
var ColumnPlugin = (0, import_react.toPlatePlugin)(BaseColumnPlugin, {
  plugins: [ColumnItemPlugin]
});

// src/react/hooks/useDebouncePopoverOpen.ts
var import_react2 = require("platejs/react");
var useDebouncePopoverOpen = () => {
  const readOnly = (0, import_react2.useReadOnly)();
  const selected = (0, import_react2.useSelected)();
  const selectionCollapsed = (0, import_react2.useEditorSelector)(
    (editor) => editor.api.isCollapsed(),
    []
  );
  return !readOnly && selected && selectionCollapsed;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColumnItemPlugin,
  ColumnPlugin,
  useDebouncePopoverOpen
});
//# sourceMappingURL=index.js.map