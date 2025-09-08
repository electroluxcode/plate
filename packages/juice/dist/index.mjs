// src/lib/JuicePlugin.ts
import juice from "juice";
import { createSlatePlugin, KEYS } from "platejs";
var JuicePlugin = createSlatePlugin({
  key: KEYS.juice,
  editOnly: true,
  inject: {
    plugins: {
      [KEYS.html]: {
        parser: {
          transformData: ({ data }) => {
            let newData = data.replaceAll(/<style>\s*<!--/g, "<style>");
            newData = juice(newData);
            return newData;
          }
        }
      }
    }
  }
});
export {
  JuicePlugin
};
//# sourceMappingURL=index.mjs.map