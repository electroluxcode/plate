// src/lib/BaseTogglePlugin.ts
import { createTSlatePlugin, KEYS } from "platejs";
var BaseTogglePlugin = createTSlatePlugin({
  key: KEYS.toggle,
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
import { KEYS as KEYS2 } from "platejs";
var someToggle = (editor) => {
  return !!editor.selection && editor.api.some({
    match: (n) => n.type === KEYS2.toggle
  });
};
export {
  BaseTogglePlugin,
  someToggle
};
//# sourceMappingURL=index.mjs.map