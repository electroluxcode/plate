// src/react/TagPlugin.tsx
import { PathApi, TextApi } from "platejs";
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseTagPlugin.ts
import {
  createSlatePlugin,
  KEYS
} from "platejs";
var BaseTagPlugin = createSlatePlugin({
  key: KEYS.tag,
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
var TagPlugin = toPlatePlugin(BaseTagPlugin);
var MultiSelectPlugin = toPlatePlugin(
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
            match: (n, p) => n.type === type && n.value === node.value && !PathApi.equals(p, path)
          })) {
            editor.tf.removeNodes({
              at: path
            });
            return;
          }
          if (TextApi.isText(node) && node.text) {
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
import React from "react";
import { isDefined } from "platejs";
import { useEditorRef, useEditorString } from "platejs/react";

// src/react/useSelectedItems.ts
import { KEYS as KEYS2 } from "platejs";
import { useEditorSelector } from "platejs/react";
var getSelectedItems = (editor) => {
  const options = editor.api.nodes({
    at: [],
    match: { type: KEYS2.tag }
  });
  return [...options].map(([{ children, type, ...option }]) => ({
    ...option
  }));
};
var useSelectedItems = () => {
  const selectedItems = useEditorSelector(
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
  const editor = useEditorRef();
  const search = useEditorString();
  React.useEffect(() => {
    if (!open) {
      editor.tf.removeNodes({ at: [], empty: false, text: true });
      editor.tf.select([], { edge: "end" });
    }
  }, [editor, open]);
  React.useEffect(() => {
    if (isDefined(search)) {
      selectFirstItem();
    }
  }, [search, selectFirstItem]);
  const selectedItems = useSelectedItems();
  React.useEffect(() => {
    onValueChange?.(selectedItems);
  }, [selectedItems]);
};

// src/react/useSelectableItems.ts
import { useMemo } from "react";
import { useEditorString as useEditorString2 } from "platejs/react";
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
  const search = useEditorString2();
  return useMemo(() => {
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
export {
  MultiSelectPlugin,
  TagPlugin,
  getSelectedItems,
  useSelectEditorCombobox,
  useSelectableItems,
  useSelectedItems
};
//# sourceMappingURL=index.mjs.map