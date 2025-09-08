// src/lib/BaseCaptionPlugin.ts
import {
  createTSlatePlugin,
  KEYS
} from "platejs";

// src/lib/withCaption.ts
import {
  getPluginTypes,
  isHotkey,
  NodeApi,
  RangeApi
} from "platejs";
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
          if (editor.dom.currentKeyboardEvent && isHotkey("up", editor.dom.currentKeyboardEvent) && newSelection && RangeApi.isCollapsed(newSelection)) {
            const types = getPluginTypes(editor, query.allow);
            const entry = editor.api.above({
              at: newSelection,
              match: { type: types }
            });
            if (entry) {
              const [node] = entry;
              if (node.caption && NodeApi.string({ children: node.caption }).length > 0) {
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
            const types = getPluginTypes(editor, getOptions().query.allow);
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
var BaseCaptionPlugin = createTSlatePlugin({
  key: KEYS.caption,
  options: {
    focusEndPath: null,
    focusStartPath: null,
    query: { allow: [] },
    visibleId: null
  }
}).extendSelectors(({ getOptions }) => ({
  isVisible: (elementId) => getOptions().visibleId === elementId
})).overrideEditor(withCaption);
export {
  BaseCaptionPlugin,
  withCaption
};
//# sourceMappingURL=index.mjs.map