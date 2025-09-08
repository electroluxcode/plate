// src/lib/BaseListPlugin.ts
import {
  bindFirst,
  createSlatePlugin as createSlatePlugin2,
  createTSlatePlugin,
  KEYS as KEYS24
} from "platejs";

// src/lib/transforms/moveListItems.ts
import {
  KEYS as KEYS10,
  PathApi as PathApi5
} from "platejs";

// src/lib/queries/isListNested.ts
import { KEYS } from "platejs";
var isListNested = (editor, listPath) => {
  const listParentNode = editor.api.parent(listPath)?.[0];
  return listParentNode?.type === editor.getType(KEYS.li);
};

// src/lib/transforms/moveListItemDown.ts
import {
  match as match2,
  PathApi as PathApi2
} from "platejs";

// src/lib/queries/getHighestEmptyList.ts
import { PathApi } from "platejs";
import { KEYS as KEYS3 } from "platejs";

// src/lib/queries/getListTypes.ts
import { KEYS as KEYS2 } from "platejs";
var getListTypes = (editor) => {
  return [
    editor.getType(KEYS2.olClassic),
    editor.getType(KEYS2.ulClassic),
    editor.getType(KEYS2.taskList)
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
  if (!diffListPath || !PathApi.equals(listPath, diffListPath)) {
    if (listNode.children.length < 2) {
      const liParent = editor.api.above({
        at: listPath,
        match: { type: editor.getType(KEYS3.li) }
      });
      if (liParent) {
        return getHighestEmptyList(editor, { diffListPath, liPath: liParent[1] }) || listPath;
      }
    }
    return liPath;
  }
};

// src/lib/queries/getListItemEntry.ts
import {
  KEYS as KEYS4,
  NodeApi,
  RangeApi
} from "platejs";
var getListItemEntry = (editor, { at = editor.selection } = {}) => {
  const liType = editor.getType(KEYS4.li);
  let _at;
  if (RangeApi.isRange(at) && !RangeApi.isCollapsed(at)) {
    _at = at.focus.path;
  } else if (RangeApi.isRange(at)) {
    _at = at.anchor.path;
  } else {
    _at = at;
  }
  if (_at) {
    const node = NodeApi.get(editor, _at);
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
import { KEYS as KEYS5 } from "platejs";
var getPropsIfTaskListLiNode = (editor, { inherit = false, liNode: node }) => editor.getType(KEYS5.li) === node.type && "checked" in node ? { checked: inherit ? node.checked : false } : void 0;
var getPropsIfTaskList = (editor, type, partial = {}) => editor.getType(KEYS5.taskList) === type ? { checked: false, ...partial } : void 0;

// src/lib/queries/getTodoListItemEntry.ts
import {
  KEYS as KEYS6,
  NodeApi as NodeApi2,
  RangeApi as RangeApi2
} from "platejs";
var getTodoListItemEntry = (editor, { at = editor.selection } = {}) => {
  const todoType = editor.getType(KEYS6.listTodoClassic);
  let _at;
  if (RangeApi2.isRange(at) && !RangeApi2.isCollapsed(at)) {
    _at = at.focus.path;
  } else if (RangeApi2.isRange(at)) {
    _at = at.anchor.path;
  } else {
    _at = at;
  }
  if (_at) {
    const node = NodeApi2.get(editor, _at);
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
import { match } from "platejs";
var hasListChild = (editor, node) => node.children.some((n) => match(n, [], { type: getListTypes(editor) }));

// src/lib/queries/isAcrossListItems.ts
import { KEYS as KEYS7, RangeApi as RangeApi3 } from "platejs";
var isAcrossListItems = (editor, at = editor.selection) => {
  if (!at || RangeApi3.isCollapsed(at)) {
    return false;
  }
  const isAcrossBlocks = editor.api.isAt({ at, blocks: true });
  if (!isAcrossBlocks) return false;
  return editor.api.some({
    at,
    match: { type: editor.getType(KEYS7.li) }
  });
};

// src/lib/queries/isListRoot.ts
import { ElementApi } from "platejs";
var isListRoot = (editor, node) => ElementApi.isElement(node) && getListTypes(editor).includes(node.type);

// src/lib/queries/someList.ts
var someList = (editor, type) => {
  return getListItemEntry(editor)?.list?.[0].type === type;
};

// src/lib/transforms/moveListItemDown.ts
var moveListItemDown = (editor, { list, listItem }) => {
  let moved = false;
  const [listNode] = list;
  const [, listItemPath] = listItem;
  const previousListItemPath = PathApi2.previous(listItemPath);
  if (!previousListItemPath) {
    return;
  }
  const previousSiblingItem = editor.api.node(previousListItemPath);
  if (previousSiblingItem) {
    const [previousNode, previousPath] = previousSiblingItem;
    const sublist = previousNode.children.find(
      (n) => match2(n, [], { type: getListTypes(editor) })
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
import {
  KEYS as KEYS9,
  NodeApi as NodeApi5,
  PathApi as PathApi4
} from "platejs";

// src/lib/transforms/moveListItemsToList.ts
import {
  NodeApi as NodeApi3,
  PathApi as PathApi3
} from "platejs";
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
        const lastChildPath = NodeApi3.lastChild(editor, toList[1])?.[1];
        to = lastChildPath ? PathApi3.next(lastChildPath) : toList[1].concat([0]);
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
import {
  ElementApi as ElementApi2,
  KEYS as KEYS8,
  NodeApi as NodeApi4
} from "platejs";
var unwrapList = (editor, { at } = {}) => {
  const ancestorListTypeCheck = () => {
    if (editor.api.above({ at, match: { type: getListTypes(editor) } })) {
      return true;
    }
    if (!at && editor.selection) {
      const commonNode = NodeApi4.common(
        editor,
        editor.selection.anchor.path,
        editor.selection.focus.path
      );
      if (ElementApi2.isElement(commonNode[0]) && getListTypes(editor).includes(commonNode[0].type)) {
        return true;
      }
    }
    return false;
  };
  editor.tf.withoutNormalizing(() => {
    do {
      editor.tf.unwrapNodes({
        at,
        match: { type: editor.getType(KEYS8.li) },
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
      match: { type: editor.getType(KEYS9.li) }
    });
    if (!liParent) {
      let toListPath2;
      try {
        toListPath2 = PathApi4.next(listPath);
      } catch (error) {
        return;
      }
      const condA = hasListChild(editor, liNode);
      const condB = !NodeApi5.isLastChild(editor, liPath);
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
        const toListNode = NodeApi5.get(editor, toListPath2);
        if (!toListNode) return;
        moveListItemsToList(editor, {
          fromListItem: listItem,
          toList: [toListNode, toListPath2]
        });
      }
      if (condB) {
        const toListNode = NodeApi5.get(editor, toListPath2);
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
    if (!NodeApi5.isLastChild(editor, liPath)) {
      if (!hasListChild(editor, liNode)) {
        editor.tf.insertNodes(
          {
            children: [],
            type: listNode.type
          },
          { at: toListPath }
        );
      }
      const toListNode = NodeApi5.get(editor, toListPath);
      if (!toListNode) return;
      moveListItemsToList(editor, {
        deleteFromList: false,
        fromListItem: liParent,
        fromStartIndex: liPath.at(-1) + 1,
        toList: [toListNode, toListPath]
      });
    }
    const movedUpLiPath = PathApi4.next(liParentPath);
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
      type: editor.getType(KEYS10.lic)
    }
  });
  const lics = Array.from(_nodes);
  if (lics.length === 0) return;
  const highestLicPaths = [];
  const highestLicPathRefs = [];
  lics.forEach((lic) => {
    const licPath = lic[1];
    const liPath = PathApi5.parent(licPath);
    const isAncestor = highestLicPaths.some((path) => {
      const highestLiPath = PathApi5.parent(path);
      return PathApi5.isAncestor(highestLiPath, liPath);
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

// src/lib/transforms/indentListItems.ts
var indentListItems = (editor) => {
  moveListItems(editor, { increase: true });
};

// src/lib/transforms/insertListItem.ts
import { KEYS as KEYS11, PathApi as PathApi6 } from "platejs";
var insertListItem = (editor, options = {}) => {
  const liType = editor.getType(KEYS11.li);
  const licType = editor.getType(KEYS11.lic);
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
    const nextParagraphPath = PathApi6.next(paragraphPath);
    const nextListItemPath = PathApi6.next(listItemPath);
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
import { KEYS as KEYS13, PathApi as PathApi7 } from "platejs";

// src/lib/BaseTodoListPlugin.ts
import { createSlatePlugin, KEYS as KEYS12 } from "platejs";
var BaseTodoListPlugin = createSlatePlugin({
  key: KEYS12.listTodoClassic,
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
  const todoType = editor.getType(KEYS13.listTodoClassic);
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
    const nextParagraphPath = PathApi7.next(paragraphPath);
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
import {
  NodeApi as NodeApi6,
  PathApi as PathApi8
} from "platejs";
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
      to = PathApi8.next(NodeApi6.lastChild(editor, toListItemSublist[1])[1]);
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

// src/lib/transforms/moveListSiblingsAfterCursor.ts
import {
  match as match3,
  NodeApi as NodeApi7,
  PathApi as PathApi9
} from "platejs";
var moveListSiblingsAfterCursor = (editor, {
  at,
  to
}) => {
  const offset = at.at(-1);
  at = PathApi9.parent(at);
  const listNode = NodeApi7.get(editor, at);
  const listEntry = [listNode, at];
  if (!match3(listNode, [], { type: getListTypes(editor) }) || PathApi9.isParent(at, to)) {
    return false;
  }
  return editor.tf.moveNodes({
    at: listEntry[1],
    children: true,
    fromIndex: offset + 1,
    to
  });
};

// src/lib/transforms/removeListItem.ts
import {
  deleteMerge,
  KEYS as KEYS14,
  PathApi as PathApi10
} from "platejs";
var removeListItem = (editor, { list, listItem, reverse = true }) => {
  const [liNode, liPath] = listItem;
  if (editor.api.isExpanded() || !hasListChild(editor, liNode)) {
    return false;
  }
  const previousLiPath = PathApi10.previous(liPath);
  let success = false;
  editor.tf.withoutNormalizing(() => {
    if (previousLiPath) {
      const previousLi = editor.api.node(previousLiPath);
      if (!previousLi) return;
      let tempLiPath = PathApi10.next(liPath);
      editor.tf.insertNodes(
        {
          children: [
            {
              children: [{ text: "" }],
              type: editor.getType(KEYS14.lic)
            }
          ],
          ...getPropsIfTaskListLiNode(editor, {
            inherit: true,
            liNode: previousLi[0]
          }),
          type: editor.getType(KEYS14.li)
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
      deleteMerge(editor, {
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
import {
  ElementApi as ElementApi3,
  KEYS as KEYS15,
  NodeApi as NodeApi8,
  RangeApi as RangeApi4
} from "platejs";
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
            match: (n) => ElementApi3.isElement(n) && getListTypes(editor).includes(n.type)
          }
        );
      }
    } else {
      const list = { children: [], type };
      editor.tf.wrapNodes(list);
      const _nodes = editor.api.nodes({
        match: { type: editor.getType(KEYS15.p) }
      });
      const nodes = Array.from(_nodes);
      const blockAbove = editor.api.block({
        match: { type: validLiChildrenTypes }
      });
      if (!blockAbove) {
        editor.tf.setNodes({
          type: editor.getType(KEYS15.lic)
        });
      }
      const listItem = {
        children: [],
        ...getPropsIfTaskList(editor, type, { checked }),
        type: editor.getType(KEYS15.li)
      };
      for (const [, path] of nodes) {
        editor.tf.wrapNodes(listItem, {
          at: path
        });
      }
    }
  } else {
    const [startPoint, endPoint] = RangeApi4.edges(editor.selection);
    const commonEntry = NodeApi8.common(
      editor,
      startPoint.path,
      endPoint.path
    );
    if (getListTypes(editor).includes(commonEntry[0].type) || commonEntry[0].type === editor.getType(KEYS15.li)) {
      if (commonEntry[0].type === type) {
        unwrapList(editor);
      } else {
        const startList = editor.api.node({
          at: RangeApi4.start(editor.selection),
          match: { type: getListTypes(editor) },
          mode: "lowest"
        });
        const endList = editor.api.node({
          at: RangeApi4.end(editor.selection),
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
            match: (n, path) => ElementApi3.isElement(n) && getListTypes(editor).includes(n.type) && path.length >= rangeLength
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
              match: (_n) => ElementApi3.isElement(_n) && getListTypes(editor).includes(_n.type)
            }
          );
        } else {
          if (!validLiChildrenTypes?.includes(n[0].type)) {
            editor.tf.setNodes(
              { type: editor.getType(KEYS15.lic) },
              { at: n[1] }
            );
          }
          const listItem = {
            children: [],
            ...getPropsIfTaskList(editor, type, { checked }),
            type: editor.getType(KEYS15.li)
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
var toggleBulletedList = (editor) => toggleList(editor, { type: editor.getType(KEYS15.ulClassic) });
var toggleTaskList = (editor, defaultChecked = false) => _toggleList(editor, {
  checked: defaultChecked,
  type: editor.getType(KEYS15.taskList)
});
var toggleNumberedList = (editor) => toggleList(editor, { type: editor.getType(KEYS15.olClassic) });

// src/lib/transforms/unindentListItems.ts
var unindentListItems = (editor, options = {}) => moveListItems(editor, { ...options, increase: false });

// src/lib/withList.ts
import { KEYS as KEYS23, RangeApi as RangeApi5 } from "platejs";

// src/lib/withDeleteBackwardList.ts
import {
  deleteMerge as deleteMerge2,
  KEYS as KEYS16,
  PathApi as PathApi11
} from "platejs";
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
            match: (node) => node.type === editor.getType(KEYS16.li)
          })) {
            editor.tf.withoutNormalizing(() => {
              moved = removeFirstListItem(editor, { list, listItem });
              if (moved) return true;
              moved = removeListItem(editor, { list, listItem });
              if (moved) return true;
              if (!PathApi11.hasPrevious(listItem[1]) && !isListNested(editor, list[1])) {
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
                const licType = editor.getType(KEYS16.lic);
                const _licNodes = editor.api.nodes({
                  at: listItem[1],
                  mode: "lowest",
                  match: (node) => node.type === licType
                });
                currentLic = [..._licNodes][0];
                hasMultipleChildren = currentLic[0].children.length > 1;
              }
              deleteMerge2(editor, {
                reverse: true,
                unit
              });
              moved = true;
              if (!currentLic || !hasMultipleChildren) return;
              const leftoverListItem = editor.api.node(
                PathApi11.parent(currentLic[1])
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
import {
  KEYS as KEYS17,
  NodeApi as NodeApi9,
  PathApi as PathApi12
} from "platejs";
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
    const liType = editor.getType(KEYS17.li);
    const _nodes = editor.api.nodes({
      at: listItem[1],
      mode: "lowest",
      match: (node, path) => {
        if (path.length === 0) {
          return false;
        }
        const isNodeLi = node.type === liType;
        const isSiblingOfNodeLi = NodeApi9.get(editor, PathApi12.next(path))?.type === liType;
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
      PathApi12.next(liWithSiblings)
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
    const licType = editor.getType(KEYS17.lic);
    const _licNodes = editor.api.nodes({
      at: pointAfterListItem.path,
      mode: "lowest",
      match: (node) => node.type === licType
    });
    const nextSelectableLic = [..._licNodes][0];
    if (nextSelectableLic[0].children.length < 2) return false;
    defaultDelete(unit);
    const leftoverListItem = editor.api.node(
      PathApi12.parent(nextSelectableLic[1])
    );
    if (leftoverListItem && leftoverListItem[0].children.length === 0) {
      editor.tf.removeNodes({ at: leftoverListItem[1] });
    }
    return true;
  }
  const nestedList = editor.api.node(
    PathApi12.next([...listItem[1], 0])
  );
  if (!nestedList) return false;
  const nestedListItem = Array.from(
    NodeApi9.children(editor, nestedList[1])
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
import {
  deleteMerge as deleteMerge3,
  KEYS as KEYS18
} from "platejs";
var getLiStart = (editor) => {
  const start = editor.api.start(editor.selection);
  return editor.api.above({
    at: start,
    match: { type: editor.getType(KEYS18.li) }
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
            match: { type: editor.getType(KEYS18.li) }
          });
          const liEndCanBeDeleted = liEnd && !hasListChild(editor, liEnd[0]);
          const liEndPathRef = liEndCanBeDeleted ? editor.api.pathRef(liEnd[1]) : void 0;
          if (!getLiStart(editor) || !liEnd) {
            deleted = false;
            return;
          }
          deleteMerge3(editor);
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
import { KEYS as KEYS19 } from "platejs";
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
          match: { type: editor.getType(KEYS19.li) }
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
import {
  ElementApi as ElementApi4,
  KEYS as KEYS20,
  NodeApi as NodeApi10,
  PathApi as PathApi13
} from "platejs";
var withInsertFragmentList = ({
  editor,
  tf: { insertFragment }
}) => {
  const listItemType = editor.getType(KEYS20.li);
  const listItemContentType = editor.getType(KEYS20.lic);
  const getFirstAncestorOfType = (root, entry, type) => {
    let ancestor = PathApi13.parent(entry[1]);
    while (NodeApi10.get(root, ancestor).type !== type) {
      ancestor = PathApi13.parent(ancestor);
    }
    return [NodeApi10.get(root, ancestor), ancestor];
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
    const _texts = NodeApi10.texts(listRoot);
    const textEntries = Array.from(_texts);
    const commonAncestorEntry = textEntries.reduce(
      (commonAncestor, textEntry) => PathApi13.isAncestor(commonAncestor[1], textEntry[1]) ? commonAncestor : NodeApi10.common(listRoot, textEntry[1], commonAncestor[1]),
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
    return isFragmentOnlyListRoot && [...NodeApi10.nodes({ children: fragment })].filter(
      (entry) => ElementApi4.isElement(entry[0])
    ).filter(([node]) => node.type === listItemContentType).length === 1;
  };
  const getTextAndListItemNodes = (fragment, liEntry, licEntry) => {
    const [, liPath] = liEntry;
    const [licNode, licPath] = licEntry;
    const isEmptyNode = !NodeApi10.string(licNode);
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
        const li = NodeApi10.get(editor, liPath);
        const [, ...currentSublists] = li.children;
        const [newLic, ...newSublists] = first.children;
        editor.tf.insertNodes(newLic, {
          at: PathApi13.next(licPath),
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
              at: PathApi13.next(licPath),
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
          at: PathApi13.next(liPath),
          select: true
        });
      }
    }
  };
};

// src/lib/withNormalizeList.ts
import {
  ElementApi as ElementApi5,
  KEYS as KEYS22,
  match as match6,
  NodeApi as NodeApi12,
  PathApi as PathApi16
} from "platejs";

// src/lib/normalizers/normalizeListItem.ts
import {
  KEYS as KEYS21,
  match as match4,
  NodeApi as NodeApi11,
  PathApi as PathApi14
} from "platejs";
var getDeepInlineChildren = (editor, {
  children
}) => {
  const inlineChildren = [];
  for (const child of children) {
    if (editor.api.isBlock(child[0])) {
      inlineChildren.push(
        ...getDeepInlineChildren(editor, {
          children: Array.from(NodeApi11.children(editor, child[1]))
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
    editor.getType(KEYS21.lic),
    editor.getType(KEYS21.olClassic),
    editor.getType(KEYS21.taskList),
    editor.getType(KEYS21.ulClassic),
    ...validLiChildrenTypes
  ]);
  const [, liPath] = listItem;
  const liChildren = Array.from(
    NodeApi11.children(editor, listItem[1])
  );
  const invalidLiChildrenPathRefs = liChildren.filter(([child]) => !allValidLiChildrenTypes.has(child.type)).map(([, childPath]) => editor.api.pathRef(childPath));
  const firstLiChild = liChildren[0];
  const [firstLiChildNode, firstLiChildPath] = firstLiChild ?? [];
  if (!firstLiChild || !editor.api.isBlock(firstLiChildNode)) {
    editor.tf.insertNodes(
      editor.api.create.block({
        type: editor.getType(KEYS21.lic)
      }),
      {
        at: liPath.concat([0])
      }
    );
    return true;
  }
  if (editor.api.isBlock(firstLiChildNode) && !match4(firstLiChildNode, [], {
    type: editor.getType(KEYS21.lic)
  })) {
    if (match4(firstLiChildNode, [], {
      type: getListTypes(editor)
    })) {
      const parent = editor.api.parent(listItem[1]);
      const sublist = firstLiChild;
      const children = Array.from(
        NodeApi11.children(editor, firstLiChild[1])
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
        type: editor.getType(KEYS21.lic)
      },
      {
        at: firstLiChildPath
      }
    );
    changed = true;
  }
  const licChildren = Array.from(NodeApi11.children(editor, firstLiChild[1]));
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
          children: Array.from(NodeApi11.children(editor, licChild[1]))
        })
      );
    }
    const to = PathApi14.next(licChildren.at(-1)[1]);
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
import { match as match5, PathApi as PathApi15 } from "platejs";
var normalizeNestedList = (editor, { nestedListItem }) => {
  const [, path] = nestedListItem;
  const parentNode = editor.api.parent(path);
  const hasParentList = parentNode && match5(parentNode[0], [], { type: getListTypes(editor) });
  if (!hasParentList) {
    return false;
  }
  const previousListItemPath = PathApi15.previous(path);
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
      const liType = editor.getType(KEYS22.li);
      const licType = editor.getType(KEYS22.lic);
      const defaultType = editor.getType(KEYS22.p);
      if (!ElementApi5.isElement(node)) {
        return normalizeNode([node, path]);
      }
      if (isListRoot(editor, node)) {
        const nonLiChild = Array.from(NodeApi12.children(editor, path)).find(
          ([child]) => child.type !== liType
        );
        if (nonLiChild) {
          return editor.tf.wrapNodes(
            { children: [], type: liType },
            { at: nonLiChild[1] }
          );
        }
        if (node.type === editor.getType(KEYS22.taskList)) {
          const nonTaskListItems = Array.from(
            NodeApi12.children(editor, path)
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
            NodeApi12.children(editor, path)
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
      if (match6(node, [], { type: getListTypes(editor) })) {
        if (node.children.length === 0 || !node.children.some((item) => item.type === liType)) {
          return editor.tf.removeNodes({ at: path });
        }
        const nextPath = PathApi16.next(path);
        const nextNode = NodeApi12.get(editor, nextPath);
        if (nextNode?.type === node.type) {
          moveListItemsToList(editor, {
            deleteFromList: true,
            fromList: [nextNode, nextPath],
            toList: [node, path]
          });
        }
        const prevPath = PathApi16.previous(path);
        const prevNode = NodeApi12.get(editor, prevPath);
        if (prevNode?.type === node.type) {
          editor.tf.normalizeNode([prevNode, prevPath]);
          return;
        }
        if (normalizeNestedList(editor, { nestedListItem: [node, path] })) {
          return;
        }
      }
      if (node.type === editor.getType(KEYS22.li) && normalizeListItem(editor, {
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
          match: { type: editor.getType(KEYS23.li) }
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
              const { anchor, focus } = RangeApi5.isBackward(selection) ? {
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
              match: { type: editor.getType(KEYS23.li) }
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
var BaseBulletedListPlugin = createSlatePlugin2({
  key: KEYS24.ulClassic,
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
var BaseNumberedListPlugin = createSlatePlugin2({
  key: KEYS24.olClassic,
  node: { isContainer: true, isElement: true },
  parsers: { html: { deserializer: { rules: [{ validNodeName: "OL" }] } } },
  render: { as: "ol" }
}).extendTransforms(({ editor }) => ({
  toggle: () => {
    toggleNumberedList(editor);
  }
}));
var BaseTaskListPlugin = createSlatePlugin2({
  key: KEYS24.taskList,
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
var BaseListItemPlugin = createSlatePlugin2({
  key: KEYS24.li,
  inject: {
    plugins: {
      [KEYS24.html]: {
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
var BaseListItemContentPlugin = createSlatePlugin2({
  key: KEYS24.lic,
  node: {
    isElement: true
  }
});
var BaseListPlugin = createTSlatePlugin({
  key: KEYS24.listClassic,
  plugins: [
    BaseBulletedListPlugin,
    BaseNumberedListPlugin,
    BaseTaskListPlugin,
    BaseListItemPlugin,
    BaseListItemContentPlugin
  ]
}).overrideEditor(withList).extendEditorTransforms(({ editor }) => ({
  toggle: {
    bulletedList: bindFirst(toggleBulletedList, editor),
    list: bindFirst(toggleList, editor),
    numberedList: bindFirst(toggleNumberedList, editor),
    taskList: bindFirst(toggleTaskList, editor)
  }
}));
export {
  BaseBulletedListPlugin,
  BaseListItemContentPlugin,
  BaseListItemPlugin,
  BaseListPlugin,
  BaseNumberedListPlugin,
  BaseTaskListPlugin,
  BaseTodoListPlugin,
  getDeepInlineChildren,
  getHighestEmptyList,
  getListItemEntry,
  getListRoot,
  getListTypes,
  getPropsIfTaskList,
  getPropsIfTaskListLiNode,
  getTodoListItemEntry,
  hasListChild,
  indentListItems,
  insertListItem,
  insertTodoListItem,
  isAcrossListItems,
  isListNested,
  isListRoot,
  moveListItemDown,
  moveListItemSublistItemsToListItemSublist,
  moveListItemUp,
  moveListItems,
  moveListItemsToList,
  moveListSiblingsAfterCursor,
  normalizeListItem,
  normalizeNestedList,
  removeFirstListItem,
  removeListItem,
  someList,
  toggleBulletedList,
  toggleList,
  toggleNumberedList,
  toggleTaskList,
  unindentListItems,
  unwrapList,
  withDeleteBackwardList,
  withDeleteForwardList,
  withDeleteFragmentList,
  withInsertBreakList,
  withInsertFragmentList,
  withList,
  withNormalizeList
};
//# sourceMappingURL=index.mjs.map