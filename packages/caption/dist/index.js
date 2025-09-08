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
  BaseCaptionPlugin: () => BaseCaptionPlugin,
  withCaption: () => withCaption
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseCaptionPlugin.ts
var import_platejs2 = require("platejs");

// src/lib/withCaption.ts
var import_platejs = require("platejs");
var withCaption = ({
  editor,
  getOptions,
  tf: { apply, moveLine }
}) => {
  return {
    transforms: {
      apply(operation) {
        const { query } = getOptions();
        if (operation.type === "set_selection") {
          const newSelection = {
            ...editor.selection,
            ...operation.newProperties
          };
          if (editor.dom.currentKeyboardEvent && (0, import_platejs.isHotkey)("up", editor.dom.currentKeyboardEvent) && newSelection && import_platejs.RangeApi.isCollapsed(newSelection)) {
            const types = (0, import_platejs.getPluginTypes)(editor, query.allow);
            const entry = editor.api.above({
              at: newSelection,
              match: { type: types }
            });
            if (entry) {
              const [node] = entry;
              if (node.caption && import_platejs.NodeApi.string({ children: node.caption }).length > 0) {
                setTimeout(() => {
                  editor.setOption(BaseCaptionPlugin, "focusEndPath", entry[1]);
                }, 0);
              }
            }
          }
        }
        apply(operation);
      },
      moveLine: (options) => {
        const apply2 = () => {
          if (!options.reverse) {
            const types = (0, import_platejs.getPluginTypes)(editor, getOptions().query.allow);
            const entry = editor.api.block({
              match: { type: types }
            });
            if (!entry) return;
            editor.setOption(BaseCaptionPlugin, "focusEndPath", entry[1]);
            return true;
          }
        };
        if (apply2()) return true;
        return moveLine(options);
      }
    }
  };
};

// src/lib/BaseCaptionPlugin.ts
var BaseCaptionPlugin = (0, import_platejs2.createTSlatePlugin)({
  key: import_platejs2.KEYS.caption,
  options: {
    focusEndPath: null,
    focusStartPath: null,
    query: { allow: [] },
    visibleId: null
  }
}).extendSelectors(({ getOptions }) => ({
  isVisible: (elementId) => getOptions().visibleId === elementId
})).overrideEditor(withCaption);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseCaptionPlugin,
  withCaption
});
//# sourceMappingURL=index.js.map