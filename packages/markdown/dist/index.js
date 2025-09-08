"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// ../../node_modules/lodash/_arrayReduce.js
var require_arrayReduce = __commonJS({
  "../../node_modules/lodash/_arrayReduce.js"(exports2, module2) {
    "use strict";
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    module2.exports = arrayReduce;
  }
});

// ../../node_modules/lodash/_basePropertyOf.js
var require_basePropertyOf = __commonJS({
  "../../node_modules/lodash/_basePropertyOf.js"(exports2, module2) {
    "use strict";
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? void 0 : object[key];
      };
    }
    module2.exports = basePropertyOf;
  }
});

// ../../node_modules/lodash/_deburrLetter.js
var require_deburrLetter = __commonJS({
  "../../node_modules/lodash/_deburrLetter.js"(exports2, module2) {
    "use strict";
    var basePropertyOf = require_basePropertyOf();
    var deburredLetters = {
      // Latin-1 Supplement block.
      "\xC0": "A",
      "\xC1": "A",
      "\xC2": "A",
      "\xC3": "A",
      "\xC4": "A",
      "\xC5": "A",
      "\xE0": "a",
      "\xE1": "a",
      "\xE2": "a",
      "\xE3": "a",
      "\xE4": "a",
      "\xE5": "a",
      "\xC7": "C",
      "\xE7": "c",
      "\xD0": "D",
      "\xF0": "d",
      "\xC8": "E",
      "\xC9": "E",
      "\xCA": "E",
      "\xCB": "E",
      "\xE8": "e",
      "\xE9": "e",
      "\xEA": "e",
      "\xEB": "e",
      "\xCC": "I",
      "\xCD": "I",
      "\xCE": "I",
      "\xCF": "I",
      "\xEC": "i",
      "\xED": "i",
      "\xEE": "i",
      "\xEF": "i",
      "\xD1": "N",
      "\xF1": "n",
      "\xD2": "O",
      "\xD3": "O",
      "\xD4": "O",
      "\xD5": "O",
      "\xD6": "O",
      "\xD8": "O",
      "\xF2": "o",
      "\xF3": "o",
      "\xF4": "o",
      "\xF5": "o",
      "\xF6": "o",
      "\xF8": "o",
      "\xD9": "U",
      "\xDA": "U",
      "\xDB": "U",
      "\xDC": "U",
      "\xF9": "u",
      "\xFA": "u",
      "\xFB": "u",
      "\xFC": "u",
      "\xDD": "Y",
      "\xFD": "y",
      "\xFF": "y",
      "\xC6": "Ae",
      "\xE6": "ae",
      "\xDE": "Th",
      "\xFE": "th",
      "\xDF": "ss",
      // Latin Extended-A block.
      "\u0100": "A",
      "\u0102": "A",
      "\u0104": "A",
      "\u0101": "a",
      "\u0103": "a",
      "\u0105": "a",
      "\u0106": "C",
      "\u0108": "C",
      "\u010A": "C",
      "\u010C": "C",
      "\u0107": "c",
      "\u0109": "c",
      "\u010B": "c",
      "\u010D": "c",
      "\u010E": "D",
      "\u0110": "D",
      "\u010F": "d",
      "\u0111": "d",
      "\u0112": "E",
      "\u0114": "E",
      "\u0116": "E",
      "\u0118": "E",
      "\u011A": "E",
      "\u0113": "e",
      "\u0115": "e",
      "\u0117": "e",
      "\u0119": "e",
      "\u011B": "e",
      "\u011C": "G",
      "\u011E": "G",
      "\u0120": "G",
      "\u0122": "G",
      "\u011D": "g",
      "\u011F": "g",
      "\u0121": "g",
      "\u0123": "g",
      "\u0124": "H",
      "\u0126": "H",
      "\u0125": "h",
      "\u0127": "h",
      "\u0128": "I",
      "\u012A": "I",
      "\u012C": "I",
      "\u012E": "I",
      "\u0130": "I",
      "\u0129": "i",
      "\u012B": "i",
      "\u012D": "i",
      "\u012F": "i",
      "\u0131": "i",
      "\u0134": "J",
      "\u0135": "j",
      "\u0136": "K",
      "\u0137": "k",
      "\u0138": "k",
      "\u0139": "L",
      "\u013B": "L",
      "\u013D": "L",
      "\u013F": "L",
      "\u0141": "L",
      "\u013A": "l",
      "\u013C": "l",
      "\u013E": "l",
      "\u0140": "l",
      "\u0142": "l",
      "\u0143": "N",
      "\u0145": "N",
      "\u0147": "N",
      "\u014A": "N",
      "\u0144": "n",
      "\u0146": "n",
      "\u0148": "n",
      "\u014B": "n",
      "\u014C": "O",
      "\u014E": "O",
      "\u0150": "O",
      "\u014D": "o",
      "\u014F": "o",
      "\u0151": "o",
      "\u0154": "R",
      "\u0156": "R",
      "\u0158": "R",
      "\u0155": "r",
      "\u0157": "r",
      "\u0159": "r",
      "\u015A": "S",
      "\u015C": "S",
      "\u015E": "S",
      "\u0160": "S",
      "\u015B": "s",
      "\u015D": "s",
      "\u015F": "s",
      "\u0161": "s",
      "\u0162": "T",
      "\u0164": "T",
      "\u0166": "T",
      "\u0163": "t",
      "\u0165": "t",
      "\u0167": "t",
      "\u0168": "U",
      "\u016A": "U",
      "\u016C": "U",
      "\u016E": "U",
      "\u0170": "U",
      "\u0172": "U",
      "\u0169": "u",
      "\u016B": "u",
      "\u016D": "u",
      "\u016F": "u",
      "\u0171": "u",
      "\u0173": "u",
      "\u0174": "W",
      "\u0175": "w",
      "\u0176": "Y",
      "\u0177": "y",
      "\u0178": "Y",
      "\u0179": "Z",
      "\u017B": "Z",
      "\u017D": "Z",
      "\u017A": "z",
      "\u017C": "z",
      "\u017E": "z",
      "\u0132": "IJ",
      "\u0133": "ij",
      "\u0152": "Oe",
      "\u0153": "oe",
      "\u0149": "'n",
      "\u017F": "s"
    };
    var deburrLetter = basePropertyOf(deburredLetters);
    module2.exports = deburrLetter;
  }
});

// ../../node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "../../node_modules/lodash/_freeGlobal.js"(exports2, module2) {
    "use strict";
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module2.exports = freeGlobal;
  }
});

// ../../node_modules/lodash/_root.js
var require_root = __commonJS({
  "../../node_modules/lodash/_root.js"(exports2, module2) {
    "use strict";
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module2.exports = root;
  }
});

// ../../node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "../../node_modules/lodash/_Symbol.js"(exports2, module2) {
    "use strict";
    var root = require_root();
    var Symbol2 = root.Symbol;
    module2.exports = Symbol2;
  }
});

// ../../node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "../../node_modules/lodash/_arrayMap.js"(exports2, module2) {
    "use strict";
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module2.exports = arrayMap;
  }
});

// ../../node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "../../node_modules/lodash/isArray.js"(exports2, module2) {
    "use strict";
    var isArray = Array.isArray;
    module2.exports = isArray;
  }
});

// ../../node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "../../node_modules/lodash/_getRawTag.js"(exports2, module2) {
    "use strict";
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module2.exports = getRawTag;
  }
});

// ../../node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "../../node_modules/lodash/_objectToString.js"(exports2, module2) {
    "use strict";
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module2.exports = objectToString;
  }
});

// ../../node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "../../node_modules/lodash/_baseGetTag.js"(exports2, module2) {
    "use strict";
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module2.exports = baseGetTag;
  }
});

// ../../node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "../../node_modules/lodash/isObjectLike.js"(exports2, module2) {
    "use strict";
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module2.exports = isObjectLike;
  }
});

// ../../node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../../node_modules/lodash/isSymbol.js"(exports2, module2) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module2.exports = isSymbol;
  }
});

// ../../node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "../../node_modules/lodash/_baseToString.js"(exports2, module2) {
    "use strict";
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module2.exports = baseToString;
  }
});

// ../../node_modules/lodash/toString.js
var require_toString = __commonJS({
  "../../node_modules/lodash/toString.js"(exports2, module2) {
    "use strict";
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module2.exports = toString;
  }
});

// ../../node_modules/lodash/deburr.js
var require_deburr = __commonJS({
  "../../node_modules/lodash/deburr.js"(exports2, module2) {
    "use strict";
    var deburrLetter = require_deburrLetter();
    var toString = require_toString();
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsCombo = "[" + rsComboRange + "]";
    var reComboMark = RegExp(rsCombo, "g");
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
    }
    module2.exports = deburr;
  }
});

// ../../node_modules/lodash/_asciiWords.js
var require_asciiWords = __commonJS({
  "../../node_modules/lodash/_asciiWords.js"(exports2, module2) {
    "use strict";
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    module2.exports = asciiWords;
  }
});

// ../../node_modules/lodash/_hasUnicodeWord.js
var require_hasUnicodeWord = __commonJS({
  "../../node_modules/lodash/_hasUnicodeWord.js"(exports2, module2) {
    "use strict";
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    module2.exports = hasUnicodeWord;
  }
});

// ../../node_modules/lodash/_unicodeWords.js
var require_unicodeWords = __commonJS({
  "../../node_modules/lodash/_unicodeWords.js"(exports2, module2) {
    "use strict";
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsDingbatRange = "\\u2700-\\u27bf";
    var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
    var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
    var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
    var rsPunctuationRange = "\\u2000-\\u206f";
    var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
    var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['\u2019]";
    var rsBreak = "[" + rsBreakRange + "]";
    var rsCombo = "[" + rsComboRange + "]";
    var rsDigits = "\\d+";
    var rsDingbat = "[" + rsDingbatRange + "]";
    var rsLower = "[" + rsLowerRange + "]";
    var rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsUpper = "[" + rsUpperRange + "]";
    var rsZWJ = "\\u200d";
    var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")";
    var rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")";
    var rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
    var rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
    var rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
    var reUnicodeWord = RegExp([
      rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
      rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
      rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
      rsUpper + "+" + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join("|"), "g");
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    module2.exports = unicodeWords;
  }
});

// ../../node_modules/lodash/words.js
var require_words = __commonJS({
  "../../node_modules/lodash/words.js"(exports2, module2) {
    "use strict";
    var asciiWords = require_asciiWords();
    var hasUnicodeWord = require_hasUnicodeWord();
    var toString = require_toString();
    var unicodeWords = require_unicodeWords();
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? void 0 : pattern;
      if (pattern === void 0) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }
    module2.exports = words;
  }
});

// ../../node_modules/lodash/_createCompounder.js
var require_createCompounder = __commonJS({
  "../../node_modules/lodash/_createCompounder.js"(exports2, module2) {
    "use strict";
    var arrayReduce = require_arrayReduce();
    var deburr = require_deburr();
    var words = require_words();
    var rsApos = "['\u2019]";
    var reApos = RegExp(rsApos, "g");
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
      };
    }
    module2.exports = createCompounder;
  }
});

// ../../node_modules/lodash/kebabCase.js
var require_kebabCase = __commonJS({
  "../../node_modules/lodash/kebabCase.js"(exports2, module2) {
    "use strict";
    var createCompounder = require_createCompounder();
    var kebabCase2 = createCompounder(function(result, word, index) {
      return result + (index ? "-" : "") + word.toLowerCase();
    });
    module2.exports = kebabCase2;
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MarkdownPlugin: () => MarkdownPlugin,
  REMARK_MDX_TAG: () => REMARK_MDX_TAG,
  basicMarkdownMarks: () => basicMarkdownMarks,
  buildMdastNode: () => buildMdastNode,
  buildRules: () => buildRules,
  buildSlateNode: () => buildSlateNode,
  columnRules: () => columnRules,
  convertChildrenDeserialize: () => convertChildrenDeserialize,
  convertNodesDeserialize: () => convertNodesDeserialize,
  convertNodesSerialize: () => convertNodesSerialize,
  convertTextsDeserialize: () => convertTextsDeserialize,
  convertTextsSerialize: () => convertTextsSerialize,
  customMdxDeserialize: () => customMdxDeserialize,
  defaultRules: () => defaultRules,
  deserializeInlineMd: () => deserializeInlineMd,
  deserializeMd: () => deserializeMd,
  fontRules: () => fontRules,
  getCustomMark: () => getCustomMark,
  getDeserializerByKey: () => getDeserializerByKey,
  getMergedOptionsDeserialize: () => getMergedOptionsDeserialize,
  getMergedOptionsSerialize: () => getMergedOptionsSerialize,
  getRemarkPluginsWithoutMdx: () => getRemarkPluginsWithoutMdx,
  getSerializerByKey: () => getSerializerByKey,
  getStyleValue: () => getStyleValue,
  listToMdastTree: () => listToMdastTree,
  markdownToAstProcessor: () => markdownToAstProcessor,
  markdownToSlateNodes: () => markdownToSlateNodes,
  markdownToSlateNodesSafely: () => markdownToSlateNodesSafely,
  mdastToPlate: () => mdastToPlate,
  mdastToSlate: () => mdastToSlate,
  mediaRules: () => mediaRules,
  parseAttributes: () => parseAttributes,
  parseMarkdownBlocks: () => parseMarkdownBlocks,
  plateToMdast: () => plateToMdast,
  propsToAttributes: () => propsToAttributes,
  remarkMdx: () => remarkMdx,
  remarkMention: () => remarkMention,
  serializeInlineMd: () => serializeInlineMd,
  serializeMd: () => serializeMd,
  splitIncompleteMdx: () => splitIncompleteMdx,
  stripMarkdown: () => stripMarkdown,
  stripMarkdownBlocks: () => stripMarkdownBlocks,
  stripMarkdownInline: () => stripMarkdownInline,
  tagRemarkPlugin: () => tagRemarkPlugin,
  unreachable: () => unreachable
});
module.exports = __toCommonJS(index_exports);

// src/lib/MarkdownPlugin.ts
var import_platejs12 = require("platejs");

// src/lib/types.ts
var import_platejs = require("platejs");
var import_mdast_util_mdx = require("mdast-util-mdx");
var PLATE_TO_MDAST = {
  a: "link",
  blockquote: "blockquote",
  bold: "strong",
  callout: "callout",
  code: "inlineCode",
  code_block: "code",
  code_line: "code_line",
  column: "column",
  column_group: "column_group",
  comment: "comment",
  date: "date",
  equation: "math",
  heading: "heading",
  hr: "thematicBreak",
  img: "image",
  inline_equation: "inlineMath",
  italic: "emphasis",
  li: "listItem",
  list: "list",
  mention: "mention",
  p: "paragraph",
  strikethrough: "delete",
  subscript: "sub",
  suggestion: "suggestion",
  superscript: "sup",
  table: "table",
  td: "tableCell",
  text: "text",
  th: "tableCell",
  toc: "toc",
  toggle: "toggle",
  tr: "tableRow",
  underline: "u"
};
var MDAST_TO_PLATE = {
  backgroundColor: "backgroundColor",
  blockquote: "blockquote",
  break: "break",
  code: "code_block",
  color: "color",
  definition: "definition",
  del: "strikethrough",
  delete: "strikethrough",
  emphasis: "italic",
  fontFamily: "fontFamily",
  fontSize: "fontSize",
  fontWeight: "fontWeight",
  footnoteDefinition: "footnoteDefinition",
  footnoteReference: "footnoteReference",
  heading: "heading",
  html: "html",
  image: "img",
  imageReference: "imageReference",
  inlineCode: "code",
  inlineMath: "inline_equation",
  link: "a",
  linkReference: "linkReference",
  list: "list",
  listItem: "li",
  mark: "highlight",
  math: "equation",
  mdxFlowExpression: "mdxFlowExpression",
  mdxjsEsm: "mdxjsEsm",
  mdxJsxFlowElement: "mdxJsxFlowElement",
  mdxJsxTextElement: "mdxJsxTextElement",
  mdxTextExpression: "mdxTextExpression",
  paragraph: "p",
  strong: "bold",
  sub: "subscript",
  sup: "superscript",
  table: "table",
  tableCell: "td",
  tableRow: "tr",
  text: "text",
  thematicBreak: "hr",
  u: "underline",
  yaml: "yaml"
};
var mdastToPlate = (editor, mdastType) => {
  const plateKey = MDAST_TO_PLATE[mdastType];
  return (0, import_platejs.getPluginKey)(editor, plateKey) ?? plateKey ?? mdastType;
};
var plateToMdast = (plateType) => {
  return PLATE_TO_MDAST[plateType] ?? plateType;
};

// src/lib/deserializer/utils/customMdxDeserialize.ts
var import_platejs6 = require("platejs");

// src/lib/rules/defaultRules.ts
var import_platejs5 = require("platejs");

// src/lib/serializer/convertNodesSerialize.ts
var import_platejs4 = require("platejs");

// src/lib/serializer/convertTextsSerialize.ts
var import_platejs3 = require("platejs");

// src/lib/serializer/utils/getCustomMark.ts
var getCustomMark = (options) => {
  if (!options?.rules) {
    return [];
  }
  return Object.entries(options.rules).filter(([_, parser]) => parser?.mark).map(([key]) => key);
};

// src/lib/rules/columnRules.ts
var import_platejs2 = require("platejs");

// src/lib/rules/utils/parseAttributes.ts
function parseAttributes(attributes) {
  const props = {};
  if (attributes && attributes.length > 0) {
    attributes.forEach((attr) => {
      if (attr.name && attr.value !== void 0) {
        let value = attr.value;
        try {
          value = JSON.parse(attr.value);
        } catch (error) {
          value = attr.value;
        }
        props[attr.name] = value;
      }
    });
  }
  return props;
}
function propsToAttributes(props) {
  return Object.entries(props).map(([name, value]) => ({
    name,
    type: "mdxJsxAttribute",
    value: typeof value === "string" ? value : JSON.stringify(value)
  }));
}

// src/lib/rules/columnRules.ts
var columnRules = {
  column: {
    deserialize: (mdastNode, deco, options) => {
      const props = parseAttributes(mdastNode.attributes);
      return {
        children: convertChildrenDeserialize(
          mdastNode.children,
          { ...deco },
          options
        ),
        type: (0, import_platejs2.getPluginType)(options.editor, import_platejs2.KEYS.column),
        ...props
      };
    },
    serialize: (node, options) => {
      const { id, children, type, ...rest } = node;
      return {
        attributes: propsToAttributes(rest),
        children: convertNodesSerialize(children, options),
        name: type,
        type: "mdxJsxFlowElement"
      };
    }
  },
  column_group: {
    deserialize: (mdastNode, deco, options) => {
      const props = parseAttributes(mdastNode.attributes);
      return {
        children: convertChildrenDeserialize(
          mdastNode.children,
          { ...deco },
          options
        ),
        type: (0, import_platejs2.getPluginType)(options.editor, import_platejs2.KEYS.columnGroup),
        ...props
      };
    },
    serialize: (node, options) => {
      const { id, children, type, ...rest } = node;
      return {
        attributes: propsToAttributes(rest),
        children: convertNodesSerialize(children, options),
        name: type,
        type: "mdxJsxFlowElement"
      };
    }
  }
};

// src/lib/rules/fontRules.ts
var import_kebabCase = __toESM(require_kebabCase());
function createFontRule(propName) {
  const styleName = (0, import_kebabCase.default)(propName);
  return {
    mark: true,
    serialize: (slateNode) => {
      return {
        attributes: [
          {
            name: "style",
            type: "mdxJsxAttribute",
            value: `${styleName}: ${slateNode[propName]};`
          }
        ],
        children: [{ type: "text", value: slateNode.text }],
        name: "span",
        type: "mdxJsxTextElement"
      };
    }
  };
}
var fontRules = {
  backgroundColor: createFontRule("backgroundColor"),
  color: createFontRule("color"),
  fontFamily: createFontRule("fontFamily"),
  fontSize: createFontRule("fontSize"),
  fontWeight: createFontRule("fontWeight"),
  span: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      const fontFamily = getStyleValue(mdastNode, "font-family");
      const fontSize = getStyleValue(mdastNode, "font-size");
      const fontWeight = getStyleValue(mdastNode, "font-weight");
      const color2 = getStyleValue(mdastNode, "color");
      const backgroundColor = getStyleValue(mdastNode, "background-color");
      return convertChildrenDeserialize(
        mdastNode.children,
        {
          ...deco,
          backgroundColor,
          color: color2,
          fontFamily,
          fontSize,
          fontWeight
        },
        options
      );
    }
  }
};

// src/lib/rules/mediaRules.ts
function createMediaRule() {
  return {
    deserialize: (node) => {
      const { src, ...props } = parseAttributes(node.attributes);
      return {
        children: [{ text: "" }],
        type: node.name,
        url: src,
        ...props
      };
    },
    serialize: (node, options) => {
      const { id, children, type, url, ...rest } = node;
      return {
        attributes: propsToAttributes({ ...rest, src: url }),
        children: convertNodesSerialize(children, options),
        name: type,
        type: "mdxJsxFlowElement"
      };
    }
  };
}
var mediaRules = {
  audio: createMediaRule(),
  file: createMediaRule(),
  video: createMediaRule()
};

// src/lib/serializer/utils/getMergedOptionsSerialize.ts
var getMergedOptionsSerialize = (editor, options) => {
  const {
    allowedNodes: PluginAllowedNodes,
    allowNode: PluginAllowNode,
    disallowedNodes: PluginDisallowedNodes,
    remarkPlugins: PluginRemarkPlugins,
    rules: PluginRules
  } = editor.getOptions(MarkdownPlugin);
  const mergedRules = Object.assign(
    {},
    buildRules(editor),
    options?.rules ?? PluginRules
  );
  return {
    allowedNodes: options?.allowedNodes ?? PluginAllowedNodes,
    allowNode: options?.allowNode ?? PluginAllowNode,
    disallowedNodes: options?.disallowedNodes ?? PluginDisallowedNodes,
    editor,
    remarkPlugins: options?.remarkPlugins ?? PluginRemarkPlugins ?? [],
    rules: mergedRules,
    spread: options?.spread,
    value: options?.value ?? editor.children
  };
};

// src/lib/serializer/utils/getSerializerByKey.ts
var getSerializerByKey = (key, options) => {
  const nodes = options.rules;
  const rules = buildRules(options.editor);
  return nodes?.[key]?.serialize === void 0 ? rules[key]?.serialize : nodes?.[key]?.serialize;
};

// src/lib/serializer/utils/unreachable.ts
var unreachable = (value) => {
  console.warn(`Unreachable code: ${JSON.stringify(value)}`);
};

// src/lib/serializer/convertTextsSerialize.ts
var basicMarkdownMarks = ["italic", "bold", "strikethrough", "code"];
var convertTextsSerialize = (slateTexts, options, key) => {
  const customLeaf = getCustomMark(options);
  const mdastTexts = [];
  const starts = [];
  let ends = [];
  let textTemp = "";
  for (let j = 0; j < slateTexts.length; j++) {
    const cur = slateTexts[j];
    textTemp += cur.text;
    const prevStarts = starts.slice();
    const prevEnds = ends.slice();
    const prev = slateTexts[j - 1];
    const next = slateTexts[j + 1];
    ends = [];
    [
      ...basicMarkdownMarks,
      // exclude repeated marks
      ...customLeaf.filter((k) => !basicMarkdownMarks.includes(k))
    ].forEach((key2) => {
      const nodeType = (0, import_platejs3.getPluginType)(options.editor, key2);
      if (cur[nodeType]) {
        if (!prev?.[nodeType]) {
          starts.push(key2);
        }
        if (!next?.[nodeType]) {
          ends.push(key2);
        }
      }
    });
    const endsToRemove = starts.reduce(
      (acc, k, kIndex) => {
        if (ends.includes(k)) {
          acc.push({ key: k, index: kIndex });
        }
        return acc;
      },
      []
    );
    if (starts.length > 0) {
      let bef = "";
      let aft = "";
      if (endsToRemove.length === 1 && (prevStarts.toString() !== starts.toString() || // https://github.com/inokawa/remark-slate-transformer/issues/90
      prevEnds.includes("italic") && ends.includes("bold")) && starts.length - endsToRemove.length === 0) {
        while (textTemp.startsWith(" ")) {
          bef += " ";
          textTemp = textTemp.slice(1);
        }
        while (textTemp.endsWith(" ")) {
          aft += " ";
          textTemp = textTemp.slice(0, -1);
        }
      }
      let res = {
        type: "text",
        value: textTemp
      };
      textTemp = "";
      starts.slice().reverse().forEach((k) => {
        const nodeParser = getSerializerByKey(k, options);
        if (nodeParser) {
          const node = nodeParser(cur, options);
          res = {
            ...node,
            children: [res]
          };
        }
        switch (k) {
          case "bold": {
            res = {
              children: [res],
              type: "strong"
            };
            break;
          }
          case "code": {
            let currentRes = res;
            while (currentRes.type !== "text" && currentRes.type !== "inlineCode") {
              currentRes = currentRes.children[0];
            }
            currentRes.type = "inlineCode";
            break;
          }
          case "italic": {
            res = {
              children: [res],
              type: "emphasis"
            };
            break;
          }
          case "strikethrough": {
            res = {
              children: [res],
              type: "delete"
            };
            break;
          }
        }
      });
      const arr = [];
      if (bef.length > 0) {
        arr.push({ type: "text", value: bef });
      }
      arr.push(res);
      if (aft.length > 0) {
        arr.push({ type: "text", value: aft });
      }
      mdastTexts.push(...arr);
    }
    if (endsToRemove.length > 0) {
      endsToRemove.reverse().forEach((e) => {
        starts.splice(e.index, 1);
      });
    } else {
      mdastTexts.push({ type: "text", value: textTemp });
      textTemp = "";
    }
  }
  if (textTemp) {
    mdastTexts.push({ type: "text", value: textTemp });
    textTemp = "";
  }
  const mergedTexts = mergeTexts(mdastTexts);
  const flattenedEmptyNodes = mergedTexts.map((node) => {
    if (!hasContent(node)) {
      return { type: "text", value: "" };
    }
    return node;
  });
  return flattenedEmptyNodes;
};
var hasContent = (node) => {
  if (node.type === "inlineCode") {
    return node.value !== "";
  }
  if (node.type === "text") {
    return node.value !== "";
  }
  if (node.children?.length > 0) {
    for (const child of node.children) {
      if (child.type !== "emphasis" && child.type !== "strong" && child.type !== "inlineCode" && child.type !== "delete" && child.type !== "text") {
        return true;
      }
      if (hasContent(child)) {
        return true;
      }
    }
  }
  return false;
};
var mergeTexts = (nodes) => {
  const res = [];
  for (const cur of nodes) {
    const last = res.at(-1);
    if (last && last.type === cur.type) {
      if (last.type === "text") {
        last.value += cur.value;
      } else if (last.type === "inlineCode") {
        last.value += cur.value;
      } else {
        last.children = mergeTexts(
          last.children.concat(cur.children)
        );
      }
    } else {
      if (cur.type === "text" && cur.value === "") continue;
      res.push(cur);
    }
  }
  return res;
};

// src/lib/serializer/listToMdastTree.ts
function listToMdastTree(nodes, options) {
  if (nodes.length === 0) {
    throw new Error("Cannot create a list from empty nodes");
  }
  const root = {
    children: [],
    ordered: nodes[0].listStyleType === "decimal",
    spread: options.spread ?? false,
    start: nodes[0].listStart,
    type: "list"
  };
  const indentStack = [{ indent: nodes[0].indent, list: root, parent: null }];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const currentIndent = node.indent;
    while (indentStack.length > 1 && indentStack.at(-1).indent > currentIndent) {
      indentStack.pop();
    }
    const stackTop = indentStack.at(-1);
    if (!stackTop) {
      throw new Error("Stack should never be empty");
    }
    const listItem = {
      checked: null,
      children: [
        {
          children: convertNodesSerialize(
            node.children,
            options
          ),
          type: "paragraph"
        }
      ],
      type: "listItem"
    };
    if (options.spread) {
      listItem.spread = true;
    }
    if (node.listStyleType === "todo" && node.checked !== void 0) {
      listItem.checked = node.checked;
    }
    stackTop.list.children.push(listItem);
    const nextNode = nodes[i + 1];
    if (nextNode && nextNode.indent > currentIndent) {
      const nestedList = {
        children: [],
        ordered: nextNode.listStyleType === "decimal",
        spread: options.spread ?? false,
        start: nextNode.listStart,
        type: "list"
      };
      listItem.children.push(nestedList);
      indentStack.push({
        indent: nextNode.indent,
        list: nestedList,
        parent: listItem
      });
    }
  }
  return root;
}

// src/lib/serializer/convertNodesSerialize.ts
var convertNodesSerialize = (nodes, options) => {
  const mdastNodes = [];
  let textQueue = [];
  const listBlock = [];
  for (let i = 0; i <= nodes.length; i++) {
    const n = nodes[i];
    if (n && import_platejs4.TextApi.isText(n)) {
      if (shouldIncludeText(n, options)) {
        textQueue.push(n);
      }
    } else {
      if (textQueue.length > 0) {
        mdastNodes.push(
          ...convertTextsSerialize(
            textQueue,
            options
          )
        );
      }
      textQueue = [];
      if (!n) continue;
      if (!shouldIncludeNode(n, options)) {
        continue;
      }
      const pType = (0, import_platejs4.getPluginType)(options.editor, import_platejs4.KEYS.p) ?? import_platejs4.KEYS.p;
      if (n?.type === pType && "listStyleType" in n) {
        listBlock.push(n);
        const next = nodes[i + 1];
        const isNextIndent = next && next.type === pType && "listStyleType" in next;
        if (!isNextIndent) {
          mdastNodes.push(listToMdastTree(listBlock, options));
          listBlock.length = 0;
        }
      } else {
        const node = buildMdastNode(n, options);
        if (node) {
          mdastNodes.push(node);
        }
      }
    }
  }
  return mdastNodes;
};
var buildMdastNode = (node, options) => {
  const editor = options.editor;
  let key = (0, import_platejs4.getPluginKey)(editor, node.type) ?? node.type;
  if (import_platejs4.KEYS.heading.includes(key)) {
    key = "heading";
  }
  if (key === import_platejs4.KEYS.olClassic || key === import_platejs4.KEYS.ulClassic) {
    key = "list";
  }
  const nodeParser = getSerializerByKey(key, options);
  if (nodeParser) {
    return nodeParser(node, options);
  }
  unreachable(node);
};
var shouldIncludeText = (text, options) => {
  const { allowedNodes, allowNode, disallowedNodes } = options;
  if (allowedNodes && disallowedNodes && allowedNodes.length > 0 && disallowedNodes.length > 0) {
    throw new Error("Cannot combine allowedNodes with disallowedNodes");
  }
  for (const [key, value] of Object.entries(text)) {
    if (key === "text") continue;
    if (allowedNodes) {
      if (!allowedNodes.includes(key) && value) {
        return false;
      }
    } else if (disallowedNodes?.includes(key) && value) {
      return false;
    }
  }
  if (allowNode?.serialize) {
    return allowNode.serialize(text);
  }
  return true;
};
var shouldIncludeNode = (node, options) => {
  const { allowedNodes, allowNode, disallowedNodes } = options;
  if (!node.type) return true;
  if (allowedNodes && disallowedNodes && allowedNodes.length > 0 && disallowedNodes.length > 0) {
    throw new Error("Cannot combine allowedNodes with disallowedNodes");
  }
  if (allowedNodes) {
    if (!allowedNodes.includes(node.type)) {
      return false;
    }
  } else if (disallowedNodes?.includes(node.type)) {
    return false;
  }
  if (allowNode?.serialize) {
    return allowNode.serialize(node);
  }
  return true;
};

// src/lib/serializer/serializeInlineMd.ts
var import_remark_stringify = __toESM(require("remark-stringify"));
var import_unified = require("unified");
var serializeInlineMd = (editor, options) => {
  const mergedOptions = getMergedOptionsSerialize(editor, options);
  const toRemarkProcessor = (0, import_unified.unified)().use(mergedOptions.remarkPlugins ?? []).use(import_remark_stringify.default, {
    emphasis: "_"
  });
  if (options?.value?.length === 0) return "";
  const convertedTexts = convertTextsSerialize(mergedOptions.value, {
    editor
  });
  const serializedContent = toRemarkProcessor.stringify({
    children: convertedTexts,
    type: "root"
  });
  return serializedContent;
};

// src/lib/serializer/serializeMd.ts
var import_remark_stringify2 = __toESM(require("remark-stringify"));
var import_unified2 = require("unified");
var serializeMd = (editor, options) => {
  const mergedOptions = getMergedOptionsSerialize(editor, options);
  const { remarkPlugins, value } = mergedOptions;
  const toRemarkProcessor = (0, import_unified2.unified)().use(remarkPlugins ?? []).use(import_remark_stringify2.default, {
    emphasis: "_"
  });
  const mdast = slateToMdast({
    children: value,
    options: mergedOptions
  });
  return toRemarkProcessor.stringify(mdast);
};
var slateToMdast = ({
  children,
  options
}) => {
  const ast = {
    children: convertNodesSerialize(children, options),
    type: "root"
  };
  return ast;
};

// src/lib/rules/defaultRules.ts
function isBoolean(value) {
  return value === true || value === false || !!value && typeof value == "object" && Object.prototype.toString.call(value) == "[object Boolean]";
}
var defaultRules = {
  a: {
    deserialize: (mdastNode, deco, options) => {
      return {
        children: convertChildrenDeserialize(mdastNode.children, deco, options),
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.a),
        url: mdastNode.url
      };
    },
    serialize: (node, options) => {
      return {
        children: convertNodesSerialize(
          node.children,
          options
        ),
        type: "link",
        url: node.url
      };
    }
  },
  blockquote: {
    deserialize: (mdastNode, deco, options) => {
      const children = mdastNode.children.length > 0 ? mdastNode.children.flatMap((paragraph, index, children2) => {
        if (paragraph.type === "paragraph") {
          if (children2.length > 1 && children2.length - 1 !== index) {
            const paragraphChildren = convertChildrenDeserialize(
              paragraph.children,
              deco,
              options
            );
            paragraphChildren.push({ text: "\n" }, { text: "\n" });
            return paragraphChildren;
          }
          return convertChildrenDeserialize(
            paragraph.children,
            deco,
            options
          );
        }
        if ("children" in paragraph) {
          return convertChildrenDeserialize(
            paragraph.children,
            deco,
            options
          );
        }
        return [{ text: "" }];
      }) : [{ text: "" }];
      const flattenedChildren = children.flatMap(
        (child) => child.type === "blockquote" ? child.children : [child]
      );
      return {
        children: flattenedChildren,
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.blockquote)
      };
    },
    serialize: (node, options) => {
      const nodes = [];
      for (const child of node.children) {
        if (child.text === "\n") {
          nodes.push({
            type: "break"
          });
        } else {
          nodes.push(child);
        }
      }
      const paragraphChildren = convertNodesSerialize(
        nodes,
        options
      );
      if (paragraphChildren.length > 0 && paragraphChildren.at(-1).type === "break") {
        paragraphChildren.at(-1).type = "html";
        paragraphChildren.at(-1).value = "\n<br />";
      }
      return {
        children: [
          {
            children: paragraphChildren,
            type: "paragraph"
          }
        ],
        type: "blockquote"
      };
    }
  },
  bold: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return convertTextsDeserialize(mdastNode, deco, options);
    }
  },
  br: {
    deserialize() {
      return [{ text: "\n" }];
    }
  },
  break: {
    deserialize: (mdastNode, deco) => {
      return {
        text: "\n"
      };
    },
    serialize: () => {
      return {
        type: "break"
      };
    }
  },
  callout: {
    deserialize: (mdastNode, deco, options) => {
      return {
        children: convertChildrenDeserialize(mdastNode.children, deco, options),
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.callout)
      };
    },
    serialize(slateNode, options) {
      return {
        attributes: [],
        children: convertNodesSerialize(slateNode.children, options),
        name: "callout",
        type: "mdxJsxFlowElement"
      };
    }
  },
  code: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return {
        ...deco,
        [(0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.code)]: true,
        text: mdastNode.value
      };
    }
  },
  code_block: {
    deserialize: (mdastNode, deco, options) => {
      return {
        children: (mdastNode.value || "").split("\n").map((line) => ({
          children: [{ text: line }],
          type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.codeLine)
        })),
        lang: mdastNode.lang ?? void 0,
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.codeBlock)
      };
    },
    serialize: (node) => {
      return {
        lang: node.lang,
        type: "code",
        value: node.children.map(
          (child) => child?.children === void 0 ? child.text : child.children.map((c) => c.text).join("")
        ).join("\n")
      };
    }
  },
  date: {
    deserialize(mdastNode, deco, options) {
      const dateValue = mdastNode.children?.[0]?.value || "";
      return {
        children: [{ text: "" }],
        date: dateValue,
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.date)
      };
    },
    serialize({ date }) {
      return {
        attributes: [],
        children: [{ type: "text", value: date ?? "" }],
        name: "date",
        type: "mdxJsxTextElement"
      };
    }
  },
  del: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return convertChildrenDeserialize(
        mdastNode.children,
        { [(0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.strikethrough)]: true, ...deco },
        options
      );
    }
    // no serialize because it's mdx <del /> only
  },
  equation: {
    deserialize: (mdastNode, deco, options) => {
      return {
        children: [{ text: "" }],
        texExpression: mdastNode.value,
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.equation)
      };
    },
    serialize: (node) => {
      return {
        type: "math",
        value: node.texExpression
      };
    }
  },
  // plate doesn't support footnoteDefinition and footnoteReference
  // so we need to convert them to p for now
  footnoteDefinition: {
    deserialize: (mdastNode, deco, options) => {
      const children = convertChildrenDeserialize(
        mdastNode.children,
        deco,
        options
      );
      const flattenedChildren = children.flatMap(
        (child) => child.type === "p" ? child.children : [child]
      );
      return {
        children: flattenedChildren,
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.p)
      };
    }
  },
  footnoteReference: {},
  heading: {
    deserialize: (mdastNode, deco, options) => {
      const headingType = {
        1: "h1",
        2: "h2",
        3: "h3",
        4: "h4",
        5: "h5",
        6: "h6"
      };
      const defaultType = headingType[mdastNode.depth];
      const type = (0, import_platejs5.getPluginType)(options.editor, defaultType);
      return {
        children: convertChildrenDeserialize(mdastNode.children, deco, options),
        type
      };
    },
    serialize: (node, options) => {
      const key = (0, import_platejs5.getPluginKey)(options.editor, node.type) ?? node.type;
      const depthMap = {
        h1: 1,
        h2: 2,
        h3: 3,
        h4: 4,
        h5: 5,
        h6: 6
      };
      return {
        children: convertNodesSerialize(
          node.children,
          options
        ),
        depth: depthMap[key],
        type: "heading"
      };
    }
  },
  highlight: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return convertChildrenDeserialize(
        mdastNode.children,
        { [(0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.highlight)]: true, ...deco },
        options
      );
    },
    serialize(slateNode) {
      return {
        attributes: [],
        children: [{ type: "text", value: slateNode.text }],
        name: "mark",
        type: "mdxJsxTextElement"
      };
    }
  },
  hr: {
    deserialize: (_, __, options) => {
      return {
        children: [{ text: "" }],
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.hr)
      };
    },
    serialize: () => {
      return { type: "thematicBreak" };
    }
  },
  html: {
    deserialize: (mdastNode, deco, options) => {
      return {
        text: (mdastNode.value || "").replaceAll("<br />", "\n")
      };
    }
  },
  img: {
    deserialize: (mdastNode, deco, options) => {
      return {
        caption: [{ text: mdastNode.alt }],
        children: [{ text: "" }],
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.img),
        url: mdastNode.url
      };
    },
    serialize: ({ caption, url }) => {
      const image = {
        alt: caption ? caption.map((c) => c.text).join("") : void 0,
        title: caption ? caption.map((c) => c.text).join("") : void 0,
        type: "image",
        url
      };
      return { children: [image], type: "paragraph" };
    }
  },
  inline_equation: {
    deserialize(mdastNode, _, options) {
      return {
        children: [{ text: "" }],
        texExpression: mdastNode.value,
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.inlineEquation)
      };
    },
    serialize: (node) => {
      return {
        type: "inlineMath",
        value: node.texExpression
      };
    }
  },
  italic: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return convertTextsDeserialize(mdastNode, deco, options);
    }
  },
  kbd: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return convertChildrenDeserialize(
        mdastNode.children,
        { [(0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.kbd)]: true, ...deco },
        options
      );
    },
    serialize(slateNode, options) {
      return {
        attributes: [],
        children: [{ type: "text", value: slateNode.text }],
        name: "kbd",
        type: "mdxJsxTextElement"
      };
    }
  },
  list: {
    deserialize: (mdastNode, deco, options) => {
      const isIndentList = !!options.editor?.plugins.list;
      if (!isIndentList) {
        const children = mdastNode.children.map((child) => {
          if (child.type === "listItem") {
            return {
              children: child.children.map((itemChild) => {
                if (itemChild.type === "paragraph") {
                  return {
                    children: convertChildrenDeserialize(
                      itemChild.children,
                      deco,
                      options
                    ),
                    type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.lic)
                  };
                }
                return convertChildrenDeserialize(
                  [itemChild],
                  deco,
                  options
                )[0];
              }),
              type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.li)
            };
          }
          return convertChildrenDeserialize([child], deco, options)[0];
        });
        return {
          children,
          type: (0, import_platejs5.getPluginType)(
            options.editor,
            mdastNode.ordered ? import_platejs5.KEYS.olClassic : import_platejs5.KEYS.ulClassic
          )
        };
      }
      const parseListItems = (listNode, indent = 1, startIndex2 = 1) => {
        const items = [];
        const isOrdered = !!listNode.ordered;
        let listStyleType = isOrdered ? (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.ol) : (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.ul);
        listNode.children?.forEach((listItem, index) => {
          if (listItem.type !== "listItem") return;
          const isTodoList = isBoolean(listItem.checked);
          if (isTodoList)
            listStyleType = (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.listTodo);
          const [paragraph, ...subLists] = listItem.children || [];
          const result = paragraph ? buildSlateNode(paragraph, deco, options) : {
            children: [{ text: "" }],
            type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.p)
          };
          const itemNodes = Array.isArray(result) ? result : [result];
          itemNodes.forEach((node) => {
            const itemContent = {
              ...node,
              indent,
              type: node.type === (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.img) ? node.type : (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.p)
            };
            itemContent.listStyleType = listStyleType;
            if (isTodoList) {
              itemContent.checked = listItem.checked;
            }
            if (isOrdered) {
              itemContent.listStart = startIndex2 + index;
            }
            items.push(itemContent);
          });
          subLists.forEach((subNode) => {
            if (subNode.type === "list") {
              const subListStart = subNode.start || 1;
              const nestedItems = parseListItems(
                subNode,
                indent + 1,
                subListStart
              );
              items.push(...nestedItems);
            } else {
              const result2 = buildSlateNode(subNode, deco, options);
              if (Array.isArray(result2)) {
                items.push(
                  ...result2.map((item) => ({
                    ...item,
                    indent: indent + 1
                  }))
                );
              } else {
                items.push({
                  ...result2,
                  indent: indent + 1
                });
              }
            }
          });
        });
        return items;
      };
      const startIndex = mdastNode.start || 1;
      return parseListItems(mdastNode, 1, startIndex);
    },
    serialize: (node, options) => {
      const editor = options.editor;
      const isOrdered = (0, import_platejs5.getPluginKey)(editor, node.type) === import_platejs5.KEYS.olClassic;
      const serializeListItems = (children) => {
        const items = [];
        let currentItem = null;
        for (const child of children) {
          if ((0, import_platejs5.getPluginKey)(editor, child.type) === "li") {
            if (currentItem) {
              items.push(currentItem);
            }
            currentItem = {
              children: [],
              spread: false,
              type: "listItem"
            };
            for (const liChild of child.children) {
              if ((0, import_platejs5.getPluginKey)(editor, liChild.type) === "lic") {
                currentItem.children.push({
                  children: convertNodesSerialize(liChild.children, options),
                  type: "paragraph"
                });
              } else if ((0, import_platejs5.getPluginKey)(editor, liChild.type) === "ol" || (0, import_platejs5.getPluginKey)(editor, liChild.type) === "ul") {
                currentItem.children.push({
                  children: serializeListItems(liChild.children),
                  ordered: (0, import_platejs5.getPluginKey)(editor, liChild.type) === "ol",
                  spread: false,
                  type: "list"
                });
              }
            }
          }
        }
        if (currentItem) {
          items.push(currentItem);
        }
        return items;
      };
      return {
        children: serializeListItems(node.children),
        ordered: isOrdered,
        spread: false,
        type: "list"
      };
    }
  },
  listItem: {
    deserialize: (mdastNode, deco, options) => {
      const children = mdastNode.children.map((child) => {
        if (child.type === "paragraph") {
          return {
            children: convertChildrenDeserialize(child.children, deco, options),
            type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.lic)
          };
        }
        return convertChildrenDeserialize([child], deco, options)[0];
      });
      return {
        children,
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.li)
      };
    },
    serialize: (node, options) => {
      return {
        children: convertNodesSerialize(node.children, options),
        type: "listItem"
      };
    }
  },
  mention: {
    deserialize: (node, deco, options) => ({
      children: [{ text: "" }],
      type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.mention),
      value: node.displayText || node.username,
      ...node.displayText && { key: node.username }
    }),
    serialize: (node) => {
      const mentionId = node.key || node.value;
      const displayText = node.value;
      const encodedId = encodeURIComponent(String(mentionId)).replace(/\(/g, "%28").replace(/\)/g, "%29");
      return {
        children: [{ type: "text", value: displayText }],
        type: "link",
        url: `mention:${encodedId}`
      };
    }
  },
  p: {
    deserialize: (node, deco, options) => {
      const isKeepLineBreak = options.splitLineBreaks;
      const children = convertChildrenDeserialize(node.children, deco, options);
      const splitBlockTypes = /* @__PURE__ */ new Set(["img"]);
      const elements = [];
      let inlineNodes = [];
      const flushInlineNodes = () => {
        if (inlineNodes.length > 0) {
          elements.push({
            children: inlineNodes,
            type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.p)
          });
          inlineNodes = [];
        }
      };
      children.forEach((c) => {
        if (c.text === "\u200B") {
          c.text = "";
        }
      });
      children.forEach((child, index, children2) => {
        const { type } = child;
        if (type && splitBlockTypes.has(type)) {
          flushInlineNodes();
          elements.push(child);
        } else if (isKeepLineBreak && "text" in child && typeof child.text === "string") {
          const textParts = child.text.split("\n");
          const isSingleLineBreak = child.text === "\n" && inlineNodes.length === 0;
          if (isSingleLineBreak) {
            inlineNodes.push({ ...child, text: "" });
            flushInlineNodes();
            return;
          }
          textParts.forEach((part, index2, array) => {
            const isNotFirstPart = index2 > 0;
            const isNotLastPart = index2 < array.length - 1;
            if (isNotFirstPart) {
              flushInlineNodes();
            }
            if (part) {
              inlineNodes.push({ ...child, text: part });
            }
            if (isNotLastPart) {
              flushInlineNodes();
            }
          });
        } else {
          if (child.text === "\n" && children2.length > 1 && index === children2.length - 1) {
          } else {
            inlineNodes.push(child);
          }
        }
      });
      flushInlineNodes();
      return elements.length === 1 ? elements[0] : elements;
    },
    serialize: (node, options) => {
      let enrichedChildren = node.children;
      enrichedChildren = enrichedChildren.map((child) => {
        if (child.text === "\n") {
          return {
            type: "break"
          };
        }
        if (child.text === "" && options.preserveEmptyParagraphs !== false) {
          return { ...child, text: "\u200B" };
        }
        return child;
      });
      const convertedNodes = convertNodesSerialize(
        enrichedChildren,
        options
      );
      if (convertedNodes.length > 0 && enrichedChildren.at(-1).type === "break") {
        convertedNodes.at(-1).type = "html";
        convertedNodes.at(-1).value = "\n<br />";
      }
      return {
        children: convertedNodes,
        type: "paragraph"
      };
    }
  },
  strikethrough: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return convertTextsDeserialize(mdastNode, deco, options);
    }
  },
  subscript: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return convertChildrenDeserialize(
        mdastNode.children,
        { [(0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.sub)]: true, ...deco },
        options
      );
    },
    serialize(slateNode, options) {
      return {
        attributes: [],
        children: [{ type: "text", value: slateNode.text }],
        name: "sub",
        type: "mdxJsxTextElement"
      };
    }
  },
  superscript: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return convertChildrenDeserialize(
        mdastNode.children,
        { [(0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.sup)]: true, ...deco },
        options
      );
    },
    serialize(slateNode, options) {
      return {
        attributes: [],
        children: [{ type: "text", value: slateNode.text }],
        name: "sup",
        type: "mdxJsxTextElement"
      };
    }
  },
  table: {
    deserialize: (node, deco, options) => {
      const rows = node.children?.map((row, rowIndex) => {
        return {
          children: row.children?.map((cell) => {
            const cellType = rowIndex === 0 ? "th" : "td";
            return {
              children: convertChildrenDeserialize(
                cell.children,
                deco,
                options
              ).map((child) => {
                if (!child.type) {
                  return {
                    children: [child],
                    type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.p)
                  };
                }
                return child;
              }),
              type: (0, import_platejs5.getPluginType)(options.editor, cellType)
            };
          }) || [],
          type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.tr)
        };
      }) || [];
      return {
        children: rows,
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.table)
      };
    },
    serialize: (node, options) => {
      return {
        children: convertNodesSerialize(
          node.children,
          options
        ),
        type: "table"
      };
    }
  },
  td: {
    serialize: (node, options) => {
      return {
        children: convertNodesSerialize(
          node.children,
          options
        ),
        type: "tableCell"
      };
    }
  },
  text: {
    deserialize: (mdastNode, deco) => {
      return {
        ...deco,
        text: mdastNode.value.replace(/^\n/, "")
      };
    }
  },
  th: {
    serialize: (node, options) => {
      return {
        children: convertNodesSerialize(
          node.children,
          options
        ),
        type: "tableCell"
      };
    }
  },
  toc: {
    deserialize: (mdastNode, deco, options) => {
      return {
        children: convertChildrenDeserialize(mdastNode.children, deco, options),
        type: (0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.toc)
      };
    },
    serialize: (node, options) => {
      return {
        attributes: [],
        children: convertNodesSerialize(node.children, options),
        name: "toc",
        type: "mdxJsxFlowElement"
      };
    }
  },
  tr: {
    serialize: (node, options) => {
      return {
        children: convertNodesSerialize(
          node.children,
          options
        ),
        type: "tableRow"
      };
    }
  },
  underline: {
    mark: true,
    deserialize: (mdastNode, deco, options) => {
      return convertChildrenDeserialize(
        mdastNode.children,
        { [(0, import_platejs5.getPluginType)(options.editor, import_platejs5.KEYS.underline)]: true, ...deco },
        options
      );
    },
    serialize(slateNode, options) {
      return {
        attributes: [],
        children: [{ type: "text", value: slateNode.text }],
        name: "u",
        type: "mdxJsxTextElement"
      };
    }
  },
  ...fontRules,
  ...mediaRules,
  ...columnRules
};
var buildRules = (editor) => {
  const keys = Object.keys(defaultRules);
  const newRules = {};
  keys.forEach((key) => {
    const pluginKey = (0, import_platejs5.getPluginKey)(editor, key);
    newRules[pluginKey ?? key] = defaultRules[key];
  });
  return newRules;
};

// src/lib/deserializer/utils/getDeserializerByKey.ts
var getDeserializerByKey = (key, options) => {
  const rules = options.rules;
  return rules?.[key]?.deserialize === void 0 ? buildRules(options.editor)[key]?.deserialize : rules?.[key]?.deserialize;
};

// src/lib/deserializer/utils/customMdxDeserialize.ts
var customMdxDeserialize = (mdastNode, deco, options) => {
  const customJsxElementKey = mdastNode.name;
  const key = (0, import_platejs6.getPluginKey)(options.editor, customJsxElementKey) ?? mdastNode.name;
  if (key) {
    const nodeParserDeserialize = getDeserializerByKey(
      mdastToPlate(options.editor, key),
      options
    );
    if (nodeParserDeserialize)
      return nodeParserDeserialize(mdastNode, deco, options);
  } else {
    console.warn(
      "This MDX node does not have a parser for deserialization",
      mdastNode
    );
  }
  if (mdastNode.type === "mdxJsxTextElement") {
    const tagName = mdastNode.name;
    let textContent = "";
    if (mdastNode.children) {
      textContent = mdastNode.children.map((child) => {
        if ("value" in child) return child.value;
        return "";
      }).join("");
    }
    return [
      {
        text: `<${tagName}>${textContent}</${tagName}>`
      }
    ];
  }
  if (mdastNode.type === "mdxJsxFlowElement") {
    const tagName = mdastNode.name;
    return [
      {
        children: [
          {
            text: `<${tagName}>
`
          },
          ...convertChildrenDeserialize(mdastNode.children, deco, options),
          {
            text: `
</${tagName}>`
          }
        ],
        type: (0, import_platejs6.getPluginType)(options.editor, import_platejs6.KEYS.p)
      }
    ];
  }
};

// src/lib/deserializer/utils/deserializeInlineMd.ts
var import_platejs7 = require("platejs");

// src/lib/deserializer/utils/stripMarkdown.ts
var stripMarkdownBlocks = (text) => {
  text = text.replaceAll(/^#{1,6}\s+/gm, "");
  text = text.replaceAll(/^\s*>\s?/gm, "");
  text = text.replaceAll(/^([*_-]){3,}\s*$/gm, "");
  text = text.replaceAll(/^(\s*)([*+-]|\d+\.)\s/gm, "$1");
  text = text.replaceAll(/^```[\S\s]*?^```/gm, "");
  text = text.replaceAll("<br>", "\n");
  return text;
};
var stripMarkdownInline = (text) => {
  text = text.replaceAll(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replaceAll(/(\*|_)(.*?)\1/g, "$2");
  text = text.replaceAll(/\[([^\]]+)]\(([^)]+)\)/g, "$1");
  text = text.replaceAll(/`(.+?)`/g, "$1");
  text = text.replaceAll("&nbsp;", " ");
  text = text.replaceAll("&lt;", "<");
  text = text.replaceAll("&gt;", ">");
  text = text.replaceAll("&amp;", "&");
  return text;
};
var stripMarkdown = (text) => {
  text = stripMarkdownBlocks(text);
  text = stripMarkdownInline(text);
  return text;
};

// src/lib/deserializer/utils/deserializeInlineMd.ts
var deserializeInlineMd = (editor, text, options) => {
  const leadingSpaces = /^\s*/.exec(text)?.[0] || "";
  const trailingSpaces = /\s*$/.exec(text)?.[0] || "";
  const strippedText = stripMarkdownBlocks(text.trim());
  const fragment = [];
  if (leadingSpaces) {
    fragment.push({ text: leadingSpaces });
  }
  if (strippedText) {
    const result = editor.getApi(MarkdownPlugin).markdown.deserialize(strippedText, options)[0];
    if (result) {
      const nodes = import_platejs7.ElementApi.isElement(result) ? result.children : [result];
      fragment.push(...nodes);
    }
  }
  if (trailingSpaces) {
    fragment.push({ text: trailingSpaces });
  }
  return fragment;
};

// src/lib/utils/getRemarkPluginsWithoutMdx.ts
var REMARK_MDX_TAG = "remarkMdx";
var tagRemarkPlugin = (pluginFn, tag) => {
  const wrapped = function(...args) {
    return pluginFn.apply(this, args);
  };
  wrapped.__pluginTag = tag;
  return wrapped;
};
var getRemarkPluginsWithoutMdx = (plugins) => {
  return plugins.filter((plugin) => {
    return plugin.__pluginTag !== REMARK_MDX_TAG;
  });
};

// src/lib/deserializer/utils/getMergedOptionsDeserialize.ts
var getMergedOptionsDeserialize = (editor, options) => {
  const {
    allowedNodes: PluginAllowedNodes,
    allowNode: PluginAllowNode,
    disallowedNodes: PluginDisallowedNodes,
    remarkPlugins: PluginRemarkPlugins,
    rules: PluginRules
  } = editor.getOptions(MarkdownPlugin);
  const mergedRules = Object.assign(
    {},
    buildRules(editor),
    options?.rules ?? PluginRules
  );
  const remarkPlugins = options?.remarkPlugins ?? PluginRemarkPlugins ?? [];
  return {
    allowedNodes: options?.allowedNodes ?? PluginAllowedNodes,
    allowNode: options?.allowNode ?? PluginAllowNode,
    disallowedNodes: options?.disallowedNodes ?? PluginDisallowedNodes,
    editor,
    memoize: options?.memoize,
    parser: options?.parser,
    remarkPlugins: options?.withoutMdx ? getRemarkPluginsWithoutMdx(remarkPlugins) : remarkPlugins,
    rules: mergedRules,
    splitLineBreaks: options?.splitLineBreaks
  };
};

// src/lib/deserializer/utils/getStyleValue.ts
var getStyleValue = (mdastNode, styleName) => {
  const styleAttribute = mdastNode.attributes.find(
    (attr) => "name" in attr && attr.name === "style"
  );
  if (!styleAttribute?.value) return void 0;
  const styles = styleAttribute.value.split(";");
  for (const style of styles) {
    const [name, value] = style.split(":").map((s) => s.trim());
    if (name === styleName) {
      return value;
    }
  }
  return void 0;
};

// src/lib/deserializer/utils/markdownToSlateNodesSafely.ts
var import_platejs10 = require("platejs");

// src/lib/deserializer/deserializeMd.ts
var import_platejs9 = require("platejs");
var import_remark_parse = __toESM(require("remark-parse"));
var import_unified3 = require("unified");

// src/lib/deserializer/mdastToSlate.ts
var import_platejs8 = require("platejs");
var mdastToSlate = (node, options) => {
  return buildSlateRoot(node, options);
};
var buildSlateRoot = (root, options) => {
  if (!options.splitLineBreaks) {
    root.children = root.children.map((child) => {
      if (child.type === "html" && child.value === "<br />") {
        return {
          children: [{ type: "text", value: "\n" }],
          type: "paragraph"
        };
      }
      return child;
    });
    return convertNodesDeserialize(root.children, {}, options);
  }
  const results = [];
  let startLine = root.position?.start.line ?? 1;
  const addEmptyParagraphs = (count) => {
    if (count > 0) {
      results.push(
        ...Array.from({ length: count }).map(() => ({
          children: [{ text: "" }],
          type: options.editor ? (0, import_platejs8.getPluginKey)(options.editor, import_platejs8.KEYS.p) ?? import_platejs8.KEYS.p : import_platejs8.KEYS.p
        }))
      );
    }
  };
  root.children?.forEach((child, index) => {
    const isFirstChild = index === 0;
    const isLastChild = index === root.children.length - 1;
    if (child.position) {
      const emptyLinesBefore = child.position.start.line - (isFirstChild ? startLine : startLine + 1);
      addEmptyParagraphs(emptyLinesBefore);
      const transformValue = convertNodesDeserialize([child], {}, options);
      results.push(...transformValue);
      if (isLastChild) {
        const emptyLinesAfter = root.position.end.line - child.position.end.line - 1;
        addEmptyParagraphs(emptyLinesAfter);
      }
      startLine = child.position.end.line;
    } else {
      const transformValue = convertNodesDeserialize([child], {}, options);
      results.push(...transformValue);
    }
  });
  return results;
};

// src/lib/deserializer/deserializeMd.ts
var markdownToAstProcessor = (editor, data, options) => {
  const mergedOptions = getMergedOptionsDeserialize(editor, options);
  return (0, import_unified3.unified)().use(import_remark_parse.default).use(mergedOptions.remarkPlugins ?? []).parse(data);
};
var markdownToSlateNodes = (editor, data, options) => {
  if (!options?.withoutMdx) {
    data = data.replaceAll("<br>", "<br />");
  }
  const mergedOptions = getMergedOptionsDeserialize(editor, options);
  const toSlateProcessor = (0, import_unified3.unified)().use(import_remark_parse.default).use(mergedOptions.remarkPlugins ?? []).use(remarkToSlate, mergedOptions);
  if (options?.memoize) {
    return parseMarkdownBlocks(data, options.parser).flatMap((token) => {
      if (token.type === "space") {
        return {
          ...editor.api.create.block(),
          _memo: token.raw
        };
      }
      return toSlateProcessor.processSync(token.raw).result.map((result) => {
        return {
          _memo: token.raw,
          ...result
        };
      });
    });
  }
  return toSlateProcessor.processSync(data).result;
};
var deserializeMd = (editor, data, options) => {
  let output = null;
  try {
    output = markdownToSlateNodes(editor, data, options);
  } catch (error) {
    options?.onError?.(error);
    if (!options?.withoutMdx) {
      output = markdownToSlateNodesSafely(editor, data, options);
    }
  }
  return output?.map(
    (item) => import_platejs9.TextApi.isText(item) ? {
      children: [item],
      type: (0, import_platejs9.getPluginKey)(editor, import_platejs9.KEYS.p) ?? import_platejs9.KEYS.p
    } : item
  );
};
var remarkToSlate = (
  // TODO: options
  function(options = {}) {
    this.compiler = function(node) {
      return mdastToSlate(node, options);
    };
  }
);

// src/lib/deserializer/utils/splitIncompleteMdx.ts
var isNameChar = (c) => c >= 48 && c <= 57 || // 0-9
c >= 65 && c <= 90 || // A-Z
c >= 97 && c <= 122 || // a-z
c === 45 || // -
c === 95 || // _
c === 58;
var splitIncompleteMdx = (data) => {
  const stack = [];
  const len = data.length;
  let i = 0;
  let cutPos = -1;
  while (i < len) {
    if (data.codePointAt(i) !== 60) {
      i++;
      continue;
    }
    const tagStart = i;
    i++;
    if (i >= len) {
      cutPos = tagStart;
      break;
    }
    let closing = false;
    if (data[i] === "/") {
      closing = true;
      i++;
    }
    const nameStart = i;
    while (i < len && isNameChar(data.codePointAt(i))) i++;
    if (nameStart === i) {
      cutPos = tagStart;
      break;
    }
    const tagName = data.slice(nameStart, i).toLowerCase();
    let inQuote = null;
    let selfClosing = false;
    while (i < len) {
      const ch = data[i];
      if (inQuote) {
        if (ch === inQuote) inQuote = null;
      } else {
        if (ch === '"' || ch === "'") inQuote = ch;
        else if (ch === ">") {
          selfClosing = data[i - 1] === "/";
          i++;
          break;
        }
      }
      i++;
    }
    if (i >= len) {
      cutPos = tagStart;
      break;
    }
    if (selfClosing) continue;
    if (closing) {
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].name === tagName) {
          stack.splice(j, 1);
          break;
        }
      }
    } else {
      stack.push({ name: tagName, pos: tagStart });
    }
  }
  if (stack.length > 0) {
    const firstUnmatched = stack[0].pos;
    cutPos = cutPos === -1 ? firstUnmatched : Math.min(cutPos, firstUnmatched);
  }
  return cutPos === -1 ? data : [data.slice(0, cutPos), data.slice(cutPos)];
};

// src/lib/deserializer/utils/markdownToSlateNodesSafely.ts
var markdownToSlateNodesSafely = (editor, data, options) => {
  const result = splitIncompleteMdx(data);
  if (!Array.isArray(result))
    return markdownToSlateNodes(editor, data, {
      ...options,
      withoutMdx: true
    });
  const [completeString, incompleteString] = result;
  const incompleteNodes = deserializeInlineMd(editor, incompleteString, {
    ...options,
    withoutMdx: true
  });
  const completeNodes = markdownToSlateNodes(editor, completeString, options);
  if (incompleteNodes.length === 0) {
    return completeNodes;
  }
  const newBlock = {
    children: incompleteNodes,
    type: (0, import_platejs10.getPluginType)(editor, import_platejs10.KEYS.p)
  };
  if (completeNodes.length === 0) {
    return [newBlock];
  }
  const lastBlock = completeNodes.at(-1);
  if (editor.api.isVoid(lastBlock)) {
    return [newBlock];
  }
  if (lastBlock?.children) {
    lastBlock.children.push(...incompleteNodes);
    return completeNodes;
  }
  return completeNodes;
};

// src/lib/deserializer/utils/parseMarkdownBlocks.ts
var import_marked = require("marked");
var parseMarkdownBlocks = (content, { exclude = ["space"], trim = true } = {}) => {
  let tokens = [...import_marked.marked.lexer(content)];
  if (exclude.length > 0) {
    tokens = tokens.filter((token) => !exclude.includes(token.type));
  }
  if (trim) {
    tokens = tokens.map((token) => ({
      ...token,
      raw: token.raw.trimEnd()
    }));
  }
  return tokens;
};

// src/lib/deserializer/convertNodesDeserialize.ts
var convertNodesDeserialize = (nodes, deco, options) => {
  return nodes.reduce((acc, node) => {
    if (shouldIncludeNode2(node, options)) {
      acc.push(...buildSlateNode(node, deco, options));
    }
    return acc;
  }, []);
};
var buildSlateNode = (mdastNode, deco, options) => {
  if (mdastNode.type === "mdxJsxTextElement" || mdastNode.type === "mdxJsxFlowElement") {
    const result = customMdxDeserialize(mdastNode, deco, options);
    return Array.isArray(result) ? result : [result];
  }
  const type = mdastToPlate(options.editor, mdastNode.type);
  const nodeParser = getDeserializerByKey(type, options);
  if (nodeParser) {
    const result = nodeParser(mdastNode, deco, options);
    return Array.isArray(result) ? result : [result];
  }
  return [];
};
var shouldIncludeNode2 = (node, options) => {
  const { allowedNodes, allowNode, disallowedNodes } = options;
  if (!node.type) return true;
  const type = mdastToPlate(options.editor, node.type);
  if (allowedNodes && disallowedNodes && allowedNodes.length > 0 && disallowedNodes.length > 0) {
    throw new Error("Cannot combine allowedNodes with disallowedNodes");
  }
  if (allowedNodes) {
    if (!allowedNodes.includes(type)) {
      return false;
    }
  } else if (disallowedNodes?.includes(type)) {
    return false;
  }
  if (allowNode?.deserialize) {
    return allowNode.deserialize({
      ...node,
      type
    });
  }
  return true;
};

// src/lib/deserializer/convertChildrenDeserialize.ts
var convertChildrenDeserialize = (children, deco, options) => {
  if (children.length === 0) {
    return [{ text: "" }];
  }
  return convertNodesDeserialize(children, deco, options);
};

// src/lib/deserializer/convertTextsDeserialize.ts
var import_platejs11 = require("platejs");
var convertTextsDeserialize = (mdastNode, deco, options) => {
  return mdastNode.children.reduce((acc, n) => {
    const key = mdastToPlate(options.editor, mdastNode.type);
    const type = (0, import_platejs11.getPluginType)(options.editor, key);
    acc.push(...buildSlateNode(n, { ...deco, [type]: true }, options));
    return acc;
  }, []);
};

// src/lib/MarkdownPlugin.ts
var MarkdownPlugin = (0, import_platejs12.createTSlatePlugin)({
  key: import_platejs12.KEYS.markdown,
  options: {
    allowedNodes: null,
    disallowedNodes: null,
    remarkPlugins: [],
    rules: null
  }
}).extendApi(({ editor }) => ({
  deserialize: (0, import_platejs12.bindFirst)(deserializeMd, editor),
  deserializeInline: (0, import_platejs12.bindFirst)(deserializeInlineMd, editor),
  serialize: (0, import_platejs12.bindFirst)(serializeMd, editor)
})).extend(({ api }) => ({
  parser: {
    format: "text/plain",
    deserialize: ({ data }) => api.markdown.deserialize(data),
    query: ({ data, dataTransfer }) => {
      const htmlData = dataTransfer.getData("text/html");
      if (htmlData) return false;
      const { files } = dataTransfer;
      if (!files?.length && // if content is simply a URL pass through to not break LinkPlugin
      (0, import_platejs12.isUrl)(data)) {
        return false;
      }
      return true;
    }
  }
}));

// src/lib/plugins/remarkMdx.ts
var import_remark_mdx = __toESM(require("remark-mdx"));
var remarkMdx = tagRemarkPlugin(
  import_remark_mdx.default,
  REMARK_MDX_TAG
);

// ../../node_modules/unist-util-is/lib/index.js
var convert = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(test) {
    if (test === null || test === void 0) {
      return ok;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].apply(this, parameters)) return true;
    }
    return false;
  }
}
function propsFactory(check) {
  const checkAsRecord = (
    /** @type {Record<string, unknown>} */
    check
  );
  return castFactory(all);
  function all(node) {
    const nodeAsRecord = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      node
    );
    let key;
    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(testFunction) {
  return check;
  function check(value, index, parent) {
    return Boolean(
      looksLikeANode(value) && testFunction.call(
        this,
        value,
        typeof index === "number" ? index : void 0,
        parent || void 0
      )
    );
  }
}
function ok() {
  return true;
}
function looksLikeANode(value) {
  return value !== null && typeof value === "object" && "type" in value;
}

// ../../node_modules/unist-util-visit-parents/lib/color.node.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// ../../node_modules/unist-util-visit-parents/lib/index.js
var empty = [];
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
function visitParents(tree, test, visitor, reverse) {
  let check;
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
  } else {
    check = test;
  }
  const is2 = convert(check);
  const step = reverse ? -1 : 1;
  factory(tree, void 0, [])();
  function factory(node, index, parents) {
    const value = (
      /** @type {Record<string, unknown>} */
      node && typeof node === "object" ? node : {}
    );
    if (typeof value.type === "string") {
      const name = (
        // `hast`
        typeof value.tagName === "string" ? value.tagName : (
          // `xast`
          typeof value.name === "string" ? value.name : void 0
        )
      );
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = empty;
      let subresult;
      let offset;
      let grandparents;
      if (!test || is2(node, index, parents[parents.length - 1] || void 0)) {
        result = toResult(visitor(node, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if ("children" in node && node.children) {
        const nodeAsParent = (
          /** @type {UnistParent} */
          node
        );
        if (nodeAsParent.children && result[0] !== SKIP) {
          offset = (reverse ? nodeAsParent.children.length : -1) + step;
          grandparents = parents.concat(nodeAsParent);
          while (offset > -1 && offset < nodeAsParent.children.length) {
            const child = nodeAsParent.children[offset];
            subresult = factory(child, offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
      }
      return result;
    }
  }
}
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return value === null || value === void 0 ? empty : [value];
}

// ../../node_modules/unist-util-visit/lib/index.js
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
  let reverse;
  let test;
  let visitor;
  if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
    test = void 0;
    visitor = testOrVisitor;
    reverse = visitorOrReverse;
  } else {
    test = testOrVisitor;
    visitor = visitorOrReverse;
    reverse = maybeReverse;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node, parents) {
    const parent = parents[parents.length - 1];
    const index = parent ? parent.children.indexOf(node) : void 0;
    return visitor(node, index, parent);
  }
}

// src/lib/plugins/remarkMention.ts
var remarkMention = function() {
  return (tree) => {
    visit(
      tree,
      "link",
      (node, index, parent) => {
        if (!parent || typeof index !== "number") return;
        if (node.url?.startsWith("mention:")) {
          let username = node.url.slice("mention:".length);
          username = decodeURIComponent(username);
          const displayText = node.children?.[0]?.value || username;
          const mentionNode = {
            children: [{ type: "text", value: displayText }],
            displayText,
            type: "mention",
            username
          };
          parent.children[index] = mentionNode;
        }
      }
    );
    visit(
      tree,
      "text",
      (node, index, parent) => {
        if (!parent || typeof index !== "number") return;
        const atMentionPattern = /(?:^|\s)@([a-zA-Z0-9_-]+)(?=[\s.,;:!?)]|$)/g;
        const parts = [];
        let lastIndex = 0;
        const text = node.value;
        const allMatches = [];
        let match;
        while ((match = atMentionPattern.exec(text)) !== null) {
          const mentionStart = match[0].startsWith(" ") ? match.index + 1 : match.index;
          const mentionEnd = mentionStart + match[0].length - (match[0].startsWith(" ") ? 1 : 0);
          allMatches.push({
            end: mentionEnd,
            node: {
              children: [{ type: "text", value: `@${match[1]}` }],
              type: "mention",
              username: match[1]
            },
            start: mentionStart
          });
        }
        allMatches.sort((a, b) => a.start - b.start);
        for (const matchInfo of allMatches) {
          if (matchInfo.start > lastIndex) {
            parts.push({
              type: "text",
              value: text.slice(lastIndex, matchInfo.start)
            });
          }
          parts.push(matchInfo.node);
          lastIndex = matchInfo.end;
        }
        if (lastIndex < text.length) {
          parts.push({
            type: "text",
            value: text.slice(lastIndex)
          });
        }
        if (parts.length > 0) {
          parent.children.splice(index, 1, ...parts);
        }
      }
    );
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarkdownPlugin,
  REMARK_MDX_TAG,
  basicMarkdownMarks,
  buildMdastNode,
  buildRules,
  buildSlateNode,
  columnRules,
  convertChildrenDeserialize,
  convertNodesDeserialize,
  convertNodesSerialize,
  convertTextsDeserialize,
  convertTextsSerialize,
  customMdxDeserialize,
  defaultRules,
  deserializeInlineMd,
  deserializeMd,
  fontRules,
  getCustomMark,
  getDeserializerByKey,
  getMergedOptionsDeserialize,
  getMergedOptionsSerialize,
  getRemarkPluginsWithoutMdx,
  getSerializerByKey,
  getStyleValue,
  listToMdastTree,
  markdownToAstProcessor,
  markdownToSlateNodes,
  markdownToSlateNodesSafely,
  mdastToPlate,
  mdastToSlate,
  mediaRules,
  parseAttributes,
  parseMarkdownBlocks,
  plateToMdast,
  propsToAttributes,
  remarkMdx,
  remarkMention,
  serializeInlineMd,
  serializeMd,
  splitIncompleteMdx,
  stripMarkdown,
  stripMarkdownBlocks,
  stripMarkdownInline,
  tagRemarkPlugin,
  unreachable
});
//# sourceMappingURL=index.js.map