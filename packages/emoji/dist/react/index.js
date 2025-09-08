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

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  EmojiFloatingGrid: () => EmojiFloatingGrid,
  EmojiFloatingGridBuilder: () => EmojiFloatingGridBuilder,
  EmojiFloatingLibrary: () => EmojiFloatingLibrary,
  EmojiGridSectionWithRoot: () => EmojiGridSectionWithRoot,
  EmojiInputPlugin: () => EmojiInputPlugin,
  EmojiPickerState: () => EmojiPickerState,
  EmojiPlugin: () => EmojiPlugin,
  FrequentEmojiStorage: () => FrequentEmojiStorage,
  LocalStorage: () => LocalStorage,
  observeCategories: () => observeCategories,
  useEmojiDropdownMenuState: () => useEmojiDropdownMenuState,
  useEmojiPicker: () => useEmojiPicker
});
module.exports = __toCommonJS(react_exports);

// src/react/EmojiPlugin.tsx
var import_react = require("platejs/react");

// src/lib/BaseEmojiPlugin.ts
var import_combobox = require("@platejs/combobox");
var import_platejs = require("platejs");

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
var BaseEmojiInputPlugin = (0, import_platejs.createSlatePlugin)({
  key: import_platejs.KEYS.emojiInput,
  editOnly: true,
  node: { isElement: true, isInline: true, isVoid: true }
});
var BaseEmojiPlugin = (0, import_platejs.createTSlatePlugin)({
  key: import_platejs.KEYS.emoji,
  editOnly: true,
  options: {
    data: DEFAULT_EMOJI_LIBRARY,
    trigger: ":",
    triggerPreviousCharPattern: /^\s?$/,
    createComboboxInput: () => ({
      children: [{ text: "" }],
      type: import_platejs.KEYS.emojiInput
    }),
    createEmojiNode: ({ skins }) => ({ text: skins[0].native })
  },
  plugins: [BaseEmojiInputPlugin]
}).overrideEditor(import_combobox.withTriggerCombobox);

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

// src/react/EmojiPlugin.tsx
var EmojiInputPlugin = (0, import_react.toPlatePlugin)(BaseEmojiInputPlugin);
var EmojiPlugin = (0, import_react.toPlatePlugin)(BaseEmojiPlugin, {
  plugins: [EmojiInputPlugin]
});

// src/react/hooks/useEmojiDropdownMenuState.ts
var import_react6 = require("platejs/react");

// src/react/storage/LocalStorage.ts
var LocalStorage = class {
  constructor(key, defaultValue) {
    this.key = key;
    this.defaultValue = defaultValue;
  }
  get() {
    let value = this.defaultValue;
    if (typeof window === "undefined") return value;
    const valueInLocalStorage = window.localStorage.getItem(this.key);
    if (valueInLocalStorage) {
      try {
        value = JSON.parse(valueInLocalStorage);
      } catch {
        window.localStorage.removeItem(this.key);
      }
    }
    return value;
  }
  set(value) {
    window.localStorage.setItem(this.key, JSON.stringify(value));
  }
};

// src/react/storage/FrequentEmojiStorage.ts
var FrequentEmojiStorage = class {
  constructor(props, defaultValue = DEFAULT_FREQUENTLY_USED_EMOJI) {
    this.defaultValue = defaultValue;
    this.limit = props.limit ?? this.limit;
    const key = `${props.prefix ?? this.prefix}:${props.key ?? this.key}`;
    this.localStorage = new LocalStorage(key, defaultValue);
  }
  key = EmojiCategory.Frequent;
  limit = 8;
  localStorage;
  prefix = "emoji";
  get() {
    const data = this.localStorage.get();
    return Object.fromEntries(
      Object.keys(data).sort((a, b) => data[b] - data[a]).map((key) => [key, data[key]])
    );
  }
  getList() {
    return Object.keys(this.get()).splice(0, this.limit);
  }
  set(value) {
    this.localStorage.set(value);
  }
  update(emojiId) {
    const prevEmojis = this.localStorage.get();
    const count = prevEmojis[emojiId] ? prevEmojis[emojiId] + 1 : 1;
    const emojis = {
      ...prevEmojis,
      [emojiId]: count
    };
    this.localStorage.set(emojis);
    return emojis;
  }
};

// src/react/utils/EmojiObserver.ts
var setVisibleSections = (entries, visibleSections) => {
  for (const entry of entries) {
    const id = entry.target.dataset.id;
    visibleSections.set(id, entry.isIntersecting);
  }
};
var getSectionInFocus = (visibleSections) => {
  for (const [id, ratio] of visibleSections) {
    if (ratio) {
      return id;
    }
  }
};
var observeCategories = ({
  ancestorRef,
  emojiLibrary,
  setFocusedAndVisibleSections
}) => {
  const observerOptions = {
    root: ancestorRef.current,
    threshold: 0
  };
  const visibleSections = /* @__PURE__ */ new Map();
  const observer = new IntersectionObserver((entries) => {
    setVisibleSections(entries, visibleSections);
    const focusedSectionId = getSectionInFocus(visibleSections);
    focusedSectionId && setFocusedAndVisibleSections(visibleSections, focusedSectionId);
  }, observerOptions);
  for (const section of emojiLibrary.getGrid().sections()) {
    if (section.root.current) observer.observe(section.root.current);
  }
  return observer;
};

// src/react/utils/EmojiPickerState.ts
var import_react2 = __toESM(require("react"));
var initialState = {
  emoji: void 0,
  focusedCategory: void 0,
  frequentEmoji: void 0,
  hasFound: false,
  isOpen: false,
  isSearching: false,
  searchResult: [],
  searchValue: "",
  visibleCategories: /* @__PURE__ */ new Map()
};
var EmojiPickerState = () => {
  const [cache, dispatch] = import_react2.default.useReducer(
    (state, action) => {
      const { payload, type } = action;
      switch (type) {
        case "CLEAR_SEARCH": {
          return {
            ...state,
            focusedCategory: EmojiCategory.Frequent,
            hasFound: false,
            isSearching: false,
            searchValue: ""
          };
        }
        case "SET_CLOSE": {
          return {
            ...state,
            emoji: void 0,
            isOpen: false
          };
        }
        case "SET_EMOJI":
        case "SET_FOCUSED_AND_VISIBLE_CATEGORIES":
        case "SET_SEARCH": {
          return { ...state, ...payload };
        }
        case "SET_FOCUSED_CATEGORY": {
          return {
            ...state,
            ...payload,
            hasFound: false,
            isSearching: false,
            searchValue: ""
          };
        }
        case "SET_OPEN": {
          return {
            ...state,
            isOpen: true
          };
        }
        case "UPDATE_FREQUENT_EMOJIS": {
          return {
            ...state,
            ...payload,
            emoji: void 0
          };
        }
        case "UPDATE_SEARCH_RESULT": {
          return {
            ...state,
            ...payload,
            focusedCategory: void 0,
            isSearching: true
          };
        }
        default: {
          throw new Error(`Unhandled action type: ${type}`);
        }
      }
    },
    initialState
  );
  return [cache, dispatch];
};

// src/react/utils/EmojiLibrary/EmojiFloatingGrid.ts
var import_react3 = __toESM(require("react"));
var EmojiFloatingGrid = class extends Grid {
  createRootRef() {
    return import_react3.default.createRef();
  }
};
var EmojiGridSectionWithRoot = class extends AGridSection {
  createRootRef() {
    this._root = import_react3.default.createRef();
  }
};

// src/react/utils/EmojiLibrary/EmojiFloatingGridBuilder.ts
var EmojiFloatingGridBuilder = class {
  constructor(localStorage, sections, elements, settings) {
    this.localStorage = localStorage;
    this.sections = sections;
    this.elements = elements;
    this.settings = settings;
  }
  grid = new EmojiFloatingGrid();
  addFrequent() {
    if (this.settings.showFrequent.value) {
      const id = "frequent";
      this.grid.addSection(
        id,
        new EmojiGridSectionWithRoot(id, this.settings.perLine.value),
        {
          [id]: this.localStorage.getList()
        }
      );
    }
  }
  build() {
    if (this.elements.frequent) {
      this.addFrequent();
    }
    this.sections.forEach((id) => {
      if (this.elements[id]?.length) {
        this.grid.addSection(
          id,
          new EmojiGridSectionWithRoot(id, this.settings.perLine.value),
          this.elements
        );
      }
    });
    return this.grid;
  }
};

// src/react/utils/EmojiLibrary/EmojiFloatingLibrary.ts
var EmojiFloatingLibrary = class _EmojiFloatingLibrary extends EmojiInlineLibrary {
  constructor(settings, localStorage, library = DEFAULT_EMOJI_LIBRARY) {
    super(library);
    this.settings = settings;
    this.localStorage = localStorage;
    this.library = library;
    this.categories = settings.categories.value ?? this.categories;
    this.initEmojis(library.categories);
    this.grid = new EmojiFloatingGridBuilder(
      this.localStorage,
      this.categories,
      this.emojis,
      settings
    ).build();
  }
  static instance;
  categories = defaultCategories;
  emojis = {};
  grid;
  static getInstance(settings, localStorage, library = DEFAULT_EMOJI_LIBRARY) {
    if (!_EmojiFloatingLibrary.instance) {
      _EmojiFloatingLibrary.instance = new _EmojiFloatingLibrary(
        settings,
        localStorage,
        library
      );
    }
    return _EmojiFloatingLibrary.instance;
  }
  initEmojis(categoriesLibrary) {
    for (const category of categoriesLibrary) {
      this.emojis[category.id] = category.emojis;
    }
  }
  getGrid() {
    return this.grid;
  }
  indexOf(focusedCategory) {
    const index = this.grid.indexOf(focusedCategory);
    return index < 1 ? 0 : index;
  }
  updateFrequentCategory(emojiId) {
    this.localStorage.update(emojiId);
    this.grid.updateSection(
      EmojiCategory.Frequent,
      this.localStorage.getList()
    );
  }
};

// src/react/hooks/useEmojiPicker.ts
var import_react4 = __toESM(require("react"));
var import_react5 = require("platejs/react");
var useEmojiPicker = ({
  closeOnSelect,
  emojiLibrary,
  indexSearch
}) => {
  const editor = (0, import_react5.useEditorRef)();
  const [state, dispatch] = EmojiPickerState();
  const refs = import_react4.default.useRef({
    content: import_react4.default.createRef(),
    contentRoot: import_react4.default.createRef()
  });
  const setIsOpen = import_react4.default.useCallback(
    (isOpen) => {
      dispatch({
        type: isOpen ? "SET_OPEN" : "SET_CLOSE"
      });
    },
    [dispatch]
  );
  const setFocusedAndVisibleSections = import_react4.default.useCallback(
    (visibleSections, categoryId) => {
      dispatch({
        payload: {
          focusedCategory: categoryId,
          visibleCategories: visibleSections
        },
        type: "SET_FOCUSED_AND_VISIBLE_CATEGORIES"
      });
    },
    [dispatch]
  );
  const handleSearchInput = import_react4.default.useCallback(
    (input) => {
      const value = String(input).replaceAll(/\s/g, "");
      if (!value && !input) {
        dispatch({ type: "CLEAR_SEARCH" });
        return;
      }
      const hasFound = indexSearch.search(value).hasFound();
      dispatch({
        payload: {
          hasFound,
          searchResult: indexSearch.get(),
          searchValue: value
        },
        type: "UPDATE_SEARCH_RESULT"
      });
    },
    [dispatch, indexSearch]
  );
  const setSearch = import_react4.default.useCallback(
    (value) => {
      value ? handleSearchInput(value) : dispatch({ type: "CLEAR_SEARCH" });
    },
    [dispatch, handleSearchInput]
  );
  const clearSearch = import_react4.default.useCallback(() => {
    dispatch({ type: "CLEAR_SEARCH" });
  }, [dispatch]);
  const onMouseOver = import_react4.default.useCallback(
    (emoji) => {
      dispatch({ payload: { emoji }, type: "SET_EMOJI" });
    },
    [dispatch]
  );
  const updateFrequentEmojis = import_react4.default.useCallback(
    (emojiId) => {
      emojiLibrary.updateFrequentCategory(emojiId);
      dispatch({
        payload: {
          frequentEmoji: emojiId,
          isOpen: closeOnSelect ? false : state.isOpen
        },
        type: "UPDATE_FREQUENT_EMOJIS"
      });
    },
    [closeOnSelect, dispatch, emojiLibrary, state.isOpen]
  );
  const onSelectEmoji = import_react4.default.useCallback(
    (emoji) => {
      insertEmoji(editor, emoji);
      updateFrequentEmojis(emoji.id);
    },
    [editor, updateFrequentEmojis]
  );
  const handleCategoryClick = import_react4.default.useCallback(
    (categoryId) => {
      dispatch({
        payload: { focusedCategory: categoryId },
        type: "SET_FOCUSED_CATEGORY"
      });
      const getSectionPositionToScrollIntoView = () => {
        const trashHold = 1;
        const section = emojiLibrary.getGrid().section(categoryId);
        const contentRootScrollTop = refs.current.contentRoot.current?.scrollTop ?? 0;
        const contentRootTopPosition = refs.current.contentRoot.current?.getBoundingClientRect().top ?? 0;
        const sectionTopPosition = section?.root.current?.getBoundingClientRect().top ?? 0;
        return trashHold + contentRootScrollTop + sectionTopPosition - contentRootTopPosition;
      };
      if (refs.current.contentRoot.current) {
        refs.current.contentRoot.current.scrollTop = getSectionPositionToScrollIntoView();
      }
    },
    [dispatch, emojiLibrary]
  );
  import_react4.default.useEffect(() => {
    if (state.isOpen && !state.isSearching) {
      setTimeout(() => {
        observeCategories({
          ancestorRef: refs.current.contentRoot,
          emojiLibrary,
          setFocusedAndVisibleSections
        });
      }, 0);
    }
  }, [
    emojiLibrary,
    state.isOpen,
    state.isSearching,
    setFocusedAndVisibleSections
  ]);
  return {
    clearSearch,
    emoji: state.emoji,
    emojiLibrary,
    i18n,
    refs,
    setIsOpen,
    setSearch,
    handleCategoryClick,
    onMouseOver,
    onSelectEmoji,
    ...state
  };
};

// src/react/hooks/useEmojiDropdownMenuState.ts
function useEmojiDropdownMenuState({
  closeOnSelect = true,
  settings = EmojiSettings
} = {}) {
  const data = (0, import_react6.usePluginOption)(EmojiPlugin, "data");
  const [emojiLibrary, indexSearch] = (0, import_react6.useStableMemo)(() => {
    const frequentEmojiStorage = new FrequentEmojiStorage({
      limit: settings.showFrequent.limit
    });
    const emojiLibrary2 = EmojiFloatingLibrary.getInstance(
      settings,
      frequentEmojiStorage,
      data
    );
    const indexSearch2 = EmojiFloatingIndexSearch.getInstance(emojiLibrary2);
    return [emojiLibrary2, indexSearch2];
  }, [settings]);
  const { isOpen, setIsOpen, ...emojiPickerState } = useEmojiPicker({
    closeOnSelect,
    emojiLibrary,
    indexSearch
  });
  return {
    emojiPickerState,
    isOpen,
    setIsOpen
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiFloatingGrid,
  EmojiFloatingGridBuilder,
  EmojiFloatingLibrary,
  EmojiGridSectionWithRoot,
  EmojiInputPlugin,
  EmojiPickerState,
  EmojiPlugin,
  FrequentEmojiStorage,
  LocalStorage,
  observeCategories,
  useEmojiDropdownMenuState,
  useEmojiPicker
});
//# sourceMappingURL=index.js.map