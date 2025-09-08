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
  AIChatPlugin: () => AIChatPlugin,
  AIPlugin: () => AIPlugin,
  CopilotPlugin: () => CopilotPlugin,
  acceptAIChat: () => acceptAIChat,
  acceptCopilot: () => acceptCopilot,
  acceptCopilotNextWord: () => acceptCopilotNextWord,
  callCompletionApi: () => callCompletionApi,
  createFormattedBlocks: () => createFormattedBlocks,
  getEditorPrompt: () => getEditorPrompt,
  getLastAssistantMessage: () => getLastAssistantMessage,
  getMarkdown: () => getMarkdown,
  getNextWord: () => getNextWord,
  insertBelowAIChat: () => insertBelowAIChat,
  removeAnchorAIChat: () => removeAnchorAIChat,
  renderCopilotBelowNodes: () => renderCopilotBelowNodes,
  replaceSelectionAIChat: () => replaceSelectionAIChat,
  resetAIChat: () => resetAIChat,
  submitAIChat: () => submitAIChat,
  triggerCopilotSuggestion: () => triggerCopilotSuggestion,
  useAIChatEditor: () => useAIChatEditor,
  useChatChunk: () => useChatChunk,
  useEditorChat: () => useEditorChat,
  useLastAssistantMessage: () => useLastAssistantMessage,
  withAIChat: () => withAIChat,
  withCopilot: () => withCopilot,
  withoutAbort: () => withoutAbort
});
module.exports = __toCommonJS(react_exports);

// src/react/ai/AIPlugin.ts
var import_react = require("platejs/react");

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

// src/react/ai/AIPlugin.ts
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
var import_markdown = require("@platejs/markdown");
var import_react5 = require("@platejs/selection/react");
var import_platejs8 = require("platejs");
var getMarkdown = (editor, type) => {
  if (type === "editor") {
    return (0, import_markdown.serializeMd)(editor);
  }
  if (type === "block") {
    const blocks = editor.getOption(import_react5.BlockSelectionPlugin, "isSelectingSome") ? editor.getApi(import_react5.BlockSelectionPlugin).blockSelection.getNodes() : editor.api.nodes({
      mode: "highest",
      match: (n) => editor.api.isBlock(n)
    });
    const nodes = Array.from(blocks, (entry) => entry[0]);
    return (0, import_markdown.serializeMd)(editor, { value: nodes });
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
      return (0, import_markdown.serializeMd)(editor, { value: modifiedFragment });
    }
    return (0, import_markdown.serializeMd)(editor, { value: fragment });
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

// src/react/ai-chat/hooks/useAIChatEditor.ts
var import_react11 = require("react");
var import_markdown2 = require("@platejs/markdown");
var import_react12 = require("platejs/react");
var useAIChatEditor = (editor, content, { parser } = {}) => {
  const { setOption } = (0, import_react12.useEditorPlugin)(AIChatPlugin);
  editor.children = (0, import_react11.useMemo)(
    () => {
      return editor.getApi(import_markdown2.MarkdownPlugin).markdown.deserialize(content, {
        memoize: true,
        parser
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [content]
  );
  (0, import_react11.useEffect)(() => {
    setOption("aiEditor", editor);
  }, [editor, setOption]);
};

// src/react/ai-chat/hooks/useChatChunk.ts
var import_react14 = require("react");
var import_platejs13 = require("platejs");
var import_react15 = require("platejs/react");

// src/react/ai-chat/utils/getLastAssistantMessage.ts
var import_react13 = require("platejs/react");
function getLastAssistantMessage(editor) {
  const messages = editor.getOptions(AIChatPlugin).chat.messages;
  return messages?.findLast((message) => message.role === "assistant");
}
function useLastAssistantMessage() {
  const chat = (0, import_react13.usePluginOption)(AIChatPlugin, "chat");
  return chat.messages?.findLast((message) => message.role === "assistant");
}

// src/react/ai-chat/hooks/useChatChunk.ts
var useChatChunk = ({
  onChunk,
  onFinish
}) => {
  const { isLoading } = (0, import_react15.usePluginOption)(
    { key: import_platejs13.KEYS.aiChat },
    "chat"
  );
  const content = useLastAssistantMessage()?.content;
  const insertedTextRef = (0, import_react14.useRef)("");
  const prevIsLoadingRef = (0, import_react14.useRef)(isLoading);
  (0, import_react14.useEffect)(() => {
    if (!isLoading) {
      insertedTextRef.current = "";
    }
    if (prevIsLoadingRef.current && !isLoading) {
      onFinish?.({ content: content ?? "" });
    }
    prevIsLoadingRef.current = isLoading;
  }, [isLoading]);
  (0, import_react14.useEffect)(() => {
    if (!content) {
      return;
    }
    const chunk = content.slice(insertedTextRef.current.length);
    const nodes = [];
    if (chunk) {
      const isFirst = insertedTextRef.current === "";
      nodes.push({ text: chunk });
      onChunk({
        chunk,
        isFirst,
        nodes,
        text: content
      });
    }
    insertedTextRef.current = content;
  }, [content]);
};

// src/react/ai-chat/hooks/useEditorChat.ts
var import_react16 = require("react");
var import_react17 = require("@platejs/selection/react");
var import_react18 = require("platejs/react");
var useEditorChat = ({
  chat,
  onOpenBlockSelection,
  onOpenChange,
  onOpenCursor,
  onOpenSelection
}) => {
  const { editor, setOption } = (0, import_react18.useEditorPlugin)(AIChatPlugin);
  const open = (0, import_react18.usePluginOption)(AIChatPlugin, "open");
  (0, import_react16.useEffect)(() => {
    setOption("chat", chat);
  }, [chat.input, chat.messages, chat.isLoading, chat.data, chat.error]);
  (0, import_react16.useEffect)(() => {
    onOpenChange?.(open);
    if (open) {
      if (onOpenBlockSelection) {
        const blockSelectionApi = editor.getApi(import_react17.BlockSelectionPlugin).blockSelection;
        const isBlockSelecting = editor.getOption(
          import_react17.BlockSelectionPlugin,
          "isSelectingSome"
        );
        if (isBlockSelecting) {
          onOpenBlockSelection(blockSelectionApi.getNodes());
          return;
        }
      }
      if (onOpenCursor && editor.api.isCollapsed()) {
        onOpenCursor();
        return;
      }
      if (onOpenSelection && editor.api.isExpanded()) {
        onOpenSelection();
        return;
      }
    }
  }, [open]);
};

// src/react/copilot/CopilotPlugin.tsx
var import_markdown6 = require("@platejs/markdown");
var import_debounce = __toESM(require("lodash/debounce.js"));
var import_platejs19 = require("platejs");
var import_react23 = require("platejs/react");

// src/react/copilot/renderCopilotBelowNodes.tsx
var import_react19 = __toESM(require("react"));
var import_platejs14 = require("platejs");
var import_react20 = require("platejs/react");
var renderCopilotBelowNodes = ({
  editor
}) => {
  const copilot = (0, import_react20.getEditorPlugin)(editor, {
    key: import_platejs14.KEYS.copilot
  });
  const { renderGhostText: GhostText } = copilot.getOptions();
  if (!GhostText) return;
  return ({ children }) => {
    return /* @__PURE__ */ import_react19.default.createElement(import_react19.default.Fragment, null, children, /* @__PURE__ */ import_react19.default.createElement(GhostText, null));
  };
};

// src/react/copilot/transforms/acceptCopilot.ts
var import_markdown3 = require("@platejs/markdown");
var import_platejs15 = require("platejs");
var acceptCopilot = (editor) => {
  const { suggestionText } = editor.getOptions({
    key: import_platejs15.KEYS.copilot
  });
  if (!suggestionText?.length) return false;
  editor.tf.insertFragment((0, import_markdown3.deserializeInlineMd)(editor, suggestionText));
};

// src/react/copilot/transforms/acceptCopilotNextWord.ts
var import_markdown4 = require("@platejs/markdown");
var import_platejs17 = require("platejs");
var import_react22 = require("platejs/react");

// src/react/copilot/utils/callCompletionApi.ts
var getOriginalFetch = () => fetch;
async function callCompletionApi({
  api = "/api/completion",
  body,
  credentials,
  fetch: fetch2 = getOriginalFetch(),
  headers,
  prompt,
  setAbortController = () => {
  },
  setCompletion = () => {
  },
  setError = () => {
  },
  setLoading = () => {
  },
  onError,
  onFinish,
  onResponse
}) {
  try {
    setLoading(true);
    setError(null);
    const abortController = new AbortController();
    setAbortController(abortController);
    setCompletion("");
    const res = await fetch2(api, {
      body: JSON.stringify({
        prompt,
        ...body
      }),
      credentials,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      method: "POST",
      signal: abortController.signal
    }).catch((error) => {
      throw error;
    });
    if (onResponse) {
      await onResponse(res);
    }
    if (!res.ok) {
      throw new Error(
        await res.text() || "Failed to fetch the chat response."
      );
    }
    if (!res.body) {
      throw new Error("The response body is empty.");
    }
    const { text } = await res.json();
    if (!text) {
      throw new Error("The response does not contain a text field.");
    }
    setCompletion(text);
    if (onFinish) {
      onFinish(prompt, text);
    }
    setAbortController(null);
    return text;
  } catch (error) {
    if (error.name === "AbortError") {
      setAbortController(null);
      return null;
    }
    if (error instanceof Error && onError) {
      onError(error);
    }
    setError(error);
  } finally {
    setLoading(false);
  }
}

// src/react/copilot/utils/getNextWord.ts
var getNextWord = ({ text }) => {
  if (!text) return { firstWord: "", remainingText: "" };
  const nonSpaceMatch = /^\s*(\S)/.exec(text);
  if (!nonSpaceMatch) return { firstWord: "", remainingText: "" };
  const firstNonSpaceChar = nonSpaceMatch[1];
  const isCJKChar = /[\u1100-\u11FF\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF]/.test(
    firstNonSpaceChar
  );
  let firstWord, remainingText;
  if (isCJKChar) {
    const match = /^(\s*)([\u1100-\u11FF\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF])([\u3000-\u303F\uFF00-\uFFEF])?/.exec(
      text
    );
    if (match) {
      const [fullMatch, spaces = "", char = "", punctuation = ""] = match;
      firstWord = spaces + char + punctuation;
      remainingText = text.slice(firstWord.length);
    } else {
      firstWord = "";
      remainingText = text;
    }
  } else {
    const match = /^(\s*\S+?)(?=[\s\u1100-\u11FF\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF]|$)/.exec(
      text
    );
    if (match) {
      firstWord = match[0];
      remainingText = text.slice(firstWord.length);
    } else {
      firstWord = text;
      remainingText = "";
    }
  }
  return { firstWord, remainingText };
};

// src/react/copilot/utils/triggerCopilotSuggestion.ts
var import_platejs16 = require("platejs");
var import_react21 = require("platejs/react");
var triggerCopilotSuggestion = async (editor) => {
  const { api, getOptions, setOption } = (0, import_react21.getEditorPlugin)(
    editor,
    {
      key: import_platejs16.KEYS.copilot
    }
  );
  const { completeOptions, getPrompt, isLoading, triggerQuery } = getOptions();
  if (isLoading || editor.getOptions({ key: import_platejs16.KEYS.aiChat }).chat?.isLoading) {
    return false;
  }
  if (!triggerQuery({ editor })) return false;
  const prompt = getPrompt({ editor });
  if (prompt.length === 0) return false;
  api.copilot.stop();
  await callCompletionApi({
    prompt,
    onFinish: (_, completion) => {
      api.copilot.setBlockSuggestion({ text: completion });
    },
    ...completeOptions,
    setAbortController: (controller) => setOption("abortController", controller),
    setCompletion: (completion) => setOption("completion", completion),
    setError: (error) => setOption("error", error),
    setLoading: (loading) => setOption("isLoading", loading),
    onError: (error) => {
      setOption("error", error);
      completeOptions?.onError?.(error);
    }
  });
};

// src/react/copilot/utils/withoutAbort.ts
var withoutAbort = (editor, fn) => {
  editor.setOption(CopilotPlugin, "shouldAbort", false);
  fn();
  editor.setOption(CopilotPlugin, "shouldAbort", true);
};

// src/react/copilot/transforms/acceptCopilotNextWord.ts
var acceptCopilotNextWord = (editor) => {
  const { api, getOptions } = (0, import_react22.getEditorPlugin)(editor, {
    key: import_platejs17.KEYS.copilot
  });
  const { getNextWord: getNextWord2, suggestionText } = getOptions();
  if (!suggestionText?.length) {
    return false;
  }
  const { firstWord, remainingText } = getNextWord2({ text: suggestionText });
  api.copilot.setBlockSuggestion({
    text: remainingText
  });
  withoutAbort(editor, () => {
    editor.tf.insertFragment((0, import_markdown4.deserializeInlineMd)(editor, firstWord));
  });
};

// src/react/copilot/withCopilot.ts
var import_markdown5 = require("@platejs/markdown");
var import_platejs18 = require("platejs");
var getPatchString = (editor, operations) => {
  let string = "";
  for (const operation of operations) {
    if (operation.type === "insert_node") {
      const node = operation.node;
      const text = (0, import_markdown5.serializeInlineMd)(editor, { value: [node] });
      string += text;
    } else if (operation.type === "insert_text") {
      string += operation.text;
    }
  }
  return string;
};
var withCopilot = ({
  api,
  editor,
  getOptions,
  setOption,
  tf: { apply, insertText, redo, setSelection, undo, writeHistory }
}) => {
  let prevSelection = null;
  return {
    transforms: {
      apply(operation) {
        const { shouldAbort } = getOptions();
        if (shouldAbort) {
          api.copilot.reject();
        }
        apply(operation);
      },
      insertText(text, options) {
        const suggestionText = getOptions().suggestionText;
        if (suggestionText?.startsWith(text)) {
          withoutAbort(editor, () => {
            editor.tf.withoutMerging(() => {
              const newText = suggestionText?.slice(text.length);
              setOption("suggestionText", newText);
              insertText(text);
            });
          });
          return;
        }
        insertText(text, options);
      },
      redo() {
        if (!getOptions().suggestionText) return redo();
        const topRedo = editor.history.redos.at(-1);
        const prevSuggestion = getOptions().suggestionText;
        if (topRedo && topRedo.shouldAbort === false && prevSuggestion) {
          withoutAbort(editor, () => {
            const shouldRemoveText = getPatchString(editor, topRedo.operations);
            const newText = prevSuggestion.slice(shouldRemoveText.length);
            setOption("suggestionText", newText);
            redo();
          });
          return;
        }
        return redo();
      },
      setSelection(props) {
        setSelection(props);
        if (editor.selection && (!prevSelection || !import_platejs18.RangeApi.equals(prevSelection, editor.selection)) && getOptions().autoTriggerQuery({ editor }) && editor.api.isFocused()) {
          void api.copilot.triggerSuggestion();
        }
        prevSelection = editor.selection;
      },
      undo() {
        if (!getOptions().suggestionText) return undo();
        const lastUndos = editor.history.undos.at(-1);
        const oldText = getOptions().suggestionText;
        if (lastUndos && lastUndos.shouldAbort === false && oldText) {
          withoutAbort(editor, () => {
            const shouldInsertText = getPatchString(
              editor,
              lastUndos.operations
            );
            const newText = shouldInsertText + oldText;
            setOption("suggestionText", newText);
            undo();
          });
          return;
        }
        return undo();
      },
      writeHistory(stacks, batch) {
        if (!getOptions().isLoading) {
          batch.shouldAbort = getOptions().shouldAbort;
        }
        return writeHistory(stacks, batch);
      }
    }
  };
};

// src/react/copilot/CopilotPlugin.tsx
var CopilotPlugin = (0, import_react23.createTPlatePlugin)({
  key: import_platejs19.KEYS.copilot,
  handlers: {
    onBlur: ({ api }) => {
      api.copilot.reject();
    },
    onMouseDown: ({ api }) => {
      api.copilot.reject();
    }
  },
  options: {
    abortController: null,
    completeOptions: {},
    completion: "",
    debounceDelay: 0,
    error: null,
    getNextWord,
    isLoading: false,
    renderGhostText: null,
    shouldAbort: true,
    suggestionNodeId: null,
    suggestionText: null,
    autoTriggerQuery: ({ editor }) => {
      if (editor.getOptions({ key: import_platejs19.KEYS.copilot }).suggestionText) {
        return false;
      }
      const isEmpty = editor.api.isEmpty(editor.selection, { block: true });
      if (isEmpty) return false;
      const blockAbove = editor.api.block();
      if (!blockAbove) return false;
      const blockString = import_platejs19.NodeApi.string(blockAbove[0]);
      return blockString.at(-1) === " ";
    },
    getPrompt: ({ editor }) => {
      const contextEntry = editor.api.block({ highest: true });
      if (!contextEntry) return "";
      return (0, import_markdown6.serializeMd)(editor, {
        value: [contextEntry[0]]
      });
    },
    triggerQuery: ({ editor }) => {
      if (editor.api.isExpanded()) return false;
      const isEnd = editor.api.isAt({ end: true });
      if (!isEnd) return false;
      return true;
    }
  }
}).overrideEditor(withCopilot).extendSelectors(({ getOptions }) => ({
  isSuggested: (id) => getOptions().suggestionNodeId === id
})).extendTransforms(({ editor }) => ({
  accept: (0, import_platejs19.bindFirst)(acceptCopilot, editor),
  acceptNextWord: (0, import_platejs19.bindFirst)(acceptCopilotNextWord, editor)
})).extendApi(
  ({ api, editor, getOptions, setOption, setOptions }) => {
    const debounceDelay = getOptions().debounceDelay;
    let triggerSuggestion = (0, import_platejs19.bindFirst)(triggerCopilotSuggestion, editor);
    if (debounceDelay) {
      triggerSuggestion = (0, import_debounce.default)(
        (0, import_platejs19.bindFirst)(triggerCopilotSuggestion, editor),
        debounceDelay
      );
    }
    return {
      triggerSuggestion,
      setBlockSuggestion: ({ id = getOptions().suggestionNodeId, text }) => {
        if (!id) {
          id = editor.api.block()[0].id;
        }
        setOptions({
          suggestionNodeId: id,
          suggestionText: text
        });
      },
      stop: () => {
        const { abortController } = getOptions();
        api.copilot.triggerSuggestion?.cancel();
        if (abortController) {
          abortController.abort();
          setOption("abortController", null);
        }
      }
    };
  }
).extendApi(({ api, getOptions, setOptions }) => ({
  reject: () => {
    if (!getOptions().suggestionText?.length) return false;
    api.copilot.stop();
    setOptions({
      completion: null,
      suggestionNodeId: null,
      suggestionText: null
    });
  }
})).extend({
  render: {
    belowNodes: renderCopilotBelowNodes
  },
  shortcuts: {
    accept: {
      keys: "tab"
    },
    reject: {
      keys: "escape"
    }
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AIChatPlugin,
  AIPlugin,
  CopilotPlugin,
  acceptAIChat,
  acceptCopilot,
  acceptCopilotNextWord,
  callCompletionApi,
  createFormattedBlocks,
  getEditorPrompt,
  getLastAssistantMessage,
  getMarkdown,
  getNextWord,
  insertBelowAIChat,
  removeAnchorAIChat,
  renderCopilotBelowNodes,
  replaceSelectionAIChat,
  resetAIChat,
  submitAIChat,
  triggerCopilotSuggestion,
  useAIChatEditor,
  useChatChunk,
  useEditorChat,
  useLastAssistantMessage,
  withAIChat,
  withCopilot,
  withoutAbort
});
//# sourceMappingURL=index.js.map