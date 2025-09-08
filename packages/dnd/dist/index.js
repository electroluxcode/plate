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
  DRAG_ITEM_BLOCK: () => DRAG_ITEM_BLOCK,
  DndPlugin: () => DndPlugin,
  DndScroller: () => DndScroller,
  ScrollArea: () => ScrollArea,
  Scroller: () => Scroller,
  focusBlockStartById: () => focusBlockStartById,
  getBlocksWithId: () => getBlocksWithId,
  getDropPath: () => getDropPath,
  getHoverDirection: () => getHoverDirection,
  getNewDirection: () => getNewDirection,
  onDropNode: () => onDropNode,
  onHoverNode: () => onHoverNode,
  removeBlocksAndFocus: () => removeBlocksAndFocus,
  selectBlockById: () => selectBlockById,
  selectBlocksBySelectionOrId: () => selectBlocksBySelectionOrId,
  useDndNode: () => useDndNode,
  useDragNode: () => useDragNode,
  useDraggable: () => useDraggable,
  useDropLine: () => useDropLine,
  useDropNode: () => useDropNode
});
module.exports = __toCommonJS(index_exports);

// src/DndPlugin.tsx
var import_react5 = __toESM(require("react"));
var import_platejs = require("platejs");
var import_react6 = require("platejs/react");

// src/components/Scroller/DndScroller.tsx
var import_react3 = __toESM(require("react"));
var import_react4 = require("platejs/react");

// src/components/Scroller/Scroller.tsx
var import_react2 = __toESM(require("react"));

// src/components/Scroller/ScrollArea.tsx
var import_react = __toESM(require("react"));
var import_throttle = __toESM(require("lodash/throttle.js"));
var import_raf = __toESM(require("raf"));
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
  const ref = import_react.default.useRef(void 0);
  const scaleYRef = import_react.default.useRef(0);
  const frameRef = import_react.default.useRef(null);
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
      import_raf.default.cancel(frameRef.current);
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
      frameRef.current = (0, import_raf.default)(tick);
    };
    tick();
  };
  const updateScrolling = (0, import_throttle.default)(
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
  import_react.default.useEffect(() => {
    if (!enabled) {
      stopScrolling();
    }
  }, [enabled]);
  if (!enabled) return null;
  return /* @__PURE__ */ import_react.default.createElement(
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
  return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement(ScrollArea, { placement: "top", ...props }), /* @__PURE__ */ import_react2.default.createElement(ScrollArea, { placement: "bottom", ...props }));
}

// src/components/Scroller/DndScroller.tsx
function DndScroller(props) {
  const isDragging = (0, import_react4.usePluginOption)(DndPlugin, "isDragging");
  const [show, setShow] = import_react3.default.useState(false);
  import_react3.default.useEffect(() => {
    if (isDragging) {
      const timeout = setTimeout(() => {
        setShow(true);
      }, 100);
      return () => clearTimeout(timeout);
    }
    setShow(false);
  }, [isDragging, show]);
  return /* @__PURE__ */ import_react3.default.createElement(Scroller, { enabled: isDragging && show, ...props });
}

// src/DndPlugin.tsx
var DRAG_ITEM_BLOCK = "block";
var DndPlugin = (0, import_react6.createTPlatePlugin)({
  key: import_platejs.KEYS.dnd,
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
    const handleDragLeave = (0, import_react5.useCallback)(
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
    const handleDrop = (0, import_react5.useCallback)(() => {
      setOption("_isOver", false);
      setOption("dropTarget", void 0);
    }, [setOption]);
    (0, import_react5.useEffect)(() => {
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
    afterEditable: getOptions().enableScroller ? () => /* @__PURE__ */ import_react5.default.createElement(DndScroller, { ...getOptions()?.scrollerProps }) : void 0
  }
}));

// src/components/useDraggable.ts
var import_react7 = __toESM(require("react"));
var import_react8 = require("platejs/react");
var useDraggable = (props) => {
  const {
    orientation = "vertical",
    type = DRAG_ITEM_BLOCK,
    onDropHandler
  } = props;
  const editor = (0, import_react8.useEditorRef)();
  const nodeRef = import_react7.default.useRef(null);
  const multiplePreviewRef = import_react7.default.useRef(null);
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
var import_react9 = require("platejs/react");
var useDropLine = ({
  id: idProp,
  orientation = "vertical"
} = {}) => {
  const element = (0, import_react9.useElement)();
  const id = idProp || element.id;
  const dropLine = (0, import_react9.usePluginOptions)(DndPlugin, ({ dropTarget }) => {
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
var import_react_dnd_html5_backend = require("react-dnd-html5-backend");
var import_react11 = require("platejs/react");

// src/hooks/useDragNode.ts
var import_react10 = __toESM(require("react"));
var import_react_dnd = require("react-dnd");
var useDragNode = (editor, { element: staleElement, item, ...options }) => {
  const elementId = staleElement.id;
  const [isAboutToDrag, setIsAboutToDrag] = import_react10.default.useState(false);
  const [collected, dragRef, preview] = (0, import_react_dnd.useDrag)(
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
  import_react10.default.useEffect(() => {
    if (!collected.isDragging && isAboutToDrag) {
      setIsAboutToDrag(false);
    }
  }, [collected.isDragging, isAboutToDrag]);
  return [{ ...collected, isAboutToDrag }, dragRef, preview];
};

// src/hooks/useDropNode.ts
var import_react_dnd2 = require("react-dnd");

// src/transforms/onDropNode.ts
var import_platejs2 = require("platejs");

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
    if (dragPath && import_platejs2.PathApi.equals(dragPath, import_platejs2.PathApi.next(dropPath))) return;
  }
  if (direction === "top" || direction === "left") {
    dropPath = [...hoveredPath.slice(0, -1), hoveredPath.at(-1) - 1];
    if (dragPath && import_platejs2.PathApi.equals(dragPath, dropPath)) return;
  }
  const _dropPath = dropPath;
  const before = dragPath && import_platejs2.PathApi.isBefore(dragPath, _dropPath) && import_platejs2.PathApi.isSibling(dragPath, _dropPath);
  const to = before ? _dropPath : import_platejs2.PathApi.next(_dropPath);
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
var import_platejs3 = require("platejs");
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
      const previousPath = import_platejs3.PathApi.previous(editor.api.findPath(element));
      if (!previousPath) {
        return editor.setOption(DndPlugin, "dropTarget", newDropTarget);
      }
      const nextNode = import_platejs3.NodeApi.get(editor, previousPath);
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
  return (0, import_react_dnd2.useDrop)({
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
  const editor = (0, import_react11.useEditorRef)();
  const [{ isAboutToDrag, isDragging }, dragRef, preview] = useDragNode(
    editor,
    {
      element,
      type,
      ...dragOptions
    }
  );
  const [{ isOver }, drop] = useDropNode(editor, {
    accept: [type, import_react_dnd_html5_backend.NativeTypes.FILE],
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
    preview((0, import_react_dnd_html5_backend.getEmptyImage)(), { captureDraggingState: true });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.js.map