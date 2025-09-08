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
  Caption: () => Caption,
  CaptionPlugin: () => CaptionPlugin,
  CaptionTextarea: () => CaptionTextarea,
  TextareaAutosize: () => TextareaAutosize,
  showCaption: () => showCaption,
  useCaption: () => useCaption,
  useCaptionButton: () => useCaptionButton,
  useCaptionButtonState: () => useCaptionButtonState,
  useCaptionState: () => useCaptionState,
  useCaptionString: () => useCaptionString,
  useCaptionTextarea: () => useCaptionTextarea,
  useCaptionTextareaFocus: () => useCaptionTextareaFocus,
  useCaptionTextareaState: () => useCaptionTextareaState
});
module.exports = __toCommonJS(react_exports);

// src/react/CaptionPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseCaptionPlugin.ts
var import_platejs2 = require("platejs");

// src/lib/withCaption.ts
var import_platejs = require("platejs");
var withCaption = ({
  editor,
  getOptions,
  tf: { apply, moveLine }
}) => {
  return {
    transforms: {
      apply(operation) {
        const { query } = getOptions();
        if (operation.type === "set_selection") {
          const newSelection = {
            ...editor.selection,
            ...operation.newProperties
          };
          if (editor.dom.currentKeyboardEvent && (0, import_platejs.isHotkey)("up", editor.dom.currentKeyboardEvent) && newSelection && import_platejs.RangeApi.isCollapsed(newSelection)) {
            const types = (0, import_platejs.getPluginTypes)(editor, query.allow);
            const entry = editor.api.above({
              at: newSelection,
              match: { type: types }
            });
            if (entry) {
              const [node] = entry;
              if (node.caption && import_platejs.NodeApi.string({ children: node.caption }).length > 0) {
                setTimeout(() => {
                  editor.setOption(BaseCaptionPlugin, "focusEndPath", entry[1]);
                }, 0);
              }
            }
          }
        }
        apply(operation);
      },
      moveLine: (options) => {
        const apply2 = () => {
          if (!options.reverse) {
            const types = (0, import_platejs.getPluginTypes)(editor, getOptions().query.allow);
            const entry = editor.api.block({
              match: { type: types }
            });
            if (!entry) return;
            editor.setOption(BaseCaptionPlugin, "focusEndPath", entry[1]);
            return true;
          }
        };
        if (apply2()) return true;
        return moveLine(options);
      }
    }
  };
};

// src/lib/BaseCaptionPlugin.ts
var BaseCaptionPlugin = (0, import_platejs2.createTSlatePlugin)({
  key: import_platejs2.KEYS.caption,
  options: {
    focusEndPath: null,
    focusStartPath: null,
    query: { allow: [] },
    visibleId: null
  }
}).extendSelectors(({ getOptions }) => ({
  isVisible: (elementId) => getOptions().visibleId === elementId
})).overrideEditor(withCaption);

// src/react/CaptionPlugin.tsx
var CaptionPlugin = (0, import_react.toPlatePlugin)(BaseCaptionPlugin);

// src/react/components/Caption.tsx
var import_react4 = require("platejs/react");

// src/react/hooks/useCaptionString.ts
var import_react2 = __toESM(require("react"));
var import_platejs3 = require("platejs");
var import_react3 = require("platejs/react");
var useCaptionString = () => {
  const { caption: nodeCaption = [{ children: [{ text: "" }] }] } = (0, import_react3.useElement)();
  return import_react2.default.useMemo(() => {
    return import_platejs3.NodeApi.string(nodeCaption[0]) || "";
  }, [nodeCaption]);
};

// src/react/components/Caption.tsx
var useCaptionState = (options = {}) => {
  const element = (0, import_react4.useElement)();
  const captionString = useCaptionString();
  const showCaption2 = (0, import_react4.usePluginOption)(
    CaptionPlugin,
    "isVisible",
    element.id
  );
  const selected = (0, import_react4.useSelected)();
  const _readOnly = (0, import_react4.useReadOnly)();
  const readOnly = options.readOnly || _readOnly;
  const hidden = !showCaption2 && captionString.length === 0;
  return {
    captionString,
    hidden,
    readOnly,
    selected
  };
};
var useCaption = (state) => {
  return {
    hidden: state.hidden
  };
};
var Caption = (0, import_react4.createPrimitiveComponent)(
  "figcaption"
)({
  propsHook: useCaption,
  stateHook: useCaptionState
});

// src/react/components/CaptionButton.tsx
var import_react5 = require("platejs/react");
var useCaptionButtonState = () => {
  const editor = (0, import_react5.useEditorRef)();
  const element = (0, import_react5.useElement)();
  return { editor, element };
};
var useCaptionButton = ({
  editor,
  element
}) => {
  return {
    props: {
      onClick: () => {
        const path = editor.api.findPath(element);
        editor.setOption(BaseCaptionPlugin, "visibleId", element.id);
        setTimeout(() => {
          path && editor.setOption(BaseCaptionPlugin, "focusEndPath", path);
        }, 0);
      }
    }
  };
};

// src/react/components/CaptionTextarea.tsx
var import_react8 = __toESM(require("react"));
var import_platejs4 = require("platejs");
var import_react9 = require("platejs/react");

// src/react/components/TextareaAutosize.tsx
var import_react6 = __toESM(require("react"));
var import_react_textarea_autosize = __toESM(require("react-textarea-autosize"));
var import_react7 = require("platejs/react");
var TextareaAutosize = import_react6.default.forwardRef((props, ref) => {
  const [isRerendered, setIsRerendered] = import_react6.default.useState(false);
  (0, import_react7.useIsomorphicLayoutEffect)(() => setIsRerendered(true), []);
  return isRerendered ? /* @__PURE__ */ import_react6.default.createElement(import_react_textarea_autosize.default, { ...props, ref }) : null;
});
TextareaAutosize.displayName = "TextareaAutosize";

// src/react/components/CaptionTextarea.tsx
var useCaptionTextareaFocus = (textareaRef) => {
  const editor = (0, import_react9.useEditorRef)();
  const element = (0, import_react9.useElement)();
  const focusCaptionPath = (0, import_react9.usePluginOption)(CaptionPlugin, "focusEndPath");
  import_react8.default.useEffect(() => {
    if (focusCaptionPath && textareaRef.current) {
      const path = editor.api.findPath(element);
      if (path && import_platejs4.PathApi.equals(path, focusCaptionPath)) {
        textareaRef.current.focus();
        editor.setOption(CaptionPlugin, "focusEndPath", null);
      }
    }
  }, [editor, element, focusCaptionPath, textareaRef]);
};
var useCaptionTextareaState = () => {
  const element = (0, import_react9.useElement)();
  const editor = (0, import_react9.useEditorRef)();
  const [isComposing, setIsComposing] = (0, import_react8.useState)(false);
  const [captionValue, setCaptionValue] = (0, import_react8.useState)(() => {
    const nodeCaption = element.caption ?? [{ children: [{ text: "" }] }];
    return import_platejs4.NodeApi.string(nodeCaption[0]);
  });
  const updateEditorCaptionValue = (0, import_react8.useCallback)(
    (newValue) => {
      editor.tf.setNodes(
        { caption: [{ text: newValue }] },
        { at: element }
      );
    },
    [editor, element]
  );
  const handleChange = (0, import_react8.useCallback)(
    (e) => {
      const newValue = e.target.value;
      setCaptionValue(newValue);
      if (!isComposing) {
        updateEditorCaptionValue(newValue);
      }
    },
    [isComposing, updateEditorCaptionValue]
  );
  const handleCompositionStart = (0, import_react8.useCallback)(() => {
    setIsComposing(true);
  }, []);
  const handleCompositionEnd = (0, import_react8.useCallback)(
    (e) => {
      setIsComposing(false);
      const newValue = e.currentTarget.value;
      setCaptionValue(newValue);
      updateEditorCaptionValue(newValue);
    },
    [updateEditorCaptionValue]
  );
  const readOnly = (0, import_react9.useReadOnly)();
  const textareaRef = import_react8.default.useRef(null);
  useCaptionTextareaFocus(textareaRef);
  return {
    captionValue,
    element,
    readOnly,
    textareaRef,
    handleChange,
    handleCompositionEnd,
    handleCompositionStart
  };
};
var useCaptionTextarea = ({
  captionValue,
  element,
  readOnly,
  textareaRef,
  handleChange,
  handleCompositionEnd,
  handleCompositionStart
}) => {
  const editor = (0, import_react9.useEditorRef)();
  const onKeyDown = (e) => {
    if ((0, import_platejs4.isHotkey)("up", e)) {
      const path = editor.api.findPath(element);
      if (!path) return;
      e.preventDefault();
      editor.tf.focus({ at: path });
    }
    if ((0, import_platejs4.isHotkey)("down", e)) {
      const path = editor.api.findPath(element);
      if (!path) return;
      const nextNodePath = editor.api.after(path);
      if (!nextNodePath) return;
      e.preventDefault();
      editor.tf.focus({ at: nextNodePath });
    }
  };
  const onBlur = (e) => {
    const currentValue = e.target.value;
    if (currentValue.length === 0) {
      editor.setOption(CaptionPlugin, "visibleId", null);
    }
  };
  return {
    props: {
      readOnly,
      value: captionValue,
      onBlur,
      onChange: handleChange,
      onCompositionEnd: handleCompositionEnd,
      onCompositionStart: handleCompositionStart,
      onKeyDown
    },
    ref: textareaRef
  };
};
var CaptionTextarea = (0, import_react9.createPrimitiveComponent)(TextareaAutosize)({
  propsHook: useCaptionTextarea,
  stateHook: useCaptionTextareaState
});

// src/react/utils/showCaption.ts
var showCaption = (editor, element) => {
  const path = editor.api.findPath(element);
  editor.setOption(CaptionPlugin, "visibleId", element.id);
  setTimeout(() => {
    path && editor.setOption(CaptionPlugin, "focusEndPath", path);
  }, 0);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Caption,
  CaptionPlugin,
  CaptionTextarea,
  TextareaAutosize,
  showCaption,
  useCaption,
  useCaptionButton,
  useCaptionButtonState,
  useCaptionState,
  useCaptionString,
  useCaptionTextarea,
  useCaptionTextareaFocus,
  useCaptionTextareaState
});
//# sourceMappingURL=index.js.map