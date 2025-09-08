// src/react/TabbableEffects.tsx
import React from "react";
import { PathApi as PathApi2 } from "platejs";
import { useEditorReadOnly, useEditorRef } from "platejs/react";
import { tabbable } from "tabbable";

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

// src/react/TabbableEffects.tsx
function TabbableEffects() {
  const editor = useEditorRef();
  const readOnly = useEditorReadOnly();
  React.useEffect(() => {
    if (readOnly) return;
    const { globalEventListener, insertTabbableEntries, isTabbable, query } = editor.getOptions(BaseTabbablePlugin);
    const editorDOMNode = editor.api.toDOMNode(editor);
    if (!editorDOMNode) return;
    const handler = (event) => {
      if (event.key !== "Tab" || event.defaultPrevented || !query?.(event)) {
        return;
      }
      const insertedTabbableEntries = insertTabbableEntries?.(
        event
      );
      if (globalEventListener && event.target && ![
        editorDOMNode,
        ...insertedTabbableEntries.map(({ domNode }) => domNode)
      ].some((container) => container.contains(event.target))) {
        return;
      }
      const tabbableDOMNodes = tabbable(editorDOMNode);
      const defaultTabbableEntries = tabbableDOMNodes.map((domNode) => {
        const slateNode = editor.api.toSlateNode(domNode);
        if (!slateNode) return;
        return {
          domNode,
          path: editor.api.findPath(slateNode),
          slateNode
        };
      }).filter((entry) => entry && isTabbable?.(entry));
      const tabbableEntries = [
        ...insertedTabbableEntries,
        ...defaultTabbableEntries
      ].sort((a, b) => PathApi2.compare(a.path, b.path));
      const { activeElement } = document;
      const activeTabbableEntry = (activeElement && tabbableEntries.find((entry) => entry.domNode === activeElement)) ?? null;
      const tabDestination = findTabDestination(editor, {
        activeTabbableEntry,
        direction: event.shiftKey ? "backward" : "forward",
        tabbableEntries
      });
      if (tabDestination) {
        event.preventDefault();
        switch (tabDestination.type) {
          case "dom-node": {
            tabDestination.domNode.focus();
            break;
          }
          case "path": {
            editor.tf.focus({
              at: {
                anchor: { offset: 0, path: tabDestination.path },
                focus: { offset: 0, path: tabDestination.path }
              }
            });
            break;
          }
        }
        return;
      }
      tabbableDOMNodes.forEach((domNode) => {
        const oldTabIndex = domNode.getAttribute("tabindex");
        domNode.setAttribute("tabindex", "-1");
        setTimeout(() => {
          if (oldTabIndex) {
            domNode.setAttribute("tabindex", oldTabIndex);
          } else {
            domNode.removeAttribute("tabindex");
          }
        }, 0);
      });
    };
    const eventListenerNode = globalEventListener ? document.body : editorDOMNode;
    eventListenerNode.addEventListener("keydown", handler, true);
    return () => eventListenerNode.removeEventListener("keydown", handler, true);
  }, [readOnly, editor]);
  return null;
}

// src/react/TabbablePlugin.tsx
import { toPlatePlugin } from "platejs/react";
var TabbablePlugin = toPlatePlugin(BaseTabbablePlugin, {
  render: { afterEditable: TabbableEffects }
});
export {
  TabbableEffects,
  TabbablePlugin
};
//# sourceMappingURL=index.mjs.map