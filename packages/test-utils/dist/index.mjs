// src/createDataTransfer.ts
var createDataTransfer = (dataMap = /* @__PURE__ */ new Map()) => ({
  getData: (type) => dataMap.get(type) ?? "",
  setData: (type, value) => dataMap.set(type, value)
});

// src/getHtmlDocument.ts
var getHtmlDocument = (html) => new DOMParser().parseFromString(html, "text/html");

// src/jsx.ts
import {
  createHyperscript as createHyperscriptBase,
  createText as createTestText
} from "slate-hyperscript";

// src/internals/creators.ts
import {
  ElementApi,
  NodeApi,
  RangeApi,
  TextApi
} from "@platejs/slate";

// src/internals/tokens.ts
var ANCHOR = /* @__PURE__ */ new WeakMap();
var FOCUS = /* @__PURE__ */ new WeakMap();
var Token = class {
};
var AnchorToken = class extends Token {
  offset;
  path;
  constructor(props = {}) {
    super();
    const { offset, path } = props;
    this.offset = offset;
    this.path = path;
  }
};
var FocusToken = class extends Token {
  offset;
  path;
  constructor(props = {}) {
    super();
    const { offset, path } = props;
    this.offset = offset;
    this.path = path;
  }
};
var addAnchorToken = (text, token) => {
  const offset = text.text.length;
  ANCHOR.set(text, [offset, token]);
};
var getAnchorOffset = (text) => {
  return ANCHOR.get(text);
};
var addFocusToken = (text, token) => {
  const offset = text.text.length;
  FOCUS.set(text, [offset, token]);
};
var getFocusOffset = (text) => {
  return FOCUS.get(text);
};

// src/internals/creators.ts
var STRINGS = /* @__PURE__ */ new WeakSet();
var resolveDescendants = (children) => {
  const nodes = [];
  const addChild = (child) => {
    if (child == null) {
      return;
    }
    const prev = nodes.at(-1);
    if (typeof child === "string") {
      const text = { text: child };
      STRINGS.add(text);
      child = text;
    }
    if (TextApi.isText(child)) {
      const c = child;
      if (TextApi.isText(prev) && STRINGS.has(prev) && STRINGS.has(c) && TextApi.equals(prev, c, { loose: true })) {
        prev.text += c.text;
      } else {
        nodes.push(c);
      }
    } else if (ElementApi.isElement(child)) {
      nodes.push(child);
    } else if (child instanceof Token) {
      let n = nodes.at(-1);
      if (!TextApi.isText(n)) {
        addChild("");
        n = nodes.at(-1);
      }
      if (child instanceof AnchorToken) {
        addAnchorToken(n, child);
      } else if (child instanceof FocusToken) {
        addFocusToken(n, child);
      }
    } else {
      throw new TypeError(
        `Unexpected hyperscript child object: ${child}`
      );
    }
  };
  for (const child of children.flat(Number.POSITIVE_INFINITY)) {
    addChild(child);
  }
  return nodes;
};
var createAnchor = (tagName, attributes) => new AnchorToken(attributes);
var createCursor = (tagName, attributes) => [new AnchorToken(attributes), new FocusToken(attributes)];
var createElement = (tagName, attributes, children) => ({
  ...attributes,
  children: resolveDescendants(children)
});
var createFocus = (tagName, attributes) => new FocusToken(attributes);
var createFragment = (tagName, attributes, children) => resolveDescendants(children);
var createSelection = (tagName, attributes, children) => {
  const anchor = children.find((c) => c instanceof AnchorToken);
  const focus = children.find((c) => c instanceof FocusToken);
  if (!anchor?.offset || !anchor.path) {
    throw new Error(
      `The <selection> hyperscript tag must have an <anchor> tag as a child with \`path\` and \`offset\` attributes defined.`
    );
  }
  if (!focus?.offset || !focus.path) {
    throw new Error(
      `The <selection> hyperscript tag must have a <focus> tag as a child with \`path\` and \`offset\` attributes defined.`
    );
  }
  return {
    anchor: {
      offset: anchor.offset,
      path: anchor.path
    },
    focus: {
      offset: focus.offset,
      path: focus.path
    },
    ...attributes
  };
};
var createText = (tagName, attributes, children) => {
  const nodes = resolveDescendants(children);
  if (nodes.length > 1) {
    throw new Error(
      `The <text> hyperscript tag must only contain a single node's worth of children.`
    );
  }
  let [node] = nodes;
  if (node == null) {
    node = { text: "" };
  }
  if (!TextApi.isText(node)) {
    throw new Error(`
    The <text> hyperscript tag can only contain text content as children.`);
  }
  STRINGS.delete(node);
  Object.assign(node, attributes);
  return node;
};
var createEditor = (makeEditor2) => (tagName, attributes, children) => {
  const otherChildren = [];
  let selectionChild;
  for (const child of children) {
    if (RangeApi.isRange(child)) {
      selectionChild = child;
    } else {
      otherChildren.push(child);
    }
  }
  const descendants = resolveDescendants(otherChildren);
  const selection = {};
  const editor = makeEditor2();
  Object.assign(editor, attributes);
  editor.children = descendants;
  for (const [node, path] of NodeApi.texts(editor)) {
    const anchor = getAnchorOffset(node);
    const focus = getFocusOffset(node);
    if (anchor != null) {
      const [offset] = anchor;
      selection.anchor = { offset, path };
    }
    if (focus != null) {
      const [offset] = focus;
      selection.focus = { offset, path };
    }
  }
  if (selection.anchor && !selection.focus) {
    throw new Error(
      `Slate hyperscript ranges must have both \`<anchor />\` and \`<focus />\` defined if one is defined, but you only defined \`<anchor />\`. For collapsed selections, use \`<cursor />\` instead.`
    );
  }
  if (!selection.anchor && selection.focus) {
    throw new Error(
      `Slate hyperscript ranges must have both \`<anchor />\` and \`<focus />\` defined if one is defined, but you only defined \`<focus />\`. For collapsed selections, use \`<cursor />\` instead.`
    );
  }
  if (selectionChild != null) {
    editor.selection = selectionChild;
  } else if (RangeApi.isRange(selection)) {
    editor.selection = selection;
  }
  return editor;
};

// src/internals/hyperscript.ts
import { createEditor as makeEditor } from "@platejs/slate";
function isPlainObject(value) {
  return typeof value === "object" && value !== null && Object.getPrototypeOf(value) === Object.prototype;
}
var DEFAULT_CREATORS = {
  anchor: createAnchor,
  cursor: createCursor,
  editor: createEditor(makeEditor),
  element: createElement,
  focus: createFocus,
  fragment: createFragment,
  selection: createSelection,
  text: createText
};
var createHyperscript = (options = {}) => {
  const { elements: elements2 = {} } = options;
  const elementCreators = normalizeElements(elements2);
  const creators = {
    ...DEFAULT_CREATORS,
    ...elementCreators,
    ...options.creators
  };
  const jsx2 = createFactory(creators);
  return jsx2;
};
var createFactory = (creators) => {
  const jsx2 = (tagName, attributes, ...children) => {
    for (const key in attributes) {
      if (key.startsWith("__")) {
        delete attributes[key];
      }
    }
    const creator = creators[tagName];
    if (!creator) {
      throw new Error(`No hyperscript creator found for tag: <${tagName}>`);
    }
    if (attributes == null) {
      attributes = {};
    }
    if (!isPlainObject(attributes)) {
      children = [attributes].concat(children);
      attributes = {};
    }
    children = children.filter(Boolean).flat();
    const ret = creator(tagName, attributes, children);
    return ret;
  };
  return jsx2;
};
var normalizeElements = (elements2) => {
  const creators = {};
  for (const tagName in elements2) {
    const props = elements2[tagName];
    if (typeof props !== "object") {
      throw new TypeError(
        `Properties specified for a hyperscript shorthand should be an object, but for the custom element <${tagName}>  tag you passed: ${props}`
      );
    }
    creators[tagName] = (tagName2, attributes, children) => {
      for (const key in attributes) {
        if (key.startsWith("__")) {
          delete attributes[key];
        }
      }
      const el = createElement(
        "element",
        { ...props, ...attributes },
        children
      );
      return el;
    };
  }
  return creators;
};

// src/jsx.ts
var voidChildren = [{ text: "" }];
var elements = {
  ha: { type: "a" },
  haudio: { children: voidChildren, type: "audio" },
  hblockquote: { type: "blockquote" },
  hcallout: { type: "callout" },
  hcodeblock: { type: "code_block" },
  hcodeline: { type: "code_line" },
  hcolumn: { type: "column" },
  hcolumngroup: { type: "column_group" },
  hdate: { children: voidChildren, type: "date" },
  hdefault: { type: "p" },
  hequation: { type: "equation" },
  hexcalidraw: { type: "excalidraw" },
  hfile: { children: voidChildren, type: "file" },
  hh1: { type: "h1" },
  hh2: { type: "h2" },
  hh3: { type: "h3" },
  hh4: { type: "h4" },
  hh5: { type: "h5" },
  hh6: { type: "h6" },
  himg: { children: voidChildren, type: "img" },
  hinlineequation: { type: "inline_equation" },
  hli: { type: "li" },
  hlic: { type: "lic" },
  hmediaembed: { children: voidChildren, type: "media_embed" },
  hmention: { children: voidChildren, type: "mention" },
  hmentioninput: { children: voidChildren, type: "mention_input" },
  hnli: { type: "nli" },
  hol: { type: "ol" },
  hp: { type: "p" },
  hplaceholder: { children: voidChildren, type: "placeholder" },
  htable: { type: "table" },
  htd: { type: "td" },
  hth: { type: "th" },
  htoc: { type: "toc" },
  htodoli: { type: "action_item" },
  htoggle: { type: "toggle" },
  htr: { type: "tr" },
  hul: { type: "ul" },
  hvideo: { children: voidChildren, type: "video" }
};
var jsx = createHyperscript({
  creators: {
    htext: createTestText
  },
  elements
});
var jsxt = createHyperscriptBase({
  creators: {
    htext: createTestText
  },
  elements
});
var hjsx = createHyperscript({
  creators: {
    htext: createText
  },
  elements
});
export {
  createDataTransfer,
  createEditor,
  createHyperscript,
  elements,
  getHtmlDocument,
  hjsx,
  jsx,
  jsxt,
  voidChildren
};
//# sourceMappingURL=index.mjs.map