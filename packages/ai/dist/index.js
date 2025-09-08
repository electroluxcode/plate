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
  BaseAIPlugin: () => BaseAIPlugin,
  escapeInput: () => escapeInput,
  getChunkTrimmed: () => getChunkTrimmed,
  getCurrentBlockPath: () => getCurrentBlockPath,
  getListNode: () => getListNode,
  insertAINodes: () => insertAINodes,
  isCompleteCodeBlock: () => isCompleteCodeBlock,
  isCompleteMath: () => isCompleteMath,
  isSameNode: () => isSameNode,
  nodesWithProps: () => nodesWithProps,
  removeAIMarks: () => removeAIMarks,
  removeAINodes: () => removeAINodes,
  streamDeserializeInlineMd: () => streamDeserializeInlineMd,
  streamDeserializeMd: () => streamDeserializeMd,
  streamInsertChunk: () => streamInsertChunk,
  streamSerializeMd: () => streamSerializeMd,
  undoAI: () => undoAI,
  withAIBatch: () => withAIBatch
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseAIPlugin.ts
var import_platejs3 = require("platejs");

// src/lib/transforms/insertAINodes.ts
var insertAINodes = (editor, nodes, {
  target
} = {}) => {
  if (!target && !editor.selection?.focus.path) return;
  const aiNodes = nodes.map((node) => ({
    ...node,
    ai: true
  }));
  editor.tf.withoutNormalizing(() => {
    editor.tf.insertNodes(aiNodes, {
      at: editor.api.end(target || editor.selection.focus.path),
      select: true
    });
    editor.tf.collapse({ edge: "end" });
  });
};

// src/lib/transforms/removeAIMarks.ts
var import_platejs = require("platejs");
var removeAIMarks = (editor, { at = [] } = {}) => {
  const nodeType = (0, import_platejs.getPluginType)(editor, import_platejs.KEYS.ai);
  editor.tf.unsetNodes(nodeType, {
    at,
    match: (n) => n[nodeType]
  });
};

// src/lib/transforms/removeAINodes.ts
var import_platejs2 = require("platejs");
var removeAINodes = (editor, { at = [] } = {}) => {
  editor.tf.removeNodes({
    at,
    match: (n) => import_platejs2.TextApi.isText(n) && !!n.ai
  });
};

// src/lib/transforms/undoAI.ts
var undoAI = (editor) => {
  if (editor.history.undos.at(-1)?.ai && editor.api.some({
    at: [],
    match: (n) => !!n.ai
  })) {
    editor.undo();
    editor.history.redos.pop();
  }
};

// src/lib/transforms/withAIBatch.ts
var withAIBatch = (editor, fn, {
  split
} = {}) => {
  if (split) {
    editor.tf.withNewBatch(fn);
  } else {
    editor.tf.withMerging(fn);
  }
  const lastBatch = editor.history.undos?.at(-1);
  if (lastBatch) {
    lastBatch.ai = true;
  }
};

// src/lib/BaseAIPlugin.ts
var BaseAIPlugin = (0, import_platejs3.createTSlatePlugin)({
  key: import_platejs3.KEYS.ai,
  node: { isDecoration: false, isLeaf: true }
}).extendTransforms(({ editor }) => ({
  insertNodes: (0, import_platejs3.bindFirst)(insertAINodes, editor),
  removeMarks: (0, import_platejs3.bindFirst)(removeAIMarks, editor),
  removeNodes: (0, import_platejs3.bindFirst)(removeAINodes, editor),
  undo: (0, import_platejs3.bindFirst)(undoAI, editor)
}));

// src/lib/streaming/streamDeserializeInlineMd.ts
var import_markdown = require("@platejs/markdown");
var streamDeserializeInlineMd = (editor, text, options) => {
  return editor.getApi(import_markdown.MarkdownPlugin).markdown.deserializeInline(text, options);
};

// src/lib/streaming/streamDeserializeMd.ts
var import_markdown3 = require("@platejs/markdown");
var import_platejs15 = require("platejs");

// src/react/ai/AIPlugin.ts
var import_react = require("platejs/react");
var AIPlugin = (0, import_react.toPlatePlugin)(BaseAIPlugin);

// src/react/ai-chat/AIChatPlugin.ts
var import_react9 = require("@platejs/selection/react");
var import_platejs12 = require("platejs");
var import_react10 = require("platejs/react");

// src/react/ai-chat/transforms/acceptAIChat.ts
var import_platejs4 = require("platejs");
var import_react2 = require("platejs/react");
var acceptAIChat = (editor) => {
  const { tf } = (0, import_react2.getEditorPlugin)(editor, AIPlugin);
  const api = editor.getApi({ key: import_platejs4.KEYS.ai });
  const lastAINodePath = api.aiChat.node({ at: [], reverse: true })[1];
  withAIBatch(editor, () => {
    tf.ai.removeMarks();
    editor.getTransforms(AIChatPlugin).aiChat.removeAnchor();
  });
  api.aiChat.hide();
  editor.tf.focus();
  const focusPoint = editor.api.end(lastAINodePath);
  editor.tf.setSelection({
    anchor: focusPoint,
    focus: focusPoint
  });
};

// src/react/ai-chat/transforms/insertBelowAIChat.ts
var import_react4 = require("@platejs/selection/react");
var import_cloneDeep2 = __toESM(require("lodash/cloneDeep.js"));
var import_platejs6 = require("platejs");

// src/react/ai-chat/transforms/replaceSelectionAIChat.ts
var import_react3 = require("@platejs/selection/react");
var import_cloneDeep = __toESM(require("lodash/cloneDeep.js"));
var import_platejs5 = require("platejs");
var createFormattedBlocks = ({
  blocks,
  format,
  sourceBlock
}) => {
  if (format === "none") return (0, import_cloneDeep.default)(blocks);
  const [sourceNode] = sourceBlock;
  const firstTextEntry = import_platejs5.NodeApi.firstText(sourceNode);
  if (!firstTextEntry) return null;
  const blockProps = import_platejs5.NodeApi.extractProps(sourceNode);
  const textProps = import_platejs5.NodeApi.extractProps(firstTextEntry[0]);
  const applyTextFormatting = (node) => {
    if (import_platejs5.TextApi.isText(node)) {
      return { ...textProps, ...node };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(applyTextFormatting)
      };
    }
    return node;
  };
  return blocks.map((block, index) => {
    if (format === "single" && index > 0) {
      return block;
    }
    return applyTextFormatting({
      ...block,
      ...blockProps
    });
  });
};
var replaceSelectionAIChat = (editor, sourceEditor, { format = "single" } = {}) => {
  if (!sourceEditor || sourceEditor.api.isEmpty()) return;
  const isBlockSelecting = editor.getOption(
    import_react3.BlockSelectionPlugin,
    "isSelectingSome"
  );
  editor.getApi({ key: import_platejs5.KEYS.ai }).aiChat.hide();
  if (!isBlockSelecting) {
    const firstBlock = editor.api.node({
      block: true,
      mode: "lowest"
    });
    if (firstBlock && editor.api.isSelected(firstBlock[1], { contains: true }) && format !== "none") {
      const formattedBlocks2 = createFormattedBlocks({
        blocks: (0, import_cloneDeep.default)(sourceEditor.children),
        format,
        sourceBlock: firstBlock
      });
      if (!formattedBlocks2) return;
      if (firstBlock[0].type === import_platejs5.KEYS.codeLine && sourceEditor.children[0].type === import_platejs5.KEYS.codeBlock && sourceEditor.children.length === 1) {
        editor.tf.insertFragment(formattedBlocks2[0].children);
      } else {
        editor.tf.insertFragment(formattedBlocks2);
      }
      editor.tf.focus();
      return;
    }
    editor.tf.insertFragment(sourceEditor.children);
    editor.tf.focus();
    return;
  }
  const blockSelectionApi = editor.getApi(import_react3.BlockSelectionPlugin).blockSelection;
  const selectedBlocks = blockSelectionApi.getNodes();
  if (selectedBlocks.length === 0) return;
  if (format === "none" || format === "single" && selectedBlocks.length > 1) {
    editor.tf.withoutNormalizing(() => {
      (0, import_react3.removeBlockSelectionNodes)(editor);
      editor.tf.withNewBatch(() => {
        editor.getTransforms(import_react3.BlockSelectionPlugin).blockSelection.insertBlocksAndSelect(
          (0, import_cloneDeep.default)(sourceEditor.children),
          {
            at: selectedBlocks[0][1]
          }
        );
      });
    });
    editor.getApi(import_react3.BlockSelectionPlugin).blockSelection.focus();
    return;
  }
  const [, firstBlockPath] = selectedBlocks[0];
  const formattedBlocks = createFormattedBlocks({
    blocks: (0, import_cloneDeep.default)(sourceEditor.children),
    format,
    sourceBlock: selectedBlocks[0]
  });
  if (!formattedBlocks) return;
  editor.tf.withoutNormalizing(() => {
    (0, import_react3.removeBlockSelectionNodes)(editor);
    editor.tf.withNewBatch(() => {
      editor.getTransforms(import_react3.BlockSelectionPlugin).blockSelection.insertBlocksAndSelect(formattedBlocks, {
        at: firstBlockPath
      });
    });
  });
  editor.getApi(import_react3.BlockSelectionPlugin).blockSelection.focus();
};

// src/react/ai-chat/transforms/insertBelowAIChat.ts
var insertBelowAIChat = (editor, sourceEditor, { format = "single" } = {}) => {
  if (!sourceEditor || sourceEditor.api.isEmpty()) return;
  const isBlockSelecting = editor.getOption(
    import_react4.BlockSelectionPlugin,
    "isSelectingSome"
  );
  editor.getApi({ key: import_platejs6.KEYS.ai }).aiChat.hide();
  const insertBlocksAndSelect = editor.getTransforms(import_react4.BlockSelectionPlugin).blockSelection.insertBlocksAndSelect;
  if (isBlockSelecting) {
    const selectedBlocks = editor.getApi(import_react4.BlockSelectionPlugin).blockSelection.getNodes();
    const selectedIds = editor.getOptions(import_react4.BlockSelectionPlugin).selectedIds;
    if (!selectedIds || selectedIds.size === 0) return;
    const lastBlock = selectedBlocks.at(-1);
    if (!lastBlock) return;
    const nextPath = import_platejs6.PathApi.next(lastBlock[1]);
    if (format === "none") {
      insertBlocksAndSelect((0, import_cloneDeep2.default)(sourceEditor.children), {
        at: nextPath
      });
      return;
    }
    const formattedBlocks = createFormattedBlocks({
      blocks: (0, import_cloneDeep2.default)(sourceEditor.children),
      format,
      sourceBlock: lastBlock
    });
    if (!formattedBlocks) return;
    insertBlocksAndSelect(formattedBlocks, {
      at: nextPath
    });
  } else {
    const [, end] = import_platejs6.RangeApi.edges(editor.selection);
    const endPath = [end.path[0]];
    const currentBlock = editor.api.node({
      at: endPath,
      block: true,
      mode: "lowest"
    });
    if (!currentBlock) return;
    if (format === "none") {
      insertBlocksAndSelect((0, import_cloneDeep2.default)(sourceEditor.children), {
        at: import_platejs6.PathApi.next(endPath)
      });
      return;
    }
    const formattedBlocks = createFormattedBlocks({
      blocks: (0, import_cloneDeep2.default)(sourceEditor.children),
      format,
      sourceBlock: currentBlock
    });
    if (!formattedBlocks) return;
    insertBlocksAndSelect(formattedBlocks, {
      at: import_platejs6.PathApi.next(endPath)
    });
  }
};

// src/react/ai-chat/transforms/removeAnchorAIChat.ts
var import_platejs7 = require("platejs");
var removeAnchorAIChat = (editor, options) => {
  editor.tf.withoutSaving(() => {
    editor.tf.removeNodes({
      at: [],
      match: (n) => import_platejs7.ElementApi.isElement(n) && n.type === (0, import_platejs7.getPluginType)(editor, import_platejs7.KEYS.aiChat),
      ...options
    });
  });
};

// src/react/ai-chat/utils/getEditorPrompt.ts
var import_selection = require("@platejs/selection");
var import_react6 = require("@platejs/selection/react");

// src/react/ai-chat/utils/getMarkdown.ts
var import_markdown2 = require("@platejs/markdown");
var import_react5 = require("@platejs/selection/react");
var import_platejs8 = require("platejs");
var getMarkdown = (editor, type) => {
  if (type === "editor") {
    return (0, import_markdown2.serializeMd)(editor);
  }
  if (type === "block") {
    const blocks = editor.getOption(import_react5.BlockSelectionPlugin, "isSelectingSome") ? editor.getApi(import_react5.BlockSelectionPlugin).blockSelection.getNodes() : editor.api.nodes({
      mode: "highest",
      match: (n) => editor.api.isBlock(n)
    });
    const nodes = Array.from(blocks, (entry) => entry[0]);
    return (0, import_markdown2.serializeMd)(editor, { value: nodes });
  }
  if (type === "selection") {
    const fragment = editor.api.fragment();
    if (fragment.length === 1) {
      const modifiedFragment = [
        {
          children: fragment[0].children,
          type: import_platejs8.KEYS.p
        }
      ];
      return (0, import_markdown2.serializeMd)(editor, { value: modifiedFragment });
    }
    return (0, import_markdown2.serializeMd)(editor, { value: fragment });
  }
  return "";
};

// src/react/ai-chat/utils/getEditorPrompt.ts
var replacePlaceholders = (editor, text, {
  prompt
}) => {
  let result = text.replace("{prompt}", prompt || "");
  const placeholders = {
    "{block}": "block",
    "{editor}": "editor",
    "{selection}": "selection"
  };
  Object.entries(placeholders).forEach(([placeholder, type]) => {
    if (result.includes(placeholder)) {
      result = result.replace(placeholder, getMarkdown(editor, type));
    }
  });
  return result;
};
var createPromptFromConfig = (config, params) => {
  const { isBlockSelecting, isSelecting: isSelecting3 } = params;
  if (isBlockSelecting && config.blockSelecting) {
    return config.blockSelecting ?? config.default;
  } else if (isSelecting3 && config.selecting) {
    return config.selecting ?? config.default;
  } else {
    return config.default;
  }
};
var getEditorPrompt = (editor, {
  prompt = "",
  promptTemplate = () => "{prompt}"
} = {}) => {
  const params = {
    editor,
    isBlockSelecting: editor.getOption(import_react6.BlockSelectionPlugin, "isSelectingSome"),
    isSelecting: (0, import_selection.isSelecting)(editor)
  };
  const template = promptTemplate(params);
  if (!template) return;
  let promptText = "";
  if (typeof prompt === "function") {
    promptText = prompt(params);
  } else if (typeof prompt === "object") {
    promptText = createPromptFromConfig(prompt, params);
  } else {
    promptText = prompt;
  }
  return replacePlaceholders(editor, template, {
    prompt: promptText
  });
};

// src/react/ai-chat/utils/resetAIChat.ts
var import_platejs9 = require("platejs");
var import_react7 = require("platejs/react");
var resetAIChat = (editor) => {
  const { api, getOptions } = (0, import_react7.getEditorPlugin)(editor, {
    key: import_platejs9.KEYS.aiChat
  });
  api.aiChat.stop();
  const chat = getOptions().chat;
  if (chat.messages && chat.messages.length > 0) {
    chat.setMessages?.([]);
  }
  editor.getTransforms(AIPlugin).ai.undo();
};

// src/react/ai-chat/utils/submitAIChat.ts
var import_selection2 = require("@platejs/selection");
var import_platejs10 = require("platejs");
var import_react8 = require("platejs/react");
var submitAIChat = (editor, {
  mode,
  options,
  prompt,
  system
} = {}) => {
  const { getOptions, setOption } = (0, import_react8.getEditorPlugin)(
    editor,
    {
      key: import_platejs10.KEYS.aiChat
    }
  );
  const { chat, promptTemplate, systemTemplate } = getOptions();
  if (!prompt && chat.input?.length === 0) {
    return;
  }
  if (!prompt) {
    prompt = chat.input;
  }
  if (!mode) {
    mode = (0, import_selection2.isSelecting)(editor) ? "chat" : "insert";
  }
  if (mode === "insert") {
    editor.getTransforms(AIPlugin).ai.undo();
  }
  setOption("mode", mode);
  chat.setInput?.("");
  void chat.append?.(
    {
      content: getEditorPrompt(editor, {
        prompt,
        promptTemplate
      }) ?? "",
      role: "user"
    },
    {
      body: {
        system: getEditorPrompt(editor, {
          prompt: system,
          promptTemplate: systemTemplate
        })
      },
      ...options
    }
  );
};

// src/react/ai-chat/withAIChat.ts
var import_platejs11 = require("platejs");
var withAIChat = ({
  api,
  editor,
  getOptions,
  tf: { insertText, normalizeNode, setSelection },
  type
}) => {
  const tf = editor.getTransforms(AIPlugin);
  const matchesTrigger = (text) => {
    const { trigger } = getOptions();
    if (trigger instanceof RegExp) {
      return trigger.test(text);
    }
    if (Array.isArray(trigger)) {
      return trigger.includes(text);
    }
    return text === trigger;
  };
  return {
    transforms: {
      insertText(text, options) {
        const { triggerPreviousCharPattern, triggerQuery } = getOptions();
        const fn = () => {
          if (!editor.selection || !matchesTrigger(text) || triggerQuery && !triggerQuery(editor)) {
            return;
          }
          const previousChar = editor.api.string(
            editor.api.range("before", editor.selection)
          );
          const matchesPreviousCharPattern = triggerPreviousCharPattern?.test(previousChar);
          if (!matchesPreviousCharPattern) return;
          const nodeEntry = editor.api.block({ highest: true });
          if (!nodeEntry || !editor.api.isEmpty(nodeEntry[0])) return;
          api.aiChat.show();
          return true;
        };
        if (fn()) return;
        return insertText(text, options);
      },
      normalizeNode(entry) {
        const [node, path] = entry;
        if (node[import_platejs11.KEYS.ai] && !getOptions().open) {
          tf.ai.removeMarks({ at: path });
          return;
        }
        if (import_platejs11.ElementApi.isElement(node) && node.type === type && !getOptions().open) {
          editor.getTransforms(AIChatPlugin).aiChat.removeAnchor({ at: path });
          return;
        }
        return normalizeNode(entry);
      }
    }
  };
};

// src/react/ai-chat/AIChatPlugin.ts
var AIChatPlugin = (0, import_react10.createTPlatePlugin)({
  key: import_platejs12.KEYS.aiChat,
  dependencies: ["ai"],
  node: {
    isElement: true
  },
  options: {
    _blockChunks: "",
    _blockPath: null,
    _mdxName: null,
    aiEditor: null,
    chat: { messages: [] },
    experimental_lastTextId: null,
    mode: "chat",
    open: false,
    streaming: false,
    trigger: " ",
    triggerPreviousCharPattern: /^\s?$/,
    promptTemplate: () => "{prompt}",
    systemTemplate: () => {
    }
  }
}).overrideEditor(withAIChat).extendApi(({ editor, getOption, getOptions, setOption, type }) => {
  return {
    reset: (0, import_platejs12.bindFirst)(resetAIChat, editor),
    submit: (0, import_platejs12.bindFirst)(submitAIChat, editor),
    node: (options = {}) => {
      const { anchor = false, streaming = false, ...rest } = options;
      if (anchor) {
        return editor.api.node({
          at: [],
          match: (n) => import_platejs12.ElementApi.isElement(n) && n.type === type,
          ...rest
        });
      }
      if (streaming) {
        if (!getOption("streaming")) return;
        const path = getOption("_blockPath");
        if (!path) return;
        return editor.api.node({
          at: path,
          mode: "lowest",
          reverse: true,
          match: (t) => !!t[(0, import_platejs12.getPluginType)(editor, import_platejs12.KEYS.ai)],
          ...rest
        });
      }
      return editor.api.node({
        match: (n) => n[(0, import_platejs12.getPluginType)(editor, import_platejs12.KEYS.ai)],
        ...rest
      });
    },
    reload: () => {
      const { chat, mode } = getOptions();
      if (mode === "insert") {
        editor.getTransforms(AIPlugin).ai.undo();
      }
      void chat.reload?.({
        body: {
          system: getEditorPrompt(editor, {
            promptTemplate: getOptions().systemTemplate
          })
        }
      });
    },
    stop: () => {
      setOption("streaming", false);
      getOptions().chat.stop?.();
    }
  };
}).extendApi(({ api, editor, getOptions, setOption, tf, type }) => ({
  hide: () => {
    api.aiChat.reset();
    setOption("open", false);
    if (editor.getOption(import_react9.BlockSelectionPlugin, "isSelectingSome")) {
    } else {
      editor.tf.focus();
    }
    const lastBatch = editor.history.undos.at(-1);
    if (lastBatch?.ai) {
      delete lastBatch.ai;
    }
    tf.aiChat.removeAnchor();
  },
  show: () => {
    api.aiChat.reset();
    getOptions().chat.setMessages?.([]);
    setOption("open", true);
  }
})).extendTransforms(({ editor }) => ({
  accept: (0, import_platejs12.bindFirst)(acceptAIChat, editor),
  insertBelow: (0, import_platejs12.bindFirst)(insertBelowAIChat, editor),
  removeAnchor: (0, import_platejs12.bindFirst)(removeAnchorAIChat, editor),
  replaceSelection: (0, import_platejs12.bindFirst)(replaceSelectionAIChat, editor)
}));

// src/lib/streaming/utils/escapeInput.ts
var escapeInput = (data) => {
  let res = data;
  if (data.startsWith("$$") && !data.startsWith("$$\n") && !isCompleteMath(data)) {
    res = data.replace("$$", String.raw`\$\$`);
  }
  return res;
};

// src/lib/streaming/utils/getListNode.ts
var getListNode = (editor, node) => {
  if (node.listStyleType && node.listStart) {
    const previousNode = editor.api.previous({
      at: editor.selection?.focus
    })?.[0];
    if (previousNode?.listStyleType && previousNode?.listStart) {
      return node;
    } else {
      if (node.listStart === 1) return node;
      return {
        ...node,
        listRestartPolite: node.listStart
      };
    }
  }
  return node;
};

// src/lib/streaming/utils/isSameNode.ts
var import_platejs13 = require("platejs");
var LIST_STYLE_TYPE = "listStyleType";
var isSameNode = (editor, node1, node2) => {
  if (node1.type !== editor.getType(import_platejs13.KEYS.p) || node2.type !== editor.getType(import_platejs13.KEYS.p))
    return node1.type === node2.type;
  if ((0, import_platejs13.isDefined)(node1[LIST_STYLE_TYPE]) || (0, import_platejs13.isDefined)(node2[LIST_STYLE_TYPE])) {
    return node1[LIST_STYLE_TYPE] === node2[LIST_STYLE_TYPE];
  }
  return node1.type === node2.type;
};

// src/lib/streaming/utils/nodesWithProps.ts
var import_platejs14 = require("platejs");
var nodesWithProps = (editor, nodes, options) => {
  return nodes.map((node) => {
    if (import_platejs14.ElementApi.isElement(node)) {
      return {
        ...getListNode(editor, node),
        ...options.elementProps,
        children: nodesWithProps(editor, node.children, options)
      };
    } else {
      return {
        ...options.textProps,
        ...node,
        text: node.text
      };
    }
  });
};

// src/lib/streaming/utils/utils.ts
var getChunkTrimmed = (chunk, {
  direction = "right"
} = {}) => {
  const str = direction === "right" ? chunk.trimEnd() : chunk.trimStart();
  if (direction === "right") {
    return chunk.slice(str.length);
  } else {
    return chunk.slice(0, chunk.length - str.length);
  }
};
function isCompleteCodeBlock(str) {
  const trimmed = str.trim();
  const startsWithCodeBlock = trimmed.startsWith("```");
  const endsWithCodeBlock = trimmed.endsWith("```");
  return startsWithCodeBlock && endsWithCodeBlock;
}
function isCompleteMath(str) {
  const trimmed = str.trim();
  const startsWithMath = trimmed.startsWith("$$");
  const endsWithMath = trimmed.endsWith("$$");
  return startsWithMath && endsWithMath;
}

// src/lib/streaming/streamDeserializeMd.ts
var statMdxTagRegex = /<([A-Za-z][A-Za-z0-9._:-]*)(?:\s[^>]*)?>/;
var streamDeserializeMd = (editor, data, options) => {
  const input = escapeInput(data);
  const value = withoutDeserializeInMdx(editor, input);
  if (Array.isArray(value)) return value;
  let blocks = [];
  blocks = editor.getApi(import_markdown3.MarkdownPlugin).markdown.deserialize(input, {
    ...options,
    preserveEmptyParagraphs: false
  });
  const trimmedData = getChunkTrimmed(data);
  const lastBlock = blocks.at(-1);
  const addNewLine = trimmedData === "\n\n";
  const unshiftNewLine = getChunkTrimmed(data, { direction: "left" }) === "\n\n";
  const isCodeBlockOrTable = lastBlock?.type === "code_block" || lastBlock?.type === "table";
  let result = blocks;
  if (lastBlock && !isCodeBlockOrTable && trimmedData.length > 0 && !addNewLine) {
    const textNode = [
      {
        text: trimmedData
      }
    ];
    const lastChild = lastBlock.children.at(-1);
    if (lastChild && import_platejs15.TextApi.isText(lastChild) && Object.keys(lastChild).length === 1) {
      lastBlock.children.pop();
      const textNode2 = [
        {
          text: lastChild.text + trimmedData
        }
      ];
      lastBlock.children.push(...textNode2);
    } else {
      lastBlock.children.push(...textNode);
    }
    result = [...blocks.slice(0, -1), lastBlock];
  }
  if (addNewLine && !isCodeBlockOrTable) {
    result.push({
      children: [{ text: "" }],
      type: import_platejs15.KEYS.p
    });
  }
  if (unshiftNewLine && !isCodeBlockOrTable) {
    result.unshift({
      children: [{ text: "" }],
      type: import_platejs15.KEYS.p
    });
  }
  return result;
};
var withoutDeserializeInMdx = (editor, input) => {
  const mdxName = editor.getOption(AIChatPlugin, "_mdxName");
  if (mdxName) {
    const isMdxEnd = input.includes(`</${mdxName}>`);
    if (isMdxEnd) {
      editor.setOption(AIChatPlugin, "_mdxName", null);
      return false;
    } else {
      return [
        {
          children: [
            {
              text: input
            }
          ],
          type: (0, import_platejs15.getPluginType)(editor, import_platejs15.KEYS.p)
        }
      ];
    }
  } else {
    const newMdxName = statMdxTagRegex.exec(input)?.[1];
    if (input.startsWith(`<${newMdxName}`)) {
      editor.setOption(AIChatPlugin, "_mdxName", newMdxName ?? null);
    }
  }
};

// src/lib/streaming/streamInsertChunk.ts
var import_platejs17 = require("platejs");

// src/lib/streaming/streamSerializeMd.ts
var import_markdown4 = require("@platejs/markdown");
var import_platejs16 = require("platejs");
var trimEndHeading = (editor, value) => {
  const headingKeys = /* @__PURE__ */ new Set([
    import_platejs16.KEYS.h1,
    import_platejs16.KEYS.h2,
    import_platejs16.KEYS.h3,
    import_platejs16.KEYS.h4,
    import_platejs16.KEYS.h5,
    import_platejs16.KEYS.h6
  ]);
  const lastBlock = value.at(-1);
  if (lastBlock && headingKeys.has(
    (0, import_platejs16.getPluginKey)(editor, lastBlock.type) ?? lastBlock.type
  ) && import_platejs16.ElementApi.isElement(lastBlock)) {
    const lastTextNode = lastBlock.children.at(-1);
    if (import_platejs16.TextApi.isText(lastTextNode)) {
      const trimmedText = getChunkTrimmed(lastTextNode?.text);
      const newChildren = [
        ...lastBlock.children.slice(0, -1),
        { text: lastTextNode.text.trimEnd() }
      ];
      const newLastBlock = {
        ...lastBlock,
        children: newChildren
      };
      return {
        trimmedText,
        value: [...value.slice(0, -1), newLastBlock]
      };
    }
  }
  return { trimmedText: "", value };
};
var streamSerializeMd = (editor, options, chunk) => {
  const { value: optionsValue, ...restOptions } = options;
  const { value } = trimEndHeading(editor, optionsValue ?? editor.children);
  let result = "";
  result = editor.getApi(import_markdown4.MarkdownPlugin).markdown.serialize({
    preserveEmptyParagraphs: false,
    value,
    ...restOptions
  });
  const trimmedChunk = getChunkTrimmed(chunk);
  if (isCompleteCodeBlock(result) && !chunk.endsWith("```")) {
    result = result.trimEnd().slice(0, -3) + trimmedChunk;
  }
  if (isCompleteMath(result) && !chunk.endsWith("$$")) {
    result = result.trimEnd().slice(0, -3) + trimmedChunk;
  }
  result = result.replace(/&#x20;/g, " ");
  result = result.replace(/&#x200B;/g, " ");
  result = result.replace(/\u200B/g, "");
  if (trimmedChunk !== "\n\n") {
    result = result.trimEnd() + trimmedChunk;
  }
  if (chunk.endsWith("\n\n")) {
    if (result === "\n") {
      result = "";
    } else if (result.endsWith("\n\n")) {
      result = result.slice(0, -1);
    }
  }
  result = result.replace(/\\([\\`*_{}\\[\]()#+\-\\.!~<>|$])/g, "$1");
  return result;
};

// src/lib/streaming/streamInsertChunk.ts
var getNextPath = (path, length) => {
  let result = path;
  for (let i = 0; i < length; i++) {
    result = import_platejs17.PathApi.next(result);
  }
  return result;
};
function streamInsertChunk(editor, chunk, options = {}) {
  const { _blockChunks, _blockPath } = editor.getOptions(AIChatPlugin);
  if (_blockPath === null) {
    const blocks = streamDeserializeMd(editor, chunk);
    const path = getCurrentBlockPath(editor);
    const startBlock = editor.api.node(path)[0];
    const startInEmptyParagraph = import_platejs17.NodeApi.string(startBlock).length === 0 && startBlock.type === (0, import_platejs17.getPluginType)(editor, import_platejs17.KEYS.p);
    if (startInEmptyParagraph) {
      editor.tf.removeNodes({ at: path });
    }
    if (blocks.length > 0) {
      editor.tf.insertNodes(nodesWithProps(editor, [blocks[0]], options), {
        at: path,
        nextBlock: !startInEmptyParagraph,
        select: true
      });
      editor.setOption(AIChatPlugin, "_blockPath", getCurrentBlockPath(editor));
      editor.setOption(AIChatPlugin, "_blockChunks", chunk);
      if (blocks.length > 1) {
        const nextBlocks = blocks.slice(1);
        const nextPath = getCurrentBlockPath(editor);
        editor.tf.insertNodes(nodesWithProps(editor, nextBlocks, options), {
          at: nextPath,
          nextBlock: true,
          select: true
        });
        const lastBlock = editor.api.node(
          getNextPath(nextPath, nextBlocks.length)
        );
        editor.setOption(AIChatPlugin, "_blockPath", lastBlock[1]);
        const lastBlockChunks = streamSerializeMd(
          editor,
          {
            value: [lastBlock[0]]
          },
          chunk
        );
        editor.setOption(AIChatPlugin, "_blockChunks", lastBlockChunks);
      }
    }
  } else {
    const tempBlockChunks = _blockChunks + chunk;
    const tempBlocks = streamDeserializeMd(editor, tempBlockChunks);
    if (tempBlocks.length === 0) {
      return console.warn(
        `unsupport md nodes: ${JSON.stringify(tempBlockChunks)}`
      );
    }
    if (tempBlocks.length === 1) {
      const currentBlock = editor.api.node(_blockPath)[0];
      if (isSameNode(editor, currentBlock, tempBlocks[0])) {
        const chunkNodes = streamDeserializeInlineMd(editor, chunk);
        editor.tf.insertNodes(nodesWithProps(editor, chunkNodes, options), {
          at: editor.api.end(_blockPath),
          select: true
        });
        const updatedBlock = editor.api.node(_blockPath);
        const serializedBlock = streamSerializeMd(
          editor,
          {
            value: [updatedBlock[0]]
          },
          tempBlockChunks
        );
        const blockText = import_platejs17.NodeApi.string(tempBlocks[0]);
        if (serializedBlock === tempBlockChunks && blockText === serializedBlock) {
          editor.setOption(AIChatPlugin, "_blockChunks", tempBlockChunks);
        } else {
          editor.tf.replaceNodes(
            nodesWithProps(editor, [tempBlocks[0]], options),
            {
              at: _blockPath,
              select: true
            }
          );
          const serializedBlock2 = streamSerializeMd(
            editor,
            {
              value: [tempBlocks[0]]
            },
            tempBlockChunks
          );
          editor.setOption(
            AIChatPlugin,
            "_blockChunks",
            // one block includes multiple children
            tempBlocks[0].type === (0, import_platejs17.getPluginType)(editor, import_platejs17.KEYS.codeBlock) || tempBlocks[0].type === (0, import_platejs17.getPluginType)(editor, import_platejs17.KEYS.table) || tempBlocks[0].type === (0, import_platejs17.getPluginType)(editor, import_platejs17.KEYS.equation) ? tempBlockChunks : serializedBlock2
          );
        }
      } else {
        const serializedBlock = streamSerializeMd(
          editor,
          {
            value: [tempBlocks[0]]
          },
          tempBlockChunks
        );
        editor.tf.replaceNodes(
          nodesWithProps(editor, [tempBlocks[0]], options),
          {
            at: _blockPath,
            select: true
          }
        );
        editor.setOption(AIChatPlugin, "_blockChunks", serializedBlock);
      }
    } else {
      editor.tf.replaceNodes(nodesWithProps(editor, [tempBlocks[0]], options), {
        at: _blockPath,
        select: true
      });
      if (tempBlocks.length > 1) {
        const newEndBlockPath = getNextPath(_blockPath, tempBlocks.length - 1);
        editor.tf.insertNodes(
          nodesWithProps(editor, tempBlocks.slice(1), options),
          {
            at: import_platejs17.PathApi.next(_blockPath),
            select: true
          }
        );
        editor.setOption(AIChatPlugin, "_blockPath", newEndBlockPath);
        const endBlock = editor.api.node(newEndBlockPath)[0];
        const serializedBlock = streamSerializeMd(
          editor,
          {
            value: [endBlock]
          },
          tempBlockChunks
        );
        editor.setOption(AIChatPlugin, "_blockChunks", serializedBlock);
      }
    }
  }
}
var getCurrentBlockPath = (editor) => {
  const getAnchorPreviousPath = (editor2) => {
    const anchorNode = editor2.getApi(AIChatPlugin).aiChat.node({ anchor: true });
    if (anchorNode) {
      return import_platejs17.PathApi.previous(anchorNode[1]);
    }
  };
  const getFocusPath = (editor2) => {
    return editor2.selection?.focus.path.slice(0, 1);
  };
  const path = getAnchorPreviousPath(editor) ?? getFocusPath(editor) ?? [0];
  const entry = editor.api.node(path);
  if (entry && (entry[0].type === (0, import_platejs17.getPluginType)(editor, import_platejs17.KEYS.columnGroup) || entry[0].type === (0, import_platejs17.getPluginType)(editor, import_platejs17.KEYS.table))) {
    return editor.api.above()?.[1] ?? path;
  }
  return path;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseAIPlugin,
  escapeInput,
  getChunkTrimmed,
  getCurrentBlockPath,
  getListNode,
  insertAINodes,
  isCompleteCodeBlock,
  isCompleteMath,
  isSameNode,
  nodesWithProps,
  removeAIMarks,
  removeAINodes,
  streamDeserializeInlineMd,
  streamDeserializeMd,
  streamInsertChunk,
  streamSerializeMd,
  undoAI,
  withAIBatch
});
//# sourceMappingURL=index.js.map