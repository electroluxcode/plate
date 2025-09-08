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
  MultiSelectPlugin: () => MultiSelectPlugin,
  TagPlugin: () => TagPlugin,
  getSelectedItems: () => getSelectedItems,
  useSelectEditorCombobox: () => useSelectEditorCombobox,
  useSelectableItems: () => useSelectableItems,
  useSelectedItems: () => useSelectedItems
});
module.exports = __toCommonJS(react_exports);

// src/react/TagPlugin.tsx
var import_platejs2 = require("platejs");
var import_react = require("platejs/react");

// src/lib/BaseTagPlugin.ts
var import_platejs = require("platejs");
var BaseTagPlugin = (0, import_platejs.createSlatePlugin)({
  key: import_platejs.KEYS.tag,
  node: {
    isElement: true,
    isInline: true,
    isVoid: true
  }
}).extendEditorTransforms(({ editor, type }) => ({
  insert: {
    tag: (props, options) => {
      editor.tf.insertNodes(
        [
          {
            children: [{ text: "" }],
            type,
            ...props
          },
          { text: "" }
        ],
        options
      );
    }
  }
}));

// src/react/TagPlugin.tsx
var TagPlugin = (0, import_react.toPlatePlugin)(BaseTagPlugin);
var MultiSelectPlugin = (0, import_react.toPlatePlugin)(
  BaseTagPlugin.overrideEditor(
    ({
      api: { onChange },
      editor,
      tf: { deleteBackward, normalizeNode },
      type
    }) => ({
      api: {
        onChange(op) {
          onChange(op);
          const someTag = editor.api.some({
            match: { type }
          });
          if (someTag || !editor.selection) {
            editor.tf.removeNodes({
              at: [],
              empty: false,
              text: true
            });
          } else {
            const texts = new Set(
              Array.from(
                editor.api.nodes({
                  text: true
                })
              ).map(([text]) => text)
            );
            editor.tf.removeNodes({
              at: [],
              empty: false,
              text: true,
              match: (text) => !texts.has(text)
            });
          }
        }
      },
      transforms: {
        deleteBackward(unit) {
          deleteBackward(unit);
          if (editor.api.some({
            match: (n) => n.type === type
          })) {
            editor.tf.move();
          }
        },
        normalizeNode([node, path]) {
          if (node.type === type && editor.api.some({
            at: [],
            match: (n, p) => n.type === type && n.value === node.value && !import_platejs2.PathApi.equals(p, path)
          })) {
            editor.tf.removeNodes({
              at: path
            });
            return;
          }
          if (import_platejs2.TextApi.isText(node) && node.text) {
            const trimmedText = node.text.trimStart();
            if (trimmedText !== node.text) {
              editor.tf.replaceNodes(
                { text: trimmedText },
                {
                  at: path,
                  select: true
                }
              );
              return;
            }
          }
          normalizeNode([node, path]);
        }
      }
    })
  )
);

// src/react/useSelectEditorCombobox.ts
var import_react3 = __toESM(require("react"));
var import_platejs4 = require("platejs");
var import_react4 = require("platejs/react");

// src/react/useSelectedItems.ts
var import_platejs3 = require("platejs");
var import_react2 = require("platejs/react");
var getSelectedItems = (editor) => {
  const options = editor.api.nodes({
    at: [],
    match: { type: import_platejs3.KEYS.tag }
  });
  return [...options].map(([{ children, type, ...option }]) => ({
    ...option
  }));
};
var useSelectedItems = () => {
  const selectedItems = (0, import_react2.useEditorSelector)(
    (editor) => getSelectedItems(editor),
    [],
    {
      equalityFn: (prev, next) => {
        if (prev.length !== next.length) return false;
        return prev.every((item, index) => item.value === next[index].value);
      }
    }
  );
  return selectedItems;
};

// src/react/useSelectEditorCombobox.ts
var useSelectEditorCombobox = ({
  open,
  selectFirstItem,
  onValueChange
}) => {
  const editor = (0, import_react4.useEditorRef)();
  const search = (0, import_react4.useEditorString)();
  import_react3.default.useEffect(() => {
    if (!open) {
      editor.tf.removeNodes({ at: [], empty: false, text: true });
      editor.tf.select([], { edge: "end" });
    }
  }, [editor, open]);
  import_react3.default.useEffect(() => {
    if ((0, import_platejs4.isDefined)(search)) {
      selectFirstItem();
    }
  }, [search, selectFirstItem]);
  const selectedItems = useSelectedItems();
  import_react3.default.useEffect(() => {
    onValueChange?.(selectedItems);
  }, [selectedItems]);
};

// src/react/useSelectableItems.ts
var import_react5 = require("react");
var import_react6 = require("platejs/react");
var defaultFilter = (value, search) => value.toLowerCase().includes(search.toLowerCase());
var defaultNewItemFilter = (search) => {
  const trimmed = search.trim();
  return trimmed.length >= 2;
};
var useSelectableItems = ({
  allowNew = true,
  filter = defaultFilter,
  items = [],
  newItemFilter = defaultNewItemFilter,
  newItemPosition = "end"
}) => {
  const selectedItems = useSelectedItems();
  const search = (0, import_react6.useEditorString)();
  return (0, import_react5.useMemo)(() => {
    const uniqueItems = Array.from(new Set(items));
    const trimmedSearch = search?.trim().replaceAll(/\s+/g, " ") || "";
    const searchItem = allowNew && trimmedSearch && newItemFilter(trimmedSearch) && !uniqueItems.some(
      (item) => item.value.toLowerCase() === trimmedSearch.toLowerCase()
    ) ? [{ isNew: true, value: trimmedSearch }] : [];
    const orderedItems = newItemPosition === "start" ? [...searchItem, ...uniqueItems] : [...uniqueItems, ...searchItem];
    const availableItems = orderedItems.filter(
      (item) => !selectedItems.some(
        (s) => s.value.toLowerCase() === item.value.toLowerCase()
      )
    );
    if (!trimmedSearch) return availableItems;
    return availableItems.filter((item) => filter(item.value, trimmedSearch));
  }, [
    items,
    selectedItems,
    search,
    filter,
    allowNew,
    newItemPosition,
    newItemFilter
  ]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MultiSelectPlugin,
  TagPlugin,
  getSelectedItems,
  useSelectEditorCombobox,
  useSelectableItems,
  useSelectedItems
});
//# sourceMappingURL=index.js.map