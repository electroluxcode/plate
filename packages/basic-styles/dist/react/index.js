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
  FontBackgroundColorPlugin: () => FontBackgroundColorPlugin,
  FontColorPlugin: () => FontColorPlugin,
  FontFamilyPlugin: () => FontFamilyPlugin,
  FontSizePlugin: () => FontSizePlugin,
  FontWeightPlugin: () => FontWeightPlugin,
  LineHeightPlugin: () => LineHeightPlugin,
  TextAlignPlugin: () => TextAlignPlugin,
  TextIndentPlugin: () => TextIndentPlugin
});
module.exports = __toCommonJS(react_exports);

// src/react/FontPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseFontBackgroundColorPlugin.ts
var import_platejs = require("platejs");
var BaseFontBackgroundColorPlugin = (0, import_platejs.createSlatePlugin)({
  key: import_platejs.KEYS.backgroundColor,
  inject: {
    nodeProps: {
      nodeKey: "backgroundColor"
    }
  },
  parsers: {
    html: {
      deserializer: {
        isLeaf: true,
        rules: [
          {
            validStyle: {
              backgroundColor: "*"
            }
          }
        ],
        parse: ({ element, type }) => ({
          [type]: element.style.backgroundColor
        })
      }
    }
  }
}).extendTransforms(({ editor }) => ({
  addMark: (value) => {
    editor.tf.addMarks({
      [import_platejs.KEYS.backgroundColor]: value
    });
  }
}));

// src/lib/BaseFontColorPlugin.ts
var import_platejs2 = require("platejs");
var BaseFontColorPlugin = (0, import_platejs2.createSlatePlugin)({
  key: import_platejs2.KEYS.color,
  inject: {
    nodeProps: {
      defaultNodeValue: "black",
      nodeKey: "color"
    }
  },
  parsers: {
    html: {
      deserializer: {
        isLeaf: true,
        rules: [
          {
            validStyle: {
              color: "*"
            }
          }
        ],
        parse({ element, type }) {
          if (element.style.color) {
            return { [type]: element.style.color };
          }
        }
      }
    }
  }
}).extendTransforms(({ editor }) => ({
  addMark: (value) => {
    editor.tf.addMarks({
      [import_platejs2.KEYS.color]: value
    });
  }
}));

// src/lib/BaseFontFamilyPlugin.ts
var import_platejs3 = require("platejs");
var BaseFontFamilyPlugin = (0, import_platejs3.createSlatePlugin)({
  key: import_platejs3.KEYS.fontFamily,
  inject: {
    nodeProps: {
      nodeKey: "fontFamily"
    }
  },
  parsers: {
    html: {
      deserializer: {
        isLeaf: true,
        rules: [
          {
            validStyle: {
              fontFamily: "*"
            }
          }
        ],
        parse: ({ element, type }) => ({ [type]: element.style.fontFamily })
      }
    }
  }
}).extendTransforms(({ editor }) => ({
  addMark: (value) => {
    editor.tf.addMarks({
      [import_platejs3.KEYS.fontFamily]: value
    });
  }
}));

// src/lib/BaseFontSizePlugin.ts
var import_platejs4 = require("platejs");
var BaseFontSizePlugin = (0, import_platejs4.createSlatePlugin)({
  key: import_platejs4.KEYS.fontSize,
  inject: {
    nodeProps: {
      nodeKey: "fontSize"
    }
  },
  parsers: {
    html: {
      deserializer: {
        isLeaf: true,
        rules: [
          {
            validStyle: {
              fontSize: "*"
            }
          }
        ],
        parse: ({ element, type }) => ({ [type]: element.style.fontSize })
      }
    }
  }
}).extendTransforms(({ editor }) => ({
  addMark: (value) => {
    editor.tf.addMarks({
      [import_platejs4.KEYS.fontSize]: value
    });
  }
}));

// src/lib/BaseFontWeightPlugin.ts
var import_platejs5 = require("platejs");
var BaseFontWeightPlugin = (0, import_platejs5.createSlatePlugin)({
  key: import_platejs5.KEYS.fontWeight,
  inject: {
    nodeProps: {
      nodeKey: "fontWeight"
    }
  },
  parsers: {
    html: {
      deserializer: {
        isLeaf: true,
        rules: [
          {
            validStyle: {
              fontWeight: "*"
            }
          }
        ],
        parse: ({ element, type }) => ({ [type]: element.style.fontWeight })
      }
    }
  }
}).extendTransforms(({ editor }) => ({
  addMark: (value) => {
    editor.tf.addMarks({
      [import_platejs5.KEYS.fontWeight]: value
    });
  }
}));

// src/lib/BaseLineHeightPlugin.ts
var import_platejs9 = require("platejs");

// src/lib/transforms/setAlign.ts
var import_platejs7 = require("platejs");

// src/lib/BaseTextAlignPlugin.ts
var import_platejs6 = require("platejs");
var BaseTextAlignPlugin = (0, import_platejs6.createSlatePlugin)({
  key: import_platejs6.KEYS.textAlign,
  inject: {
    isBlock: true,
    nodeProps: {
      defaultNodeValue: "start",
      styleKey: "textAlign",
      validNodeValues: ["start", "left", "center", "right", "end", "justify"]
    },
    targetPlugins: [import_platejs6.KEYS.p],
    targetPluginToInject: ({ editor }) => ({
      parsers: {
        html: {
          deserializer: {
            parse: ({ element, node }) => {
              if (element.style.textAlign) {
                node[editor.getType(import_platejs6.KEYS.textAlign)] = element.style.textAlign;
              }
            }
          }
        }
      }
    })
  },
  node: { type: "align" }
}).extendTransforms(({ editor }) => ({
  setNodes: (0, import_platejs6.bindFirst)(setAlign, editor)
}));

// src/lib/transforms/setAlign.ts
var setAlign = (editor, value, setNodesOptions) => {
  const { defaultNodeValue, nodeKey } = editor.getInjectProps(BaseTextAlignPlugin);
  const match = (0, import_platejs7.getInjectMatch)(
    editor,
    editor.getPlugin({ key: import_platejs7.KEYS.textAlign })
  );
  if (value === defaultNodeValue) {
    editor.tf.unsetNodes(nodeKey, {
      match,
      ...setNodesOptions
    });
  } else {
    editor.tf.setNodes(
      { [nodeKey]: value },
      {
        match,
        ...setNodesOptions
      }
    );
  }
};

// src/lib/transforms/setLineHeight.ts
var import_platejs8 = require("platejs");
var setLineHeight = (editor, value, setNodesOptions) => {
  const { defaultNodeValue, nodeKey } = editor.getInjectProps(BaseLineHeightPlugin);
  const match = (0, import_platejs8.getInjectMatch)(
    editor,
    editor.getPlugin({ key: import_platejs8.KEYS.lineHeight })
  );
  if (value === defaultNodeValue) {
    editor.tf.unsetNodes(nodeKey, {
      match,
      ...setNodesOptions
    });
  } else {
    editor.tf.setNodes(
      { [nodeKey]: value },
      {
        match,
        ...setNodesOptions
      }
    );
  }
};

// src/lib/BaseLineHeightPlugin.ts
var BaseLineHeightPlugin = (0, import_platejs9.createSlatePlugin)({
  key: import_platejs9.KEYS.lineHeight,
  inject: {
    isBlock: true,
    nodeProps: {
      defaultNodeValue: 1.5,
      nodeKey: "lineHeight"
    },
    targetPlugins: [import_platejs9.KEYS.p],
    targetPluginToInject: ({ editor, plugin }) => ({
      parsers: {
        html: {
          deserializer: {
            parse: ({ element }) => {
              if (element.style.lineHeight) {
                return {
                  [editor.getType(plugin.key)]: element.style.lineHeight
                };
              }
            }
          }
        }
      }
    })
  }
}).extendTransforms(({ editor }) => ({
  setNodes: (0, import_platejs9.bindFirst)(setLineHeight, editor)
}));

// src/lib/BaseTextIndentPlugin.ts
var import_platejs10 = require("platejs");
var BaseTextIndentPlugin = (0, import_platejs10.createTSlatePlugin)({
  key: import_platejs10.KEYS.textIndent,
  inject: {
    isBlock: true,
    nodeProps: {
      nodeKey: "textIndent",
      styleKey: "textIndent",
      transformNodeValue({ getOptions, nodeValue }) {
        const { offset, unit } = getOptions();
        return nodeValue * offset + unit;
      }
    },
    targetPlugins: [import_platejs10.KEYS.p]
  },
  options: {
    offset: 24,
    unit: "px"
  }
});

// src/react/FontPlugin.tsx
var FontColorPlugin = (0, import_react.toPlatePlugin)(BaseFontColorPlugin);
var FontSizePlugin = (0, import_react.toPlatePlugin)(BaseFontSizePlugin);
var FontFamilyPlugin = (0, import_react.toPlatePlugin)(BaseFontFamilyPlugin);
var FontBackgroundColorPlugin = (0, import_react.toPlatePlugin)(
  BaseFontBackgroundColorPlugin
);
var FontWeightPlugin = (0, import_react.toPlatePlugin)(BaseFontWeightPlugin);

// src/react/LineHeightPlugin.tsx
var import_react2 = require("platejs/react");
var LineHeightPlugin = (0, import_react2.toPlatePlugin)(BaseLineHeightPlugin);

// src/react/TextAlignPlugin.tsx
var import_react3 = require("platejs/react");
var TextAlignPlugin = (0, import_react3.toPlatePlugin)(BaseTextAlignPlugin);

// src/react/TextIndentPlugin.tsx
var import_react4 = require("platejs/react");
var TextIndentPlugin = (0, import_react4.toPlatePlugin)(BaseTextIndentPlugin);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontFamilyPlugin,
  FontSizePlugin,
  FontWeightPlugin,
  LineHeightPlugin,
  TextAlignPlugin,
  TextIndentPlugin
});
//# sourceMappingURL=index.js.map