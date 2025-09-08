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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CsvPlugin: () => CsvPlugin,
  deserializeCsv: () => deserializeCsv
});
module.exports = __toCommonJS(index_exports);

// src/lib/CsvPlugin.ts
var import_platejs2 = require("platejs");

// src/lib/deserializer/utils/deserializeCsv.ts
var import_papaparse = __toESM(require("papaparse"));
var import_platejs = require("platejs");
var { parse } = import_papaparse.default;
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
    const paragraph = editor.getType(import_platejs.KEYS.p);
    const table = editor.getType(import_platejs.KEYS.table);
    const th = editor.getType(import_platejs.KEYS.th);
    const tr = editor.getType(import_platejs.KEYS.tr);
    const td = editor.getType(import_platejs.KEYS.td);
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
var CsvPlugin = (0, import_platejs2.createTSlatePlugin)({
  key: import_platejs2.KEYS.csv,
  options: {
    errorTolerance: 0.25,
    parseOptions: {
      header: true
    }
  }
}).extendApi(({ editor }) => ({
  deserialize: (0, import_platejs2.bindFirst)(deserializeCsv, editor)
})).extend(({ api }) => ({
  parser: {
    format: "text/plain",
    deserialize: ({ data }) => api.csv.deserialize({ data })
  }
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CsvPlugin,
  deserializeCsv
});
//# sourceMappingURL=index.js.map