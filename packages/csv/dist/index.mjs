// src/lib/CsvPlugin.ts
import { bindFirst, createTSlatePlugin, KEYS as KEYS2 } from "platejs";

// src/lib/deserializer/utils/deserializeCsv.ts
import papaparse from "papaparse";
import { KEYS } from "platejs";
var { parse } = papaparse;
var isValidCsv = (data, errors, errorTolerance) => {
  if (errorTolerance < 0) errorTolerance = 0;
  return !(!data || data.length < 2 || data[0].length < 2 || data[1].length < 2 || errors.length > 0 && errors.length > errorTolerance * data.length);
};
var deserializeCsv = (editor, {
  data,
  ...parseOptions
}) => {
  const { errorTolerance, parseOptions: pluginParseOptions } = editor.getOptions(CsvPlugin);
  const testCsv = parse(data, { preview: 2 });
  if (testCsv.errors.length === 0) {
    const csv = parse(data, {
      ...pluginParseOptions,
      ...parseOptions
    });
    if (!isValidCsv(
      csv.data,
      csv.errors,
      errorTolerance
    ))
      return;
    const paragraph = editor.getType(KEYS.p);
    const table = editor.getType(KEYS.table);
    const th = editor.getType(KEYS.th);
    const tr = editor.getType(KEYS.tr);
    const td = editor.getType(KEYS.td);
    const ast = {
      children: [],
      type: table
    };
    if (csv.meta.fields) {
      ast.children.push({
        children: csv.meta.fields.map((field) => ({
          children: [{ children: [{ text: field }], type: paragraph }],
          type: th
        })),
        type: tr
      });
      for (const row of csv.data) {
        ast.children.push({
          children: csv.meta.fields.map((field) => ({
            children: [
              { children: [{ text: row[field] || "" }], type: paragraph }
            ],
            type: td
          })),
          type: tr
        });
      }
    } else {
      for (const row of csv.data) {
        ast.children.push({
          children: [],
          type: tr
        });
        for (const cell of row) {
          ast.children.at(-1).children.push({
            children: [{ children: [{ text: cell }], type: paragraph }],
            type: td
          });
        }
      }
    }
    return [
      {
        children: [{ text: "" }],
        type: paragraph
      },
      ast,
      {
        children: [{ text: "" }],
        type: paragraph
      }
    ];
  }
};

// src/lib/CsvPlugin.ts
var CsvPlugin = createTSlatePlugin({
  key: KEYS2.csv,
  options: {
    errorTolerance: 0.25,
    parseOptions: {
      header: true
    }
  }
}).extendApi(({ editor }) => ({
  deserialize: bindFirst(deserializeCsv, editor)
})).extend(({ api }) => ({
  parser: {
    format: "text/plain",
    deserialize: ({ data }) => api.csv.deserialize({ data })
  }
}));
export {
  CsvPlugin,
  deserializeCsv
};
//# sourceMappingURL=index.mjs.map