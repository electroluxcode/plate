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

// src/lib/streaming/streamDeserializeInlineMd.ts
import { MarkdownPlugin } from "@platejs/markdown";
var streamDeserializeInlineMd = (editor, text, options) => {
  return editor.getApi(MarkdownPlugin).markdown.deserializeInline(text, options);
};

// src/lib/streaming/streamDeserializeMd.ts
import { MarkdownPlugin as MarkdownPlugin2 } from "@platejs/markdown";
import { getPluginType as getPluginType4, KEYS as KEYS13, TextApi as TextApi3 } from "platejs";

// src/react/ai/AIPlugin.ts
import { toPlatePlugin } from "platejs/react";
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
import { isDefined, KEYS as KEYS12 } from "platejs";
var LIST_STYLE_TYPE = "listStyleType";
var isSameNode = (editor, node1, node2) => {
  if (node1.type !== editor.getType(KEYS12.p) || node2.type !== editor.getType(KEYS12.p))
    return node1.type === node2.type;
  if (isDefined(node1[LIST_STYLE_TYPE]) || isDefined(node2[LIST_STYLE_TYPE])) {
    return node1[LIST_STYLE_TYPE] === node2[LIST_STYLE_TYPE];
  }
  return node1.type === node2.type;
};

// src/lib/streaming/utils/nodesWithProps.ts
import { ElementApi as ElementApi4 } from "platejs";
var nodesWithProps = (editor, nodes, options) => {
  return nodes.map((node) => {
    if (ElementApi4.isElement(node)) {
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
  blocks = editor.getApi(MarkdownPlugin2).markdown.deserialize(input, {
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
    if (lastChild && TextApi3.isText(lastChild) && Object.keys(lastChild).length === 1) {
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
      type: KEYS13.p
    });
  }
  if (unshiftNewLine && !isCodeBlockOrTable) {
    result.unshift({
      children: [{ text: "" }],
      type: KEYS13.p
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
          type: getPluginType4(editor, KEYS13.p)
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
import {
  getPluginType as getPluginType5,
  KEYS as KEYS15,
  NodeApi as NodeApi2,
  PathApi as PathApi2
} from "platejs";

// src/lib/streaming/streamSerializeMd.ts
import { MarkdownPlugin as MarkdownPlugin3 } from "@platejs/markdown";
import {
  ElementApi as ElementApi5,
  getPluginKey,
  KEYS as KEYS14,
  TextApi as TextApi4
} from "platejs";
var trimEndHeading = (editor, value) => {
  const headingKeys = /* @__PURE__ */ new Set([
    KEYS14.h1,
    KEYS14.h2,
    KEYS14.h3,
    KEYS14.h4,
    KEYS14.h5,
    KEYS14.h6
  ]);
  const lastBlock = value.at(-1);
  if (lastBlock && headingKeys.has(
    getPluginKey(editor, lastBlock.type) ?? lastBlock.type
  ) && ElementApi5.isElement(lastBlock)) {
    const lastTextNode = lastBlock.children.at(-1);
    if (TextApi4.isText(lastTextNode)) {
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
  result = editor.getApi(MarkdownPlugin3).markdown.serialize({
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
    result = PathApi2.next(result);
  }
  return result;
};
function streamInsertChunk(editor, chunk, options = {}) {
  const { _blockChunks, _blockPath } = editor.getOptions(AIChatPlugin);
  if (_blockPath === null) {
    const blocks = streamDeserializeMd(editor, chunk);
    const path = getCurrentBlockPath(editor);
    const startBlock = editor.api.node(path)[0];
    const startInEmptyParagraph = NodeApi2.string(startBlock).length === 0 && startBlock.type === getPluginType5(editor, KEYS15.p);
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
        const blockText = NodeApi2.string(tempBlocks[0]);
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
            tempBlocks[0].type === getPluginType5(editor, KEYS15.codeBlock) || tempBlocks[0].type === getPluginType5(editor, KEYS15.table) || tempBlocks[0].type === getPluginType5(editor, KEYS15.equation) ? tempBlockChunks : serializedBlock2
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
            at: PathApi2.next(_blockPath),
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
      return PathApi2.previous(anchorNode[1]);
    }
  };
  const getFocusPath = (editor2) => {
    return editor2.selection?.focus.path.slice(0, 1);
  };
  const path = getAnchorPreviousPath(editor) ?? getFocusPath(editor) ?? [0];
  const entry = editor.api.node(path);
  if (entry && (entry[0].type === getPluginType5(editor, KEYS15.columnGroup) || entry[0].type === getPluginType5(editor, KEYS15.table))) {
    return editor.api.above()?.[1] ?? path;
  }
  return path;
};
export {
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
};
//# sourceMappingURL=index.mjs.map