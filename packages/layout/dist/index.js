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
  BaseColumnItemPlugin: () => BaseColumnItemPlugin,
  BaseColumnPlugin: () => BaseColumnPlugin,
  columnsToWidths: () => columnsToWidths,
  insertColumn: () => insertColumn,
  insertColumnGroup: () => insertColumnGroup,
  moveMiddleColumn: () => moveMiddleColumn,
  resizeColumn: () => resizeColumn,
  setColumns: () => setColumns,
  toggleColumnGroup: () => toggleColumnGroup,
  withColumn: () => withColumn
});
module.exports = __toCommonJS(index_exports);

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

// src/lib/transforms/insertColumn.ts
var import_platejs3 = require("platejs");
var insertColumn = (editor, { width = "33%", ...options } = {}) => {
  editor.tf.insertNodes(
    {
      children: [editor.api.create.block()],
      type: editor.getType(import_platejs3.KEYS.column),
      width
    },
    options
  );
};

// src/lib/transforms/insertColumnGroup.ts
var import_platejs4 = require("platejs");
var insertColumnGroup = (editor, {
  columns = 2,
  select: selectProp,
  ...options
} = {}) => {
  const width = 100 / columns;
  editor.tf.withoutNormalizing(() => {
    editor.tf.insertNodes(
      {
        children: new Array(columns).fill(null).map(() => ({
          children: [editor.api.create.block()],
          type: editor.getType(import_platejs4.KEYS.column),
          width: `${width}%`
        })),
        type: editor.getType(import_platejs4.KEYS.columnGroup)
      },
      options
    );
    if (selectProp) {
      const entry = editor.api.node({
        at: options.at,
        match: { type: editor.getType(import_platejs4.KEYS.column) }
      });
      if (!entry) return;
      editor.tf.select(entry[1].concat([0]));
    }
  });
};

// src/lib/transforms/moveMiddleColumn.ts
var import_platejs5 = require("platejs");
var moveMiddleColumn = (editor, [node, path], options) => {
  const direction = options?.direction || "left";
  if (direction === "left") {
    const DESCENDANT_PATH = [1];
    const middleChildNode = import_platejs5.NodeApi.get(node, DESCENDANT_PATH);
    if (!middleChildNode) return false;
    const isEmpty = import_platejs5.NodeApi.string(middleChildNode) === "";
    const middleChildPathRef = editor.api.pathRef(path.concat(DESCENDANT_PATH));
    if (isEmpty) {
      editor.tf.removeNodes({ at: middleChildPathRef.current });
      return false;
    }
    const firstNode = import_platejs5.NodeApi.descendant(node, [0]);
    if (!firstNode) return false;
    const firstLast = path.concat([0, firstNode.children.length]);
    editor.tf.moveNodes({ at: middleChildPathRef.current, to: firstLast });
    editor.tf.unwrapNodes({ at: middleChildPathRef.current });
    middleChildPathRef.unref();
  }
};

// src/lib/transforms/resizeColumn.ts
function resizeColumn(columnGroup, columnId, newWidthPercent) {
  const widths = columnGroup.children.map(
    (col) => col.width ? Number.parseFloat(col.width) : 0
  );
  const totalBefore = widths.reduce((sum, w) => sum + w, 0);
  if (totalBefore === 0) {
    const evenWidth = 100 / columnGroup.children.length;
    columnGroup.children.forEach((col) => {
      col.width = `${evenWidth}%`;
    });
    return columnGroup;
  }
  const index = columnGroup.children.findIndex((col) => col.id === columnId);
  if (index === -1) return columnGroup;
  widths[index] = newWidthPercent;
  let totalAfter = widths.reduce((sum, w) => sum + w, 0);
  const diff = 100 - totalAfter;
  if (diff !== 0) {
    const siblingIndex = (index + 1) % widths.length;
    widths[siblingIndex] = Math.max(widths[siblingIndex] + diff, 0);
  }
  totalAfter = widths.reduce((sum, w) => sum + w, 0);
  if (Math.round(totalAfter) !== 100) {
    const scale = 100 / totalAfter;
    for (let i = 0; i < widths.length; i++) {
      widths[i] = Number.parseFloat((widths[i] * scale).toFixed(2));
    }
  }
  columnGroup.children.forEach((col, i) => {
    col.width = `${widths[i]}%`;
  });
  return columnGroup;
}

// src/lib/transforms/setColumns.ts
var import_platejs6 = require("platejs");
var import_platejs7 = require("platejs");

// src/lib/utils/columnsToWidths.ts
var columnsToWidths = ({ columns = 2 } = {}) => new Array(columns).fill(null).map(() => `${100 / columns}%`);

// src/lib/transforms/setColumns.ts
var setColumns = (editor, {
  at,
  columns,
  widths
}) => {
  editor.tf.withoutNormalizing(() => {
    if (!at) return;
    widths = widths ?? columnsToWidths({ columns });
    if (widths.length === 0) {
      return;
    }
    const columnGroup = editor.api.node(at);
    if (!columnGroup) return;
    const [{ children }, path] = columnGroup;
    const currentCount = children.length;
    const targetCount = widths.length;
    if (currentCount === targetCount) {
      widths.forEach((width, i) => {
        editor.tf.setNodes({ width }, { at: path.concat([i]) });
      });
      return;
    }
    if (targetCount > currentCount) {
      const columnsToAdd = targetCount - currentCount;
      const insertPath = path.concat([currentCount]);
      const newColumns = new Array(columnsToAdd).fill(null).map((_, i) => ({
        children: [editor.api.create.block()],
        type: editor.getType(import_platejs7.KEYS.column),
        width: widths[currentCount + i] || `${100 / targetCount}%`
      }));
      editor.tf.insertNodes(newColumns, { at: insertPath });
      widths.forEach((width, i) => {
        editor.tf.setNodes({ width }, { at: path.concat([i]) });
      });
      return;
    }
    if (targetCount < currentCount) {
      const keepColumnIndex = targetCount - 1;
      const keepColumnPath = path.concat([keepColumnIndex]);
      const keepColumnNode = import_platejs6.NodeApi.get(
        editor,
        keepColumnPath
      );
      if (!keepColumnNode) return;
      const to = keepColumnPath.concat([keepColumnNode.children.length]);
      for (let i = currentCount - 1; i > keepColumnIndex; i--) {
        const columnPath = path.concat([i]);
        const columnEntry = editor.api.node(columnPath);
        if (!columnEntry) continue;
        editor.tf.moveNodes({
          at: columnEntry[1],
          children: true,
          to
        });
      }
      for (let i = currentCount - 1; i > keepColumnIndex; i--) {
        editor.tf.removeNodes({ at: path.concat([i]) });
      }
      widths.forEach((width, i) => {
        editor.tf.setNodes({ width }, { at: path.concat([i]) });
      });
    }
  });
};

// src/lib/transforms/toggleColumnGroup.ts
var import_platejs8 = require("platejs");
var toggleColumnGroup = (editor, {
  at,
  columns = 2,
  widths
} = {}) => {
  const entry = editor.api.block({ at });
  const columnGroupEntry = editor.api.block({
    above: true,
    at,
    match: { type: editor.getType(import_platejs8.KEYS.columnGroup) }
  });
  if (!entry) return;
  const [node, path] = entry;
  if (columnGroupEntry) {
    setColumns(editor, { at: columnGroupEntry[1], columns, widths });
  } else {
    const columnWidths = widths || columnsToWidths({ columns });
    const nodes = {
      children: new Array(columns).fill(null).map((_, index) => ({
        children: [index === 0 ? node : editor.api.create.block()],
        type: editor.getType(import_platejs8.KEYS.column),
        width: columnWidths[index]
      })),
      type: editor.getType(import_platejs8.KEYS.columnGroup)
    };
    editor.tf.replaceNodes(nodes, {
      at: path
    });
    editor.tf.select(editor.api.start(path.concat([0])));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseColumnItemPlugin,
  BaseColumnPlugin,
  columnsToWidths,
  insertColumn,
  insertColumnGroup,
  moveMiddleColumn,
  resizeColumn,
  setColumns,
  toggleColumnGroup,
  withColumn
});
//# sourceMappingURL=index.js.map