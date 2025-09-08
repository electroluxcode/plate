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
  BaseAudioPlugin: () => BaseAudioPlugin,
  BaseFilePlugin: () => BaseFilePlugin,
  BaseImagePlugin: () => BaseImagePlugin,
  BaseMediaEmbedPlugin: () => BaseMediaEmbedPlugin,
  BasePlaceholderPlugin: () => BasePlaceholderPlugin,
  BaseVideoPlugin: () => BaseVideoPlugin,
  VIDEO_PROVIDERS: () => VIDEO_PROVIDERS,
  insertAudioPlaceholder: () => insertAudioPlaceholder,
  insertFilePlaceholder: () => insertFilePlaceholder,
  insertImage: () => insertImage,
  insertImageFromFiles: () => insertImageFromFiles,
  insertImagePlaceholder: () => insertImagePlaceholder,
  insertMedia: () => insertMedia,
  insertMediaEmbed: () => insertMediaEmbed,
  insertPlaceholder: () => insertPlaceholder,
  insertVideoPlaceholder: () => insertVideoPlaceholder,
  isImageUrl: () => isImageUrl,
  parseIframeUrl: () => parseIframeUrl,
  parseMediaUrl: () => parseMediaUrl,
  parseTwitterUrl: () => parseTwitterUrl,
  parseVideoUrl: () => parseVideoUrl,
  setMediaNode: () => setMediaNode,
  withImageEmbed: () => withImageEmbed,
  withImageUpload: () => withImageUpload
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseAudioPlugin.ts
var import_platejs = require("platejs");
var BaseAudioPlugin = (0, import_platejs.createSlatePlugin)({
  key: import_platejs.KEYS.audio,
  node: { isElement: true, isVoid: true }
});

// src/lib/BaseFilePlugin.ts
var import_platejs2 = require("platejs");
var BaseFilePlugin = (0, import_platejs2.createSlatePlugin)({
  key: import_platejs2.KEYS.file,
  node: { isElement: true, isVoid: true }
});

// src/lib/BaseVideoPlugin.ts
var import_platejs3 = require("platejs");
var BaseVideoPlugin = (0, import_platejs3.createSlatePlugin)({
  key: import_platejs3.KEYS.video,
  node: {
    dangerouslyAllowAttributes: ["width", "height"],
    isElement: true,
    isVoid: true
  }
});

// src/lib/image/BaseImagePlugin.ts
var import_platejs7 = require("platejs");

// src/lib/image/transforms/insertImage.ts
var import_platejs4 = require("platejs");
var insertImage = (editor, url, options = {}) => {
  const text = { text: "" };
  const image = {
    children: [text],
    type: editor.getType(import_platejs4.KEYS.img),
    url
  };
  editor.tf.insertNodes(image, {
    nextBlock: true,
    ...options
  });
};

// src/lib/image/transforms/insertImageFromFiles.ts
var insertImageFromFiles = (editor, files, options = {}) => {
  for (const file of files) {
    const reader = new FileReader();
    const [mime] = file.type.split("/");
    if (mime === "image") {
      reader.addEventListener("load", async () => {
        if (!reader.result) {
          return;
        }
        const uploadImage = editor.getOptions(BaseImagePlugin).uploadImage;
        const uploadedUrl = uploadImage ? await uploadImage(reader.result) : reader.result;
        insertImage(editor, uploadedUrl, options);
      });
      reader.readAsDataURL(file);
    }
  }
};

// src/lib/image/utils/isImageUrl.ts
var import_platejs5 = require("platejs");
var imageExtensions = /* @__PURE__ */ new Set([
  "3dv",
  "ai",
  "amf",
  "art",
  "art",
  "ase",
  "awg",
  "blp",
  "bmp",
  "bw",
  "bw",
  "cd5",
  "cdr",
  "cgm",
  "cit",
  "cmx",
  "cpt",
  "cr2",
  "cur",
  "cut",
  "dds",
  "dib",
  "djvu",
  "dxf",
  "e2d",
  "ecw",
  "egt",
  "egt",
  "emf",
  "eps",
  "exif",
  "fs",
  "gbr",
  "gif",
  "gpl",
  "grf",
  "hdp",
  "icns",
  "ico",
  "iff",
  "iff",
  "int",
  "int",
  "inta",
  "jfif",
  "jng",
  "jp2",
  "jpeg",
  "jpg",
  "jps",
  "jxr",
  "lbm",
  "lbm",
  "liff",
  "max",
  "miff",
  "mng",
  "msp",
  "nitf",
  "nrrd",
  "odg",
  "ota",
  "pam",
  "pbm",
  "pc1",
  "pc2",
  "pc3",
  "pcf",
  "pct",
  "pcx",
  "pcx",
  "pdd",
  "pdn",
  "pgf",
  "pgm",
  "PI1",
  "PI2",
  "PI3",
  "pict",
  "png",
  "pnm",
  "pns",
  "ppm",
  "psb",
  "psd",
  "psp",
  "px",
  "pxm",
  "pxr",
  "qfx",
  "ras",
  "raw",
  "rgb",
  "rgb",
  "rgba",
  "rle",
  "sct",
  "sgi",
  "sgi",
  "sid",
  "stl",
  "sun",
  "svg",
  "sxd",
  "tga",
  "tga",
  "tif",
  "tiff",
  "v2d",
  "vnd",
  "vrml",
  "vtf",
  "wdp",
  "webp",
  "wmf",
  "x3d",
  "xar",
  "xbm",
  "xcf",
  "xpm"
]);
var isImageUrl = (url) => {
  if (!(0, import_platejs5.isUrl)(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.has(ext);
};

// src/lib/image/withImageEmbed.ts
var withImageEmbed = ({
  editor,
  getOptions,
  tf: { insertData }
}) => ({
  transforms: {
    insertData(dataTransfer) {
      if (getOptions().disableEmbedInsert) {
        return insertData(dataTransfer);
      }
      const text = dataTransfer.getData("text/plain");
      if (isImageUrl(text)) {
        insertImage(editor, text);
        return;
      }
      insertData(dataTransfer);
    }
  }
});

// src/lib/image/withImageUpload.ts
var import_platejs6 = require("platejs");
var withImageUpload = ({
  editor,
  getOptions,
  plugin,
  tf: { insertData }
}) => ({
  transforms: {
    insertData(dataTransfer) {
      if (getOptions().disableUploadInsert) {
        return insertData(dataTransfer);
      }
      const mimeType = "text/plain";
      const text = dataTransfer.getData(mimeType);
      const { files } = dataTransfer;
      if (!text && files && files.length > 0) {
        const injectedPlugins = (0, import_platejs6.getInjectedPlugins)(editor, plugin);
        if (!(0, import_platejs6.pipeInsertDataQuery)(editor, injectedPlugins, {
          data: text,
          dataTransfer,
          mimeType
        })) {
          return insertData(dataTransfer);
        }
        insertImageFromFiles(editor, files);
      } else {
        return insertData(dataTransfer);
      }
    }
  }
});

// src/lib/image/BaseImagePlugin.ts
var BaseImagePlugin = (0, import_platejs7.createTSlatePlugin)({
  key: import_platejs7.KEYS.img,
  node: {
    dangerouslyAllowAttributes: ["alt", "width", "height"],
    isElement: true,
    isVoid: true
  },
  parsers: {
    html: {
      deserializer: {
        rules: [
          {
            validNodeName: "IMG"
          }
        ],
        parse: ({ element, type }) => ({
          type,
          url: element.getAttribute("src")
        })
      }
    }
  }
}).overrideEditor(withImageUpload).overrideEditor(withImageEmbed).extendEditorTransforms(({ editor }) => ({
  insert: {
    imageFromFiles: (0, import_platejs7.bindFirst)(insertImageFromFiles, editor)
  }
}));

// src/lib/media/insertMedia.ts
var import_platejs8 = require("platejs");
var insertMedia = async (editor, {
  getUrl,
  type = editor.getType(import_platejs8.KEYS.img),
  ...options
} = {}) => {
  const url = getUrl ? await getUrl() : window.prompt(
    `Enter the URL of the ${type === import_platejs8.KEYS.img ? import_platejs8.KEYS.img : import_platejs8.KEYS.mediaEmbed}`
  );
  if (!url) return;
  if (type === editor.getType(import_platejs8.KEYS.img)) {
    insertImage(editor, url, options);
  } else {
    insertMediaEmbed(editor, { url }, options);
  }
};

// src/lib/media/parseMediaUrl.ts
var allowedProtocols = /* @__PURE__ */ new Set(["http:", "https:"]);
var parseMediaUrl = (url, {
  urlParsers
}) => {
  const embed = (() => {
    for (const parser of urlParsers) {
      const data = parser(url);
      if (data) {
        return data;
      }
    }
  })();
  if (embed?.url) {
    try {
      const { protocol } = new URL(embed.url);
      if (!allowedProtocols.has(protocol)) {
        return void 0;
      }
    } catch {
      console.warn("Could not parse URL: " + embed.url);
      return void 0;
    }
  }
  return embed;
};

// src/lib/media-embed/BaseMediaEmbedPlugin.ts
var import_platejs9 = require("platejs");

// src/lib/media-embed/parseIframeUrl.ts
var parseIframeUrl = (url) => {
  if (!url.startsWith("http")) {
    const regexMatchSrc = /src=".*?"/;
    const regexGroupQuotes = /"([^"]*)"/;
    const src = regexMatchSrc.exec(url)?.[0];
    const returnString = src?.match(regexGroupQuotes)?.[1];
    if (returnString) {
      url = returnString;
    }
  }
  return url;
};

// src/lib/media-embed/BaseMediaEmbedPlugin.ts
var BaseMediaEmbedPlugin = (0, import_platejs9.createTSlatePlugin)({
  key: import_platejs9.KEYS.mediaEmbed,
  node: { isElement: true, isVoid: true },
  options: {
    transformUrl: parseIframeUrl
  },
  parsers: {
    html: {
      deserializer: {
        rules: [
          {
            validNodeName: "IFRAME"
          }
        ],
        parse: ({ element, type }) => {
          const url = element.getAttribute("src");
          if (url) {
            return {
              type,
              url
            };
          }
        }
      }
    }
  }
});

// src/lib/media-embed/parseTwitterUrl.ts
var twitterRegex = /^https?:\/\/(?:twitter|x)\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;
var TWITTER_ID_INDEX = 3;
var parseTwitterUrl = (url) => {
  const match = twitterRegex.exec(url);
  if (match) {
    return {
      id: match[TWITTER_ID_INDEX],
      provider: "twitter",
      url
    };
  }
};

// src/lib/media-embed/parseVideoUrl.ts
var import_js_video_url_parser = __toESM(require("js-video-url-parser"));
var import_platejs10 = require("platejs");
var YOUTUBE_PREFIX = "https://www.youtube.com/embed/";
var VIMEO_PREFIX = "https://player.vimeo.com/video/";
var DAILYMOTION_PREFIX = "https://www.dailymotion.com/embed/video/";
var YOUKU_PREFIX = "https://player.youku.com/embed/";
var COUB_PREFIX = "https://coub.com/embed/";
var VIDEO_PROVIDERS = [
  "youtube",
  "vimeo",
  "dailymotion",
  "youku",
  "coub"
];
var parseVideoUrl = (url) => {
  if (!(0, import_platejs10.isUrl)(url)) return;
  const videoData = import_js_video_url_parser.default.parse(url);
  if (videoData?.provider && videoData.id) {
    const { id, provider } = videoData;
    const providerUrls = {
      coub: `${COUB_PREFIX}${id}`,
      dailymotion: `${DAILYMOTION_PREFIX}${id}`,
      vimeo: `${VIMEO_PREFIX}${id}`,
      youku: `${YOUKU_PREFIX}${id}`,
      youtube: `${YOUTUBE_PREFIX}${id}`
    };
    return {
      id,
      provider,
      url: providerUrls[provider]
    };
  }
};

// src/lib/media-embed/transforms/insertMediaEmbed.ts
var import_platejs11 = require("platejs");
var insertMediaEmbed = (editor, { url = "" }, options = {}) => {
  if (!editor.selection) return;
  const selectionParentEntry = editor.api.parent(editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      type: editor.getType(import_platejs11.KEYS.mediaEmbed),
      url
    },
    {
      at: path,
      nextBlock: true,
      ...options
    }
  );
};

// src/lib/placeholder/BasePlaceholderPlugin.ts
var import_platejs13 = require("platejs");

// src/lib/placeholder/transforms/insertPlaceholder.ts
var import_platejs12 = require("platejs");
var insertPlaceholder = (editor, mediaType, options) => {
  editor.tf.withoutNormalizing(
    () => editor.tf.insertNodes(
      {
        children: [{ text: "" }],
        mediaType,
        type: editor.getType(import_platejs12.KEYS.placeholder)
      },
      options
    )
  );
};
var insertImagePlaceholder = (editor, options) => insertPlaceholder(editor, import_platejs12.KEYS.img, options);
var insertVideoPlaceholder = (editor, options) => insertPlaceholder(editor, import_platejs12.KEYS.video, options);
var insertAudioPlaceholder = (editor, options) => insertPlaceholder(editor, import_platejs12.KEYS.audio, options);
var insertFilePlaceholder = (editor, options) => insertPlaceholder(editor, import_platejs12.KEYS.file, options);

// src/lib/placeholder/transforms/setMediaNode.ts
var setMediaNode = (editor, props, options) => editor.tf.setNodes(props, options);

// src/lib/placeholder/BasePlaceholderPlugin.ts
var BasePlaceholderPlugin = (0, import_platejs13.createTSlatePlugin)({
  key: import_platejs13.KEYS.placeholder,
  node: { isElement: true, isVoid: true }
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    audioPlaceholder: (0, import_platejs13.bindFirst)(insertAudioPlaceholder, editor),
    filePlaceholder: (0, import_platejs13.bindFirst)(insertFilePlaceholder, editor),
    imagePlaceholder: (0, import_platejs13.bindFirst)(insertImagePlaceholder, editor),
    videoPlaceholder: (0, import_platejs13.bindFirst)(insertVideoPlaceholder, editor)
  }
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseAudioPlugin,
  BaseFilePlugin,
  BaseImagePlugin,
  BaseMediaEmbedPlugin,
  BasePlaceholderPlugin,
  BaseVideoPlugin,
  VIDEO_PROVIDERS,
  insertAudioPlaceholder,
  insertFilePlaceholder,
  insertImage,
  insertImageFromFiles,
  insertImagePlaceholder,
  insertMedia,
  insertMediaEmbed,
  insertPlaceholder,
  insertVideoPlaceholder,
  isImageUrl,
  parseIframeUrl,
  parseMediaUrl,
  parseTwitterUrl,
  parseVideoUrl,
  setMediaNode,
  withImageEmbed,
  withImageUpload
});
//# sourceMappingURL=index.js.map