// src/react/CaptionPlugin.tsx
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseCaptionPlugin.ts
import {
  createTSlatePlugin,
  KEYS
} from "platejs";

// src/lib/withCaption.ts
import {
  getPluginTypes,
  isHotkey,
  NodeApi,
  RangeApi
} from "platejs";
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
          if (editor.dom.currentKeyboardEvent && isHotkey("up", editor.dom.currentKeyboardEvent) && newSelection && RangeApi.isCollapsed(newSelection)) {
            const types = getPluginTypes(editor, query.allow);
            const entry = editor.api.above({
              at: newSelection,
              match: { type: types }
            });
            if (entry) {
              const [node] = entry;
              if (node.caption && NodeApi.string({ children: node.caption }).length > 0) {
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
            const types = getPluginTypes(editor, getOptions().query.allow);
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
var BaseCaptionPlugin = createTSlatePlugin({
  key: KEYS.caption,
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
var CaptionPlugin = toPlatePlugin(BaseCaptionPlugin);

// src/react/components/Caption.tsx
import {
  createPrimitiveComponent,
  useElement as useElement2,
  usePluginOption,
  useReadOnly,
  useSelected
} from "platejs/react";

// src/react/hooks/useCaptionString.ts
import React from "react";
import { NodeApi as NodeApi2 } from "platejs";
import { useElement } from "platejs/react";
var useCaptionString = () => {
  const { caption: nodeCaption = [{ children: [{ text: "" }] }] } = useElement();
  return React.useMemo(() => {
    return NodeApi2.string(nodeCaption[0]) || "";
  }, [nodeCaption]);
};

// src/react/components/Caption.tsx
var useCaptionState = (options = {}) => {
  const element = useElement2();
  const captionString = useCaptionString();
  const showCaption2 = usePluginOption(
    CaptionPlugin,
    "isVisible",
    element.id
  );
  const selected = useSelected();
  const _readOnly = useReadOnly();
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
var Caption = createPrimitiveComponent(
  "figcaption"
)({
  propsHook: useCaption,
  stateHook: useCaptionState
});

// src/react/components/CaptionButton.tsx
import { useEditorRef, useElement as useElement3 } from "platejs/react";
var useCaptionButtonState = () => {
  const editor = useEditorRef();
  const element = useElement3();
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
import React3, { useCallback, useState } from "react";
import {
  isHotkey as isHotkey2,
  NodeApi as NodeApi3,
  PathApi
} from "platejs";
import {
  createPrimitiveComponent as createPrimitiveComponent2,
  useEditorRef as useEditorRef2,
  useElement as useElement4,
  usePluginOption as usePluginOption2,
  useReadOnly as useReadOnly2
} from "platejs/react";

// src/react/components/TextareaAutosize.tsx
import React2 from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useIsomorphicLayoutEffect } from "platejs/react";
var TextareaAutosize = React2.forwardRef((props, ref) => {
  const [isRerendered, setIsRerendered] = React2.useState(false);
  useIsomorphicLayoutEffect(() => setIsRerendered(true), []);
  return isRerendered ? /* @__PURE__ */ React2.createElement(ReactTextareaAutosize, { ...props, ref }) : null;
});
TextareaAutosize.displayName = "TextareaAutosize";

// src/react/components/CaptionTextarea.tsx
var useCaptionTextareaFocus = (textareaRef) => {
  const editor = useEditorRef2();
  const element = useElement4();
  const focusCaptionPath = usePluginOption2(CaptionPlugin, "focusEndPath");
  React3.useEffect(() => {
    if (focusCaptionPath && textareaRef.current) {
      const path = editor.api.findPath(element);
      if (path && PathApi.equals(path, focusCaptionPath)) {
        textareaRef.current.focus();
        editor.setOption(CaptionPlugin, "focusEndPath", null);
      }
    }
  }, [editor, element, focusCaptionPath, textareaRef]);
};
var useCaptionTextareaState = () => {
  const element = useElement4();
  const editor = useEditorRef2();
  const [isComposing, setIsComposing] = useState(false);
  const [captionValue, setCaptionValue] = useState(() => {
    const nodeCaption = element.caption ?? [{ children: [{ text: "" }] }];
    return NodeApi3.string(nodeCaption[0]);
  });
  const updateEditorCaptionValue = useCallback(
    (newValue) => {
      editor.tf.setNodes(
        { caption: [{ text: newValue }] },
        { at: element }
      );
    },
    [editor, element]
  );
  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setCaptionValue(newValue);
      if (!isComposing) {
        updateEditorCaptionValue(newValue);
      }
    },
    [isComposing, updateEditorCaptionValue]
  );
  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);
  const handleCompositionEnd = useCallback(
    (e) => {
      setIsComposing(false);
      const newValue = e.currentTarget.value;
      setCaptionValue(newValue);
      updateEditorCaptionValue(newValue);
    },
    [updateEditorCaptionValue]
  );
  const readOnly = useReadOnly2();
  const textareaRef = React3.useRef(null);
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
  const editor = useEditorRef2();
  const onKeyDown = (e) => {
    if (isHotkey2("up", e)) {
      const path = editor.api.findPath(element);
      if (!path) return;
      e.preventDefault();
      editor.tf.focus({ at: path });
    }
    if (isHotkey2("down", e)) {
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
var CaptionTextarea = createPrimitiveComponent2(TextareaAutosize)({
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
export {
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
};
//# sourceMappingURL=index.mjs.map