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
  TogglePlugin: () => TogglePlugin,
  buildToggleIndex: () => buildToggleIndex,
  editorAtom: () => editorAtom,
  findElementIdsHiddenInToggle: () => findElementIdsHiddenInToggle,
  getEnclosingToggleIds: () => getEnclosingToggleIds,
  getLastEntryEnclosedInToggle: () => getLastEntryEnclosedInToggle,
  isInClosedToggle: () => isInClosedToggle,
  moveCurrentBlockAfterPreviousSelectable: () => moveCurrentBlockAfterPreviousSelectable,
  moveNextSelectableAfterCurrentBlock: () => moveNextSelectableAfterCurrentBlock,
  openNextToggles: () => openNextToggles,
  renderToggleAboveNodes: () => renderToggleAboveNodes,
  toggleIndexAtom: () => toggleIndexAtom,
  useHooksToggle: () => useHooksToggle,
  useIsVisible: () => useIsVisible,
  useToggleButton: () => useToggleButton,
  useToggleButtonState: () => useToggleButtonState,
  useToggleIndex: () => useToggleIndex,
  useToggleToolbarButton: () => useToggleToolbarButton,
  useToggleToolbarButtonState: () => useToggleToolbarButtonState,
  withToggle: () => withToggle
});
module.exports = __toCommonJS(react_exports);

// src/react/TogglePlugin.tsx
var import_react5 = require("platejs/react");

// src/lib/BaseTogglePlugin.ts
var import_platejs = require("platejs");
var BaseTogglePlugin = (0, import_platejs.createTSlatePlugin)({
  key: import_platejs.KEYS.toggle,
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
var import_react3 = __toESM(require("react"));

// src/react/toggleIndexAtom.ts
var import_react = require("react");
var import_platejs2 = require("platejs");
var import_react2 = require("platejs/react");
var ListPluginKey = "listStyleType";
var buildToggleIndex = (elements) => {
  const result = /* @__PURE__ */ new Map();
  let currentEnclosingToggles = [];
  elements.forEach((element) => {
    const elementIndent = element[import_platejs2.KEYS.indent] || 0;
    const elementIndentWithListCorrection = element[ListPluginKey] && element[import_platejs2.KEYS.indent] ? elementIndent - 1 : elementIndent;
    const enclosingToggles = currentEnclosingToggles.filter(([_, indent2]) => {
      return indent2 < elementIndentWithListCorrection;
    });
    currentEnclosingToggles = enclosingToggles;
    result.set(
      element.id,
      enclosingToggles.map(([toggleId]) => toggleId)
    );
    if (element.type === import_platejs2.KEYS.toggle) {
      currentEnclosingToggles.push([element.id, elementIndent]);
    }
  });
  return result;
};
var editorAtom = import_react2.plateStore.atom.trackedEditor;
var useIsVisible = (elementId) => {
  const openIds = (0, import_react2.usePluginOption)(TogglePlugin, "openIds");
  const isVisibleAtom = (0, import_react.useMemo)(
    () => (0, import_react2.atom)((get) => {
      const toggleIndex = get(toggleIndexAtom);
      const enclosedInToggleIds = toggleIndex.get(elementId) || [];
      return enclosedInToggleIds.every(
        (enclosedId) => openIds.has(enclosedId)
      );
    }),
    [elementId, openIds]
  );
  return (0, import_react2.useStoreAtomValue)((0, import_react2.usePlateStore)(), isVisibleAtom);
};
var toggleIndexAtom = (0, import_react2.atom)(
  (get) => buildToggleIndex(get(editorAtom).editor.children)
);
var useToggleIndex = () => (0, import_react2.useStoreAtomValue)((0, import_react2.usePlateStore)(), toggleIndexAtom);

// src/react/renderToggleAboveNodes.tsx
var renderToggleAboveNodes = () => ToggleAboveNodes;
var ToggleAboveNodes = ({ children, element }) => {
  const isVisible = useIsVisible(element.id);
  if (isVisible) return children;
  return /* @__PURE__ */ import_react3.default.createElement("div", { style: hiddenStyle }, children);
};
var hiddenStyle = {
  height: 0,
  margin: 0,
  overflow: "hidden",
  visibility: "hidden"
};

// src/react/useHooksToggle.ts
var import_react4 = require("react");
var useHooksToggle = ({
  editor,
  setOption
}) => {
  const toggleIndex = useToggleIndex();
  (0, import_react4.useEffect)(() => {
    setOption("toggleIndex", toggleIndex);
  }, [editor, setOption, toggleIndex]);
};

// src/react/withToggle.ts
var import_indent = require("@platejs/indent");
var import_platejs6 = require("platejs");

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
var import_last = __toESM(require("lodash/last.js"));
var getLastEntryEnclosedInToggle = (editor, toggleId) => {
  const toggleIndex = buildToggleIndex(editor.children);
  const entriesInToggle = editor.children.map((node, index) => [node, [index]]).filter(([node]) => {
    return (toggleIndex.get(node.id) || []).includes(toggleId);
  });
  return (0, import_last.default)(entriesInToggle);
};

// src/react/queries/isInClosedToggle.ts
var import_platejs3 = require("platejs");
var isInClosedToggle = (editor, elementId) => {
  const enclosingToggleIds = getEnclosingToggleIds(editor, elementId);
  return (0, import_platejs3.getEditorPlugin)(editor, TogglePlugin).getOption(
    "someClosed",
    enclosingToggleIds
  );
};

// src/react/transforms/moveCurrentBlockAfterPreviousSelectable.ts
var import_platejs4 = require("platejs");
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
    match: (node) => import_platejs4.ElementApi.isElement(node) && !isInClosedToggle(editor, node.id)
  });
  if (!previousSelectableBlock) return false;
  const afterSelectableBlock = [previousSelectableBlock[1][0] + 1];
  editor.tf.moveNodes({
    at: aboveBlock[1],
    to: afterSelectableBlock
  });
};

// src/react/transforms/moveNextSelectableAfterCurrentBlock.ts
var import_platejs5 = require("platejs");
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
    match: (node) => import_platejs5.ElementApi.isElement(node) && !isInClosedToggle(editor, node.id)
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
      if (import_platejs6.NodeApi.isNode(element) && isInClosedToggle(editor, element.id))
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
      if (!currentBlockEntry || currentBlockEntry[0].type !== import_platejs6.KEYS.toggle) {
        return insertBreak();
      }
      const toggleId = currentBlockEntry[0].id;
      const isOpen = getOption("isOpen", toggleId);
      editor.tf.withoutNormalizing(() => {
        if (isOpen) {
          insertBreak();
          editor.tf.toggleBlock(import_platejs6.KEYS.toggle);
          (0, import_indent.indent)(editor);
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
var TogglePlugin = (0, import_react5.toTPlatePlugin)(BaseTogglePlugin, {
  options: {
    toggleIndex: /* @__PURE__ */ new Map()
  },
  render: {
    aboveNodes: renderToggleAboveNodes
  },
  useHooks: useHooksToggle
}).overrideEditor(withToggle);

// src/react/hooks/useToggleButton.ts
var import_react6 = require("platejs/react");

// src/lib/queries/someToggle.ts
var import_platejs7 = require("platejs");
var someToggle = (editor) => {
  return !!editor.selection && editor.api.some({
    match: (n) => n.type === import_platejs7.KEYS.toggle
  });
};

// src/react/hooks/useToggleButton.ts
var useToggleButtonState = (toggleId) => {
  const openIds = (0, import_react6.usePluginOption)(BaseTogglePlugin, "openIds");
  return {
    open: openIds.has(toggleId),
    toggleId
  };
};
var useToggleButton = (state) => {
  const { api } = (0, import_react6.useEditorPlugin)(BaseTogglePlugin);
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
var import_platejs8 = require("platejs");
var import_react7 = require("platejs/react");
var useToggleToolbarButtonState = () => {
  const pressed = (0, import_react7.useEditorSelector)((editor) => someToggle(editor), []);
  return {
    pressed
  };
};
var useToggleToolbarButton = ({
  pressed
}) => {
  const editor = (0, import_react7.useEditorRef)();
  return {
    props: {
      pressed,
      onClick: () => {
        openNextToggles(editor);
        editor.tf.toggleBlock(import_platejs8.KEYS.toggle);
        editor.tf.collapse();
        editor.tf.focus();
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.js.map