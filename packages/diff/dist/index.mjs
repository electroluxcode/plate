// src/internal/transforms/transformDiffDescendants.ts
import { TextApi as TextApi4 } from "platejs";

// src/internal/utils/is-equal.ts
import baseIsEqual from "lodash/isEqual.js";
import isPlainObject from "lodash/isPlainObject.js";
var without = (x, { ignoreDeep = [], ignoreShallow = [] } = {}) => {
  if (Array.isArray(x))
    return x.map((y) => without(y, { ignoreDeep, ignoreShallow }));
  if (!isPlainObject(x)) return x;
  const obj = x;
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (ignoreShallow.includes(key) || ignoreDeep.includes(key)) continue;
    result[key] = without(value, { ignoreDeep });
  }
  return result;
};
var isEqual = (value, other, options) => baseIsEqual(without(value, options), without(other, options));

// src/internal/transforms/transformDiffNodes.ts
var childrenOnlyStrategy = (node, nextNode, options) => {
  if (node.children != null && nextNode.children != null && isEqual(node, nextNode, {
    ignoreDeep: options.ignoreProps,
    ignoreShallow: ["children"]
  })) {
    const children = computeDiff(
      node.children,
      nextNode.children,
      options
    );
    return [
      {
        ...nextNode,
        children
      }
    ];
  }
  return false;
};
var propsOnlyStrategy = (node, nextNode, { getUpdateProps }) => {
  const properties = {};
  const newProperties = {};
  for (const key in node) {
    if (!isEqual(node[key], nextNode[key])) {
      if (key === "children" || key === "text") return false;
      properties[key] = node[key];
      newProperties[key] = nextNode[key];
    }
  }
  for (const key in nextNode) {
    if (node[key] === void 0) {
      if (key === "children" || key === "text") return false;
      newProperties[key] = nextNode[key];
    }
  }
  return [
    {
      ...nextNode,
      ...getUpdateProps(node, properties, newProperties)
    }
  ];
};
var strategies = [childrenOnlyStrategy, propsOnlyStrategy];
function transformDiffNodes(node, nextNode, options) {
  for (const strategy of strategies) {
    const ops = strategy(node, nextNode, options);
    if (ops) {
      return ops;
    }
  }
  return false;
}

// src/internal/transforms/transformDiffTexts.ts
import {
  createEditor,
  KEYS,
  PathApi as PathApi2,
  TextApi as TextApi2
} from "platejs";

// src/internal/utils/dmp.ts
import { DiffMatchPatch } from "diff-match-patch-ts";
var dmp = new DiffMatchPatch();
dmp.Diff_Timeout = 0.2;

// src/internal/utils/get-properties.ts
function getProperties(goal, before) {
  const props = {};
  for (const x in goal) {
    if (x !== "text") {
      if (before == null) {
        if (goal[x]) {
          props[x] = goal[x];
        }
      } else {
        if (goal[x] !== before[x]) {
          if (goal[x]) {
            props[x] = goal[x];
          } else {
            props[x] = void 0;
          }
        }
      }
    }
  }
  if (before != null) {
    for (const x in before) {
      if (x !== "text" && goal[x] == null) {
        props[x] = void 0;
      }
    }
  }
  return props;
}

// src/internal/utils/inline-node-char-map.ts
import { NodeApi, TextApi } from "platejs";
var InlineNodeCharMap = class {
  _charGenerator;
  _charToNode = /* @__PURE__ */ new Map();
  constructor({ charGenerator }) {
    this._charGenerator = charGenerator;
  }
  insertBetweenPairs(arr, between) {
    return arr.flatMap((x, i) => {
      if (i === arr.length - 1) return x;
      return [x, between];
    });
  }
  replaceCharWithNode(haystack, needle, replacementNode) {
    return haystack.flatMap((haystackNode) => {
      if (!TextApi.isText(haystackNode)) return [haystackNode];
      const splitText = haystackNode.text.split(needle);
      if (splitText.length === 1) return [haystackNode];
      const replacementWithProps = {
        ...replacementNode,
        ...NodeApi.extractProps(haystackNode)
      };
      const nodesForTexts = splitText.map((text) => ({
        ...haystackNode,
        text
      }));
      const nodeList = this.insertBetweenPairs(
        nodesForTexts,
        replacementWithProps
      );
      return nodeList.filter((n) => !TextApi.isText(n) || n.text.length > 0);
    });
  }
  // Replace non-text nodes with a text node containing a unique char
  nodeToText(node) {
    if (TextApi.isText(node)) return node;
    const c = this._charGenerator.next().value;
    this._charToNode.set(c, node);
    return { text: c };
  }
  // Replace chars in text node with original nodes
  textToNode(initialTextNode) {
    let outputNodes = [initialTextNode];
    for (const [c, originalNode] of this._charToNode) {
      outputNodes = this.replaceCharWithNode(outputNodes, c, originalNode);
    }
    return outputNodes;
  }
};

// src/internal/utils/unused-char-generator.ts
function* unusedCharGenerator({
  skipChars = ""
} = {}) {
  const skipSet = new Set(skipChars);
  for (let code = "A".codePointAt(0); ; code++) {
    const c = String.fromCodePoint(code);
    if (skipSet.has(c)) continue;
    yield c;
  }
}

// src/internal/utils/with-change-tracking.ts
import isEqual2 from "lodash/isEqual.js";
import uniqWith from "lodash/uniqWith.js";
import {
  NodeApi as NodeApi2,
  PathApi,
  PointApi,
  RangeApi
} from "platejs";
var withChangeTracking = (editor, options) => {
  const e = editor;
  e.propsChanges = [];
  e.insertedTexts = [];
  e.removedTexts = [];
  e.recordingOperations = true;
  const { apply } = e;
  e.apply = (op) => applyWithChangeTracking(e, apply, op);
  e.tf.apply = e.apply;
  e.commitChangesToDiffs = () => commitChangesToDiffs(e, options);
  return e;
};
var applyWithChangeTracking = (editor, apply, op) => {
  if (!editor.recordingOperations) {
    return apply(op);
  }
  withoutRecordingOperations(editor, () => {
    switch (op.type) {
      case "insert_text": {
        applyInsertText(editor, apply, op);
        break;
      }
      case "merge_node": {
        applyMergeNode(editor, apply, op);
        break;
      }
      case "remove_text": {
        applyRemoveText(editor, apply, op);
        break;
      }
      case "set_node": {
        applySetNode(editor, apply, op);
        break;
      }
      case "split_node": {
        applySplitNode(editor, apply, op);
        break;
      }
      default: {
        apply(op);
      }
    }
  });
};
var applyInsertText = (editor, apply, op) => {
  const node = NodeApi2.get(editor, op.path);
  apply(op);
  const startPoint = { offset: op.offset, path: op.path };
  const endPoint = { offset: op.offset + op.text.length, path: op.path };
  const range = { anchor: startPoint, focus: endPoint };
  const rangeRef = editor.api.rangeRef(range);
  editor.insertedTexts.push({
    node: {
      ...node,
      text: op.text
    },
    rangeRef
  });
};
var applyRemoveText = (editor, apply, op) => {
  const node = NodeApi2.get(editor, op.path);
  apply(op);
  const point = { offset: op.offset, path: op.path };
  const pointRef = editor.api.pointRef(point, {
    affinity: "backward"
  });
  editor.removedTexts.push({
    node: {
      ...node,
      text: op.text
    },
    pointRef
  });
};
var applyMergeNode = (editor, apply, op) => {
  const oldNode = NodeApi2.get(editor, op.path);
  const properties = NodeApi2.extractProps(oldNode);
  const prevNodePath = PathApi.previous(op.path);
  const prevNode = NodeApi2.get(editor, prevNodePath);
  const newProperties = NodeApi2.extractProps(prevNode);
  apply(op);
  const startPoint = { offset: prevNode.text.length, path: prevNodePath };
  const endPoint = editor.api.end(prevNodePath);
  const range = { anchor: startPoint, focus: endPoint };
  const rangeRef = editor.api.rangeRef(range);
  editor.propsChanges.push({
    newProperties,
    properties,
    rangeRef
  });
};
var applySplitNode = (editor, apply, op) => {
  const oldNode = NodeApi2.get(editor, op.path);
  const properties = NodeApi2.extractProps(oldNode);
  const newProperties = op.properties;
  apply(op);
  const newNodePath = PathApi.next(op.path);
  const newNodeRange = editor.api.range(newNodePath);
  const rangeRef = editor.api.rangeRef(newNodeRange);
  editor.propsChanges.push({
    newProperties,
    properties,
    rangeRef
  });
};
var applySetNode = (editor, apply, op) => {
  apply(op);
  const range = editor.api.range(op.path);
  const rangeRef = editor.api.rangeRef(range);
  editor.propsChanges.push({
    newProperties: op.newProperties,
    properties: op.properties,
    rangeRef
  });
};
var commitChangesToDiffs = (editor, { getDeleteProps, getInsertProps, getUpdateProps }) => {
  withoutRecordingOperations(editor, () => {
    const flatUpdates = flattenPropsChanges(editor).reverse();
    flatUpdates.forEach(({ newProperties, properties, range }) => {
      const node = NodeApi2.get(editor, range.anchor.path);
      editor.tf.setNodes(getUpdateProps(node, properties, newProperties), {
        at: range,
        marks: true
      });
    });
    editor.removedTexts.forEach(({ node, pointRef }) => {
      const point = pointRef.current;
      if (point) {
        editor.tf.insertNode(
          {
            ...node,
            ...getDeleteProps(node)
          },
          { at: point }
        );
      }
      pointRef.unref();
    });
    editor.insertedTexts.forEach(({ node, rangeRef }) => {
      const range = rangeRef.current;
      if (range) {
        editor.tf.setNodes(getInsertProps(node), {
          at: range,
          marks: true
        });
      }
      rangeRef.unref();
    });
  });
};
var flattenPropsChanges = (editor) => {
  const propChangeRangeRefs = editor.propsChanges.map(
    ({ rangeRef }) => rangeRef
  );
  const insertedTextRangeRefs = editor.insertedTexts.map(
    ({ rangeRef }) => rangeRef
  );
  const unsortedRangePoints = [
    ...propChangeRangeRefs,
    ...insertedTextRangeRefs
  ].flatMap((rangeRef) => {
    const range = rangeRef.current;
    if (!range) return [];
    return [range.anchor, range.focus];
  });
  const rangePoints = uniqWith(
    unsortedRangePoints.sort(PointApi.compare),
    PointApi.equals
  );
  if (rangePoints.length < 2) return [];
  const flatRanges = Array.from({ length: rangePoints.length - 1 }).fill(null).map((_, i) => ({
    anchor: rangePoints[i],
    focus: rangePoints[i + 1]
  }));
  const flatUpdates = flatRanges.map((flatRange) => {
    const getIntersectingChanges = (changes) => changes.filter(({ rangeRef }) => {
      const range = rangeRef.current;
      if (!range) return false;
      const intersection = RangeApi.intersection(range, flatRange);
      if (!intersection) return false;
      return RangeApi.isExpanded(intersection);
    });
    if (getIntersectingChanges(editor.insertedTexts).length > 0) return null;
    const intersectingUpdates = getIntersectingChanges(editor.propsChanges);
    if (intersectingUpdates.length === 0) return null;
    const initialProps = objectWithoutUndefined(
      intersectingUpdates[0].properties
    );
    const finalProps = objectWithoutUndefined(
      intersectingUpdates.at(-1).newProperties
    );
    if (isEqual2(initialProps, finalProps)) return null;
    const properties = {};
    const newProperties = {};
    for (const key of Object.keys(finalProps)) {
      if (!isEqual2(initialProps[key], finalProps[key])) {
        properties[key] = initialProps[key];
        newProperties[key] = finalProps[key];
      }
    }
    for (const key of Object.keys(initialProps)) {
      if (finalProps[key] === void 0) {
        properties[key] = initialProps[key];
        newProperties[key] = void 0;
      }
    }
    return {
      newProperties,
      properties,
      range: flatRange
    };
  });
  propChangeRangeRefs.forEach((rangeRef) => rangeRef.unref());
  return flatUpdates.filter(Boolean);
};
var objectWithoutUndefined = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== void 0) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
var withoutRecordingOperations = (editor, fn) => {
  editor.recordingOperations = false;
  fn();
  editor.recordingOperations = true;
};

// src/internal/transforms/transformDiffTexts.ts
function transformDiffTexts(nodes, nextNodes, options) {
  if (nodes.length === 0) throw new Error("must have at least one nodes");
  if (nextNodes.length === 0)
    throw new Error("must have at least one nextNodes");
  const { lineBreakChar } = options;
  const hasLineBreakChar = lineBreakChar !== void 0;
  const charGenerator = unusedCharGenerator({
    // Do not use any char that is present in the text
    skipChars: nodes.concat(nextNodes).filter(TextApi2.isText).map((n) => n.text).join("")
  });
  const insertedLineBreakProxyChar = hasLineBreakChar ? charGenerator.next().value : void 0;
  const deletedLineBreakProxyChar = hasLineBreakChar ? charGenerator.next().value : void 0;
  const inlineNodeCharMap = new InlineNodeCharMap({
    charGenerator
  });
  const texts = nodes.map((n) => inlineNodeCharMap.nodeToText(n));
  const nextTexts = nextNodes.map((n) => inlineNodeCharMap.nodeToText(n));
  const nodesEditor = withChangeTracking(createEditor(), options);
  nodesEditor.children = [{ children: texts, type: KEYS.p }];
  nodesEditor.tf.withoutNormalizing(() => {
    let node = texts[0];
    if (texts.length > 1) {
      for (let i = 1; i < texts.length; i++) {
        nodesEditor.tf.apply({
          path: [0, 1],
          position: 0,
          // Required by type; not actually used here
          properties: {},
          // Required by type; not actually used here
          type: "merge_node"
        });
        node = { ...node, text: node.text + texts[i].text };
      }
    }
    for (const op of splitTextNodes(node, nextTexts, {
      deletedLineBreakChar: deletedLineBreakProxyChar,
      insertedLineBreakChar: insertedLineBreakProxyChar
    })) {
      nodesEditor.tf.apply(op);
    }
    nodesEditor.commitChangesToDiffs();
  });
  let diffTexts = nodesEditor.children[0].children;
  if (hasLineBreakChar) {
    diffTexts = diffTexts.map((n) => ({
      ...n,
      text: n.text.replaceAll(insertedLineBreakProxyChar, lineBreakChar + "\n").replaceAll(deletedLineBreakProxyChar, lineBreakChar)
    }));
  }
  return diffTexts.flatMap((t) => inlineNodeCharMap.textToNode(t));
}
function slateTextDiff(a, b, { deletedLineBreakChar, insertedLineBreakChar }) {
  const diff = dmp.diff_main(a, b);
  dmp.diff_cleanupSemantic(diff);
  const operations = [];
  let offset = 0;
  let i = 0;
  while (i < diff.length) {
    const chunk = diff[i];
    const op = chunk[0];
    const text = chunk[1];
    switch (op) {
      case -1: {
        operations.push({
          offset,
          text: deletedLineBreakChar === void 0 ? text : text.replaceAll("\n", deletedLineBreakChar),
          type: "remove_text"
        });
        break;
      }
      case 0: {
        offset += text.length;
        break;
      }
      case 1: {
        operations.push({
          offset,
          text: insertedLineBreakChar === void 0 ? text : text.replaceAll("\n", insertedLineBreakChar),
          type: "insert_text"
        });
        offset += text.length;
        break;
      }
    }
    i += 1;
  }
  return operations;
}
function splitTextNodes(node, split, options) {
  if (split.length === 0) {
    return [
      {
        node,
        path: [0, 0],
        type: "remove_node"
      }
    ];
  }
  let splitText = "";
  for (const { text } of split) {
    splitText += text;
  }
  const nodeText = node.text;
  const operations = [];
  if (splitText !== nodeText) {
    for (const op of slateTextDiff(nodeText, splitText, options)) {
      operations.push({ path: [0, 0], ...op });
    }
  }
  const newProperties = getProperties(split[0], node);
  if (getKeysLength(newProperties) > 0) {
    operations.push({
      newProperties,
      path: [0, 0],
      properties: getProperties(node),
      type: "set_node"
    });
  }
  let properties = getProperties(split[0]);
  let splitPath = [0, 0];
  for (let i = 0; i < split.length - 1; i++) {
    const part = split[i];
    const nextPart = split[i + 1];
    const newProps = getProperties(nextPart);
    Object.keys(properties).forEach((key) => {
      if (!newProps.hasOwnProperty(key)) {
        newProps[key] = void 0;
      }
    });
    operations.push({
      path: splitPath,
      position: part.text.length,
      properties: newProps,
      type: "split_node"
    });
    splitPath = PathApi2.next(splitPath);
    properties = getProperties(nextPart);
  }
  return operations;
}
function getKeysLength(obj) {
  if (obj == null) {
    return 0;
  }
  return Object.keys(obj).length;
}

// src/internal/utils/diff-nodes.ts
import { ElementApi, TextApi as TextApi3 } from "platejs";
function diffNodes(originNodes, targetNodes, { elementsAreRelated, ignoreProps }) {
  const result = [];
  let relatedNode;
  const remainingTargetNodes = [...targetNodes];
  originNodes.forEach((originNode) => {
    let childrenUpdated = false;
    let nodeUpdated = false;
    relatedNode = remainingTargetNodes.find((targetNode) => {
      if (ElementApi.isElement(originNode) && ElementApi.isElement(targetNode)) {
        const relatedResult = elementsAreRelated?.(originNode, targetNode) ?? null;
        if (relatedResult !== null) return relatedResult;
      }
      childrenUpdated = isEqualNode(originNode, targetNode, ignoreProps);
      nodeUpdated = isEqualNodeChildren(originNode, targetNode);
      return nodeUpdated || childrenUpdated;
    });
    if (relatedNode) {
      const insertNodes = remainingTargetNodes.splice(
        0,
        remainingTargetNodes.indexOf(relatedNode)
      );
      insertNodes.forEach((insertNode) => {
        result.push({
          insert: true,
          originNode: insertNode
        });
      });
      remainingTargetNodes.splice(0, 1);
    }
    result.push({
      childrenUpdated,
      delete: !relatedNode,
      nodeUpdated,
      originNode,
      relatedNode
    });
  });
  remainingTargetNodes.forEach((insertNode) => {
    result.push({
      insert: true,
      originNode: insertNode
    });
  });
  return result;
}
function isEqualNode(value, other, ignoreProps) {
  return ElementApi.isElement(value) && ElementApi.isElement(other) && value.children !== null && other.children !== null && isEqual(value, other, {
    ignoreDeep: ignoreProps,
    ignoreShallow: ["children"]
  });
}
function isEqualNodeChildren(value, other) {
  if (ElementApi.isElement(value) && ElementApi.isElement(other) && isEqual(value.children, other.children)) {
    return true;
  }
  return TextApi3.isText(value) && TextApi3.isText(other) && isEqual(value.text, other.text);
}

// src/internal/transforms/transformDiffDescendants.ts
var OP_UNCHANGED = 0;
var OP_DELETE = -1;
var OP_INSERT = 1;
function transformDiffDescendants(diff, { stringCharMapping, ...options }) {
  const { getDeleteProps, getInsertProps, ignoreProps, isInline } = options;
  let i = 0;
  const children = [];
  let insertBuffer = [];
  let deleteBuffer = [];
  const flushBuffers = () => {
    children.push(...deleteBuffer, ...insertBuffer);
    insertBuffer = [];
    deleteBuffer = [];
  };
  const insertNode = (node) => insertBuffer.push({
    ...node,
    ...getInsertProps(node)
  });
  const deleteNode = (node) => deleteBuffer.push({
    ...node,
    ...getDeleteProps(node)
  });
  const passThroughNodes = (...nodes) => {
    flushBuffers();
    children.push(...nodes);
  };
  const isInlineList = (nodes) => nodes.every((node) => TextApi4.isText(node) || isInline(node));
  while (i < diff.length) {
    const chunk = diff[i];
    const op = chunk[0];
    const val = chunk[1];
    const nodes = stringCharMapping.stringToNodes(val);
    switch (op) {
      case OP_UNCHANGED: {
        passThroughNodes(...nodes);
        i += 1;
        continue;
      }
      case OP_DELETE: {
        if (i < diff.length - 1 && diff[i + 1][0] === OP_INSERT) {
          const nextVal = diff[i + 1][1];
          const nextNodes = stringCharMapping.stringToNodes(nextVal);
          if (isEqual(nodes, nextNodes, { ignoreDeep: ignoreProps })) {
            passThroughNodes(...nextNodes);
            i += 2;
            continue;
          }
          if (isInlineList(nodes) && isInlineList(nextNodes)) {
            passThroughNodes(...transformDiffTexts(nodes, nextNodes, options));
            i += 2;
            continue;
          }
          const diffResult = diffNodes(nodes, nextNodes, options);
          diffResult.forEach((item) => {
            if (item.delete) {
              deleteNode(item.originNode);
            }
            if (item.insert) {
              insertNode(item.originNode);
            }
            if (item.relatedNode) {
              const diffNodesResult = transformDiffNodes(
                item.originNode,
                item.relatedNode,
                options
              );
              if (diffNodesResult) {
                passThroughNodes(...diffNodesResult);
              } else {
                deleteNode(item.originNode);
                insertNode(item.relatedNode);
              }
            }
          });
          i += 2;
          continue;
        } else {
          for (const node of nodes) {
            deleteNode(node);
          }
          i += 1;
          continue;
        }
      }
      case OP_INSERT: {
        for (const node of nodes) {
          insertNode(node);
        }
        i += 1;
        continue;
      }
    }
  }
  flushBuffers();
  return children;
}

// src/internal/utils/string-char-mapping.ts
import isEqual3 from "lodash/isEqual.js";
var StringCharMapping = class {
  _charGenerator = unusedCharGenerator();
  _mappedNodes = [];
  charToNode(c) {
    const entry = this._mappedNodes.find(([_node, c2]) => c2 === c);
    if (!entry) throw new Error(`No node found for char ${c}`);
    return entry[0];
  }
  nodesToString(nodes) {
    return nodes.map(this.nodeToChar.bind(this)).join("");
  }
  nodeToChar(node) {
    for (const [n, c2] of this._mappedNodes) {
      if (isEqual3(n, node)) {
        return c2;
      }
    }
    const c = this._charGenerator.next().value;
    this._mappedNodes.push([node, c]);
    return c;
  }
  stringToNodes(s) {
    return s.split("").map(this.charToNode.bind(this));
  }
};

// src/lib/computeDiff.ts
var computeDiff = (doc0, doc1, {
  getDeleteProps = defaultGetDeleteProps,
  getInsertProps = defaultGetInsertProps,
  getUpdateProps = defaultGetUpdateProps,
  ignoreProps,
  isInline = () => false,
  ...options
} = {}) => {
  const stringCharMapping = new StringCharMapping();
  const m0 = stringCharMapping.nodesToString(doc0);
  const m1 = stringCharMapping.nodesToString(doc1);
  const diff = dmp.diff_main(m0, m1);
  return transformDiffDescendants(diff, {
    getDeleteProps,
    getInsertProps,
    ignoreProps,
    isInline,
    stringCharMapping,
    getUpdateProps: (node, properties, newProperties) => {
      if (ignoreProps && Object.keys(newProperties).every((key) => ignoreProps.includes(key)))
        return {};
      return getUpdateProps(node, properties, newProperties);
    },
    ...options
  });
};
var defaultGetInsertProps = () => ({
  diff: true,
  diffOperation: {
    type: "insert"
  }
});
var defaultGetDeleteProps = () => ({
  diff: true,
  diffOperation: {
    type: "delete"
  }
});
var defaultGetUpdateProps = (_node, properties, newProperties) => ({
  diff: true,
  diffOperation: {
    newProperties,
    properties,
    type: "update"
  }
});

// src/lib/withGetFragmentExcludeDiff.ts
import cloneDeep from "lodash/cloneDeep.js";
var withGetFragmentExcludeDiff = ({
  api: { getFragment }
}) => ({
  api: {
    getFragment() {
      const fragment = cloneDeep(getFragment());
      const removeDiff = (node) => {
        if ("diff" in node) delete node.diff;
        if ("diffOperation" in node) delete node.diffOperation;
        if ("children" in node)
          node.children.forEach(removeDiff);
      };
      fragment.forEach(removeDiff);
      return fragment;
    }
  }
});
export {
  computeDiff,
  defaultGetDeleteProps,
  defaultGetInsertProps,
  defaultGetUpdateProps,
  withGetFragmentExcludeDiff
};
//# sourceMappingURL=index.mjs.map