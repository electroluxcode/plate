// src/DndPlugin.tsx
import React4, { useCallback, useEffect } from "react";
import { KEYS } from "platejs";
import { createTPlatePlugin } from "platejs/react";

// src/components/Scroller/DndScroller.tsx
import React3 from "react";
import { usePluginOption } from "platejs/react";

// src/components/Scroller/Scroller.tsx
import React2 from "react";

// src/components/Scroller/ScrollArea.tsx
import React from "react";
import throttle from "lodash/throttle.js";
import raf from "raf";
var getCoords = (e) => {
  if (e.type === "touchmove") {
    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
};
function ScrollArea({
  containerRef,
  enabled = true,
  height = 100,
  minStrength = 0.15,
  placement,
  scrollAreaProps,
  strengthMultiplier = 25,
  zIndex = 1e4
}) {
  const ref = React.useRef(void 0);
  const scaleYRef = React.useRef(0);
  const frameRef = React.useRef(null);
  const direction = placement === "top" ? -1 : 1;
  const style = {
    height,
    opacity: 0,
    position: "fixed",
    width: "100%",
    zIndex,
    ...scrollAreaProps?.style
  };
  if (placement === "top") {
    style.top = 0;
  } else if (placement === "bottom") {
    style.bottom = 0;
  }
  const stopScrolling = () => {
    scaleYRef.current = 0;
    if (frameRef.current) {
      raf.cancel(frameRef.current);
      frameRef.current = null;
    }
  };
  const startScrolling = () => {
    const tick = () => {
      const scaleY = scaleYRef.current;
      if (strengthMultiplier === 0 || scaleY === 0) {
        stopScrolling();
        return;
      }
      const container = containerRef?.current ?? window;
      container.scrollBy(0, scaleY * strengthMultiplier * direction);
      frameRef.current = raf(tick);
    };
    tick();
  };
  const updateScrolling = throttle(
    (e) => {
      const container = ref.current;
      if (!container) return;
      const { height: h, top: y } = container.getBoundingClientRect();
      const coords = getCoords(e);
      const strength = Math.max(Math.max(coords.y - y, 0) / h, minStrength);
      scaleYRef.current = direction === -1 ? 1 - strength : strength;
      if (!frameRef.current && scaleYRef.current) {
        startScrolling();
      }
    },
    100,
    { trailing: false }
  );
  const handleEvent = (e) => {
    updateScrolling(e);
  };
  React.useEffect(() => {
    if (!enabled) {
      stopScrolling();
    }
  }, [enabled]);
  if (!enabled) return null;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref,
      style,
      onDragEnd: stopScrolling,
      onDragLeave: stopScrolling,
      onDragOver: handleEvent,
      onTouchMove: handleEvent,
      ...scrollAreaProps
    }
  );
}

// src/components/Scroller/Scroller.tsx
function Scroller(props) {
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(ScrollArea, { placement: "top", ...props }), /* @__PURE__ */ React2.createElement(ScrollArea, { placement: "bottom", ...props }));
}

// src/components/Scroller/DndScroller.tsx
function DndScroller(props) {
  const isDragging = usePluginOption(DndPlugin, "isDragging");
  const [show, setShow] = React3.useState(false);
  React3.useEffect(() => {
    if (isDragging) {
      const timeout = setTimeout(() => {
        setShow(true);
      }, 100);
      return () => clearTimeout(timeout);
    }
    setShow(false);
  }, [isDragging, show]);
  return /* @__PURE__ */ React3.createElement(Scroller, { enabled: isDragging && show, ...props });
}

// src/DndPlugin.tsx
var DRAG_ITEM_BLOCK = "block";
var DndPlugin = createTPlatePlugin({
  key: KEYS.dnd,
  editOnly: true,
  handlers: {
    onDragEnd: ({ editor, plugin }) => {
      editor.setOption(plugin, "isDragging", false);
      editor.setOption(plugin, "dropTarget", { id: null, line: "" });
    },
    onDragEnter: ({ editor, plugin }) => {
      editor.setOption(plugin, "_isOver", true);
    },
    onDragStart: ({ editor, event, plugin }) => {
      const target = event.target;
      const dataTransfer = event.dataTransfer;
      dataTransfer.effectAllowed = "move";
      dataTransfer.dropEffect = "move";
      const id = target.dataset.blockId;
      if (!id) return;
      editor.setOption(plugin, "draggingId", id);
      editor.setOption(plugin, "isDragging", true);
      editor.setOption(plugin, "_isOver", true);
    },
    onDrop: ({ getOptions, setOption }) => {
      return getOptions().isDragging;
    },
    onFocus: ({ editor, plugin }) => {
      editor.setOption(plugin, "isDragging", false);
      editor.setOption(plugin, "dropTarget", { id: null, line: "" });
      editor.setOption(plugin, "_isOver", false);
      editor.getOption(plugin, "multiplePreviewRef")?.current?.replaceChildren();
    }
  },
  options: {
    _isOver: false,
    draggingId: null,
    dropTarget: { id: null, line: "" },
    isDragging: false,
    multiplePreviewRef: null
  },
  useHooks: ({ editor, setOption }) => {
    const handleDragLeave = useCallback(
      (e) => {
        if (e.target instanceof Node) {
          const editorDOMNode = editor.api.toDOMNode(editor);
          if (editorDOMNode && !(e.target === editorDOMNode || editorDOMNode.contains(e.target))) {
            setOption("dropTarget", void 0);
          }
        }
      },
      [editor, setOption]
    );
    const handleDrop = useCallback(() => {
      setOption("_isOver", false);
      setOption("dropTarget", void 0);
    }, [setOption]);
    useEffect(() => {
      document.addEventListener("dragleave", handleDragLeave, true);
      document.addEventListener("drop", handleDrop, true);
      return () => {
        document.removeEventListener("dragleave", handleDragLeave, true);
        document.removeEventListener("drop", handleDrop, true);
      };
    }, [handleDragLeave, handleDrop]);
  }
}).extend(({ getOptions }) => ({
  render: {
    afterEditable: getOptions().enableScroller ? () => /* @__PURE__ */ React4.createElement(DndScroller, { ...getOptions()?.scrollerProps }) : void 0
  }
}));

// src/components/useDraggable.ts
import React5 from "react";
import { useEditorRef } from "platejs/react";
var useDraggable = (props) => {
  const {
    orientation = "vertical",
    type = DRAG_ITEM_BLOCK,
    onDropHandler
  } = props;
  const editor = useEditorRef();
  const nodeRef = React5.useRef(null);
  const multiplePreviewRef = React5.useRef(null);
  if (!editor.plugins.dnd) return {};
  const { dragRef, isAboutToDrag, isDragging } = useDndNode({
    multiplePreviewRef,
    nodeRef,
    orientation,
    type,
    onDropHandler,
    ...props
  });
  return {
    isAboutToDrag,
    isDragging,
    nodeRef,
    previewRef: multiplePreviewRef,
    handleRef: dragRef
  };
};

// src/components/useDropLine.ts
import { useElement, usePluginOptions } from "platejs/react";
var useDropLine = ({
  id: idProp,
  orientation = "vertical"
} = {}) => {
  const element = useElement();
  const id = idProp || element.id;
  const dropLine = usePluginOptions(DndPlugin, ({ dropTarget }) => {
    if (!dropTarget) return null;
    if (dropTarget.id !== id) return null;
    return dropTarget.line;
  }) ?? "";
  if (orientation) {
    const isHorizontalDropLine = dropLine === "left" || dropLine === "right";
    const isVerticalDropLine = dropLine === "top" || dropLine === "bottom";
    if (orientation === "vertical" && isHorizontalDropLine || orientation === "horizontal" && isVerticalDropLine) {
      return {
        dropLine: ""
      };
    }
  }
  return {
    dropLine
  };
};

// src/hooks/useDndNode.ts
import { getEmptyImage, NativeTypes } from "react-dnd-html5-backend";
import { useEditorRef as useEditorRef2 } from "platejs/react";

// src/hooks/useDragNode.ts
import React6 from "react";
import {
  useDrag
} from "react-dnd";
var useDragNode = (editor, { element: staleElement, item, ...options }) => {
  const elementId = staleElement.id;
  const [isAboutToDrag, setIsAboutToDrag] = React6.useState(false);
  const [collected, dragRef, preview] = useDrag(
    () => ({
      canDrag: () => {
        setIsAboutToDrag(true);
        return true;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: () => {
        editor.setOption(DndPlugin, "isDragging", false);
        document.body.classList.remove("dragging");
        setIsAboutToDrag(false);
      },
      item(monitor) {
        editor.setOption(DndPlugin, "isDragging", true);
        editor.setOption(DndPlugin, "_isOver", true);
        document.body.classList.add("dragging");
        const _item = typeof item === "function" ? item(monitor) : item;
        const [element] = editor.api.node({ id: elementId, at: [] });
        const currentDraggingId = editor.getOption(DndPlugin, "draggingId");
        let id;
        if (Array.isArray(currentDraggingId) && currentDraggingId.length > 1 && currentDraggingId.includes(elementId)) {
          id = Array.from(currentDraggingId);
        } else {
          id = elementId;
          editor.setOption(DndPlugin, "draggingId", elementId);
        }
        return {
          id,
          editorId: editor.id,
          element,
          ..._item
        };
      },
      ...options
    }),
    [editor, elementId]
  );
  React6.useEffect(() => {
    if (!collected.isDragging && isAboutToDrag) {
      setIsAboutToDrag(false);
    }
  }, [collected.isDragging, isAboutToDrag]);
  return [{ ...collected, isAboutToDrag }, dragRef, preview];
};

// src/hooks/useDropNode.ts
import {
  useDrop
} from "react-dnd";

// src/transforms/onDropNode.ts
import { PathApi } from "platejs";

// src/utils/getHoverDirection.ts
var getHoverDirection = ({
  dragItem,
  element,
  monitor,
  nodeRef,
  orientation = "vertical"
}) => {
  if (!nodeRef.current) return;
  if (element === dragItem.element) return;
  const elementDragItem = dragItem;
  const draggedIds = Array.isArray(elementDragItem.id) ? elementDragItem.id : [elementDragItem.id];
  if (draggedIds.includes(element.id)) return;
  const hoverBoundingRect = nodeRef.current?.getBoundingClientRect();
  if (!hoverBoundingRect) {
    return;
  }
  const clientOffset = monitor.getClientOffset();
  if (!clientOffset) {
    return;
  }
  if (orientation === "vertical") {
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (hoverClientY < hoverMiddleY) {
      return "top";
    }
    if (hoverClientY >= hoverMiddleY) {
      return "bottom";
    }
  } else {
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;
    return hoverClientX < hoverMiddleX ? "left" : "right";
  }
};

// src/utils/getNewDirection.ts
var getNewDirection = (previousDir, dir) => {
  if (!dir && previousDir) {
    return "";
  }
  if (dir === "top" && previousDir !== "top") {
    return "top";
  }
  if (dir === "bottom" && previousDir !== "bottom") {
    return "bottom";
  }
  if (dir === "left" && previousDir !== "left") {
    return "left";
  }
  if (dir === "right" && previousDir !== "right") {
    return "right";
  }
};

// src/transforms/onDropNode.ts
var getDropPath = (editor, {
  canDropNode,
  dragItem,
  element,
  monitor,
  nodeRef,
  orientation = "vertical"
}) => {
  const direction = getHoverDirection({
    dragItem,
    element,
    monitor,
    nodeRef,
    orientation
  });
  if (!direction) return;
  let dragEntry;
  let dropEntry;
  if ("element" in dragItem) {
    const dragPath2 = editor.api.findPath(dragItem.element);
    const hoveredPath2 = editor.api.findPath(element);
    if (!dragPath2 || !hoveredPath2) return;
    dragEntry = [dragItem.element, dragPath2];
    dropEntry = [element, hoveredPath2];
  } else {
    dropEntry = editor.api.node({ id: element.id, at: [] });
  }
  if (!dropEntry) return;
  if (canDropNode && dragEntry && !canDropNode({ dragEntry, dragItem, dropEntry, editor }) || !monitor.canDrop()) {
    return;
  }
  let dropPath;
  const dragPath = dragEntry?.[1];
  const hoveredPath = dropEntry[1];
  if (direction === "bottom" || direction === "right") {
    dropPath = hoveredPath;
    if (dragPath && PathApi.equals(dragPath, PathApi.next(dropPath))) return;
  }
  if (direction === "top" || direction === "left") {
    dropPath = [...hoveredPath.slice(0, -1), hoveredPath.at(-1) - 1];
    if (dragPath && PathApi.equals(dragPath, dropPath)) return;
  }
  const _dropPath = dropPath;
  const before = dragPath && PathApi.isBefore(dragPath, _dropPath) && PathApi.isSibling(dragPath, _dropPath);
  const to = before ? _dropPath : PathApi.next(_dropPath);
  return { direction, dragPath, to };
};
var onDropNode = (editor, {
  canDropNode,
  dragItem,
  element,
  monitor,
  nodeRef,
  orientation = "vertical"
}) => {
  const result = getDropPath(editor, {
    canDropNode,
    dragItem,
    element,
    monitor,
    nodeRef,
    orientation
  });
  if (!result) return;
  const { dragPath, to } = result;
  if (dragItem.editorId === editor.id) {
    const draggedIds = Array.isArray(dragItem.id) ? dragItem.id : [dragItem.id];
    if (draggedIds.length > 1) {
      const elements = [];
      draggedIds.forEach((id) => {
        const entry = editor.api.node({ id, at: [] });
        if (entry) {
          elements.push(entry[0]);
        }
      });
      editor.tf.moveNodes({
        at: [],
        to,
        match: (n) => elements.some((element2) => element2.id === n.id)
      });
    } else {
      editor.tf.moveNodes({
        at: dragPath,
        to
      });
    }
  } else {
    editor.tf.insertNodes(dragItem.element, { at: to });
  }
};

// src/transforms/onHoverNode.ts
import { NodeApi, PathApi as PathApi2 } from "platejs";
var onHoverNode = (editor, {
  canDropNode,
  dragItem,
  element,
  monitor,
  nodeRef,
  orientation = "vertical"
}) => {
  const { _isOver, dropTarget } = editor.getOptions(DndPlugin);
  const currentId = dropTarget?.id ?? null;
  const currentLine = dropTarget?.line ?? "";
  const result = getDropPath(editor, {
    canDropNode,
    dragItem,
    element,
    monitor,
    nodeRef,
    orientation
  });
  if (!result) {
    if (currentId || currentLine) {
      editor.setOption(DndPlugin, "dropTarget", { id: null, line: "" });
    }
    return;
  }
  const { direction } = result;
  const newDropTarget = { id: element.id, line: direction };
  if (newDropTarget.id !== currentId || newDropTarget.line !== currentLine) {
    if (!_isOver) {
      return;
    }
    if (newDropTarget.line === "top") {
      const previousPath = PathApi2.previous(editor.api.findPath(element));
      if (!previousPath) {
        return editor.setOption(DndPlugin, "dropTarget", newDropTarget);
      }
      const nextNode = NodeApi.get(editor, previousPath);
      editor.setOption(DndPlugin, "dropTarget", {
        id: nextNode?.id,
        line: "bottom"
      });
      return;
    }
    editor.setOption(DndPlugin, "dropTarget", newDropTarget);
  }
  if (direction && editor.api.isExpanded()) {
    editor.tf.focus();
    editor.tf.collapse();
  }
};

// src/hooks/useDropNode.ts
var useDropNode = (editor, {
  canDropNode,
  element,
  nodeRef,
  orientation,
  onDropHandler,
  ...options
}) => {
  const id = element.id;
  return useDrop({
    collect: (monitor) => ({
      isOver: monitor.isOver({
        shallow: true
      })
    }),
    drop: (dragItem, monitor) => {
      if (!dragItem.id) {
        const result = getDropPath(editor, {
          canDropNode,
          dragItem,
          element,
          monitor,
          nodeRef,
          orientation
        });
        const onDropFiles = editor.getOptions(DndPlugin).onDropFiles;
        if (!result || !onDropFiles) return;
        return onDropFiles({
          id,
          dragItem,
          editor,
          monitor,
          nodeRef,
          target: result.to
        });
      }
      const handled = !!onDropHandler && onDropHandler(editor, {
        id,
        dragItem,
        monitor,
        nodeRef
      });
      if (handled) return;
      onDropNode(editor, {
        canDropNode,
        dragItem,
        element,
        monitor,
        nodeRef,
        orientation
      });
    },
    hover(item, monitor) {
      onHoverNode(editor, {
        canDropNode,
        dragItem: item,
        element,
        monitor,
        nodeRef,
        orientation
      });
    },
    ...options
  });
};

// src/hooks/useDndNode.ts
var useDndNode = ({
  canDropNode,
  drag: dragOptions,
  drop: dropOptions,
  element,
  multiplePreviewRef,
  nodeRef,
  orientation = "vertical",
  preview: previewOptions = {},
  type = DRAG_ITEM_BLOCK,
  onDropHandler
}) => {
  const editor = useEditorRef2();
  const [{ isAboutToDrag, isDragging }, dragRef, preview] = useDragNode(
    editor,
    {
      element,
      type,
      ...dragOptions
    }
  );
  const [{ isOver }, drop] = useDropNode(editor, {
    accept: [type, NativeTypes.FILE],
    canDropNode,
    element,
    multiplePreviewRef,
    nodeRef,
    orientation,
    onDropHandler,
    ...dropOptions
  });
  drop(nodeRef);
  if (previewOptions.disable) {
    preview(getEmptyImage(), { captureDraggingState: true });
  } else if (previewOptions.ref) {
    preview(previewOptions.ref);
  } else {
    preview(multiplePreviewRef);
  }
  return {
    dragRef,
    isAboutToDrag,
    isDragging,
    isOver
  };
};

// src/queries/getBlocksWithId.ts
var getBlocksWithId = (editor, options) => {
  const _nodes = editor.api.nodes({
    match: (n) => editor.api.isBlock(n) && !!n.id,
    ...options
  });
  return Array.from(_nodes);
};

// src/transforms/focusBlockStartById.ts
var focusBlockStartById = (editor, id) => {
  const path = editor.api.node({ id, at: [] })?.[1];
  if (!path) return;
  editor.tf.select(editor.api.start(path));
  editor.tf.focus();
};

// src/transforms/removeBlocksAndFocus.ts
var removeBlocksAndFocus = (editor, options) => {
  const nodeEntries = getBlocksWithId(editor, options);
  editor.tf.removeNodes({ at: editor.api.nodesRange(nodeEntries) });
  editor.tf.focus();
};

// src/transforms/selectBlockById.ts
var selectBlockById = (editor, id) => {
  const path = editor.api.node({ id, at: [] })?.[1];
  if (!path) return;
  editor.tf.select(editor.api.range(path));
  editor.tf.focus();
};

// src/transforms/selectBlocksBySelectionOrId.ts
var selectBlocksBySelectionOrId = (editor, id) => {
  if (!editor.selection) return;
  const blockEntries = getBlocksWithId(editor, { at: editor.selection });
  const isBlockSelected = blockEntries.some(
    (blockEntry) => blockEntry[0].id === id
  );
  if (isBlockSelected) {
    editor.tf.select(editor.api.nodesRange(blockEntries));
    editor.tf.focus();
  } else {
    selectBlockById(editor, id);
  }
};
export {
  DRAG_ITEM_BLOCK,
  DndPlugin,
  DndScroller,
  ScrollArea,
  Scroller,
  focusBlockStartById,
  getBlocksWithId,
  getDropPath,
  getHoverDirection,
  getNewDirection,
  onDropNode,
  onHoverNode,
  removeBlocksAndFocus,
  selectBlockById,
  selectBlocksBySelectionOrId,
  useDndNode,
  useDragNode,
  useDraggable,
  useDropLine,
  useDropNode
};
//# sourceMappingURL=index.mjs.map