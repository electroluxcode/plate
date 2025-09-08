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
  TocPlugin: () => TocPlugin,
  checkIn: () => checkIn,
  heightToTop: () => heightToTop,
  useContentController: () => useContentController,
  useContentObserver: () => useContentObserver,
  useTocController: () => useTocController,
  useTocElement: () => useTocElement,
  useTocElementState: () => useTocElementState,
  useTocObserver: () => useTocObserver,
  useTocSideBar: () => useTocSideBar,
  useTocSideBarState: () => useTocSideBarState
});
module.exports = __toCommonJS(react_exports);

// src/react/TocPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseTocPlugin.ts
var import_platejs = require("platejs");
var BaseTocPlugin = (0, import_platejs.createTSlatePlugin)({
  key: import_platejs.KEYS.toc,
  node: { isElement: true, isVoid: true },
  options: {
    isScroll: true,
    topOffset: 80
  }
});

// src/lib/utils/isHeading.ts
var import_platejs2 = require("platejs");
var isHeading = (node) => {
  return node.type && import_platejs2.KEYS.heading.includes(node.type);
};

// src/react/TocPlugin.tsx
var TocPlugin = (0, import_react.toPlatePlugin)(BaseTocPlugin);

// src/react/hooks/useContentController.ts
var import_react4 = __toESM(require("react"));
var import_platejs5 = require("platejs");
var import_react5 = require("platejs/react");

// src/react/utils/checkIn.ts
function checkIn(e) {
  const event = window.event;
  const x = Number(event.clientX);
  const y = Number(event.clientY);
  const ele = e.target;
  const div_x = Number(ele.getBoundingClientRect().left);
  const div_x_width = Number(
    ele.getBoundingClientRect().left + ele.clientWidth
  );
  const div_y = Number(ele.getBoundingClientRect().top);
  const div_y_height = Number(
    ele.getBoundingClientRect().top + ele.clientHeight
  );
  if (x > div_x && x < div_x_width && y > div_y && y < div_y_height) {
    return true;
  }
  return false;
}

// src/react/utils/heightToTop.ts
var heightToTop = (ele, editorContentRef) => {
  const root = editorContentRef ? editorContentRef.current : document.body;
  if (!root || !ele) return 0;
  const containerRect = root.getBoundingClientRect();
  const elementRect = ele.getBoundingClientRect();
  const scrollY = root.scrollTop;
  const absoluteElementTop = elementRect.top + scrollY - containerRect.top;
  return absoluteElementTop;
};

// src/react/hooks/useContentObserver.ts
var import_react2 = __toESM(require("react"));
var import_platejs4 = require("platejs");
var import_react3 = require("platejs/react");

// src/internal/getHeadingList.ts
var import_platejs3 = require("platejs");
var headingDepth = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6
};
var getHeadingList = (editor) => {
  const options = editor.getOptions(BaseTocPlugin);
  if (options.queryHeading) {
    return options.queryHeading(editor);
  }
  const headingList = [];
  const values = editor.api.nodes({
    at: [],
    match: (n) => isHeading(n)
  });
  if (!values) return [];
  Array.from(values, ([node, path]) => {
    const { type } = node;
    const title = import_platejs3.NodeApi.string(node);
    const depth = headingDepth[type];
    const id = node.id;
    title && headingList.push({ id, depth, path, title, type });
  });
  return headingList;
};

// src/react/hooks/useContentObserver.ts
var useContentObserver = ({
  editorContentRef,
  isObserve,
  isScroll,
  rootMargin,
  status
}) => {
  const headingElementsRef = import_react2.default.useRef({});
  const root = isScroll ? editorContentRef.current : void 0;
  const editor = (0, import_react3.useEditorRef)();
  const headingList = (0, import_react3.useEditorSelector)(getHeadingList, []);
  const [activeId, setActiveId] = import_react2.default.useState("");
  import_react2.default.useEffect(() => {
    const callback = (headings) => {
      if (!isObserve) return;
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);
      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(key);
      });
      const lastKey = Object.keys(headingElementsRef.current).pop();
      visibleHeadings.length > 0 && setActiveId(visibleHeadings[0] || lastKey);
      headingElementsRef.current = {};
    };
    const observer = new IntersectionObserver(callback, {
      root,
      rootMargin
    });
    headingList.forEach((item) => {
      const { path } = item;
      const node = import_platejs4.NodeApi.get(editor, path);
      if (!node) return;
      const element = editor.api.toDOMNode(node);
      return element && observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [headingList, isObserve, editor, root, rootMargin, status]);
  return { activeId };
};

// src/react/hooks/useContentController.ts
var useContentController = ({
  containerRef,
  isObserve,
  rootMargin,
  topOffset
}) => {
  const editor = (0, import_react5.useEditorRef)();
  const [editorContentRef, setEditorContentRef] = import_react4.default.useState(containerRef);
  const isScrollRef = import_react4.default.useRef(false);
  const isScroll = (editorContentRef.current?.scrollHeight || 0) > (editorContentRef.current?.clientHeight || 0);
  isScrollRef.current = isScroll;
  const scrollContainer = import_react4.default.useMemo(() => {
    if (typeof window !== "object") return;
    return isScroll ? editorContentRef.current : window;
  }, [isScroll]);
  const [status, setStatus] = import_react4.default.useState(0);
  const { activeId } = useContentObserver({
    editorContentRef,
    isObserve,
    isScroll,
    rootMargin,
    status
  });
  const [activeContentId, setActiveContentId] = import_react4.default.useState(activeId);
  const onContentScroll = ({
    id,
    behavior = "instant",
    el
  }) => {
    setActiveContentId(id);
    if (isScrollRef.current) {
      editorContentRef.current?.scrollTo({
        behavior,
        top: heightToTop(el, editorContentRef) - topOffset
      });
    } else {
      const top = heightToTop(el) - topOffset;
      window.scrollTo({ behavior, top });
    }
    editor.getApi({ key: import_platejs5.KEYS.blockSelection }).blockSelection?.addSelectedRow?.(id);
  };
  import_react4.default.useEffect(() => {
    setEditorContentRef(containerRef);
  }, [containerRef]);
  import_react4.default.useEffect(() => {
    setActiveContentId(activeId);
  }, [activeId]);
  import_react4.default.useEffect(() => {
    if (!scrollContainer) return;
    const scroll = () => {
      if (isObserve) {
        setStatus(Date.now());
      }
    };
    scrollContainer.addEventListener("scroll", scroll);
    return () => {
      scrollContainer.removeEventListener("scroll", scroll);
    };
  }, [isObserve, scrollContainer]);
  return { activeContentId, onContentScroll };
};

// src/react/hooks/useTocController.ts
var import_react7 = __toESM(require("react"));

// src/react/hooks/useTocObserver.ts
var import_react6 = __toESM(require("react"));
var useTocObserver = ({
  activeId,
  isObserve,
  tocRef
}) => {
  const root = tocRef.current;
  const [visible, setVisible] = import_react6.default.useState(true);
  const [offset, setOffset] = import_react6.default.useState(0);
  const updateOffset = import_react6.default.useCallback(
    (entries) => {
      if (!isObserve) return;
      const [entry] = entries;
      const { boundingClientRect, intersectionRatio, rootBounds } = entry;
      if (!rootBounds) return;
      const halfHeight = (root?.getBoundingClientRect().height || 0) / 2;
      const isAbove = boundingClientRect.top < rootBounds.top;
      const isBelow = boundingClientRect.bottom > rootBounds.bottom;
      const isVisible = intersectionRatio === 1;
      setVisible(isVisible);
      if (!isVisible) {
        const offset2 = isAbove ? boundingClientRect.top - rootBounds.top - halfHeight : isBelow ? boundingClientRect.bottom - rootBounds.bottom + halfHeight : 0;
        setOffset(offset2);
      }
    },
    [isObserve, root]
  );
  import_react6.default.useEffect(() => {
    const observer = new IntersectionObserver(updateOffset, {
      root
    });
    const element = root?.querySelectorAll("#toc_item_active")[0];
    if (element) observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [root, activeId, updateOffset]);
  return { offset, visible };
};

// src/react/hooks/useTocController.ts
var useTocController = ({
  activeId,
  isObserve,
  tocRef
}) => {
  const [activeTocId, setActiveTocId] = import_react7.default.useState("");
  const { offset, visible } = useTocObserver({
    activeId: activeTocId,
    isObserve,
    tocRef
  });
  import_react7.default.useEffect(() => {
    if (!visible) {
      const tocItemWrapper = tocRef.current?.querySelector("#toc_wrap");
      const top = tocItemWrapper?.scrollTop + offset;
      tocItemWrapper?.scrollTo({ behavior: "instant", top });
    }
  }, [visible, offset, tocRef]);
  import_react7.default.useEffect(() => {
    setActiveTocId(activeId);
  }, [activeId]);
};

// src/react/hooks/useTocElement.ts
var import_react8 = __toESM(require("react"));
var import_platejs6 = require("platejs");
var import_react9 = require("platejs/react");
var useTocElementState = () => {
  const { editor, getOptions } = (0, import_react9.useEditorPlugin)(TocPlugin);
  const { isScroll, topOffset } = getOptions();
  const headingList = (0, import_react9.useEditorSelector)(getHeadingList, []);
  const containerRef = (0, import_react9.useScrollRef)();
  const onContentScroll = import_react8.default.useCallback(
    (el, id, behavior = "instant") => {
      if (!containerRef.current) return;
      if (isScroll) {
        containerRef.current?.scrollTo({
          behavior,
          top: heightToTop(el, containerRef) - topOffset
        });
      } else {
        const top = heightToTop(el) - topOffset;
        window.scrollTo({ behavior, top });
      }
      setTimeout(() => {
        editor.getApi({ key: import_platejs6.KEYS.blockSelection }).blockSelection?.addSelectedRow?.(id);
      }, 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isScroll, topOffset]
  );
  return { editor, headingList, onContentScroll };
};
var useTocElement = ({
  editor,
  onContentScroll
}) => {
  return {
    props: {
      onClick: (e, item, behavior) => {
        e.preventDefault();
        const { id, path } = item;
        const node = import_platejs6.NodeApi.get(editor, path);
        if (!node) return;
        const el = editor.api.toDOMNode(node);
        if (!el) return;
        onContentScroll(el, id, behavior);
      }
    }
  };
};

// src/react/hooks/useTocSideBar.ts
var import_react10 = __toESM(require("react"));
var import_platejs7 = require("platejs");
var import_react11 = require("platejs/react");
var useTocSideBarState = ({
  open = true,
  rootMargin = "0px 0px 0px 0px",
  topOffset = 0
}) => {
  const editor = (0, import_react11.useEditorRef)();
  const headingList = (0, import_react11.useEditorSelector)(getHeadingList, []);
  const containerRef = (0, import_react11.useScrollRef)();
  const tocRef = import_react10.default.useRef(null);
  const [mouseInToc, setMouseInToc] = import_react10.default.useState(false);
  const [isObserve, setIsObserve] = import_react10.default.useState(open);
  const { activeContentId, onContentScroll } = useContentController({
    containerRef,
    isObserve,
    rootMargin,
    topOffset
  });
  useTocController({
    activeId: activeContentId,
    isObserve,
    tocRef
  });
  return {
    activeContentId,
    editor,
    headingList,
    mouseInToc,
    open,
    setIsObserve,
    setMouseInToc,
    tocRef,
    onContentScroll
  };
};
var useTocSideBar = ({
  editor,
  mouseInToc,
  open,
  setIsObserve,
  setMouseInToc,
  tocRef,
  onContentScroll
}) => {
  import_react10.default.useEffect(() => {
    if (mouseInToc) {
      setIsObserve(false);
    } else {
      setIsObserve(true);
    }
  }, [mouseInToc]);
  const onContentClick = import_react10.default.useCallback(
    (e, item, behavior) => {
      e.preventDefault();
      const { id, path } = item;
      const node = import_platejs7.NodeApi.get(editor, path);
      if (!node) return;
      const el = editor.api.toDOMNode(node);
      if (!el) return;
      onContentScroll({ id, behavior, el });
    },
    [editor, onContentScroll]
  );
  return {
    navProps: {
      ref: tocRef,
      onMouseEnter: () => {
        !mouseInToc && open && setMouseInToc(true);
      },
      onMouseLeave: (e) => {
        if (open) {
          const isIn = checkIn(e);
          isIn !== mouseInToc && setMouseInToc(isIn);
        }
      }
    },
    onContentClick
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TocPlugin,
  checkIn,
  heightToTop,
  useContentController,
  useContentObserver,
  useTocController,
  useTocElement,
  useTocElementState,
  useTocObserver,
  useTocSideBar,
  useTocSideBarState
});
//# sourceMappingURL=index.js.map