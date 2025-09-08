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
  TabbableEffects: () => TabbableEffects,
  TabbablePlugin: () => TabbablePlugin
});
module.exports = __toCommonJS(react_exports);

// src/react/TabbableEffects.tsx
var import_react = __toESM(require("react"));
var import_platejs3 = require("platejs");
var import_react2 = require("platejs/react");
var import_tabbable = require("tabbable");

// src/lib/BaseTabbablePlugin.ts
var import_platejs = require("platejs");
var BaseTabbablePlugin = (0, import_platejs.createTSlatePlugin)({
  key: import_platejs.KEYS.tabbable,
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
var import_platejs2 = require("platejs");
var findTabDestination = (editor, { activeTabbableEntry, direction, tabbableEntries }) => {
  if (activeTabbableEntry) {
    const activeTabbableEntryIndex = tabbableEntries.indexOf(activeTabbableEntry);
    const nextTabbableEntryIndex = activeTabbableEntryIndex + (direction === "forward" ? 1 : -1);
    const nextTabbableEntry2 = tabbableEntries[nextTabbableEntryIndex];
    if (nextTabbableEntry2 && import_platejs2.PathApi.equals(activeTabbableEntry.path, nextTabbableEntry2.path)) {
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
    (entry) => !import_platejs2.PathApi.isBefore(entry.path, selectionPath)
  ) : [...tabbableEntries].reverse().find((entry) => import_platejs2.PathApi.isBefore(entry.path, selectionPath));
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
  const editor = (0, import_react2.useEditorRef)();
  const readOnly = (0, import_react2.useEditorReadOnly)();
  import_react.default.useEffect(() => {
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
      const tabbableDOMNodes = (0, import_tabbable.tabbable)(editorDOMNode);
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
      ].sort((a, b) => import_platejs3.PathApi.compare(a.path, b.path));
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
var import_react3 = require("platejs/react");
var TabbablePlugin = (0, import_react3.toPlatePlugin)(BaseTabbablePlugin, {
  render: { afterEditable: TabbableEffects }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TabbableEffects,
  TabbablePlugin
});
//# sourceMappingURL=index.js.map