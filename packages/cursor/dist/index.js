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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CursorOverlay: () => CursorOverlay,
  CursorOverlayContent: () => CursorOverlayContent,
  FROZEN_EMPTY_ARRAY: () => FROZEN_EMPTY_ARRAY,
  getCaretPosition: () => getCaretPosition,
  getCursorOverlayState: () => getCursorOverlayState,
  getSelectionRects: () => getSelectionRects,
  useCursorOverlayPositions: () => useCursorOverlayPositions,
  useRefreshOnResize: () => useRefreshOnResize,
  useRequestReRender: () => useRequestReRender
});
module.exports = __toCommonJS(index_exports);

// src/components/CursorOverlay.tsx
var import_react5 = __toESM(require("react"));
var import_react6 = require("platejs/react");

// src/hooks/useCursorOverlayPositions.ts
var import_react3 = __toESM(require("react"));
var import_react4 = require("platejs/react");

// src/hooks/useRefreshOnResize.ts
var import_react2 = __toESM(require("react"));

// src/hooks/useRequestReRender.ts
var import_react = __toESM(require("react"));
var useRequestReRender = () => {
  const [, setUpdateCounter] = import_react.default.useState(0);
  const animationFrameRef = import_react.default.useRef(null);
  const requestReRender = import_react.default.useCallback((immediate = false) => {
    if (animationFrameRef.current && !immediate) {
      return;
    }
    if (!immediate) {
      animationFrameRef.current = requestAnimationFrame(() => {
        setUpdateCounter((state) => state + 1);
        animationFrameRef.current = null;
      });
      return;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setUpdateCounter((state) => state + 1);
  }, []);
  import_react.default.useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  });
  import_react.default.useEffect(
    () => () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    []
  );
  return requestReRender;
};

// src/hooks/useRefreshOnResize.ts
var useRefreshOnResize = ({
  containerRef,
  refreshOnResize,
  selectionRectCache
}) => {
  const requestReRender = useRequestReRender();
  const refresh = import_react2.default.useCallback(
    (sync = false) => {
      selectionRectCache.current = /* @__PURE__ */ new WeakMap();
      requestReRender(sync);
    },
    [requestReRender, selectionRectCache]
  );
  import_react2.default.useEffect(() => {
    if (!refreshOnResize || !containerRef?.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => refresh());
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [containerRef, refresh, refreshOnResize]);
  return {
    refresh
  };
};

// src/queries/getCaretPosition.ts
var import_platejs = require("platejs");
var getCaretPosition = (selectionRects, range) => {
  const isCollapsed = range && import_platejs.RangeApi.isCollapsed(range);
  const isBackward = range && import_platejs.RangeApi.isBackward(range);
  const anchorRect = selectionRects[isBackward ? 0 : selectionRects.length - 1];
  if (!anchorRect) {
    return null;
  }
  return {
    height: anchorRect.height,
    left: anchorRect.left + (isBackward || isCollapsed ? 0 : anchorRect.width),
    top: anchorRect.top
  };
};

// src/queries/getCursorOverlayState.ts
var getCursorOverlayState = ({
  cursors: cursorStates,
  selectionRects
}) => {
  if (!cursorStates) return [];
  return Object.entries(cursorStates).map(([key, cursorState]) => {
    const selection = cursorState?.selection ?? null;
    const rects = selectionRects[key] ?? FROZEN_EMPTY_ARRAY;
    const caretPosition = selection ? getCaretPosition(rects, selection) : null;
    return {
      ...cursorState,
      caretPosition,
      selection,
      selectionRects: rects
    };
  });
};

// src/queries/getSelectionRects.ts
var import_platejs2 = require("platejs");
var getSelectionRects = (editor, {
  range,
  xOffset,
  yOffset
}) => {
  const [start, end] = import_platejs2.RangeApi.edges(range);
  const domRange = editor.api.toDOMRange(range);
  if (!domRange) {
    return [];
  }
  const selectionRects = [];
  const textEntries = editor.api.nodes({
    at: range,
    match: import_platejs2.TextApi.isText
  });
  for (const [textNode, textPath] of textEntries) {
    const domNode = editor.api.toDOMNode(textNode);
    if (!domNode?.parentElement) {
      return [];
    }
    const isStartNode = import_platejs2.PathApi.equals(textPath, start.path);
    const isEndNode = import_platejs2.PathApi.equals(textPath, end.path);
    let clientRects = null;
    if (isStartNode || isEndNode) {
      const nodeRange = document.createRange();
      nodeRange.selectNode(domNode);
      if (isStartNode) {
        nodeRange.setStart(domRange.startContainer, domRange.startOffset);
      }
      if (isEndNode) {
        nodeRange.setEnd(domRange.endContainer, domRange.endOffset);
      }
      clientRects = nodeRange.getClientRects();
    } else {
      clientRects = domNode.getClientRects();
    }
    for (let i = 0; i < clientRects.length; i++) {
      const clientRect = clientRects.item(i);
      if (!clientRect) {
        continue;
      }
      selectionRects.push({
        height: clientRect.height,
        left: clientRect.left - xOffset,
        top: clientRect.top - yOffset,
        width: clientRect.width
      });
    }
  }
  return selectionRects;
};

// src/hooks/useCursorOverlayPositions.ts
var FROZEN_EMPTY_ARRAY = Object.freeze(
  []
);
var useCursorOverlayPositions = ({
  containerRef,
  cursors: cursorStates,
  refreshOnResize = true
} = {}) => {
  const editor = (0, import_react4.useEditorRef)();
  const selectionRectCache = import_react3.default.useRef(
    /* @__PURE__ */ new WeakMap()
  );
  const [selectionRects, setSelectionRects] = import_react3.default.useState({});
  const updateSelectionRects = import_react3.default.useCallback(() => {
    if (!containerRef?.current) return;
    if (!cursorStates) return;
    let xOffset = 0;
    let yOffset = 0;
    if (containerRef) {
      const contentRect = containerRef.current.getBoundingClientRect();
      xOffset = contentRect.x;
      yOffset = contentRect.y;
      yOffset -= containerRef.current.scrollTop;
    }
    let selectionRectsChanged = Object.keys(selectionRects).length !== Object.keys(cursorStates).length;
    const getCachedSelectionRects = ({
      cursor
    }) => {
      const range = cursor.selection;
      if (!range) {
        return FROZEN_EMPTY_ARRAY;
      }
      const cached = selectionRectCache.current.get(range);
      if (cached) {
        return cached;
      }
      const rects = getSelectionRects(editor, { range, xOffset, yOffset });
      selectionRectsChanged = true;
      selectionRectCache.current.set(range, rects);
      return rects;
    };
    const updated = Object.fromEntries(
      Object.entries(cursorStates).map(([key, cursor]) => [
        key,
        getCachedSelectionRects({
          cursor
        })
      ])
    );
    if (selectionRectsChanged) {
      setSelectionRects(updated);
    }
  }, [containerRef, cursorStates, editor, selectionRects]);
  (0, import_react4.useIsomorphicLayoutEffect)(() => {
    updateSelectionRects();
  });
  const cursors = import_react3.default.useMemo(
    () => getCursorOverlayState({
      cursors: cursorStates,
      selectionRects
    }),
    [cursorStates, selectionRects]
  );
  const { refresh } = useRefreshOnResize({
    containerRef,
    refreshOnResize,
    selectionRectCache
  });
  return { cursors, refresh };
};

// src/components/CursorOverlay.tsx
function CursorOverlayContent({
  classNames,
  onRenderCaret,
  onRenderCursor: CursorComponent,
  onRenderSelectionRect,
  ...props
}) {
  const { disableCaret, disableSelection } = props;
  const { cursors } = useCursorOverlayPositions(props);
  const cursorProps = {
    classNames,
    disableCaret,
    disableSelection,
    onRenderCaret,
    onRenderSelectionRect
  };
  if (!CursorComponent) return null;
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, cursors.map((cursor) => /* @__PURE__ */ import_react5.default.createElement(
    CursorComponent,
    {
      id: cursor.key,
      key: cursor.key,
      ...cursorProps,
      ...cursor
    }
  )));
}
function CursorOverlay(props) {
  const isMounted = (0, import_react6.useEditorMounted)();
  if (!isMounted) return null;
  return /* @__PURE__ */ import_react5.default.createElement(CursorOverlayContent, { ...props });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CursorOverlay,
  CursorOverlayContent,
  FROZEN_EMPTY_ARRAY,
  getCaretPosition,
  getCursorOverlayState,
  getSelectionRects,
  useCursorOverlayPositions,
  useRefreshOnResize,
  useRequestReRender
});
//# sourceMappingURL=index.js.map