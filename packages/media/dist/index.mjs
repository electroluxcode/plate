// src/lib/BaseAudioPlugin.ts
import { createSlatePlugin, KEYS } from "platejs";
var BaseAudioPlugin = createSlatePlugin({
  key: KEYS.audio,
  node: { isElement: true, isVoid: true }
});

// src/lib/BaseFilePlugin.ts
import { createSlatePlugin as createSlatePlugin2, KEYS as KEYS2 } from "platejs";
var BaseFilePlugin = createSlatePlugin2({
  key: KEYS2.file,
  node: { isElement: true, isVoid: true }
});

// src/lib/BaseVideoPlugin.ts
import { createSlatePlugin as createSlatePlugin3, KEYS as KEYS3 } from "platejs";
var BaseVideoPlugin = createSlatePlugin3({
  key: KEYS3.video,
  node: {
    dangerouslyAllowAttributes: ["width", "height"],
    isElement: true,
    isVoid: true
  }
});

// src/lib/image/BaseImagePlugin.ts
import {
  bindFirst,
  createTSlatePlugin,
  KEYS as KEYS5
} from "platejs";

// src/lib/image/transforms/insertImage.ts
import { KEYS as KEYS4 } from "platejs";
var insertImage = (editor, url, options = {}) => {
  const text = { text: "" };
  const image = {
    children: [text],
    type: editor.getType(KEYS4.img),
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
import { isUrl } from "platejs";
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
  if (!isUrl(url)) return false;
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
import {
  getInjectedPlugins,
  pipeInsertDataQuery
} from "platejs";
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
        const injectedPlugins = getInjectedPlugins(editor, plugin);
        if (!pipeInsertDataQuery(editor, injectedPlugins, {
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
var BaseImagePlugin = createTSlatePlugin({
  key: KEYS5.img,
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
    imageFromFiles: bindFirst(insertImageFromFiles, editor)
  }
}));

// src/lib/media/insertMedia.ts
import { KEYS as KEYS6 } from "platejs";
var insertMedia = async (editor, {
  getUrl,
  type = editor.getType(KEYS6.img),
  ...options
} = {}) => {
  const url = getUrl ? await getUrl() : window.prompt(
    `Enter the URL of the ${type === KEYS6.img ? KEYS6.img : KEYS6.mediaEmbed}`
  );
  if (!url) return;
  if (type === editor.getType(KEYS6.img)) {
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
import { createTSlatePlugin as createTSlatePlugin2, KEYS as KEYS7 } from "platejs";

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
var BaseMediaEmbedPlugin = createTSlatePlugin2({
  key: KEYS7.mediaEmbed,
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
import videoParser from "js-video-url-parser";
import { isUrl as isUrl2 } from "platejs";
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
  if (!isUrl2(url)) return;
  const videoData = videoParser.parse(url);
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
import { KEYS as KEYS8 } from "platejs";
var insertMediaEmbed = (editor, { url = "" }, options = {}) => {
  if (!editor.selection) return;
  const selectionParentEntry = editor.api.parent(editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  editor.tf.insertNodes(
    {
      children: [{ text: "" }],
      type: editor.getType(KEYS8.mediaEmbed),
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
import {
  bindFirst as bindFirst2,
  createTSlatePlugin as createTSlatePlugin3,
  KEYS as KEYS10
} from "platejs";

// src/lib/placeholder/transforms/insertPlaceholder.ts
import { KEYS as KEYS9 } from "platejs";
var insertPlaceholder = (editor, mediaType, options) => {
  editor.tf.withoutNormalizing(
    () => editor.tf.insertNodes(
      {
        children: [{ text: "" }],
        mediaType,
        type: editor.getType(KEYS9.placeholder)
      },
      options
    )
  );
};
var insertImagePlaceholder = (editor, options) => insertPlaceholder(editor, KEYS9.img, options);
var insertVideoPlaceholder = (editor, options) => insertPlaceholder(editor, KEYS9.video, options);
var insertAudioPlaceholder = (editor, options) => insertPlaceholder(editor, KEYS9.audio, options);
var insertFilePlaceholder = (editor, options) => insertPlaceholder(editor, KEYS9.file, options);

// src/lib/placeholder/transforms/setMediaNode.ts
var setMediaNode = (editor, props, options) => editor.tf.setNodes(props, options);

// src/lib/placeholder/BasePlaceholderPlugin.ts
var BasePlaceholderPlugin = createTSlatePlugin3({
  key: KEYS10.placeholder,
  node: { isElement: true, isVoid: true }
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    audioPlaceholder: bindFirst2(insertAudioPlaceholder, editor),
    filePlaceholder: bindFirst2(insertFilePlaceholder, editor),
    imagePlaceholder: bindFirst2(insertImagePlaceholder, editor),
    videoPlaceholder: bindFirst2(insertVideoPlaceholder, editor)
  }
}));
export {
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
};
//# sourceMappingURL=index.mjs.map