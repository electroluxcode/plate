// src/react/ExcalidrawPlugin.tsx
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseExcalidrawPlugin.ts
import { createSlatePlugin, KEYS } from "platejs";
var BaseExcalidrawPlugin = createSlatePlugin({
  key: KEYS.excalidraw,
  node: { isElement: true, isVoid: true }
});

// src/react/ExcalidrawPlugin.tsx
var ExcalidrawPlugin = toPlatePlugin(BaseExcalidrawPlugin);

// src/react/hooks/useExcalidrawElement.ts
import React from "react";
var useExcalidrawElement = ({
  element,
  libraryItems = [],
  scrollToContent = true
}) => {
  const [Excalidraw, setExcalidraw] = React.useState(null);
  React.useEffect(() => {
    void import("@excalidraw/excalidraw").then(
      (comp) => setExcalidraw(comp.Excalidraw)
    );
  });
  const _excalidrawRef = React.useRef(null);
  const excalidrawProps = {
    autoFocus: false,
    excalidrawRef: _excalidrawRef,
    initialData: {
      appState: element.data?.state,
      elements: element.data?.elements,
      libraryItems,
      scrollToContent
    }
    // onChange: (elements: readonly ExcalidrawElementType[], state: AppState) => {
    // const path = editor.api.findPath(element);
    // FIXME: setNodes triggers render loop as onChange is triggered on rerender
    // in the meantime, the prop can be used to save the data outside slate
    // editor.tf.setNodes({ data: { elements, state } }, { at: path });
    // },
  };
  return {
    Excalidraw,
    excalidrawProps
  };
};
export {
  ExcalidrawPlugin,
  useExcalidrawElement
};
//# sourceMappingURL=index.mjs.map