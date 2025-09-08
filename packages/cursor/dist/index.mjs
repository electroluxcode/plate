// src/components/CursorOverlay.tsx
import React4 from "react";
import { useEditorMounted } from "platejs/react";

// src/hooks/useCursorOverlayPositions.ts
import React3 from "react";
import { useEditorRef, useIsomorphicLayoutEffect } from "platejs/react";

// src/hooks/useRefreshOnResize.ts
import React2 from "react";

// src/hooks/useRequestReRender.ts
import React from "react";
var useRequestReRender = () => {
  const [, setUpdateCounter] = React.useState(0);
  const animationFrameRef = React.useRef(null);
  const requestReRender = React.useCallback((immediate = false) => {
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
  React.useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  });
  React.useEffect(
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
  const refresh = React2.useCallback(
    (sync = false) => {
      selectionRectCache.current = /* @__PURE__ */ new WeakMap();
      requestReRender(sync);
    },
    [requestReRender, selectionRectCache]
  );
  React2.useEffect(() => {
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
import { RangeApi } from "platejs";
var getCaretPosition = (selectionRects, range) => {
  const isCollapsed = range && RangeApi.isCollapsed(range);
  const isBackward = range && RangeApi.isBackward(range);
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
import { PathApi, RangeApi as RangeApi2, TextApi } from "platejs";
var getSelectionRects = (editor, {
  range,
  xOffset,
  yOffset
}) => {
  const [start, end] = RangeApi2.edges(range);
  const domRange = editor.api.toDOMRange(range);
  if (!domRange) {
    return [];
  }
  const selectionRects = [];
  const textEntries = editor.api.nodes({
    at: range,
    match: TextApi.isText
  });
  for (const [textNode, textPath] of textEntries) {
    const domNode = editor.api.toDOMNode(textNode);
    if (!domNode?.parentElement) {
      return [];
    }
    const isStartNode = PathApi.equals(textPath, start.path);
    const isEndNode = PathApi.equals(textPath, end.path);
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
  const editor = useEditorRef();
  const selectionRectCache = React3.useRef(
    /* @__PURE__ */ new WeakMap()
  );
  const [selectionRects, setSelectionRects] = React3.useState({});
  const updateSelectionRects = React3.useCallback(() => {
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
  useIsomorphicLayoutEffect(() => {
    updateSelectionRects();
  });
  const cursors = React3.useMemo(
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
  return /* @__PURE__ */ React4.createElement(React4.Fragment, null, cursors.map((cursor) => /* @__PURE__ */ React4.createElement(
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
  const isMounted = useEditorMounted();
  if (!isMounted) return null;
  return /* @__PURE__ */ React4.createElement(CursorOverlayContent, { ...props });
}
export {
  CursorOverlay,
  CursorOverlayContent,
  FROZEN_EMPTY_ARRAY,
  getCaretPosition,
  getCursorOverlayState,
  getSelectionRects,
  useCursorOverlayPositions,
  useRefreshOnResize,
  useRequestReRender
};
//# sourceMappingURL=index.mjs.map