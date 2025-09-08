// src/lib/BaseTabbablePlugin.ts
import { createTSlatePlugin, KEYS } from "platejs";
var BaseTabbablePlugin = createTSlatePlugin({
  key: KEYS.tabbable,
  options: {
    globalEventListener: false,
    insertTabbableEntries: () => [],
    query: () => true
  }
}).extend(({ editor }) => ({
  options: {
    isTabbable: (tabbableEntry) => editor.api.isVoid(tabbableEntry.slateNode)
  }
}));

// src/lib/findTabDestination.ts
import { PathApi } from "platejs";
var findTabDestination = (editor, { activeTabbableEntry, direction, tabbableEntries }) => {
  if (activeTabbableEntry) {
    const activeTabbableEntryIndex = tabbableEntries.indexOf(activeTabbableEntry);
    const nextTabbableEntryIndex = activeTabbableEntryIndex + (direction === "forward" ? 1 : -1);
    const nextTabbableEntry2 = tabbableEntries[nextTabbableEntryIndex];
    if (nextTabbableEntry2 && PathApi.equals(activeTabbableEntry.path, nextTabbableEntry2.path)) {
      return {
        domNode: nextTabbableEntry2.domNode,
        type: "dom-node"
      };
    }
    if (direction === "forward") {
      const pointAfter = editor.api.after(activeTabbableEntry.path);
      if (!pointAfter) return null;
      return {
        path: pointAfter.path,
        type: "path"
      };
    }
    return {
      path: editor.api.point(activeTabbableEntry.path).path,
      type: "path"
    };
  }
  const selectionPath = editor.selection?.anchor?.path || [];
  const nextTabbableEntry = direction === "forward" ? tabbableEntries.find(
    (entry) => !PathApi.isBefore(entry.path, selectionPath)
  ) : [...tabbableEntries].reverse().find((entry) => PathApi.isBefore(entry.path, selectionPath));
  if (nextTabbableEntry) {
    return {
      domNode: nextTabbableEntry.domNode,
      type: "dom-node"
    };
  }
  return null;
};
export {
  BaseTabbablePlugin,
  findTabDestination
};
//# sourceMappingURL=index.mjs.map