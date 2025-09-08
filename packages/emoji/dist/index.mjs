// src/lib/BaseEmojiPlugin.ts
import {
  withTriggerCombobox
} from "@platejs/combobox";
import {
  createSlatePlugin,
  createTSlatePlugin,
  KEYS
} from "platejs";

// src/lib/types.ts
var EmojiCategory = {
  Activity: "activity",
  Custom: "custom",
  Flags: "flags",
  Foods: "foods",
  Frequent: "frequent",
  Nature: "nature",
  Objects: "objects",
  People: "people",
  Places: "places",
  Symbols: "symbols"
};

// src/lib/constants.ts
var EMOJI_MAX_SEARCH_RESULT = 60;
var DEFAULT_EMOJI_LIBRARY = {
  aliases: {},
  categories: [
    {
      id: "people",
      emojis: ["+1"]
    }
  ],
  emojis: {
    "+1": {
      id: "+1",
      keywords: [],
      name: "Thumbs Up",
      skins: [
        {
          native: "\u{1F44D}",
          unified: "1f44d"
        },
        {
          native: "\u{1F44D}\u{1F3FB}",
          unified: "1f44d-1f3fb"
        },
        {
          native: "\u{1F44D}\u{1F3FC}",
          unified: "1f44d-1f3fc"
        },
        {
          native: "\u{1F44D}\u{1F3FD}",
          unified: "1f44d-1f3fd"
        },
        {
          native: "\u{1F44D}\u{1F3FE}",
          unified: "1f44d-1f3fe"
        },
        {
          native: "\u{1F44D}\u{1F3FF}",
          unified: "1f44d-1f3ff"
        }
      ],
      version: 1
    }
  },
  sheet: {
    cols: 1,
    rows: 1
  }
};
var defaultCategories = [
  EmojiCategory.People,
  EmojiCategory.Nature,
  EmojiCategory.Foods,
  EmojiCategory.Activity,
  EmojiCategory.Places,
  EmojiCategory.Objects,
  EmojiCategory.Symbols,
  EmojiCategory.Flags
];
var EmojiSettings = {
  buttonSize: {
    value: 36
  },
  categories: {
    value: void 0
  },
  perLine: {
    value: 8
  },
  showFrequent: {
    limit: 16,
    value: true
  }
};
var DEFAULT_FREQUENTLY_USED_EMOJI = {
  "+1": 1,
  clap: 1,
  grinning: 1,
  heart: 1,
  heart_eyes: 1,
  hugging_face: 1,
  joy: 1,
  kissing_heart: 1,
  laughing: 1,
  pray: 1,
  rocket: 1,
  scream: 1,
  see_no_evil: 1
};
var NUM_OF_CATEGORIES = Object.values(EmojiCategory).length;
var i18n = {
  categories: {
    activity: "Activity",
    custom: "Custom",
    flags: "Flags",
    foods: "Food & Drink",
    frequent: "Frequently used",
    nature: "Animals & Nature",
    objects: "Objects",
    people: "Smileys & People",
    places: "Travel & Places",
    symbols: "Symbols"
  },
  clear: "Clear",
  pick: "Pick an emoji...",
  search: "Search all emoji",
  searchNoResultsSubtitle: "That emoji couldn\u2019t be found",
  searchNoResultsTitle: "Oh no!",
  searchResult: "Search Results",
  skins: {
    "1": "Default",
    "2": "Light",
    "3": "Medium-Light",
    "4": "Medium",
    "5": "Medium-Dark",
    "6": "Dark",
    choose: "Choose default skin tone"
  }
};

// src/lib/BaseEmojiPlugin.ts
var BaseEmojiInputPlugin = createSlatePlugin({
  key: KEYS.emojiInput,
  editOnly: true,
  node: { isElement: true, isInline: true, isVoid: true }
});
var BaseEmojiPlugin = createTSlatePlugin({
  key: KEYS.emoji,
  editOnly: true,
  options: {
    data: DEFAULT_EMOJI_LIBRARY,
    trigger: ":",
    triggerPreviousCharPattern: /^\s?$/,
    createComboboxInput: () => ({
      children: [{ text: "" }],
      type: KEYS.emojiInput
    }),
    createEmojiNode: ({ skins }) => ({ text: skins[0].native })
  },
  plugins: [BaseEmojiInputPlugin]
}).overrideEditor(withTriggerCombobox);

// src/lib/transforms/insertEmoji.ts
var insertEmoji = (editor, emoji) => {
  const { createEmojiNode } = editor.getOptions(BaseEmojiPlugin);
  const emojiNode = createEmojiNode(emoji);
  editor.tf.insertNodes(emojiNode);
};

// src/lib/utils/EmojiLibrary/EmojiInlineLibrary.ts
var EmojiInlineLibrary = class {
  _emojis;
  _hash = {};
  _keys = [];
  constructor(library = DEFAULT_EMOJI_LIBRARY) {
    this._emojis = library.emojis;
    this.init();
  }
  createSearchableString(emoji) {
    const { id, keywords, name } = emoji;
    return `${id},${this.getName(name)},${keywords.join(",")}`;
  }
  getName(name) {
    return name.toLowerCase().split(" ").join(",");
  }
  init() {
    Object.values(this._emojis).forEach((emoji) => {
      const searchableString = this.createSearchableString(emoji);
      this._keys.push(searchableString);
      this._hash[searchableString] = emoji.id;
    });
  }
  getEmoji(id) {
    return this._emojis[id];
  }
  getEmojiId(key) {
    return this._hash[key];
  }
  get keys() {
    return this._keys;
  }
};

// src/lib/utils/Grid/Grid.ts
var Grid = class {
  grid = /* @__PURE__ */ new Map();
  rowsCount = 1;
  sectionsIds = [];
  addSection(sectionId, section, elements) {
    section.setIndexRowStart(this.rowsCount).addElements(elements[sectionId]);
    this.rowsCount += section.rowsNum;
    this.grid.set(sectionId, section);
    this.sectionsIds.push(sectionId);
    return this;
  }
  indexOf(sectionId) {
    return this.sectionsIds.indexOf(sectionId);
  }
  section(sectionId) {
    return this.grid.get(sectionId);
  }
  sections() {
    return Array.from(this.grid.values());
  }
  updateSection(sectionId, elements) {
    if (this.grid.has(sectionId)) {
      const section = this.grid.get(sectionId);
      section.updateElements(elements);
    }
    return this;
  }
  get size() {
    return this.grid.size;
  }
};

// src/lib/utils/Grid/GridSection.ts
var AGridSection = class {
  constructor(_id, perLine = 8) {
    this._id = _id;
    this.perLine = perLine;
    this.createRootRef();
  }
  _indexRowStart = 0;
  _root;
  _rowsNum = 0;
  rows = [];
  addRow(elements, lastPosition) {
    const start = lastPosition * this.perLine;
    const end = start + this.perLine;
    this.rows.push({
      id: this._indexRowStart + lastPosition,
      elements: elements.slice(start, end)
    });
  }
  initRows(elements) {
    let i = 0;
    while (i < this.rowsNum) {
      this.addRow(elements, i++);
    }
  }
  addElements(elements) {
    this._rowsNum = Math.ceil(elements.length / this.perLine);
    this.initRows(elements);
    return this;
  }
  getRows() {
    return this.rows;
  }
  setIndexRowStart(start) {
    this._indexRowStart = start;
    return this;
  }
  updateElements(elements) {
    this.rows = [];
    this.addElements(elements);
    return this;
  }
  get id() {
    return this._id;
  }
  get root() {
    return this._root;
  }
  get rowsNum() {
    return this._rowsNum;
  }
};

// src/lib/utils/IndexSearch/IndexSearch.ts
var AIndexSearch = class {
  constructor(library) {
    this.library = library;
  }
  input;
  maxResult = EMOJI_MAX_SEARCH_RESULT;
  result = [];
  scores = {};
  createSearchResult(value) {
    this.scores = {};
    this.result = [];
    for (const key of this.library.keys) {
      const score = key.indexOf(`${value}`);
      if (score === -1) continue;
      const emojiId = this.library.getEmojiId(key);
      this.result.push(emojiId);
      this.scores[emojiId] || (this.scores[emojiId] = 0);
      this.scores[emojiId] += emojiId === value ? 0 : score + 1;
    }
  }
  sortResultByScores(result, scores) {
    result.sort((a, b) => {
      const aScore = scores[a];
      const bScore = scores[b];
      if (aScore === bScore) {
        return a.localeCompare(b);
      }
      return aScore - bScore;
    });
  }
  get() {
    const emojis = [];
    for (const key of this.result) {
      const emoji = this.library?.getEmoji(key);
      emojis.push(emoji);
      if (emojis.length >= this.maxResult) break;
    }
    return emojis;
  }
  getEmoji() {
    return this.get()[0];
  }
  hasFound(exact = false) {
    if (exact && this.input) {
      return this.result.includes(this.input);
    }
    return this.result.length > 0;
  }
  search(input) {
    this.input = input.toLowerCase();
    const value = this.input;
    if (value) {
      this.createSearchResult(value);
      this.sortResultByScores(this.result, this.scores);
    } else {
      this.scores = {};
      this.result = [];
    }
    return this;
  }
};

// src/lib/utils/IndexSearch/EmojiFloatingIndexSearch.ts
var EmojiFloatingIndexSearch = class _EmojiFloatingIndexSearch extends AIndexSearch {
  constructor(library) {
    super(library);
    this.library = library;
  }
  static instance;
  static getInstance(library) {
    if (!_EmojiFloatingIndexSearch.instance) {
      _EmojiFloatingIndexSearch.instance = new _EmojiFloatingIndexSearch(library);
    }
    return _EmojiFloatingIndexSearch.instance;
  }
};

// src/lib/utils/IndexSearch/EmojiInlineIndexSearch.ts
var EmojiInlineIndexSearch = class _EmojiInlineIndexSearch extends AIndexSearch {
  constructor(library) {
    super(library);
    this.library = library;
  }
  static instance;
  static getInstance(data = DEFAULT_EMOJI_LIBRARY) {
    if (!_EmojiInlineIndexSearch.instance) {
      _EmojiInlineIndexSearch.instance = new _EmojiInlineIndexSearch(
        new EmojiInlineLibrary(data)
      );
    }
    return _EmojiInlineIndexSearch.instance;
  }
};
export {
  AGridSection,
  AIndexSearch,
  BaseEmojiInputPlugin,
  BaseEmojiPlugin,
  DEFAULT_EMOJI_LIBRARY,
  DEFAULT_FREQUENTLY_USED_EMOJI,
  EMOJI_MAX_SEARCH_RESULT,
  EmojiCategory,
  EmojiFloatingIndexSearch,
  EmojiInlineIndexSearch,
  EmojiInlineLibrary,
  EmojiSettings,
  Grid,
  NUM_OF_CATEGORIES,
  defaultCategories,
  i18n,
  insertEmoji
};
//# sourceMappingURL=index.mjs.map