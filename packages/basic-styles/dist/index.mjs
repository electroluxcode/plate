// src/lib/BaseFontBackgroundColorPlugin.ts
import { createSlatePlugin, KEYS } from "platejs";
var BaseFontBackgroundColorPlugin = createSlatePlugin({
  key: KEYS.backgroundColor,
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
      [KEYS.backgroundColor]: value
    });
  }
}));

// src/lib/BaseFontColorPlugin.ts
import { createSlatePlugin as createSlatePlugin2, KEYS as KEYS2 } from "platejs";
var BaseFontColorPlugin = createSlatePlugin2({
  key: KEYS2.color,
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
      [KEYS2.color]: value
    });
  }
}));

// src/lib/BaseFontFamilyPlugin.ts
import { createSlatePlugin as createSlatePlugin3, KEYS as KEYS3 } from "platejs";
var BaseFontFamilyPlugin = createSlatePlugin3({
  key: KEYS3.fontFamily,
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
      [KEYS3.fontFamily]: value
    });
  }
}));

// src/lib/BaseFontSizePlugin.ts
import { createSlatePlugin as createSlatePlugin4, KEYS as KEYS4 } from "platejs";
var BaseFontSizePlugin = createSlatePlugin4({
  key: KEYS4.fontSize,
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
      [KEYS4.fontSize]: value
    });
  }
}));

// src/lib/BaseFontWeightPlugin.ts
import { createSlatePlugin as createSlatePlugin5, KEYS as KEYS5 } from "platejs";
var BaseFontWeightPlugin = createSlatePlugin5({
  key: KEYS5.fontWeight,
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
      [KEYS5.fontWeight]: value
    });
  }
}));

// src/lib/BaseLineHeightPlugin.ts
import { bindFirst as bindFirst2, createSlatePlugin as createSlatePlugin7, KEYS as KEYS9 } from "platejs";

// src/lib/transforms/setAlign.ts
import {
  getInjectMatch,
  KEYS as KEYS7
} from "platejs";

// src/lib/BaseTextAlignPlugin.ts
import { bindFirst, createSlatePlugin as createSlatePlugin6, KEYS as KEYS6 } from "platejs";
var BaseTextAlignPlugin = createSlatePlugin6({
  key: KEYS6.textAlign,
  inject: {
    isBlock: true,
    nodeProps: {
      defaultNodeValue: "start",
      styleKey: "textAlign",
      validNodeValues: ["start", "left", "center", "right", "end", "justify"]
    },
    targetPlugins: [KEYS6.p],
    targetPluginToInject: ({ editor }) => ({
      parsers: {
        html: {
          deserializer: {
            parse: ({ element, node }) => {
              if (element.style.textAlign) {
                node[editor.getType(KEYS6.textAlign)] = element.style.textAlign;
              }
            }
          }
        }
      }
    })
  },
  node: { type: "align" }
}).extendTransforms(({ editor }) => ({
  setNodes: bindFirst(setAlign, editor)
}));

// src/lib/transforms/setAlign.ts
var setAlign = (editor, value, setNodesOptions) => {
  const { defaultNodeValue, nodeKey } = editor.getInjectProps(BaseTextAlignPlugin);
  const match = getInjectMatch(
    editor,
    editor.getPlugin({ key: KEYS7.textAlign })
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
import {
  getInjectMatch as getInjectMatch2,
  KEYS as KEYS8
} from "platejs";
var setLineHeight = (editor, value, setNodesOptions) => {
  const { defaultNodeValue, nodeKey } = editor.getInjectProps(BaseLineHeightPlugin);
  const match = getInjectMatch2(
    editor,
    editor.getPlugin({ key: KEYS8.lineHeight })
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
var BaseLineHeightPlugin = createSlatePlugin7({
  key: KEYS9.lineHeight,
  inject: {
    isBlock: true,
    nodeProps: {
      defaultNodeValue: 1.5,
      nodeKey: "lineHeight"
    },
    targetPlugins: [KEYS9.p],
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
  setNodes: bindFirst2(setLineHeight, editor)
}));

// src/lib/BaseTextIndentPlugin.ts
import { createTSlatePlugin, KEYS as KEYS10 } from "platejs";
var BaseTextIndentPlugin = createTSlatePlugin({
  key: KEYS10.textIndent,
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
    targetPlugins: [KEYS10.p]
  },
  options: {
    offset: 24,
    unit: "px"
  }
});

// src/lib/utils/toUnitLess.ts
var toUnitLess = (value) => {
  const match = /\d+/.exec(value);
  if (!match) return "0";
  const num = Number(match[0]);
  if (value.endsWith("rem")) {
    return (num * 16).toString();
  }
  return num.toString();
};
export {
  BaseFontBackgroundColorPlugin,
  BaseFontColorPlugin,
  BaseFontFamilyPlugin,
  BaseFontSizePlugin,
  BaseFontWeightPlugin,
  BaseLineHeightPlugin,
  BaseTextAlignPlugin,
  BaseTextIndentPlugin,
  setAlign,
  setLineHeight,
  toUnitLess
};
//# sourceMappingURL=index.mjs.map