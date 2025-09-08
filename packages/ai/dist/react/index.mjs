// src/react/ai/AIPlugin.ts
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseAIPlugin.ts
import {
  bindFirst,
  createTSlatePlugin,
  KEYS as KEYS2
} from "platejs";

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
import { getPluginType, KEYS } from "platejs";
var removeAIMarks = (editor, { at = [] } = {}) => {
  const nodeType = getPluginType(editor, KEYS.ai);
  editor.tf.unsetNodes(nodeType, {
    at,
    match: (n) => n[nodeType]
  });
};

// src/lib/transforms/removeAINodes.ts
import { TextApi } from "platejs";
var removeAINodes = (editor, { at = [] } = {}) => {
  editor.tf.removeNodes({
    at,
    match: (n) => TextApi.isText(n) && !!n.ai
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
var BaseAIPlugin = createTSlatePlugin({
  key: KEYS2.ai,
  node: { isDecoration: false, isLeaf: true }
}).extendTransforms(({ editor }) => ({
  insertNodes: bindFirst(insertAINodes, editor),
  removeMarks: bindFirst(removeAIMarks, editor),
  removeNodes: bindFirst(removeAINodes, editor),
  undo: bindFirst(undoAI, editor)
}));

// src/react/ai/AIPlugin.ts
var AIPlugin = toPlatePlugin(BaseAIPlugin);

// src/react/ai-chat/AIChatPlugin.ts
import { BlockSelectionPlugin as BlockSelectionPlugin5 } from "@platejs/selection/react";
import {
  bindFirst as bindFirst2,
  ElementApi as ElementApi3,
  getPluginType as getPluginType3,
  KEYS as KEYS11
} from "platejs";
import { createTPlatePlugin } from "platejs/react";

// src/react/ai-chat/transforms/acceptAIChat.ts
import { KEYS as KEYS3 } from "platejs";
import { getEditorPlugin } from "platejs/react";
var acceptAIChat = (editor) => {
  const { tf } = getEditorPlugin(editor, AIPlugin);
  const api = editor.getApi({ key: KEYS3.ai });
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
import { BlockSelectionPlugin as BlockSelectionPlugin2 } from "@platejs/selection/react";
import cloneDeep2 from "lodash/cloneDeep.js";
import { KEYS as KEYS5, PathApi, RangeApi } from "platejs";

// src/react/ai-chat/transforms/replaceSelectionAIChat.ts
import {
  BlockSelectionPlugin,
  removeBlockSelectionNodes
} from "@platejs/selection/react";
import cloneDeep from "lodash/cloneDeep.js";
import {
  KEYS as KEYS4,
  NodeApi,
  TextApi as TextApi2
} from "platejs";
var createFormattedBlocks = ({
  blocks,
  format,
  sourceBlock
}) => {
  if (format === "none") return cloneDeep(blocks);
  const [sourceNode] = sourceBlock;
  const firstTextEntry = NodeApi.firstText(sourceNode);
  if (!firstTextEntry) return null;
  const blockProps = NodeApi.extractProps(sourceNode);
  const textProps = NodeApi.extractProps(firstTextEntry[0]);
  const applyTextFormatting = (node) => {
    if (TextApi2.isText(node)) {
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
    BlockSelectionPlugin,
    "isSelectingSome"
  );
  editor.getApi({ key: KEYS4.ai }).aiChat.hide();
  if (!isBlockSelecting) {
    const firstBlock = editor.api.node({
      block: true,
      mode: "lowest"
    });
    if (firstBlock && editor.api.isSelected(firstBlock[1], { contains: true }) && format !== "none") {
      const formattedBlocks2 = createFormattedBlocks({
        blocks: cloneDeep(sourceEditor.children),
        format,
        sourceBlock: firstBlock
      });
      if (!formattedBlocks2) return;
      if (firstBlock[0].type === KEYS4.codeLine && sourceEditor.children[0].type === KEYS4.codeBlock && sourceEditor.children.length === 1) {
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
  const blockSelectionApi = editor.getApi(BlockSelectionPlugin).blockSelection;
  const selectedBlocks = blockSelectionApi.getNodes();
  if (selectedBlocks.length === 0) return;
  if (format === "none" || format === "single" && selectedBlocks.length > 1) {
    editor.tf.withoutNormalizing(() => {
      removeBlockSelectionNodes(editor);
      editor.tf.withNewBatch(() => {
        editor.getTransforms(BlockSelectionPlugin).blockSelection.insertBlocksAndSelect(
          cloneDeep(sourceEditor.children),
          {
            at: selectedBlocks[0][1]
          }
        );
      });
    });
    editor.getApi(BlockSelectionPlugin).blockSelection.focus();
    return;
  }
  const [, firstBlockPath] = selectedBlocks[0];
  const formattedBlocks = createFormattedBlocks({
    blocks: cloneDeep(sourceEditor.children),
    format,
    sourceBlock: selectedBlocks[0]
  });
  if (!formattedBlocks) return;
  editor.tf.withoutNormalizing(() => {
    removeBlockSelectionNodes(editor);
    editor.tf.withNewBatch(() => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.insertBlocksAndSelect(formattedBlocks, {
        at: firstBlockPath
      });
    });
  });
  editor.getApi(BlockSelectionPlugin).blockSelection.focus();
};

// src/react/ai-chat/transforms/insertBelowAIChat.ts
var insertBelowAIChat = (editor, sourceEditor, { format = "single" } = {}) => {
  if (!sourceEditor || sourceEditor.api.isEmpty()) return;
  const isBlockSelecting = editor.getOption(
    BlockSelectionPlugin2,
    "isSelectingSome"
  );
  editor.getApi({ key: KEYS5.ai }).aiChat.hide();
  const insertBlocksAndSelect = editor.getTransforms(BlockSelectionPlugin2).blockSelection.insertBlocksAndSelect;
  if (isBlockSelecting) {
    const selectedBlocks = editor.getApi(BlockSelectionPlugin2).blockSelection.getNodes();
    const selectedIds = editor.getOptions(BlockSelectionPlugin2).selectedIds;
    if (!selectedIds || selectedIds.size === 0) return;
    const lastBlock = selectedBlocks.at(-1);
    if (!lastBlock) return;
    const nextPath = PathApi.next(lastBlock[1]);
    if (format === "none") {
      insertBlocksAndSelect(cloneDeep2(sourceEditor.children), {
        at: nextPath
      });
      return;
    }
    const formattedBlocks = createFormattedBlocks({
      blocks: cloneDeep2(sourceEditor.children),
      format,
      sourceBlock: lastBlock
    });
    if (!formattedBlocks) return;
    insertBlocksAndSelect(formattedBlocks, {
      at: nextPath
    });
  } else {
    const [, end] = RangeApi.edges(editor.selection);
    const endPath = [end.path[0]];
    const currentBlock = editor.api.node({
      at: endPath,
      block: true,
      mode: "lowest"
    });
    if (!currentBlock) return;
    if (format === "none") {
      insertBlocksAndSelect(cloneDeep2(sourceEditor.children), {
        at: PathApi.next(endPath)
      });
      return;
    }
    const formattedBlocks = createFormattedBlocks({
      blocks: cloneDeep2(sourceEditor.children),
      format,
      sourceBlock: currentBlock
    });
    if (!formattedBlocks) return;
    insertBlocksAndSelect(formattedBlocks, {
      at: PathApi.next(endPath)
    });
  }
};

// src/react/ai-chat/transforms/removeAnchorAIChat.ts
import {
  ElementApi,
  getPluginType as getPluginType2,
  KEYS as KEYS6
} from "platejs";
var removeAnchorAIChat = (editor, options) => {
  editor.tf.withoutSaving(() => {
    editor.tf.removeNodes({
      at: [],
      match: (n) => ElementApi.isElement(n) && n.type === getPluginType2(editor, KEYS6.aiChat),
      ...options
    });
  });
};

// src/react/ai-chat/utils/getEditorPrompt.ts
import { isSelecting } from "@platejs/selection";
import { BlockSelectionPlugin as BlockSelectionPlugin4 } from "@platejs/selection/react";

// src/react/ai-chat/utils/getMarkdown.ts
import { serializeMd } from "@platejs/markdown";
import { BlockSelectionPlugin as BlockSelectionPlugin3 } from "@platejs/selection/react";
import { KEYS as KEYS7 } from "platejs";
var getMarkdown = (editor, type) => {
  if (type === "editor") {
    return serializeMd(editor);
  }
  if (type === "block") {
    const blocks = editor.getOption(BlockSelectionPlugin3, "isSelectingSome") ? editor.getApi(BlockSelectionPlugin3).blockSelection.getNodes() : editor.api.nodes({
      mode: "highest",
      match: (n) => editor.api.isBlock(n)
    });
    const nodes = Array.from(blocks, (entry) => entry[0]);
    return serializeMd(editor, { value: nodes });
  }
  if (type === "selection") {
    const fragment = editor.api.fragment();
    if (fragment.length === 1) {
      const modifiedFragment = [
        {
          children: fragment[0].children,
          type: KEYS7.p
        }
      ];
      return serializeMd(editor, { value: modifiedFragment });
    }
    return serializeMd(editor, { value: fragment });
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
    isBlockSelecting: editor.getOption(BlockSelectionPlugin4, "isSelectingSome"),
    isSelecting: isSelecting(editor)
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
import { KEYS as KEYS8 } from "platejs";
import { getEditorPlugin as getEditorPlugin2 } from "platejs/react";
var resetAIChat = (editor) => {
  const { api, getOptions } = getEditorPlugin2(editor, {
    key: KEYS8.aiChat
  });
  api.aiChat.stop();
  const chat = getOptions().chat;
  if (chat.messages && chat.messages.length > 0) {
    chat.setMessages?.([]);
  }
  editor.getTransforms(AIPlugin).ai.undo();
};

// src/react/ai-chat/utils/submitAIChat.ts
import { isSelecting as isSelecting2 } from "@platejs/selection";
import { KEYS as KEYS9 } from "platejs";
import { getEditorPlugin as getEditorPlugin3 } from "platejs/react";
var submitAIChat = (editor, {
  mode,
  options,
  prompt,
  system
} = {}) => {
  const { getOptions, setOption } = getEditorPlugin3(
    editor,
    {
      key: KEYS9.aiChat
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
    mode = isSelecting2(editor) ? "chat" : "insert";
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
import { ElementApi as ElementApi2, KEYS as KEYS10 } from "platejs";
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
        if (node[KEYS10.ai] && !getOptions().open) {
          tf.ai.removeMarks({ at: path });
          return;
        }
        if (ElementApi2.isElement(node) && node.type === type && !getOptions().open) {
          editor.getTransforms(AIChatPlugin).aiChat.removeAnchor({ at: path });
          return;
        }
        return normalizeNode(entry);
      }
    }
  };
};

// src/react/ai-chat/AIChatPlugin.ts
var AIChatPlugin = createTPlatePlugin({
  key: KEYS11.aiChat,
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
    reset: bindFirst2(resetAIChat, editor),
    submit: bindFirst2(submitAIChat, editor),
    node: (options = {}) => {
      const { anchor = false, streaming = false, ...rest } = options;
      if (anchor) {
        return editor.api.node({
          at: [],
          match: (n) => ElementApi3.isElement(n) && n.type === type,
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
          match: (t) => !!t[getPluginType3(editor, KEYS11.ai)],
          ...rest
        });
      }
      return editor.api.node({
        match: (n) => n[getPluginType3(editor, KEYS11.ai)],
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
    if (editor.getOption(BlockSelectionPlugin5, "isSelectingSome")) {
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
  accept: bindFirst2(acceptAIChat, editor),
  insertBelow: bindFirst2(insertBelowAIChat, editor),
  removeAnchor: bindFirst2(removeAnchorAIChat, editor),
  replaceSelection: bindFirst2(replaceSelectionAIChat, editor)
}));

// src/react/ai-chat/hooks/useAIChatEditor.ts
import { useEffect, useMemo } from "react";
import { MarkdownPlugin } from "@platejs/markdown";
import { useEditorPlugin } from "platejs/react";
var useAIChatEditor = (editor, content, { parser } = {}) => {
  const { setOption } = useEditorPlugin(AIChatPlugin);
  editor.children = useMemo(
    () => {
      return editor.getApi(MarkdownPlugin).markdown.deserialize(content, {
        memoize: true,
        parser
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [content]
  );
  useEffect(() => {
    setOption("aiEditor", editor);
  }, [editor, setOption]);
};

// src/react/ai-chat/hooks/useChatChunk.ts
import { useEffect as useEffect2, useRef } from "react";
import { KEYS as KEYS12 } from "platejs";
import { usePluginOption as usePluginOption2 } from "platejs/react";

// src/react/ai-chat/utils/getLastAssistantMessage.ts
import { usePluginOption } from "platejs/react";
function getLastAssistantMessage(editor) {
  const messages = editor.getOptions(AIChatPlugin).chat.messages;
  return messages?.findLast((message) => message.role === "assistant");
}
function useLastAssistantMessage() {
  const chat = usePluginOption(AIChatPlugin, "chat");
  return chat.messages?.findLast((message) => message.role === "assistant");
}

// src/react/ai-chat/hooks/useChatChunk.ts
var useChatChunk = ({
  onChunk,
  onFinish
}) => {
  const { isLoading } = usePluginOption2(
    { key: KEYS12.aiChat },
    "chat"
  );
  const content = useLastAssistantMessage()?.content;
  const insertedTextRef = useRef("");
  const prevIsLoadingRef = useRef(isLoading);
  useEffect2(() => {
    if (!isLoading) {
      insertedTextRef.current = "";
    }
    if (prevIsLoadingRef.current && !isLoading) {
      onFinish?.({ content: content ?? "" });
    }
    prevIsLoadingRef.current = isLoading;
  }, [isLoading]);
  useEffect2(() => {
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
import { useEffect as useEffect3 } from "react";
import { BlockSelectionPlugin as BlockSelectionPlugin6 } from "@platejs/selection/react";
import { useEditorPlugin as useEditorPlugin2, usePluginOption as usePluginOption3 } from "platejs/react";
var useEditorChat = ({
  chat,
  onOpenBlockSelection,
  onOpenChange,
  onOpenCursor,
  onOpenSelection
}) => {
  const { editor, setOption } = useEditorPlugin2(AIChatPlugin);
  const open = usePluginOption3(AIChatPlugin, "open");
  useEffect3(() => {
    setOption("chat", chat);
  }, [chat.input, chat.messages, chat.isLoading, chat.data, chat.error]);
  useEffect3(() => {
    onOpenChange?.(open);
    if (open) {
      if (onOpenBlockSelection) {
        const blockSelectionApi = editor.getApi(BlockSelectionPlugin6).blockSelection;
        const isBlockSelecting = editor.getOption(
          BlockSelectionPlugin6,
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
import { serializeMd as serializeMd2 } from "@platejs/markdown";
import debounce from "lodash/debounce.js";
import {
  bindFirst as bindFirst3,
  KEYS as KEYS17,
  NodeApi as NodeApi2
} from "platejs";
import { createTPlatePlugin as createTPlatePlugin2 } from "platejs/react";

// src/react/copilot/renderCopilotBelowNodes.tsx
import React from "react";
import { KEYS as KEYS13 } from "platejs";
import { getEditorPlugin as getEditorPlugin4 } from "platejs/react";
var renderCopilotBelowNodes = ({
  editor
}) => {
  const copilot = getEditorPlugin4(editor, {
    key: KEYS13.copilot
  });
  const { renderGhostText: GhostText } = copilot.getOptions();
  if (!GhostText) return;
  return ({ children }) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children, /* @__PURE__ */ React.createElement(GhostText, null));
  };
};

// src/react/copilot/transforms/acceptCopilot.ts
import { deserializeInlineMd } from "@platejs/markdown";
import { KEYS as KEYS14 } from "platejs";
var acceptCopilot = (editor) => {
  const { suggestionText } = editor.getOptions({
    key: KEYS14.copilot
  });
  if (!suggestionText?.length) return false;
  editor.tf.insertFragment(deserializeInlineMd(editor, suggestionText));
};

// src/react/copilot/transforms/acceptCopilotNextWord.ts
import { deserializeInlineMd as deserializeInlineMd2 } from "@platejs/markdown";
import { KEYS as KEYS16 } from "platejs";
import { getEditorPlugin as getEditorPlugin6 } from "platejs/react";

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
import { KEYS as KEYS15 } from "platejs";
import { getEditorPlugin as getEditorPlugin5 } from "platejs/react";
var triggerCopilotSuggestion = async (editor) => {
  const { api, getOptions, setOption } = getEditorPlugin5(
    editor,
    {
      key: KEYS15.copilot
    }
  );
  const { completeOptions, getPrompt, isLoading, triggerQuery } = getOptions();
  if (isLoading || editor.getOptions({ key: KEYS15.aiChat }).chat?.isLoading) {
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
  const { api, getOptions } = getEditorPlugin6(editor, {
    key: KEYS16.copilot
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
    editor.tf.insertFragment(deserializeInlineMd2(editor, firstWord));
  });
};

// src/react/copilot/withCopilot.ts
import { serializeInlineMd } from "@platejs/markdown";
import {
  RangeApi as RangeApi2
} from "platejs";
var getPatchString = (editor, operations) => {
  let string = "";
  for (const operation of operations) {
    if (operation.type === "insert_node") {
      const node = operation.node;
      const text = serializeInlineMd(editor, { value: [node] });
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
        if (editor.selection && (!prevSelection || !RangeApi2.equals(prevSelection, editor.selection)) && getOptions().autoTriggerQuery({ editor }) && editor.api.isFocused()) {
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
var CopilotPlugin = createTPlatePlugin2({
  key: KEYS17.copilot,
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
      if (editor.getOptions({ key: KEYS17.copilot }).suggestionText) {
        return false;
      }
      const isEmpty = editor.api.isEmpty(editor.selection, { block: true });
      if (isEmpty) return false;
      const blockAbove = editor.api.block();
      if (!blockAbove) return false;
      const blockString = NodeApi2.string(blockAbove[0]);
      return blockString.at(-1) === " ";
    },
    getPrompt: ({ editor }) => {
      const contextEntry = editor.api.block({ highest: true });
      if (!contextEntry) return "";
      return serializeMd2(editor, {
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
  accept: bindFirst3(acceptCopilot, editor),
  acceptNextWord: bindFirst3(acceptCopilotNextWord, editor)
})).extendApi(
  ({ api, editor, getOptions, setOption, setOptions }) => {
    const debounceDelay = getOptions().debounceDelay;
    let triggerSuggestion = bindFirst3(triggerCopilotSuggestion, editor);
    if (debounceDelay) {
      triggerSuggestion = debounce(
        bindFirst3(triggerCopilotSuggestion, editor),
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
export {
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
};
//# sourceMappingURL=index.mjs.map