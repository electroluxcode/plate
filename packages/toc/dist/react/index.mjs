// src/react/TocPlugin.tsx
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseTocPlugin.ts
import {
  createTSlatePlugin,
  KEYS
} from "platejs";
var BaseTocPlugin = createTSlatePlugin({
  key: KEYS.toc,
  node: { isElement: true, isVoid: true },
  options: {
    isScroll: true,
    topOffset: 80
  }
});

// src/lib/utils/isHeading.ts
import { KEYS as KEYS2 } from "platejs";
var isHeading = (node) => {
  return node.type && KEYS2.heading.includes(node.type);
};

// src/react/TocPlugin.tsx
var TocPlugin = toPlatePlugin(BaseTocPlugin);

// src/react/hooks/useContentController.ts
import React2 from "react";
import { KEYS as KEYS3 } from "platejs";
import { useEditorRef as useEditorRef2 } from "platejs/react";

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
import React from "react";
import { NodeApi as NodeApi2 } from "platejs";
import { useEditorRef, useEditorSelector } from "platejs/react";

// src/internal/getHeadingList.ts
import { NodeApi } from "platejs";
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
    const title = NodeApi.string(node);
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
  const headingElementsRef = React.useRef({});
  const root = isScroll ? editorContentRef.current : void 0;
  const editor = useEditorRef();
  const headingList = useEditorSelector(getHeadingList, []);
  const [activeId, setActiveId] = React.useState("");
  React.useEffect(() => {
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
      const node = NodeApi2.get(editor, path);
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
  const editor = useEditorRef2();
  const [editorContentRef, setEditorContentRef] = React2.useState(containerRef);
  const isScrollRef = React2.useRef(false);
  const isScroll = (editorContentRef.current?.scrollHeight || 0) > (editorContentRef.current?.clientHeight || 0);
  isScrollRef.current = isScroll;
  const scrollContainer = React2.useMemo(() => {
    if (typeof window !== "object") return;
    return isScroll ? editorContentRef.current : window;
  }, [isScroll]);
  const [status, setStatus] = React2.useState(0);
  const { activeId } = useContentObserver({
    editorContentRef,
    isObserve,
    isScroll,
    rootMargin,
    status
  });
  const [activeContentId, setActiveContentId] = React2.useState(activeId);
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
    editor.getApi({ key: KEYS3.blockSelection }).blockSelection?.addSelectedRow?.(id);
  };
  React2.useEffect(() => {
    setEditorContentRef(containerRef);
  }, [containerRef]);
  React2.useEffect(() => {
    setActiveContentId(activeId);
  }, [activeId]);
  React2.useEffect(() => {
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
import React4 from "react";

// src/react/hooks/useTocObserver.ts
import React3 from "react";
var useTocObserver = ({
  activeId,
  isObserve,
  tocRef
}) => {
  const root = tocRef.current;
  const [visible, setVisible] = React3.useState(true);
  const [offset, setOffset] = React3.useState(0);
  const updateOffset = React3.useCallback(
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
  React3.useEffect(() => {
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
  const [activeTocId, setActiveTocId] = React4.useState("");
  const { offset, visible } = useTocObserver({
    activeId: activeTocId,
    isObserve,
    tocRef
  });
  React4.useEffect(() => {
    if (!visible) {
      const tocItemWrapper = tocRef.current?.querySelector("#toc_wrap");
      const top = tocItemWrapper?.scrollTop + offset;
      tocItemWrapper?.scrollTo({ behavior: "instant", top });
    }
  }, [visible, offset, tocRef]);
  React4.useEffect(() => {
    setActiveTocId(activeId);
  }, [activeId]);
};

// src/react/hooks/useTocElement.ts
import React5 from "react";
import { KEYS as KEYS4, NodeApi as NodeApi3 } from "platejs";
import {
  useEditorPlugin,
  useEditorSelector as useEditorSelector2,
  useScrollRef
} from "platejs/react";
var useTocElementState = () => {
  const { editor, getOptions } = useEditorPlugin(TocPlugin);
  const { isScroll, topOffset } = getOptions();
  const headingList = useEditorSelector2(getHeadingList, []);
  const containerRef = useScrollRef();
  const onContentScroll = React5.useCallback(
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
        editor.getApi({ key: KEYS4.blockSelection }).blockSelection?.addSelectedRow?.(id);
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
        const node = NodeApi3.get(editor, path);
        if (!node) return;
        const el = editor.api.toDOMNode(node);
        if (!el) return;
        onContentScroll(el, id, behavior);
      }
    }
  };
};

// src/react/hooks/useTocSideBar.ts
import React6 from "react";
import { NodeApi as NodeApi4 } from "platejs";
import { useEditorRef as useEditorRef3, useEditorSelector as useEditorSelector3, useScrollRef as useScrollRef2 } from "platejs/react";
var useTocSideBarState = ({
  open = true,
  rootMargin = "0px 0px 0px 0px",
  topOffset = 0
}) => {
  const editor = useEditorRef3();
  const headingList = useEditorSelector3(getHeadingList, []);
  const containerRef = useScrollRef2();
  const tocRef = React6.useRef(null);
  const [mouseInToc, setMouseInToc] = React6.useState(false);
  const [isObserve, setIsObserve] = React6.useState(open);
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
  React6.useEffect(() => {
    if (mouseInToc) {
      setIsObserve(false);
    } else {
      setIsObserve(true);
    }
  }, [mouseInToc]);
  const onContentClick = React6.useCallback(
    (e, item, behavior) => {
      e.preventDefault();
      const { id, path } = item;
      const node = NodeApi4.get(editor, path);
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
export {
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
};
//# sourceMappingURL=index.mjs.map