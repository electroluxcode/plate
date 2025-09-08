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
  ExcalidrawPlugin: () => ExcalidrawPlugin,
  useExcalidrawElement: () => useExcalidrawElement
});
module.exports = __toCommonJS(react_exports);

// src/react/ExcalidrawPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseExcalidrawPlugin.ts
var import_platejs = require("platejs");
var BaseExcalidrawPlugin = (0, import_platejs.createSlatePlugin)({
  key: import_platejs.KEYS.excalidraw,
  node: { isElement: true, isVoid: true }
});

// src/react/ExcalidrawPlugin.tsx
var ExcalidrawPlugin = (0, import_react.toPlatePlugin)(BaseExcalidrawPlugin);

// src/react/hooks/useExcalidrawElement.ts
var import_react2 = __toESM(require("react"));
var useExcalidrawElement = ({
  element,
  libraryItems = [],
  scrollToContent = true
}) => {
  const [Excalidraw, setExcalidraw] = import_react2.default.useState(null);
  import_react2.default.useEffect(() => {
    void import("@excalidraw/excalidraw").then(
      (comp) => setExcalidraw(comp.Excalidraw)
    );
  });
  const _excalidrawRef = import_react2.default.useRef(null);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExcalidrawPlugin,
  useExcalidrawElement
});
//# sourceMappingURL=index.js.map