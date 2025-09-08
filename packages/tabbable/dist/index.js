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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BaseTabbablePlugin: () => BaseTabbablePlugin,
  findTabDestination: () => findTabDestination
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseTabbablePlugin,
  findTabDestination
});
//# sourceMappingURL=index.js.map