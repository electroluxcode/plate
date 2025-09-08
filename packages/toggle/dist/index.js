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
  BaseTogglePlugin: () => BaseTogglePlugin,
  someToggle: () => someToggle
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseTogglePlugin.ts
var import_platejs = require("platejs");
var BaseTogglePlugin = (0, import_platejs.createTSlatePlugin)({
  key: import_platejs.KEYS.toggle,
  node: { isElement: true },
  options: {
    openIds: /* @__PURE__ */ new Set()
  }
}).extendSelectors(({ getOptions }) => ({
  isOpen: (toggleId) => {
    return getOptions().openIds.has(toggleId);
  },
  someClosed: (toggleIds) => {
    const { openIds } = getOptions();
    return toggleIds.some((id) => !openIds.has(id));
  }
})).extendApi(({ setOptions }) => ({
  toggleIds: (ids, force = null) => {
    setOptions((draft) => {
      ids.forEach((id) => {
        const isCurrentlyOpen = draft.openIds.has(id);
        const newIsOpen = force === null ? !isCurrentlyOpen : force;
        if (newIsOpen) {
          draft.openIds.add(id);
        } else {
          draft.openIds.delete(id);
        }
      });
    });
  }
}));

// src/lib/queries/someToggle.ts
var import_platejs2 = require("platejs");
var someToggle = (editor) => {
  return !!editor.selection && editor.api.some({
    match: (n) => n.type === import_platejs2.KEYS.toggle
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseTogglePlugin,
  someToggle
});
//# sourceMappingURL=index.js.map