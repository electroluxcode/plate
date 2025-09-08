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
  BulletedListPlugin: () => BulletedListPlugin,
  ListItemContentPlugin: () => ListItemContentPlugin,
  ListItemPlugin: () => ListItemPlugin,
  ListPlugin: () => ListPlugin,
  NumberedListPlugin: () => NumberedListPlugin,
  TaskListPlugin: () => TaskListPlugin,
  TodoListPlugin: () => TodoListPlugin,
  useListToolbarButton: () => useListToolbarButton,
  useListToolbarButtonState: () => useListToolbarButtonState,
  useTodoListElement: () => useTodoListElement,
  useTodoListElementState: () => useTodoListElementState
});
module.exports = __toCommonJS(react_exports);

// src/react/ListPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseListPlugin.ts
var import_platejs31 = require("platejs");

// src/lib/transforms/moveListItems.ts
var import_platejs15 = require("platejs");

// src/lib/queries/isListNested.ts
var import_platejs = require("platejs");
var isListNested = (editor, listPath) => {
  const listParentNode = editor.api.parent(listPath)?.[0];
  return listParentNode?.type === editor.getType(import_platejs.KEYS.li);
};

// src/lib/transforms/moveListItemDown.ts
var import_platejs11 = require("platejs");

// src/lib/queries/getHighestEmptyList.ts
var import_platejs3 = require("platejs");
var import_platejs4 = require("platejs");

// src/lib/queries/getListTypes.ts
var import_platejs2 = require("platejs");
var getListTypes = (editor) => {
  return [
    editor.getType(import_platejs2.KEYS.olClassic),
    editor.getType(import_platejs2.KEYS.ulClassic),
    editor.getType(import_platejs2.KEYS.taskList)
  ];
};

// src/lib/queries/getHighestEmptyList.ts
var getHighestEmptyList = (editor, {
  diffListPath,
  liPath
}) => {
  const list = editor.api.above({
    at: liPath,
    match: { type: getListTypes(editor) }
  });
  if (!list) return;
  const [listNode, listPath] = list;
  if (!diffListPath || !import_platejs3.PathApi.equals(listPath, diffListPath)) {
    if (listNode.children.length < 2) {
      const liParent = editor.api.above({
        at: listPath,
        match: { type: editor.getType(import_platejs4.KEYS.li) }
      });
      if (liParent) {
        return getHighestEmptyList(editor, { diffListPath, liPath: liParent[1] }) || listPath;
      }
    }
    return liPath;
  }
};

// src/lib/queries/getListItemEntry.ts
var import_platejs5 = require("platejs");
var getListItemEntry = (editor, { at = editor.selection } = {}) => {
  const liType = editor.getType(import_platejs5.KEYS.li);
  let _at;
  if (import_platejs5.RangeApi.isRange(at) && !import_platejs5.RangeApi.isCollapsed(at)) {
    _at = at.focus.path;
  } else if (import_platejs5.RangeApi.isRange(at)) {
    _at = at.anchor.path;
  } else {
    _at = at;
  }
  if (_at) {
    const node = import_platejs5.NodeApi.get(editor, _at);
    if (node) {
      const listItem = editor.api.above({
        at: _at,
        match: { type: liType }
      });
      if (listItem) {
        const list = editor.api.parent(listItem[1]);
        return { list, listItem };
      }
    }
  }
};

// src/lib/queries/getListRoot.ts
var getListRoot = (editor, at = editor.selection) => {
  if (!at) return;
  const parentList = editor.api.above({
    at,
    match: {
      type: getListTypes(editor)
    }
  });
  if (parentList) {
    const [, parentListPath] = parentList;
    return getListRoot(editor, parentListPath) ?? parentList;
  }
};

// src/lib/queries/getTaskListProps.ts
var import_platejs6 = require("platejs");
var getPropsIfTaskListLiNode = (editor, { inherit = false, liNode: node }) => editor.getType(import_platejs6.KEYS.li) === node.type && "checked" in node ? { checked: inherit ? node.checked : false } : void 0;
var getPropsIfTaskList = (editor, type, partial = {}) => editor.getType(import_platejs6.KEYS.taskList) === type ? { checked: false, ...partial } : void 0;

// src/lib/queries/getTodoListItemEntry.ts
var import_platejs7 = require("platejs");
var getTodoListItemEntry = (editor, { at = editor.selection } = {}) => {
  const todoType = editor.getType(import_platejs7.KEYS.listTodoClassic);
  let _at;
  if (import_platejs7.RangeApi.isRange(at) && !import_platejs7.RangeApi.isCollapsed(at)) {
    _at = at.focus.path;
  } else if (import_platejs7.RangeApi.isRange(at)) {
    _at = at.anchor.path;
  } else {
    _at = at;
  }
  if (_at) {
    const node = import_platejs7.NodeApi.get(editor, _at);
    if (node) {
      const listItem = editor.api.above({
        at: _at,
        match: { type: todoType }
      });
      if (listItem) {
        const list = editor.api.parent(listItem[1]);
        return { list, listItem };
      }
    }
  }
};

// src/lib/queries/hasListChild.ts
var import_platejs8 = require("platejs");
var hasListChild = (editor, node) => node.children.some((n) => (0, import_platejs8.match)(n, [], { type: getListTypes(editor) }));

// src/lib/queries/isAcrossListItems.ts
var import_platejs9 = require("platejs");
var isAcrossListItems = (editor, at = editor.selection) => {
  if (!at || import_platejs9.RangeApi.isCollapsed(at)) {
    return false;
  }
  const isAcrossBlocks = editor.api.isAt({ at, blocks: true });
  if (!isAcrossBlocks) return false;
  return editor.api.some({
    at,
    match: { type: editor.getType(import_platejs9.KEYS.li) }
  });
};

// src/lib/queries/isListRoot.ts
var import_platejs10 = require("platejs");
var isListRoot = (editor, node) => import_platejs10.ElementApi.isElement(node) && getListTypes(editor).includes(node.type);

// src/lib/transforms/moveListItemDown.ts
var moveListItemDown = (editor, { list, listItem }) => {
  let moved = false;
  const [listNode] = list;
  const [, listItemPath] = listItem;
  const previousListItemPath = import_platejs11.PathApi.previous(listItemPath);
  if (!previousListItemPath) {
    return;
  }
  const previousSiblingItem = editor.api.node(previousListItemPath);
  if (previousSiblingItem) {
    const [previousNode, previousPath] = previousSiblingItem;
    const sublist = previousNode.children.find(
      (n) => (0, import_platejs11.match)(n, [], { type: getListTypes(editor) })
    );
    const newPath = previousPath.concat(
      sublist ? [1, sublist.children.length] : [1]
    );
    editor.tf.withoutNormalizing(() => {
      if (!sublist) {
        editor.tf.wrapNodes(
          { children: [], type: listNode.type },
          { at: listItemPath }
        );
      }
      editor.tf.moveNodes({
        at: listItemPath,
        to: newPath
      });
      moved = true;
    });
  }
  return moved;
};

// src/lib/transforms/moveListItemUp.ts
var import_platejs14 = require("platejs");

// src/lib/transforms/moveListItemsToList.ts
var import_platejs12 = require("platejs");
var moveListItemsToList = (editor, {
  deleteFromList = true,
  fromList,
  fromListItem,
  fromStartIndex,
  to: _to,
  toList,
  toListIndex = null
}) => {
  let fromListPath;
  let moved = false;
  editor.tf.withoutNormalizing(() => {
    if (fromListItem) {
      const fromListItemSublist = editor.api.descendant({
        at: fromListItem[1],
        match: {
          type: getListTypes(editor)
        }
      });
      if (!fromListItemSublist) return;
      fromListPath = fromListItemSublist?.[1];
    } else if (fromList) {
      fromListPath = fromList[1];
    } else {
      return;
    }
    let to = null;
    if (_to) to = _to;
    if (toList) {
      if (toListIndex === null) {
        const lastChildPath = import_platejs12.NodeApi.lastChild(editor, toList[1])?.[1];
        to = lastChildPath ? import_platejs12.PathApi.next(lastChildPath) : toList[1].concat([0]);
      } else {
        to = toList[1].concat([toListIndex]);
      }
    }
    if (!to) return;
    moved = editor.tf.moveNodes({
      at: fromListPath,
      children: true,
      fromIndex: fromStartIndex,
      to
    });
    if (deleteFromList) {
      editor.tf.delete({ at: fromListPath });
    }
  });
  return moved;
};

// src/lib/transforms/unwrapList.ts
var import_platejs13 = require("platejs");
var unwrapList = (editor, { at } = {}) => {
  const ancestorListTypeCheck = () => {
    if (editor.api.above({ at, match: { type: getListTypes(editor) } })) {
      return true;
    }
    if (!at && editor.selection) {
      const commonNode = import_platejs13.NodeApi.common(
        editor,
        editor.selection.anchor.path,
        editor.selection.focus.path
      );
      if (import_platejs13.ElementApi.isElement(commonNode[0]) && getListTypes(editor).includes(commonNode[0].type)) {
        return true;
      }
    }
    return false;
  };
  editor.tf.withoutNormalizing(() => {
    do {
      editor.tf.unwrapNodes({
        at,
        match: { type: editor.getType(import_platejs13.KEYS.li) },
        split: true
      });
      editor.tf.unwrapNodes({
        at,
        match: {
          type: getListTypes(editor)
        },
        split: true
      });
    } while (ancestorListTypeCheck());
  });
};

// src/lib/transforms/moveListItemUp.ts
var moveListItemUp = (editor, { list, listItem }) => {
  const move = () => {
    const [listNode, listPath] = list;
    const [liNode, liPath] = listItem;
    const liParent = editor.api.above({
      at: listPath,
      match: { type: editor.getType(import_platejs14.KEYS.li) }
    });
    if (!liParent) {
      let toListPath2;
      try {
        toListPath2 = import_platejs14.PathApi.next(listPath);
      } catch (error) {
        return;
      }
      const condA = hasListChild(editor, liNode);
      const condB = !import_platejs14.NodeApi.isLastChild(editor, liPath);
      if (condA || condB) {
        editor.tf.insertNodes(
          {
            children: [],
            type: listNode.type
          },
          { at: toListPath2 }
        );
      }
      if (condA) {
        const toListNode = import_platejs14.NodeApi.get(editor, toListPath2);
        if (!toListNode) return;
        moveListItemsToList(editor, {
          fromListItem: listItem,
          toList: [toListNode, toListPath2]
        });
      }
      if (condB) {
        const toListNode = import_platejs14.NodeApi.get(editor, toListPath2);
        if (!toListNode) return;
        moveListItemsToList(editor, {
          deleteFromList: false,
          fromList: list,
          fromStartIndex: liPath.at(-1) + 1,
          toList: [toListNode, toListPath2]
        });
      }
      unwrapList(editor, { at: liPath.concat(0) });
      return true;
    }
    const [, liParentPath] = liParent;
    const toListPath = liPath.concat([1]);
    if (!import_platejs14.NodeApi.isLastChild(editor, liPath)) {
      if (!hasListChild(editor, liNode)) {
        editor.tf.insertNodes(
          {
            children: [],
            type: listNode.type
          },
          { at: toListPath }
        );
      }
      const toListNode = import_platejs14.NodeApi.get(editor, toListPath);
      if (!toListNode) return;
      moveListItemsToList(editor, {
        deleteFromList: false,
        fromListItem: liParent,
        fromStartIndex: liPath.at(-1) + 1,
        toList: [toListNode, toListPath]
      });
    }
    const movedUpLiPath = import_platejs14.PathApi.next(liParentPath);
    editor.tf.moveNodes({
      at: liPath,
      to: movedUpLiPath
    });
    return true;
  };
  let moved = false;
  editor.tf.withoutNormalizing(() => {
    moved = move();
  });
  return moved;
};

// src/lib/transforms/removeFirstListItem.ts
var removeFirstListItem = (editor, {
  list,
  listItem
}) => {
  const [, listPath] = list;
  if (!isListNested(editor, listPath)) {
    moveListItemUp(editor, { list, listItem });
    return true;
  }
  return false;
};

// src/lib/transforms/moveListItems.ts
var moveListItems = (editor, {
  at = editor.selection ?? void 0,
  enableResetOnShiftTab,
  increase = true
} = {}) => {
  const _nodes = editor.api.nodes({
    at,
    match: {
      type: editor.getType(import_platejs15.KEYS.lic)
    }
  });
  const lics = Array.from(_nodes);
  if (lics.length === 0) return;
  const highestLicPaths = [];
  const highestLicPathRefs = [];
  lics.forEach((lic) => {
    const licPath = lic[1];
    const liPath = import_platejs15.PathApi.parent(licPath);
    const isAncestor = highestLicPaths.some((path) => {
      const highestLiPath = import_platejs15.PathApi.parent(path);
      return import_platejs15.PathApi.isAncestor(highestLiPath, liPath);
    });
    if (!isAncestor) {
      highestLicPaths.push(licPath);
      highestLicPathRefs.push(editor.api.pathRef(licPath));
    }
  });
  const licPathRefsToMove = increase ? highestLicPathRefs : highestLicPathRefs.reverse();
  return editor.tf.withoutNormalizing(() => {
    let moved = false;
    licPathRefsToMove.forEach((licPathRef) => {
      const licPath = licPathRef.unref();
      if (!licPath) return;
      const listItem = editor.api.parent(licPath);
      if (!listItem) return;
      const parentList = editor.api.parent(listItem[1]);
      if (!parentList) return;
      let _moved;
      if (increase) {
        _moved = moveListItemDown(editor, {
          list: parentList,
          listItem
        });
      } else if (isListNested(editor, parentList[1])) {
        _moved = moveListItemUp(editor, {
          list: parentList,
          listItem
        });
      } else if (enableResetOnShiftTab) {
        _moved = removeFirstListItem(editor, {
          list: parentList,
          listItem
        });
      }
      moved = _moved || moved;
    });
    return moved;
  });
};

// src/lib/transforms/insertListItem.ts
var import_platejs16 = require("platejs");
var insertListItem = (editor, options = {}) => {
  const liType = editor.getType(import_platejs16.KEYS.li);
  const licType = editor.getType(import_platejs16.KEYS.lic);
  if (!editor.selection) {
    return false;
  }
  const licEntry = editor.api.above({ match: { type: licType } });
  if (!licEntry) return false;
  const [, paragraphPath] = licEntry;
  const listItemEntry = editor.api.parent(paragraphPath);
  if (!listItemEntry) return false;
  const [listItemNode, listItemPath] = listItemEntry;
  if (listItemNode.type !== liType) return false;
  const optionalTasklistProps = "checked" in listItemNode ? { checked: false } : void 0;
  let success = false;
  editor.tf.withoutNormalizing(() => {
    if (!editor.api.isCollapsed()) {
      editor.tf.delete();
    }
    const isStart = editor.api.isStart(editor.selection.focus, paragraphPath);
    const isEnd = editor.api.isEmpty(editor.selection, { after: true });
    const nextParagraphPath = import_platejs16.PathApi.next(paragraphPath);
    const nextListItemPath = import_platejs16.PathApi.next(listItemPath);
    if (isStart) {
      if (optionalTasklistProps && options.inheritCheckStateOnLineStartBreak) {
        optionalTasklistProps.checked = listItemNode.checked;
      }
      editor.tf.insertNodes(
        {
          children: [{ children: [{ text: "" }], type: licType }],
          ...optionalTasklistProps,
          type: liType
        },
        { at: listItemPath }
      );
      success = true;
      return;
    }
    if (isEnd) {
      const marks = editor.api.marks() || {};
      if (optionalTasklistProps && options.inheritCheckStateOnLineEndBreak) {
        optionalTasklistProps.checked = listItemNode.checked;
      }
      editor.tf.insertNodes(
        {
          children: [{ children: [{ text: "", ...marks }], type: licType }],
          ...optionalTasklistProps,
          type: liType
        },
        { at: nextListItemPath }
      );
      editor.tf.select(nextListItemPath);
    } else {
      editor.tf.withoutNormalizing(() => {
        editor.tf.splitNodes();
        editor.tf.wrapNodes(
          {
            children: [],
            ...optionalTasklistProps,
            type: liType
          },
          { at: nextParagraphPath }
        );
        editor.tf.moveNodes({
          at: nextParagraphPath,
          to: nextListItemPath
        });
        editor.tf.select(nextListItemPath);
        editor.tf.collapse({
          edge: "start"
        });
      });
    }
    if (listItemNode.children.length > 1) {
      editor.tf.moveNodes({
        at: nextParagraphPath,
        to: nextListItemPath.concat(1)
      });
    }
    success = true;
  });
  return success;
};

// src/lib/transforms/insertTodoListItem.ts
var import_platejs18 = require("platejs");

// src/lib/BaseTodoListPlugin.ts
var import_platejs17 = require("platejs");
var BaseTodoListPlugin = (0, import_platejs17.createSlatePlugin)({
  key: import_platejs17.KEYS.listTodoClassic,
  node: { isElement: true },
  options: {
    inheritCheckStateOnLineEndBreak: false,
    inheritCheckStateOnLineStartBreak: false
  }
}).overrideEditor(({ editor, tf: { insertBreak } }) => ({
  transforms: {
    insertBreak() {
      const insertBreakTodoList = () => {
        if (!editor.selection) return;
        const res = getTodoListItemEntry(editor);
        if (res) {
          const inserted = insertTodoListItem(editor);
          if (inserted) return true;
        }
      };
      if (insertBreakTodoList()) return;
      insertBreak();
    }
  }
})).extendTransforms(({ editor, type }) => ({
  toggle: () => {
    editor.tf.toggleBlock(type);
  }
}));

// src/lib/transforms/insertTodoListItem.ts
var insertTodoListItem = (editor) => {
  const { inheritCheckStateOnLineEndBreak, inheritCheckStateOnLineStartBreak } = editor.getOptions(BaseTodoListPlugin);
  const todoType = editor.getType(import_platejs18.KEYS.listTodoClassic);
  if (!editor.selection) {
    return false;
  }
  const todoEntry = editor.api.above({ match: { type: todoType } });
  if (!todoEntry) return false;
  const [todo, paragraphPath] = todoEntry;
  let success = false;
  editor.tf.withoutNormalizing(() => {
    if (!editor.api.isCollapsed()) {
      editor.tf.delete();
    }
    const isStart = editor.api.isStart(editor.selection.focus, paragraphPath);
    const isEnd = editor.api.isEmpty(editor.selection, { after: true });
    const nextParagraphPath = import_platejs18.PathApi.next(paragraphPath);
    if (isStart) {
      editor.tf.insertNodes(
        {
          checked: inheritCheckStateOnLineStartBreak ? todo.checked : false,
          children: [{ text: "" }],
          type: todoType
        },
        { at: paragraphPath }
      );
      success = true;
      return;
    }
    if (isEnd) {
      const marks = editor.api.marks() || {};
      editor.tf.insertNodes(
        {
          checked: inheritCheckStateOnLineEndBreak ? todo.checked : false,
          children: [{ text: "", ...marks }],
          type: todoType
        },
        { at: nextParagraphPath }
      );
      editor.tf.select(nextParagraphPath);
    } else {
      editor.tf.withoutNormalizing(() => {
        editor.tf.splitNodes();
      });
    }
    success = true;
  });
  return success;
};

// src/lib/transforms/moveListItemSublistItemsToListItemSublist.ts
var import_platejs19 = require("platejs");
var moveListItemSublistItemsToListItemSublist = (editor, {
  fromListItem,
  start,
  toListItem
}) => {
  const [, fromListItemPath] = fromListItem;
  const [, toListItemPath] = toListItem;
  let moved = false;
  editor.tf.withoutNormalizing(() => {
    const fromListItemSublist = editor.api.descendant({
      at: fromListItemPath,
      match: {
        type: getListTypes(editor)
      }
    });
    if (!fromListItemSublist) return;
    const [, fromListItemSublistPath] = fromListItemSublist;
    const toListItemSublist = editor.api.descendant({
      at: toListItemPath,
      match: {
        type: getListTypes(editor)
      }
    });
    let to;
    if (!toListItemSublist) {
      const fromList = editor.api.parent(fromListItemPath);
      if (!fromList) return;
      const [fromListNode] = fromList;
      const fromListType = fromListNode.type;
      const toListItemSublistPath = toListItemPath.concat([1]);
      editor.tf.insertNodes(
        { children: [], type: fromListType },
        { at: toListItemSublistPath }
      );
      to = toListItemSublistPath.concat([0]);
    } else if (start) {
      const [, toListItemSublistPath] = toListItemSublist;
      to = toListItemSublistPath.concat([0]);
    } else {
      to = import_platejs19.PathApi.next(import_platejs19.NodeApi.lastChild(editor, toListItemSublist[1])[1]);
    }
    moved = editor.tf.moveNodes({
      at: fromListItemSublistPath,
      children: true,
      to
    });
    editor.tf.delete({ at: fromListItemSublistPath });
  });
  return moved;
};

// src/lib/transforms/removeListItem.ts
var import_platejs20 = require("platejs");
var removeListItem = (editor, { list, listItem, reverse = true }) => {
  const [liNode, liPath] = listItem;
  if (editor.api.isExpanded() || !hasListChild(editor, liNode)) {
    return false;
  }
  const previousLiPath = import_platejs20.PathApi.previous(liPath);
  let success = false;
  editor.tf.withoutNormalizing(() => {
    if (previousLiPath) {
      const previousLi = editor.api.node(previousLiPath);
      if (!previousLi) return;
      let tempLiPath = import_platejs20.PathApi.next(liPath);
      editor.tf.insertNodes(
        {
          children: [
            {
              children: [{ text: "" }],
              type: editor.getType(import_platejs20.KEYS.lic)
            }
          ],
          ...getPropsIfTaskListLiNode(editor, {
            inherit: true,
            liNode: previousLi[0]
          }),
          type: editor.getType(import_platejs20.KEYS.li)
        },
        { at: tempLiPath }
      );
      const tempLi = editor.api.node(tempLiPath);
      if (!tempLi) return;
      const tempLiPathRef = editor.api.pathRef(tempLi[1]);
      moveListItemSublistItemsToListItemSublist(editor, {
        fromListItem: listItem,
        toListItem: tempLi
      });
      (0, import_platejs20.deleteMerge)(editor, {
        reverse
      });
      tempLiPath = tempLiPathRef.unref();
      moveListItemSublistItemsToListItemSublist(editor, {
        fromListItem: [tempLi[0], tempLiPath],
        toListItem: previousLi
      });
      editor.tf.removeNodes({ at: tempLiPath });
      success = true;
      return;
    }
    moveListItemsToList(editor, {
      fromListItem: listItem,
      toList: list,
      toListIndex: 1
    });
  });
  return success;
};

// src/lib/transforms/toggleList.ts
var import_platejs21 = require("platejs");
var _toggleList = (editor, { checked = false, type }) => editor.tf.withoutNormalizing(() => {
  if (!editor.selection) {
    return;
  }
  const { validLiChildrenTypes } = editor.getOptions(BaseListPlugin);
  if (editor.api.isCollapsed() || !editor.api.isAt({ blocks: true })) {
    const res = getListItemEntry(editor);
    if (res) {
      const { list } = res;
      if (list[0].type === type) {
        unwrapList(editor);
      } else {
        editor.tf.setNodes(
          { type },
          {
            at: editor.selection,
            mode: "lowest",
            match: (n) => import_platejs21.ElementApi.isElement(n) && getListTypes(editor).includes(n.type)
          }
        );
      }
    } else {
      const list = { children: [], type };
      editor.tf.wrapNodes(list);
      const _nodes = editor.api.nodes({
        match: { type: editor.getType(import_platejs21.KEYS.p) }
      });
      const nodes = Array.from(_nodes);
      const blockAbove = editor.api.block({
        match: { type: validLiChildrenTypes }
      });
      if (!blockAbove) {
        editor.tf.setNodes({
          type: editor.getType(import_platejs21.KEYS.lic)
        });
      }
      const listItem = {
        children: [],
        ...getPropsIfTaskList(editor, type, { checked }),
        type: editor.getType(import_platejs21.KEYS.li)
      };
      for (const [, path] of nodes) {
        editor.tf.wrapNodes(listItem, {
          at: path
        });
      }
    }
  } else {
    const [startPoint, endPoint] = import_platejs21.RangeApi.edges(editor.selection);
    const commonEntry = import_platejs21.NodeApi.common(
      editor,
      startPoint.path,
      endPoint.path
    );
    if (getListTypes(editor).includes(commonEntry[0].type) || commonEntry[0].type === editor.getType(import_platejs21.KEYS.li)) {
      if (commonEntry[0].type === type) {
        unwrapList(editor);
      } else {
        const startList = editor.api.node({
          at: import_platejs21.RangeApi.start(editor.selection),
          match: { type: getListTypes(editor) },
          mode: "lowest"
        });
        const endList = editor.api.node({
          at: import_platejs21.RangeApi.end(editor.selection),
          match: { type: getListTypes(editor) },
          mode: "lowest"
        });
        const rangeLength = Math.min(
          startList[1].length,
          endList[1].length
        );
        editor.tf.setNodes(
          { type },
          {
            at: editor.selection,
            mode: "all",
            match: (n, path) => import_platejs21.ElementApi.isElement(n) && getListTypes(editor).includes(n.type) && path.length >= rangeLength
          }
        );
      }
    } else {
      const rootPathLength = commonEntry[1].length;
      const _nodes = editor.api.nodes({
        mode: "all"
      });
      const nodes = Array.from(_nodes).filter(
        ([, path]) => path.length === rootPathLength + 1
      );
      nodes.forEach((n) => {
        if (getListTypes(editor).includes(n[0].type)) {
          editor.tf.setNodes(
            { type },
            {
              at: n[1],
              mode: "all",
              match: (_n) => import_platejs21.ElementApi.isElement(_n) && getListTypes(editor).includes(_n.type)
            }
          );
        } else {
          if (!validLiChildrenTypes?.includes(n[0].type)) {
            editor.tf.setNodes(
              { type: editor.getType(import_platejs21.KEYS.lic) },
              { at: n[1] }
            );
          }
          const listItem = {
            children: [],
            ...getPropsIfTaskList(editor, type, { checked }),
            type: editor.getType(import_platejs21.KEYS.li)
          };
          editor.tf.wrapNodes(listItem, {
            at: n[1]
          });
          const list = { children: [], type };
          editor.tf.wrapNodes(list, { at: n[1] });
        }
      });
    }
  }
});
var toggleList = (editor, { type }) => _toggleList(editor, { type });
var toggleBulletedList = (editor) => toggleList(editor, { type: editor.getType(import_platejs21.KEYS.ulClassic) });
var toggleTaskList = (editor, defaultChecked = false) => _toggleList(editor, {
  checked: defaultChecked,
  type: editor.getType(import_platejs21.KEYS.taskList)
});
var toggleNumberedList = (editor) => toggleList(editor, { type: editor.getType(import_platejs21.KEYS.olClassic) });

// src/lib/withList.ts
var import_platejs30 = require("platejs");

// src/lib/withDeleteBackwardList.ts
var import_platejs22 = require("platejs");
var withDeleteBackwardList = ({
  editor,
  tf: { deleteBackward }
}) => ({
  transforms: {
    deleteBackward(unit) {
      const deleteBackwardList = () => {
        const res = getListItemEntry(editor, {});
        let moved = false;
        if (res) {
          const { list, listItem } = res;
          if (editor.api.isAt({
            start: true,
            match: (node) => node.type === editor.getType(import_platejs22.KEYS.li)
          })) {
            editor.tf.withoutNormalizing(() => {
              moved = removeFirstListItem(editor, { list, listItem });
              if (moved) return true;
              moved = removeListItem(editor, { list, listItem });
              if (moved) return true;
              if (!import_platejs22.PathApi.hasPrevious(listItem[1]) && !isListNested(editor, list[1])) {
                editor.tf.resetBlock({ at: listItem[1] });
                moved = true;
                return;
              }
              const pointBeforeListItem = editor.api.before(
                editor.selection.focus
              );
              let currentLic;
              let hasMultipleChildren = false;
              if (pointBeforeListItem && isAcrossListItems(editor, {
                anchor: editor.selection.anchor,
                focus: pointBeforeListItem
              })) {
                const licType = editor.getType(import_platejs22.KEYS.lic);
                const _licNodes = editor.api.nodes({
                  at: listItem[1],
                  mode: "lowest",
                  match: (node) => node.type === licType
                });
                currentLic = [..._licNodes][0];
                hasMultipleChildren = currentLic[0].children.length > 1;
              }
              (0, import_platejs22.deleteMerge)(editor, {
                reverse: true,
                unit
              });
              moved = true;
              if (!currentLic || !hasMultipleChildren) return;
              const leftoverListItem = editor.api.node(
                import_platejs22.PathApi.parent(currentLic[1])
              );
              if (leftoverListItem && leftoverListItem[0].children.length === 0) {
                editor.tf.removeNodes({ at: leftoverListItem[1] });
              }
            });
          }
        }
        return moved;
      };
      if (deleteBackwardList()) return;
      deleteBackward(unit);
    }
  }
});

// src/lib/withDeleteForwardList.ts
var import_platejs23 = require("platejs");
var selectionIsNotInAListHandler = (editor) => {
  const pointAfterSelection = editor.api.after(editor.selection.focus);
  if (pointAfterSelection) {
    const nextSiblingListRes = getListItemEntry(editor, {
      at: pointAfterSelection
    });
    if (nextSiblingListRes) {
      const { listItem } = nextSiblingListRes;
      const parentBlockEntity = editor.api.block({
        at: editor.selection.anchor
      });
      if (!editor.api.string(parentBlockEntity[1])) {
        editor.tf.removeNodes();
        return true;
      }
      if (hasListChild(editor, listItem[0])) {
        const sublistRes = getListItemEntry(editor, {
          at: [...listItem[1], 1, 0, 0]
        });
        moveListItemUp(editor, sublistRes);
      }
    }
  }
  return false;
};
var selectionIsInAListHandler = (editor, res, defaultDelete, unit = "character") => {
  const { listItem } = res;
  if (!hasListChild(editor, listItem[0])) {
    const liType = editor.getType(import_platejs23.KEYS.li);
    const _nodes = editor.api.nodes({
      at: listItem[1],
      mode: "lowest",
      match: (node, path) => {
        if (path.length === 0) {
          return false;
        }
        const isNodeLi = node.type === liType;
        const isSiblingOfNodeLi = import_platejs23.NodeApi.get(editor, import_platejs23.PathApi.next(path))?.type === liType;
        return isNodeLi && isSiblingOfNodeLi;
      }
    });
    const liWithSiblings = Array.from(_nodes, (entry) => entry[1])[0];
    if (!liWithSiblings) {
      const pointAfterListItem2 = editor.api.after(listItem[1]);
      if (pointAfterListItem2) {
        const nextSiblingListRes = getListItemEntry(editor, {
          at: pointAfterListItem2
        });
        if (nextSiblingListRes) {
          const listRoot = getListRoot(editor, listItem[1]);
          moveListItemsToList(editor, {
            deleteFromList: true,
            fromList: nextSiblingListRes.list,
            toList: listRoot
          });
          return true;
        }
      }
      return false;
    }
    const siblingListItem = editor.api.node(
      import_platejs23.PathApi.next(liWithSiblings)
    );
    if (!siblingListItem) return false;
    const siblingList = editor.api.parent(siblingListItem[1]);
    if (siblingList && removeListItem(editor, {
      list: siblingList,
      listItem: siblingListItem,
      reverse: false
    })) {
      return true;
    }
    const pointAfterListItem = editor.api.after(editor.selection.focus);
    if (!pointAfterListItem || !isAcrossListItems(editor, {
      anchor: editor.selection.anchor,
      focus: pointAfterListItem
    })) {
      return false;
    }
    const licType = editor.getType(import_platejs23.KEYS.lic);
    const _licNodes = editor.api.nodes({
      at: pointAfterListItem.path,
      mode: "lowest",
      match: (node) => node.type === licType
    });
    const nextSelectableLic = [..._licNodes][0];
    if (nextSelectableLic[0].children.length < 2) return false;
    defaultDelete(unit);
    const leftoverListItem = editor.api.node(
      import_platejs23.PathApi.parent(nextSelectableLic[1])
    );
    if (leftoverListItem && leftoverListItem[0].children.length === 0) {
      editor.tf.removeNodes({ at: leftoverListItem[1] });
    }
    return true;
  }
  const nestedList = editor.api.node(
    import_platejs23.PathApi.next([...listItem[1], 0])
  );
  if (!nestedList) return false;
  const nestedListItem = Array.from(
    import_platejs23.NodeApi.children(editor, nestedList[1])
  )[0];
  if (removeFirstListItem(editor, {
    list: nestedList,
    listItem: nestedListItem
  })) {
    return true;
  }
  if (removeListItem(editor, {
    list: nestedList,
    listItem: nestedListItem
  })) {
    return true;
  }
  return false;
};
var withDeleteForwardList = ({
  editor,
  tf: { deleteForward }
}) => ({
  transforms: {
    deleteForward(unit) {
      const deleteForwardList = () => {
        let skipDefaultDelete = false;
        if (!editor?.selection) {
          return skipDefaultDelete;
        }
        if (!editor.api.isAt({ end: true })) {
          return skipDefaultDelete;
        }
        editor.tf.withoutNormalizing(() => {
          const res = getListItemEntry(editor, {});
          if (!res) {
            skipDefaultDelete = selectionIsNotInAListHandler(editor);
            return;
          }
          skipDefaultDelete = selectionIsInAListHandler(
            editor,
            res,
            deleteForward,
            unit
          );
        });
        return skipDefaultDelete;
      };
      if (deleteForwardList()) return;
      deleteForward(unit);
    }
  }
});

// src/lib/withDeleteFragmentList.ts
var import_platejs24 = require("platejs");
var getLiStart = (editor) => {
  const start = editor.api.start(editor.selection);
  return editor.api.above({
    at: start,
    match: { type: editor.getType(import_platejs24.KEYS.li) }
  });
};
var withDeleteFragmentList = ({
  editor,
  tf: { deleteFragment }
}) => ({
  transforms: {
    deleteFragment(direction) {
      const deleteFragmentList = () => {
        let deleted = false;
        editor.tf.withoutNormalizing(() => {
          if (!isAcrossListItems(editor)) return;
          const end = editor.api.end(editor.selection);
          const liEnd = editor.api.above({
            at: end,
            match: { type: editor.getType(import_platejs24.KEYS.li) }
          });
          const liEndCanBeDeleted = liEnd && !hasListChild(editor, liEnd[0]);
          const liEndPathRef = liEndCanBeDeleted ? editor.api.pathRef(liEnd[1]) : void 0;
          if (!getLiStart(editor) || !liEnd) {
            deleted = false;
            return;
          }
          (0, import_platejs24.deleteMerge)(editor);
          const liStart = getLiStart(editor);
          if (liEndPathRef) {
            const liEndPath = liEndPathRef.unref();
            const listStart = liStart && editor.api.parent(liStart[1]);
            const deletePath = getHighestEmptyList(editor, {
              diffListPath: listStart?.[1],
              liPath: liEndPath
            });
            if (deletePath) {
              editor.tf.removeNodes({ at: deletePath });
            }
            deleted = true;
          }
        });
        return deleted;
      };
      if (deleteFragmentList()) return;
      deleteFragment(direction);
    }
  }
});

// src/lib/withInsertBreakList.ts
var import_platejs25 = require("platejs");
var withInsertBreakList = ({
  editor,
  getOptions,
  tf: { insertBreak }
}) => ({
  transforms: {
    insertBreak() {
      const insertBreakList = () => {
        if (!editor.selection) return;
        const res = getListItemEntry(editor, {});
        let moved;
        if (res) {
          const { list, listItem } = res;
          if (editor.api.isEmpty(editor.selection, { block: true })) {
            moved = moveListItemUp(editor, {
              list,
              listItem
            });
            if (moved) return true;
          }
        }
        const block = editor.api.block({
          match: { type: editor.getType(import_platejs25.KEYS.li) }
        });
        if (block && editor.api.isEmpty(editor.selection, { block: true })) {
          const didReset = editor.tf.resetBlock({ at: block[1] });
          if (didReset) return true;
        }
        if (!moved) {
          const inserted = insertListItem(editor, getOptions());
          if (inserted) return true;
        }
      };
      if (insertBreakList()) return;
      insertBreak();
    }
  }
});

// src/lib/withInsertFragmentList.ts
var import_platejs26 = require("platejs");
var withInsertFragmentList = ({
  editor,
  tf: { insertFragment }
}) => {
  const listItemType = editor.getType(import_platejs26.KEYS.li);
  const listItemContentType = editor.getType(import_platejs26.KEYS.lic);
  const getFirstAncestorOfType = (root, entry, type) => {
    let ancestor = import_platejs26.PathApi.parent(entry[1]);
    while (import_platejs26.NodeApi.get(root, ancestor).type !== type) {
      ancestor = import_platejs26.PathApi.parent(ancestor);
    }
    return [import_platejs26.NodeApi.get(root, ancestor), ancestor];
  };
  const findListItemsWithContent = (first) => {
    let prev = null;
    let node = first;
    while (isListRoot(editor, node) || node.type === listItemType && node.children[0].type !== listItemContentType) {
      prev = node;
      [node] = node.children;
    }
    return prev ? prev.children : [node];
  };
  const trimList = (listRoot) => {
    if (!isListRoot(editor, listRoot)) {
      return [listRoot];
    }
    const _texts = import_platejs26.NodeApi.texts(listRoot);
    const textEntries = Array.from(_texts);
    const commonAncestorEntry = textEntries.reduce(
      (commonAncestor, textEntry) => import_platejs26.PathApi.isAncestor(commonAncestor[1], textEntry[1]) ? commonAncestor : import_platejs26.NodeApi.common(listRoot, textEntry[1], commonAncestor[1]),
      // any list item would do, we grab the first one
      getFirstAncestorOfType(listRoot, textEntries[0], listItemType)
    );
    const [first, ...rest] = isListRoot(
      editor,
      commonAncestorEntry[0]
    ) ? commonAncestorEntry[0].children : [commonAncestorEntry[0]];
    return [...findListItemsWithContent(first), ...rest];
  };
  const wrapNodeIntoListItem = (node, props) => {
    return node.type === listItemType ? node : {
      children: [node],
      ...props,
      type: listItemType
    };
  };
  const isSingleLic = (fragment) => {
    const isFragmentOnlyListRoot = fragment.length === 1 && isListRoot(editor, fragment[0]);
    return isFragmentOnlyListRoot && [...import_platejs26.NodeApi.nodes({ children: fragment })].filter(
      (entry) => import_platejs26.ElementApi.isElement(entry[0])
    ).filter(([node]) => node.type === listItemContentType).length === 1;
  };
  const getTextAndListItemNodes = (fragment, liEntry, licEntry) => {
    const [, liPath] = liEntry;
    const [licNode, licPath] = licEntry;
    const isEmptyNode = !import_platejs26.NodeApi.string(licNode);
    const [first, ...rest] = fragment.flatMap(trimList).map(
      (v) => wrapNodeIntoListItem(
        v,
        getPropsIfTaskListLiNode(editor, {
          inherit: true,
          liNode: liEntry[0]
        })
      )
    );
    let textNode;
    let listItemNodes;
    if (isListRoot(editor, fragment[0])) {
      if (isSingleLic(fragment)) {
        textNode = first;
        listItemNodes = rest;
      } else if (isEmptyNode) {
        const li = import_platejs26.NodeApi.get(editor, liPath);
        const [, ...currentSublists] = li.children;
        const [newLic, ...newSublists] = first.children;
        editor.tf.insertNodes(newLic, {
          at: import_platejs26.PathApi.next(licPath),
          select: true
        });
        editor.tf.removeNodes({
          at: licPath
        });
        if (newSublists?.length) {
          if (currentSublists?.length) {
            const path = [...liPath, 1, 0];
            editor.tf.insertNodes(newSublists[0].children, {
              at: path,
              select: true
            });
          } else {
            editor.tf.insertNodes(newSublists, {
              at: import_platejs26.PathApi.next(licPath),
              select: true
            });
          }
        }
        textNode = { text: "" };
        listItemNodes = rest;
      } else {
        textNode = { text: "" };
        listItemNodes = [first, ...rest];
      }
    } else {
      textNode = first;
      listItemNodes = rest;
    }
    return { listItemNodes, textNode };
  };
  return {
    transforms: {
      insertFragment(fragment) {
        let liEntry = editor.api.node({
          match: { type: listItemType },
          mode: "lowest"
        });
        if (!liEntry) {
          return insertFragment(
            isListRoot(editor, fragment[0]) ? [{ text: "" }, ...fragment] : fragment
          );
        }
        insertFragment([{ text: "" }]);
        liEntry = editor.api.node({
          match: { type: listItemType },
          mode: "lowest"
        });
        if (!liEntry) {
          return insertFragment(
            isListRoot(editor, fragment[0]) ? [{ text: "" }, ...fragment] : fragment
          );
        }
        const licEntry = editor.api.node({
          match: { type: listItemContentType },
          mode: "lowest"
        });
        if (!licEntry) {
          return insertFragment(
            isListRoot(editor, fragment[0]) ? [{ text: "" }, ...fragment] : fragment
          );
        }
        const { listItemNodes, textNode } = getTextAndListItemNodes(
          fragment,
          liEntry,
          licEntry
        );
        insertFragment([textNode]);
        const [, liPath] = liEntry;
        return editor.tf.insertNodes(listItemNodes, {
          at: import_platejs26.PathApi.next(liPath),
          select: true
        });
      }
    }
  };
};

// src/lib/withNormalizeList.ts
var import_platejs29 = require("platejs");

// src/lib/normalizers/normalizeListItem.ts
var import_platejs27 = require("platejs");
var getDeepInlineChildren = (editor, {
  children
}) => {
  const inlineChildren = [];
  for (const child of children) {
    if (editor.api.isBlock(child[0])) {
      inlineChildren.push(
        ...getDeepInlineChildren(editor, {
          children: Array.from(import_platejs27.NodeApi.children(editor, child[1]))
        })
      );
    } else {
      inlineChildren.push(child);
    }
  }
  return inlineChildren;
};
var normalizeListItem = (editor, {
  listItem,
  validLiChildrenTypes = []
}) => {
  let changed = false;
  const allValidLiChildrenTypes = /* @__PURE__ */ new Set([
    editor.getType(import_platejs27.KEYS.lic),
    editor.getType(import_platejs27.KEYS.olClassic),
    editor.getType(import_platejs27.KEYS.taskList),
    editor.getType(import_platejs27.KEYS.ulClassic),
    ...validLiChildrenTypes
  ]);
  const [, liPath] = listItem;
  const liChildren = Array.from(
    import_platejs27.NodeApi.children(editor, listItem[1])
  );
  const invalidLiChildrenPathRefs = liChildren.filter(([child]) => !allValidLiChildrenTypes.has(child.type)).map(([, childPath]) => editor.api.pathRef(childPath));
  const firstLiChild = liChildren[0];
  const [firstLiChildNode, firstLiChildPath] = firstLiChild ?? [];
  if (!firstLiChild || !editor.api.isBlock(firstLiChildNode)) {
    editor.tf.insertNodes(
      editor.api.create.block({
        type: editor.getType(import_platejs27.KEYS.lic)
      }),
      {
        at: liPath.concat([0])
      }
    );
    return true;
  }
  if (editor.api.isBlock(firstLiChildNode) && !(0, import_platejs27.match)(firstLiChildNode, [], {
    type: editor.getType(import_platejs27.KEYS.lic)
  })) {
    if ((0, import_platejs27.match)(firstLiChildNode, [], {
      type: getListTypes(editor)
    })) {
      const parent = editor.api.parent(listItem[1]);
      const sublist = firstLiChild;
      const children = Array.from(
        import_platejs27.NodeApi.children(editor, firstLiChild[1])
      ).reverse();
      children.forEach((c) => {
        moveListItemUp(editor, {
          list: sublist,
          listItem: c
        });
      });
      editor.tf.removeNodes({ at: [...parent[1], 0] });
      return true;
    }
    if (validLiChildrenTypes.includes(firstLiChildNode.type)) {
      return true;
    }
    editor.tf.setNodes(
      {
        type: editor.getType(import_platejs27.KEYS.lic)
      },
      {
        at: firstLiChildPath
      }
    );
    changed = true;
  }
  const licChildren = Array.from(import_platejs27.NodeApi.children(editor, firstLiChild[1]));
  if (licChildren.length > 0) {
    const blockPathRefs = [];
    const inlineChildren = [];
    for (const licChild of licChildren) {
      if (!editor.api.isBlock(licChild[0])) {
        break;
      }
      blockPathRefs.push(editor.api.pathRef(licChild[1]));
      inlineChildren.push(
        ...getDeepInlineChildren(editor, {
          children: Array.from(import_platejs27.NodeApi.children(editor, licChild[1]))
        })
      );
    }
    const to = import_platejs27.PathApi.next(licChildren.at(-1)[1]);
    inlineChildren.reverse().forEach(([, path]) => {
      editor.tf.moveNodes({
        at: path,
        to
      });
    });
    blockPathRefs.forEach((pathRef) => {
      const path = pathRef.unref();
      path && editor.tf.removeNodes({
        at: path
      });
    });
    if (blockPathRefs.length > 0) {
      changed = true;
    }
  }
  if (changed) return true;
  invalidLiChildrenPathRefs.reverse().forEach((ref) => {
    const path = ref.unref();
    path && editor.tf.moveNodes({
      at: path,
      to: firstLiChildPath.concat([0])
    });
  });
  return invalidLiChildrenPathRefs.length > 0;
};

// src/lib/normalizers/normalizeNestedList.ts
var import_platejs28 = require("platejs");
var normalizeNestedList = (editor, { nestedListItem }) => {
  const [, path] = nestedListItem;
  const parentNode = editor.api.parent(path);
  const hasParentList = parentNode && (0, import_platejs28.match)(parentNode[0], [], { type: getListTypes(editor) });
  if (!hasParentList) {
    return false;
  }
  const previousListItemPath = import_platejs28.PathApi.previous(path);
  if (!previousListItemPath) {
    return false;
  }
  const previousSiblingItem = editor.api.node(previousListItemPath);
  if (previousSiblingItem) {
    const [, previousPath] = previousSiblingItem;
    const newPath = previousPath.concat([1]);
    editor.tf.moveNodes({
      at: path,
      to: newPath
    });
    return true;
  }
};

// src/lib/withNormalizeList.ts
var withNormalizeList = ({
  editor,
  getOptions,
  tf: { normalizeNode }
}) => ({
  transforms: {
    normalizeNode([node, path]) {
      const liType = editor.getType(import_platejs29.KEYS.li);
      const licType = editor.getType(import_platejs29.KEYS.lic);
      const defaultType = editor.getType(import_platejs29.KEYS.p);
      if (!import_platejs29.ElementApi.isElement(node)) {
        return normalizeNode([node, path]);
      }
      if (isListRoot(editor, node)) {
        const nonLiChild = Array.from(import_platejs29.NodeApi.children(editor, path)).find(
          ([child]) => child.type !== liType
        );
        if (nonLiChild) {
          return editor.tf.wrapNodes(
            { children: [], type: liType },
            { at: nonLiChild[1] }
          );
        }
        if (node.type === editor.getType(import_platejs29.KEYS.taskList)) {
          const nonTaskListItems = Array.from(
            import_platejs29.NodeApi.children(editor, path)
          ).filter(([child]) => child.type === liType && !("checked" in child));
          if (nonTaskListItems.length > 0) {
            return editor.tf.withoutNormalizing(
              () => nonTaskListItems.forEach(([, itemPath]) => {
                editor.tf.setNodes({ checked: false }, { at: itemPath });
              })
            );
          }
        } else {
          const taskListItems = Array.from(
            import_platejs29.NodeApi.children(editor, path)
          ).filter(([child]) => child.type === liType && "checked" in child);
          if (taskListItems.length > 0) {
            return editor.tf.withoutNormalizing(
              () => taskListItems.forEach(([, itemPath]) => {
                editor.tf.unsetNodes("checked", { at: itemPath });
              })
            );
          }
        }
      }
      if ((0, import_platejs29.match)(node, [], { type: getListTypes(editor) })) {
        if (node.children.length === 0 || !node.children.some((item) => item.type === liType)) {
          return editor.tf.removeNodes({ at: path });
        }
        const nextPath = import_platejs29.PathApi.next(path);
        const nextNode = import_platejs29.NodeApi.get(editor, nextPath);
        if (nextNode?.type === node.type) {
          moveListItemsToList(editor, {
            deleteFromList: true,
            fromList: [nextNode, nextPath],
            toList: [node, path]
          });
        }
        const prevPath = import_platejs29.PathApi.previous(path);
        const prevNode = import_platejs29.NodeApi.get(editor, prevPath);
        if (prevNode?.type === node.type) {
          editor.tf.normalizeNode([prevNode, prevPath]);
          return;
        }
        if (normalizeNestedList(editor, { nestedListItem: [node, path] })) {
          return;
        }
      }
      if (node.type === editor.getType(import_platejs29.KEYS.li) && normalizeListItem(editor, {
        listItem: [node, path],
        validLiChildrenTypes: getOptions().validLiChildrenTypes
      })) {
        return;
      }
      if (node.type === licType && licType !== defaultType && editor.api.parent(path)?.[0].type !== liType) {
        editor.tf.setNodes({ type: defaultType }, { at: path });
        return;
      }
      normalizeNode([node, path]);
    }
  }
});

// src/lib/withList.ts
var withList = (ctx) => {
  const {
    editor,
    getOptions,
    tf: { resetBlock, tab }
  } = ctx;
  return {
    transforms: {
      resetBlock: (options) => {
        if (editor.api.block({
          at: options?.at,
          match: { type: editor.getType(import_platejs30.KEYS.li) }
        })) {
          unwrapList(editor);
          return;
        }
        return resetBlock(options);
      },
      tab: (options) => {
        const apply = () => {
          let workRange = editor.selection;
          if (editor.selection) {
            const { selection } = editor;
            if (!editor.api.isCollapsed()) {
              const { anchor, focus } = import_platejs30.RangeApi.isBackward(selection) ? {
                anchor: { ...selection.focus },
                focus: { ...selection.anchor }
              } : {
                anchor: { ...selection.anchor },
                focus: { ...selection.focus }
              };
              const unhangRange = editor.api.unhangRange({ anchor, focus });
              if (unhangRange) {
                workRange = unhangRange;
                editor.tf.select(unhangRange);
              }
            }
            const listSelected = editor.api.some({
              match: { type: editor.getType(import_platejs30.KEYS.li) }
            });
            if (workRange && listSelected) {
              moveListItems(editor, {
                at: workRange,
                enableResetOnShiftTab: getOptions().enableResetOnShiftTab,
                increase: !options.reverse
              });
              return true;
            }
          }
        };
        if (apply()) return true;
        return tab(options);
      },
      ...withInsertBreakList(ctx).transforms,
      ...withDeleteBackwardList(ctx).transforms,
      ...withDeleteForwardList(ctx).transforms,
      ...withDeleteFragmentList(ctx).transforms,
      ...withInsertFragmentList(ctx).transforms,
      ...withNormalizeList(ctx).transforms
    }
  };
};

// src/lib/BaseListPlugin.ts
var BaseBulletedListPlugin = (0, import_platejs31.createSlatePlugin)({
  key: import_platejs31.KEYS.ulClassic,
  node: { isContainer: true, isElement: true },
  parsers: {
    html: {
      deserializer: {
        rules: [
          {
            validNodeName: "UL"
          }
        ]
      }
    }
  },
  render: { as: "ul" }
}).extendTransforms(({ editor }) => ({
  toggle: () => {
    toggleBulletedList(editor);
  }
}));
var BaseNumberedListPlugin = (0, import_platejs31.createSlatePlugin)({
  key: import_platejs31.KEYS.olClassic,
  node: { isContainer: true, isElement: true },
  parsers: { html: { deserializer: { rules: [{ validNodeName: "OL" }] } } },
  render: { as: "ol" }
}).extendTransforms(({ editor }) => ({
  toggle: () => {
    toggleNumberedList(editor);
  }
}));
var BaseTaskListPlugin = (0, import_platejs31.createSlatePlugin)({
  key: import_platejs31.KEYS.taskList,
  node: { isContainer: true, isElement: true },
  options: {
    inheritCheckStateOnLineEndBreak: false,
    inheritCheckStateOnLineStartBreak: false
  },
  render: { as: "ul" }
}).extendTransforms(({ editor }) => ({
  toggle: () => {
    toggleTaskList(editor);
  }
}));
var BaseListItemPlugin = (0, import_platejs31.createSlatePlugin)({
  key: import_platejs31.KEYS.li,
  inject: {
    plugins: {
      [import_platejs31.KEYS.html]: {
        parser: {
          preInsert: ({ editor, type }) => {
            return editor.api.some({ match: { type } });
          }
        }
      }
    }
  },
  node: { isContainer: true, isElement: true, isStrictSiblings: true },
  parsers: { html: { deserializer: { rules: [{ validNodeName: "LI" }] } } },
  render: { as: "li" }
});
var BaseListItemContentPlugin = (0, import_platejs31.createSlatePlugin)({
  key: import_platejs31.KEYS.lic,
  node: {
    isElement: true
  }
});
var BaseListPlugin = (0, import_platejs31.createTSlatePlugin)({
  key: import_platejs31.KEYS.listClassic,
  plugins: [
    BaseBulletedListPlugin,
    BaseNumberedListPlugin,
    BaseTaskListPlugin,
    BaseListItemPlugin,
    BaseListItemContentPlugin
  ]
}).overrideEditor(withList).extendEditorTransforms(({ editor }) => ({
  toggle: {
    bulletedList: (0, import_platejs31.bindFirst)(toggleBulletedList, editor),
    list: (0, import_platejs31.bindFirst)(toggleList, editor),
    numberedList: (0, import_platejs31.bindFirst)(toggleNumberedList, editor),
    taskList: (0, import_platejs31.bindFirst)(toggleTaskList, editor)
  }
}));

// src/react/ListPlugin.tsx
var BulletedListPlugin = (0, import_react.toPlatePlugin)(BaseBulletedListPlugin);
var TaskListPlugin = (0, import_react.toPlatePlugin)(BaseTaskListPlugin);
var NumberedListPlugin = (0, import_react.toPlatePlugin)(BaseNumberedListPlugin);
var ListItemContentPlugin = (0, import_react.toPlatePlugin)(BaseListItemContentPlugin);
var ListItemPlugin = (0, import_react.toPlatePlugin)(BaseListItemPlugin);
var ListPlugin = (0, import_react.toPlatePlugin)(BaseListPlugin, {
  plugins: [
    BulletedListPlugin,
    TaskListPlugin,
    NumberedListPlugin,
    ListItemPlugin,
    ListItemContentPlugin
  ]
});

// src/react/TodoListPlugin.tsx
var import_react2 = require("platejs/react");
var TodoListPlugin = (0, import_react2.toPlatePlugin)(BaseTodoListPlugin);

// src/react/hooks/useListToolbarButton.ts
var import_platejs32 = require("platejs");
var import_react3 = require("platejs/react");
var useListToolbarButtonState = ({
  nodeType = import_platejs32.KEYS.ulClassic
} = {}) => {
  const pressed = (0, import_react3.useEditorSelector)(
    (editor) => !!editor.selection && editor.api.some({ match: { type: editor.getType(nodeType) } }),
    [nodeType]
  );
  return {
    nodeType,
    pressed
  };
};
var useListToolbarButton = (state) => {
  const editor = (0, import_react3.useEditorRef)();
  const tf = editor.getTransforms(ListPlugin);
  return {
    props: {
      pressed: state.pressed,
      onClick: () => {
        tf.toggle.list({ type: state.nodeType });
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};

// src/react/hooks/useTodoListElement.ts
var import_react4 = require("platejs/react");
var useTodoListElementState = ({
  element
}) => {
  const editor = (0, import_react4.useEditorRef)();
  const { checked } = element;
  const readOnly = (0, import_react4.useReadOnly)();
  return {
    checked,
    editor,
    element,
    readOnly
  };
};
var useTodoListElement = (state) => {
  const { checked, element, readOnly } = state;
  const editor = (0, import_react4.useEditorRef)();
  return {
    checkboxProps: {
      checked: !!checked,
      onCheckedChange: (value) => {
        if (readOnly) return;
        editor.tf.setNodes(
          { checked: value },
          { at: element }
        );
      }
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BulletedListPlugin,
  ListItemContentPlugin,
  ListItemPlugin,
  ListPlugin,
  NumberedListPlugin,
  TaskListPlugin,
  TodoListPlugin,
  useListToolbarButton,
  useListToolbarButtonState,
  useTodoListElement,
  useTodoListElementState
});
//# sourceMappingURL=index.js.map