"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  CodeBlockPlugin: () => CodeBlockPlugin,
  CodeLinePlugin: () => CodeLinePlugin,
  CodeSyntaxPlugin: () => CodeSyntaxPlugin
});
module.exports = __toCommonJS(react_exports);

// src/react/CodeBlockPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseCodeBlockPlugin.ts
var import_platejs9 = require("platejs");

// src/lib/deserializer/htmlDeserializerCodeBlock.ts
var import_platejs = require("platejs");
var htmlDeserializerCodeBlock = {
  rules: [
    {
      validNodeName: "PRE"
    },
    {
      validNodeName: "P",
      validStyle: {
        fontFamily: "Consolas"
      }
    }
  ],
  parse: ({ element }) => {
    const languageSelectorText = [...element.childNodes].find(
      (node) => node.nodeName === "SELECT"
    )?.textContent || "";
    const textContent = element.textContent?.replace(languageSelectorText, "") || "";
    let lines = textContent.split("\n");
    if (!lines?.length) {
      lines = [textContent];
    }
    const codeLines = lines.map((line) => ({
      children: [{ text: line }],
      type: import_platejs.KEYS.codeLine
    }));
    return {
      children: codeLines,
      type: import_platejs.KEYS.codeBlock
    };
  }
};

// src/lib/queries/getCodeLineEntry.ts
var import_platejs2 = require("platejs");
var getCodeLineEntry = (editor, { at = editor.selection } = {}) => {
  if (at && editor.api.some({
    at,
    match: { type: editor.getType(import_platejs2.KEYS.codeLine) }
  })) {
    const selectionParent = editor.api.parent(at);
    if (!selectionParent) return;
    const [, parentPath] = selectionParent;
    const codeLine = editor.api.above({
      at,
      match: { type: editor.getType(import_platejs2.KEYS.codeLine) }
    }) || editor.api.parent(parentPath);
    if (!codeLine) return;
    const [codeLineNode, codeLinePath] = codeLine;
    if (import_platejs2.ElementApi.isElement(codeLineNode) && codeLineNode.type !== editor.getType(import_platejs2.KEYS.codeLine))
      return;
    const codeBlock = editor.api.parent(codeLinePath);
    if (!codeBlock) return;
    return {
      codeBlock,
      codeLine
    };
  }
};

// src/lib/queries/getIndentDepth.ts
var getIndentDepth = (editor, { codeLine }) => {
  const [, codeLinePath] = codeLine;
  const text = editor.api.string(codeLinePath);
  return text.search(/\S|$/);
};

// src/lib/queries/isCodeBlockEmpty.ts
var import_platejs3 = require("platejs");
var isCodeBlockEmpty = (editor) => {
  const { codeBlock } = getCodeLineEntry(editor) ?? {};
  if (!codeBlock) return false;
  const codeLines = Array.from(import_platejs3.NodeApi.children(editor, codeBlock[1]));
  if (codeLines.length === 0) return true;
  if (codeLines.length > 1) return false;
  const firstCodeLineNode = codeLines[0][0];
  return !import_platejs3.NodeApi.string(firstCodeLineNode);
};

// src/lib/setCodeBlockToDecorations.ts
var import_platejs4 = require("platejs");
var CODE_LINE_TO_DECORATIONS = /* @__PURE__ */ new WeakMap();
function getHighlightNodes(result) {
  return result.value || result.children || [];
}
function parseNodes(nodes, className = []) {
  return nodes.flatMap((node) => {
    const classes = [
      ...className,
      ...node.properties ? node.properties.className : []
    ];
    if (node.children) {
      return parseNodes(node.children, classes);
    }
    return { classes, text: node.value };
  });
}
function normalizeTokens(tokens) {
  const lines = [[]];
  let currentLine = lines[0];
  for (const token of tokens) {
    const tokenLines = token.text.split("\n");
    for (let i = 0; i < tokenLines.length; i++) {
      const content = tokenLines[i];
      if (content) {
        currentLine.push({ classes: token.classes, content });
      }
      if (i < tokenLines.length - 1) {
        lines.push([]);
        currentLine = lines.at(-1);
      }
    }
  }
  return lines;
}
function codeBlockToDecorations(editor, [block, blockPath]) {
  const { defaultLanguage, ...options } = editor.getOptions(BaseCodeBlockPlugin);
  const lowlight = options.lowlight;
  const text = block.children.map((line) => import_platejs4.NodeApi.string(line)).join("\n");
  const language = block.lang;
  const effectiveLanguage = language || defaultLanguage;
  let highlighted;
  try {
    if (!effectiveLanguage || effectiveLanguage === "plaintext") {
      highlighted = { value: [] };
    } else if (effectiveLanguage === "auto") {
      highlighted = lowlight.highlightAuto(text);
    } else {
      highlighted = lowlight.highlight(effectiveLanguage, text);
    }
  } catch (error) {
    const availableLanguages = lowlight.listLanguages();
    const isLanguageRegistered = effectiveLanguage && availableLanguages.includes(effectiveLanguage);
    if (isLanguageRegistered) {
      editor.api.debug.error(error, "CODE_HIGHLIGHT");
      highlighted = { value: [] };
    } else {
      editor.api.debug.warn(
        `Language "${effectiveLanguage}" is not registered. Falling back to plaintext`
      );
      highlighted = { value: [] };
    }
  }
  const tokens = parseNodes(getHighlightNodes(highlighted));
  const normalizedTokens = normalizeTokens(tokens);
  const blockChildren = block.children;
  const nodeToDecorations = /* @__PURE__ */ new Map();
  const numLines = Math.min(normalizedTokens.length, blockChildren.length);
  for (let index = 0; index < numLines; index++) {
    const lineTokens = normalizedTokens[index];
    const element = blockChildren[index];
    if (!nodeToDecorations.has(element)) {
      nodeToDecorations.set(element, []);
    }
    let start = 0;
    for (const token of lineTokens) {
      const length = token.content.length;
      if (!length) continue;
      const end = start + length;
      const decoration = {
        anchor: {
          offset: start,
          path: [...blockPath, index, 0]
        },
        className: token.classes.join(" "),
        focus: {
          offset: end,
          path: [...blockPath, index, 0]
        },
        [import_platejs4.KEYS.codeSyntax]: true
      };
      nodeToDecorations.get(element).push(decoration);
      start = end;
    }
  }
  return nodeToDecorations;
}
function setCodeBlockToDecorations(editor, [block, blockPath]) {
  const decorations = codeBlockToDecorations(editor, [block, blockPath]);
  for (const [node, decs] of decorations.entries()) {
    CODE_LINE_TO_DECORATIONS.set(node, decs);
  }
}
function resetCodeBlockDecorations(codeBlock) {
  codeBlock.children.forEach((line) => {
    CODE_LINE_TO_DECORATIONS.delete(line);
  });
}

// src/lib/transforms/deleteStartSpace.ts
var deleteStartSpace = (editor, { codeLine }) => {
  const [, codeLinePath] = codeLine;
  const codeLineStart = editor.api.start(codeLinePath);
  const codeLineEnd = codeLineStart && editor.api.after(codeLineStart);
  const spaceRange = codeLineEnd && editor.api.range(codeLineStart, codeLineEnd);
  const spaceText = editor.api.string(spaceRange);
  if (/\s/.test(spaceText)) {
    editor.tf.delete({ at: spaceRange });
    return true;
  }
  return false;
};

// src/lib/transforms/indentCodeLine.ts
var indentCodeLine = (editor, { codeLine, indentDepth = 2 }) => {
  const [, codeLinePath] = codeLine;
  const codeLineStart = editor.api.start(codeLinePath);
  const indent = " ".repeat(indentDepth);
  if (!editor.api.isExpanded()) {
    const cursor = editor.selection?.anchor;
    const range = editor.api.range(codeLineStart, cursor);
    const text = editor.api.string(range);
    if (/\S/.test(text)) {
      editor.tf.insertText(indent, { at: editor.selection });
      return;
    }
  }
  editor.tf.insertText(indent, { at: codeLineStart });
};

// src/lib/transforms/outdentCodeLine.ts
var outdentCodeLine = (editor, { codeBlock, codeLine }) => {
  const deleted = deleteStartSpace(editor, { codeBlock, codeLine });
  deleted && deleteStartSpace(editor, { codeBlock, codeLine });
};

// src/lib/transforms/unwrapCodeBlock.ts
var import_platejs5 = require("platejs");
var unwrapCodeBlock = (editor) => {
  if (!editor.selection) return;
  const codeBlockType = editor.getType(import_platejs5.KEYS.codeBlock);
  const defaultType = editor.getType(import_platejs5.KEYS.p);
  editor.tf.withoutNormalizing(() => {
    const codeBlockEntries = editor.api.nodes({
      at: editor.selection,
      match: { type: codeBlockType }
    });
    const reversedCodeBlockEntries = Array.from(codeBlockEntries).reverse();
    for (const codeBlockEntry of reversedCodeBlockEntries) {
      const codeLineEntries = import_platejs5.NodeApi.children(editor, codeBlockEntry[1]);
      for (const [, path] of codeLineEntries) {
        editor.tf.setNodes({ type: defaultType }, { at: path });
      }
      editor.tf.unwrapNodes({
        at: codeBlockEntry[1],
        match: { type: codeBlockType },
        split: true
      });
    }
  });
};

// src/lib/withInsertDataCodeBlock.ts
var import_platejs6 = require("platejs");
var withInsertDataCodeBlock = ({
  editor,
  tf: { insertData },
  type: codeBlockType
}) => ({
  transforms: {
    insertData(data) {
      const text = data.getData("text/plain");
      const vscodeDataString = data.getData("vscode-editor-data");
      const codeLineType = editor.getType(import_platejs6.KEYS.codeLine);
      if (vscodeDataString) {
        try {
          const vscodeData = JSON.parse(vscodeDataString);
          const lines = text.split("\n");
          const [blockAbove2] = editor.api.block() ?? [];
          const isInCodeBlock = blockAbove2 && [codeBlockType, codeLineType].includes(blockAbove2?.type);
          if (isInCodeBlock) {
            if (lines[0]) {
              editor.tf.insertText(lines[0]);
            }
            if (lines.length > 1) {
              const nodes = lines.slice(1).map((line) => ({
                children: [{ text: line }],
                type: codeLineType
              }));
              editor.tf.insertNodes(nodes);
            }
          } else {
            const node = {
              children: lines.map((line) => ({
                children: [{ text: line }],
                type: codeLineType
              })),
              lang: vscodeData?.mode,
              type: codeBlockType
            };
            editor.tf.insertNodes(node, {
              select: true
            });
          }
          return;
        } catch (error) {
        }
      }
      const [blockAbove] = editor.api.block() ?? [];
      if (blockAbove && [codeBlockType, codeLineType].includes(blockAbove?.type) && text?.includes("\n")) {
        const lines = text.split("\n");
        if (lines[0]) {
          editor.tf.insertText(lines[0]);
        }
        if (lines.length > 1) {
          const nodes = lines.slice(1).map((line) => ({
            children: [{ text: line }],
            type: codeLineType
          }));
          editor.tf.insertNodes(nodes);
        }
        return;
      }
      insertData(data);
    }
  }
});

// src/lib/withInsertFragmentCodeBlock.ts
var import_platejs7 = require("platejs");
function extractCodeLinesFromCodeBlock(node) {
  return node.children;
}
var withInsertFragmentCodeBlock = ({
  editor,
  tf: { insertFragment },
  type: codeBlockType
}) => ({
  transforms: {
    insertFragment(fragment) {
      const [blockAbove] = editor.api.block() ?? [];
      const codeLineType = editor.getType(import_platejs7.KEYS.codeLine);
      function convertNodeToCodeLine(node) {
        return {
          children: [{ text: import_platejs7.NodeApi.string(node) }],
          type: codeLineType
        };
      }
      if (blockAbove && [codeBlockType, codeLineType].includes(blockAbove?.type)) {
        return insertFragment(
          fragment.flatMap((node) => {
            const element = node;
            return element.type === codeBlockType ? extractCodeLinesFromCodeBlock(element) : convertNodeToCodeLine(element);
          })
        );
      }
      return insertFragment(fragment);
    }
  }
});

// src/lib/withNormalizeCodeBlock.tsx
var import_platejs8 = require("platejs");
var withNormalizeCodeBlock = ({
  editor,
  getOptions,
  tf: { normalizeNode },
  type
}) => ({
  transforms: {
    normalizeNode([node, path]) {
      if (node.type === type && getOptions().lowlight) {
        setCodeBlockToDecorations(editor, [
          node,
          path
        ]);
      }
      normalizeNode([node, path]);
      if (!import_platejs8.ElementApi.isElement(node)) {
        return;
      }
      const codeBlockType = editor.getType(import_platejs8.KEYS.codeBlock);
      const codeLineType = editor.getType(import_platejs8.KEYS.codeLine);
      const isCodeBlockRoot = node.type === codeBlockType;
      if (isCodeBlockRoot) {
        const nonCodeLine = Array.from(import_platejs8.NodeApi.children(editor, path)).find(
          ([child]) => child.type !== codeLineType
        );
        if (nonCodeLine) {
          editor.tf.setNodes({ type: codeLineType }, { at: nonCodeLine[1] });
        }
      }
    }
  }
});

// src/lib/withCodeBlock.ts
var withCodeBlock = (ctx) => {
  const {
    editor,
    getOptions,
    tf: { apply, insertBreak, resetBlock, selectAll, tab },
    type
  } = ctx;
  return {
    transforms: {
      apply(operation) {
        if (getOptions().lowlight && operation.type === "set_node") {
          const entry = editor.api.node(operation.path);
          if (entry?.[0].type === type && operation.newProperties?.lang) {
            resetCodeBlockDecorations(entry[0]);
          }
        }
        apply(operation);
      },
      insertBreak() {
        const apply2 = () => {
          if (!editor.selection) return;
          const res = getCodeLineEntry(editor, {});
          if (!res) return;
          const { codeBlock, codeLine } = res;
          const indentDepth = getIndentDepth(editor, {
            codeBlock,
            codeLine
          });
          insertBreak();
          indentCodeLine(editor, {
            codeBlock,
            codeLine,
            indentDepth
          });
          return true;
        };
        if (apply2()) return;
        insertBreak();
      },
      resetBlock(options) {
        if (editor.api.block({
          at: options?.at,
          match: { type }
        })) {
          unwrapCodeBlock(editor);
          return;
        }
        return resetBlock(options);
      },
      selectAll: () => {
        const apply2 = () => {
          const codeBlock = editor.api.above({
            match: { type }
          });
          if (!codeBlock) return;
          if (editor.api.isAt({ end: true }) && editor.api.isAt({ start: true })) {
            return;
          }
          editor.tf.select(codeBlock[1]);
          return true;
        };
        if (apply2()) return true;
        return selectAll();
      },
      tab: (options) => {
        const apply2 = () => {
          const _codeLines = editor.api.nodes({
            match: { type }
          });
          const codeLines = Array.from(_codeLines);
          if (codeLines.length > 0) {
            const [, firstLinePath] = codeLines[0];
            const codeBlock = editor.api.parent(firstLinePath);
            if (!codeBlock) return;
            editor.tf.withoutNormalizing(() => {
              for (const codeLine of codeLines) {
                if (options.reverse) {
                  outdentCodeLine(editor, { codeBlock, codeLine });
                } else {
                  indentCodeLine(editor, { codeBlock, codeLine });
                }
              }
            });
            return true;
          }
        };
        if (apply2()) return true;
        return tab(options);
      },
      ...withInsertDataCodeBlock(ctx).transforms,
      ...withInsertFragmentCodeBlock(ctx).transforms,
      ...withNormalizeCodeBlock(ctx).transforms
    }
  };
};

// src/lib/BaseCodeBlockPlugin.ts
var BaseCodeLinePlugin = (0, import_platejs9.createTSlatePlugin)({
  key: import_platejs9.KEYS.codeLine,
  node: { isElement: true, isStrictSiblings: true }
});
var BaseCodeSyntaxPlugin = (0, import_platejs9.createSlatePlugin)({
  key: import_platejs9.KEYS.codeSyntax,
  node: { isLeaf: true }
});
var BaseCodeBlockPlugin = (0, import_platejs9.createTSlatePlugin)({
  key: import_platejs9.KEYS.codeBlock,
  inject: {
    plugins: {
      [import_platejs9.KEYS.html]: {
        parser: {
          query: ({ editor }) => !editor.api.some({
            match: { type: editor.getType(import_platejs9.KEYS.codeLine) }
          })
        }
      }
    }
  },
  node: {
    isElement: true
  },
  options: {
    defaultLanguage: null,
    lowlight: null
  },
  parsers: { html: { deserializer: htmlDeserializerCodeBlock } },
  plugins: [BaseCodeLinePlugin, BaseCodeSyntaxPlugin],
  render: { as: "pre" },
  rules: {
    delete: {
      empty: "reset"
    },
    match: ({ editor, rule }) => {
      return ["break.empty", "delete.empty"].includes(rule) && isCodeBlockEmpty(editor);
    }
  },
  decorate: ({ editor, entry: [node, path], getOptions, type }) => {
    if (!getOptions().lowlight) return [];
    const codeLineType = editor.getType(import_platejs9.KEYS.codeLine);
    if (node.type === type && !CODE_LINE_TO_DECORATIONS.get(node.children[0])) {
      setCodeBlockToDecorations(editor, [node, path]);
    }
    if (node.type === codeLineType) {
      return CODE_LINE_TO_DECORATIONS.get(node) || [];
    }
    return [];
  }
}).overrideEditor(withCodeBlock).extendTransforms(({ editor }) => ({
  toggle: () => {
    editor.tf.toggleBlock(editor.getType(import_platejs9.KEYS.codeBlock));
  }
}));

// src/react/CodeBlockPlugin.tsx
var CodeSyntaxPlugin = (0, import_react.toPlatePlugin)(BaseCodeSyntaxPlugin);
var CodeLinePlugin = (0, import_react.toPlatePlugin)(BaseCodeLinePlugin);
var CodeBlockPlugin = (0, import_react.toPlatePlugin)(BaseCodeBlockPlugin, {
  plugins: [CodeLinePlugin, CodeSyntaxPlugin]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin
});
//# sourceMappingURL=index.js.map