// src/react/TogglePlugin.tsx
import { toTPlatePlugin } from "platejs/react";

// src/lib/BaseTogglePlugin.ts
import { createTSlatePlugin, KEYS } from "platejs";
var BaseTogglePlugin = createTSlatePlugin({
  key: KEYS.toggle,
  node: { isElement: true },
  options: {
    openIds: /* @__PURE__ */ new Set()
  }
}).extendSelectors(({ getOptions }) => ({
  isOpen: (toggleId) => {
    return getOptions().openIds.has(toggleId);
  },
  someClosed: (toggleIds) => {
    const { openIds } = getOptions();
    return toggleIds.some((id) => !openIds.has(id));
  }
})).extendApi(({ setOptions }) => ({
  toggleIds: (ids, force = null) => {
    setOptions((draft) => {
      ids.forEach((id) => {
        const isCurrentlyOpen = draft.openIds.has(id);
        const newIsOpen = force === null ? !isCurrentlyOpen : force;
        if (newIsOpen) {
          draft.openIds.add(id);
        } else {
          draft.openIds.delete(id);
        }
      });
    });
  }
}));

// src/react/renderToggleAboveNodes.tsx
import React from "react";

// src/react/toggleIndexAtom.ts
import { useMemo } from "react";
import { KEYS as KEYS2 } from "platejs";
import {
  atom,
  plateStore,
  usePlateStore,
  usePluginOption,
  useStoreAtomValue
} from "platejs/react";
var ListPluginKey = "listStyleType";
var buildToggleIndex = (elements) => {
  const result = /* @__PURE__ */ new Map();
  let currentEnclosingToggles = [];
  elements.forEach((element) => {
    const elementIndent = element[KEYS2.indent] || 0;
    const elementIndentWithListCorrection = element[ListPluginKey] && element[KEYS2.indent] ? elementIndent - 1 : elementIndent;
    const enclosingToggles = currentEnclosingToggles.filter(([_, indent2]) => {
      return indent2 < elementIndentWithListCorrection;
    });
    currentEnclosingToggles = enclosingToggles;
    result.set(
      element.id,
      enclosingToggles.map(([toggleId]) => toggleId)
    );
    if (element.type === KEYS2.toggle) {
      currentEnclosingToggles.push([element.id, elementIndent]);
    }
  });
  return result;
};
var editorAtom = plateStore.atom.trackedEditor;
var useIsVisible = (elementId) => {
  const openIds = usePluginOption(TogglePlugin, "openIds");
  const isVisibleAtom = useMemo(
    () => atom((get) => {
      const toggleIndex = get(toggleIndexAtom);
      const enclosedInToggleIds = toggleIndex.get(elementId) || [];
      return enclosedInToggleIds.every(
        (enclosedId) => openIds.has(enclosedId)
      );
    }),
    [elementId, openIds]
  );
  return useStoreAtomValue(usePlateStore(), isVisibleAtom);
};
var toggleIndexAtom = atom(
  (get) => buildToggleIndex(get(editorAtom).editor.children)
);
var useToggleIndex = () => useStoreAtomValue(usePlateStore(), toggleIndexAtom);

// src/react/renderToggleAboveNodes.tsx
var renderToggleAboveNodes = () => ToggleAboveNodes;
var ToggleAboveNodes = ({ children, element }) => {
  const isVisible = useIsVisible(element.id);
  if (isVisible) return children;
  return /* @__PURE__ */ React.createElement("div", { style: hiddenStyle }, children);
};
var hiddenStyle = {
  height: 0,
  margin: 0,
  overflow: "hidden",
  visibility: "hidden"
};

// src/react/useHooksToggle.ts
import { useEffect } from "react";
var useHooksToggle = ({
  editor,
  setOption
}) => {
  const toggleIndex = useToggleIndex();
  useEffect(() => {
    setOption("toggleIndex", toggleIndex);
  }, [editor, setOption, toggleIndex]);
};

// src/react/withToggle.ts
import { indent } from "@platejs/indent";
import { KEYS as KEYS3, NodeApi } from "platejs";

// src/react/queries/findElementIdsHiddenInToggle.ts
var findElementIdsHiddenInToggle = (openToggleIds, elements) => {
  const toggleIndex = buildToggleIndex(elements);
  return elements.filter((element) => {
    const enclosingToggleIds = toggleIndex.get(element.id) || [];
    return enclosingToggleIds.some(
      (toggleId) => !openToggleIds.has(toggleId)
    );
  }).map((element) => element.id);
};

// src/react/queries/getEnclosingToggleIds.ts
function getEnclosingToggleIds(editor, elementId) {
  return editor.getOptions(TogglePlugin).toggleIndex?.get(elementId) || [];
}

// src/react/queries/getLastEntryEnclosedInToggle.ts
import last from "lodash/last.js";
var getLastEntryEnclosedInToggle = (editor, toggleId) => {
  const toggleIndex = buildToggleIndex(editor.children);
  const entriesInToggle = editor.children.map((node, index) => [node, [index]]).filter(([node]) => {
    return (toggleIndex.get(node.id) || []).includes(toggleId);
  });
  return last(entriesInToggle);
};

// src/react/queries/isInClosedToggle.ts
import { getEditorPlugin } from "platejs";
var isInClosedToggle = (editor, elementId) => {
  const enclosingToggleIds = getEnclosingToggleIds(editor, elementId);
  return getEditorPlugin(editor, TogglePlugin).getOption(
    "someClosed",
    enclosingToggleIds
  );
};

// src/react/transforms/moveCurrentBlockAfterPreviousSelectable.ts
import { ElementApi } from "platejs";
var moveCurrentBlockAfterPreviousSelectable = (editor) => {
  const { selection } = editor;
  if (!selection) return;
  const aboveBlock = editor.api.block();
  if (!aboveBlock) return;
  if (!editor.api.isAt({ start: true })) return;
  const beforePoint = editor.api.before(selection);
  if (!beforePoint) return;
  const blockBefore = editor.api.block({ at: beforePoint });
  if (!blockBefore) return;
  if (!isInClosedToggle(editor, blockBefore[0].id)) return;
  const previousSelectableBlock = editor.api.previous({
    match: (node) => ElementApi.isElement(node) && !isInClosedToggle(editor, node.id)
  });
  if (!previousSelectableBlock) return false;
  const afterSelectableBlock = [previousSelectableBlock[1][0] + 1];
  editor.tf.moveNodes({
    at: aboveBlock[1],
    to: afterSelectableBlock
  });
};

// src/react/transforms/moveNextSelectableAfterCurrentBlock.ts
import { ElementApi as ElementApi2 } from "platejs";
var moveNextSelectableAfterCurrentBlock = (editor) => {
  const { selection } = editor;
  if (!selection) return;
  const aboveBlock = editor.api.block();
  if (!aboveBlock) return;
  if (!editor.api.isAt({ end: true })) return;
  const afterPoint = editor.api.after(selection);
  if (!afterPoint) return;
  const blockAfter = editor.api.block({ at: afterPoint });
  if (!blockAfter) return;
  if (!isInClosedToggle(editor, blockAfter[0].id)) return;
  const nextSelectableBlock = editor.api.next({
    match: (node) => ElementApi2.isElement(node) && !isInClosedToggle(editor, node.id)
  });
  if (!nextSelectableBlock) return false;
  const afterCurrentBlock = [aboveBlock[1][0] + 1];
  editor.tf.moveNodes({
    at: nextSelectableBlock[1],
    to: afterCurrentBlock
  });
};

// src/react/transforms/openNextToggles.ts
var openNextToggles = (editor) => {
  const nodeEntries = Array.from(
    editor.api.nodes({
      block: true,
      mode: "lowest"
    })
  );
  editor.getApi(TogglePlugin).toggle.toggleIds(
    nodeEntries.map(([node]) => node.id),
    true
  );
};

// src/react/withToggle.ts
var withToggle = ({
  api: { isSelectable },
  editor,
  getOption,
  tf: { deleteBackward, deleteForward, insertBreak }
}) => ({
  api: {
    isSelectable(element) {
      if (NodeApi.isNode(element) && isInClosedToggle(editor, element.id))
        return false;
      return isSelectable(element);
    }
  },
  transforms: {
    deleteBackward(unit) {
      if (moveCurrentBlockAfterPreviousSelectable(editor) === false)
        return;
      deleteBackward(unit);
    },
    deleteForward(unit) {
      if (moveNextSelectableAfterCurrentBlock(editor) === false)
        return;
      deleteForward(unit);
    },
    insertBreak() {
      const currentBlockEntry = editor.api.block();
      if (!currentBlockEntry || currentBlockEntry[0].type !== KEYS3.toggle) {
        return insertBreak();
      }
      const toggleId = currentBlockEntry[0].id;
      const isOpen = getOption("isOpen", toggleId);
      editor.tf.withoutNormalizing(() => {
        if (isOpen) {
          insertBreak();
          editor.tf.toggleBlock(KEYS3.toggle);
          indent(editor);
        } else {
          const lastEntryEnclosedInToggle = getLastEntryEnclosedInToggle(
            editor,
            toggleId
          );
          insertBreak();
          if (lastEntryEnclosedInToggle) {
            const newlyInsertedTogglePath = [currentBlockEntry[1][0] + 1];
            const afterLastEntryEncloseInToggle = [
              lastEntryEnclosedInToggle[1][0] + 1
            ];
            editor.tf.moveNodes({
              at: newlyInsertedTogglePath,
              to: afterLastEntryEncloseInToggle
            });
          }
        }
      });
    }
  }
});

// src/react/TogglePlugin.tsx
var TogglePlugin = toTPlatePlugin(BaseTogglePlugin, {
  options: {
    toggleIndex: /* @__PURE__ */ new Map()
  },
  render: {
    aboveNodes: renderToggleAboveNodes
  },
  useHooks: useHooksToggle
}).overrideEditor(withToggle);

// src/react/hooks/useToggleButton.ts
import { useEditorPlugin, usePluginOption as usePluginOption2 } from "platejs/react";

// src/lib/queries/someToggle.ts
import { KEYS as KEYS4 } from "platejs";
var someToggle = (editor) => {
  return !!editor.selection && editor.api.some({
    match: (n) => n.type === KEYS4.toggle
  });
};

// src/react/hooks/useToggleButton.ts
var useToggleButtonState = (toggleId) => {
  const openIds = usePluginOption2(BaseTogglePlugin, "openIds");
  return {
    open: openIds.has(toggleId),
    toggleId
  };
};
var useToggleButton = (state) => {
  const { api } = useEditorPlugin(BaseTogglePlugin);
  return {
    ...state,
    buttonProps: {
      onClick: (e) => {
        e.preventDefault();
        api.toggle.toggleIds([state.toggleId]);
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};

// src/react/hooks/useToggleToolbarButton.ts
import { KEYS as KEYS5 } from "platejs";
import { useEditorRef, useEditorSelector } from "platejs/react";
var useToggleToolbarButtonState = () => {
  const pressed = useEditorSelector((editor) => someToggle(editor), []);
  return {
    pressed
  };
};
var useToggleToolbarButton = ({
  pressed
}) => {
  const editor = useEditorRef();
  return {
    props: {
      pressed,
      onClick: () => {
        openNextToggles(editor);
        editor.tf.toggleBlock(KEYS5.toggle);
        editor.tf.collapse();
        editor.tf.focus();
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};
export {
  TogglePlugin,
  buildToggleIndex,
  editorAtom,
  findElementIdsHiddenInToggle,
  getEnclosingToggleIds,
  getLastEntryEnclosedInToggle,
  isInClosedToggle,
  moveCurrentBlockAfterPreviousSelectable,
  moveNextSelectableAfterCurrentBlock,
  openNextToggles,
  renderToggleAboveNodes,
  toggleIndexAtom,
  useHooksToggle,
  useIsVisible,
  useToggleButton,
  useToggleButtonState,
  useToggleIndex,
  useToggleToolbarButton,
  useToggleToolbarButtonState,
  withToggle
};
//# sourceMappingURL=index.mjs.map