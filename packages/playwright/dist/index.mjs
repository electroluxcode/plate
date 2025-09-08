// src/PlaywrightPlugin.ts
import { KEYS } from "platejs";
import { createPlatePlugin } from "platejs/react";

// src/usePlaywrightAdapter.tsx
import { useEffect } from "react";
import { NodeApi } from "platejs";
import { useEditorRef } from "platejs/react";
var EDITABLE_TO_EDITOR = /* @__PURE__ */ new WeakMap();
var platePlaywrightAdapter = {
  EDITABLE_TO_EDITOR,
  getNode: NodeApi.get
};
var usePlaywrightAdapter = () => {
  const editor = useEditorRef();
  useEffect(() => {
    window.platePlaywrightAdapter = platePlaywrightAdapter;
    const editable = editor.api.toDOMNode(editor);
    EDITABLE_TO_EDITOR.set(editable, editor);
    return () => {
      EDITABLE_TO_EDITOR.delete(editable);
    };
  }, [editor]);
  return null;
};

// src/PlaywrightPlugin.ts
var PlaywrightPlugin = createPlatePlugin({
  key: KEYS.playwright,
  useHooks: usePlaywrightAdapter
});

// src/internal/getAdapter.ts
var getAdapter = (page) => page.evaluateHandle(() => {
  const adapter = window.platePlaywrightAdapter;
  if (!adapter) {
    throw new Error(
      "window.platePlaywrightAdapter not found. Ensure that <PlatePlaywrightAdapter /> is rendered as a child of your Plate editor."
    );
  }
  return adapter;
});

// src/getNodeByPath.ts
var getNodeByPath = async (page, editorHandle, path) => {
  const adapterHandle = await getAdapter(page);
  return page.evaluateHandle(
    ([adapter, editor, path2]) => {
      const node = adapter.getNode(editor, path2);
      if (!node)
        throw new Error(`getNodeByPath: node not found at path ${path2}`);
      return node;
    },
    [adapterHandle, editorHandle, path]
  );
};

// src/getDOMNodeByPath.ts
var getDOMNodeByPath = async (page, editorHandle, path) => {
  const nodeHandle = await getNodeByPath(page, editorHandle, path);
  const adapterHandle = await getAdapter(page);
  return page.evaluateHandle(
    ([, editor, node]) => {
      const domNode = editor.api.toDOMNode(node);
      if (!domNode)
        throw new Error(`getDOMNodeByPath: DOM node not found at path ${path}`);
      return domNode;
    },
    [adapterHandle, editorHandle, nodeHandle]
  );
};

// src/clickAtPath.ts
var clickAtPath = async (page, editorHandle, path) => {
  const domNode = await getDOMNodeByPath(page, editorHandle, path);
  await domNode.click();
};

// src/getEditable.ts
var getEditable = (context) => context.locator("[data-slate-editor]");

// src/getEditorHandle.ts
var getEditorHandle = async (page, editable) => {
  const editableLocator = editable ?? getEditable(page);
  const editableCount = await editableLocator.count();
  if (editableCount === 0) {
    const error = editable ? new Error(
      "getEditorHandle: the given locator did not match any element"
    ) : new Error(
      "getEditorHandle: could not find a [data-slate-editor] on the page"
    );
    throw error;
  } else if (editableCount > 1) {
    const error = editable ? new Error(
      "getEditorHandle: the given locator matched more than one element"
    ) : new Error(
      "getEditorHandle: matched more than one editor. Pass a locator as the second argument of getEditorHandle to disambiguate."
    );
    throw error;
  }
  if (await editableLocator.getAttribute("data-slate-editor") === null) {
    throw new Error(
      "getEditorHandle: the element matched by the given locator is not a [data-slate-editor]. Use getEditable to locate the editable element before passing it to getEditorHandle."
    );
  }
  const editableHandle = await editableLocator.elementHandle();
  const adapterHandle = await getAdapter(page);
  return page.evaluateHandle(
    ([adapter, editable2]) => {
      const editor = adapter.EDITABLE_TO_EDITOR.get(editable2);
      if (!editor) {
        throw new Error(
          "getEditorHandle: could not get the editor instance for the editable. Ensure that <PlatePlaywrightAdapter /> is rendered as a child of the Plate editor."
        );
      }
      return editor;
    },
    [adapterHandle, editableHandle]
  );
};

// src/getSelection.ts
var getSelection = async (page, editorHandle) => page.evaluate((editor) => editor.selection, editorHandle);

// src/getTypeAtPath.ts
import { ElementApi } from "platejs";
var getTypeAtPath = async (page, editorHandle, path) => {
  const nodeHandle = await getNodeByPath(page, editorHandle, path);
  const node = await nodeHandle.jsonValue();
  if (ElementApi.isElement(node)) {
    return node.type;
  }
  return "text";
};

// src/setSelection.ts
var setSelection = async (page, editorHandle, at) => {
  await page.evaluate(
    ([editor, at2]) => {
      const range = editor.api.range(at2);
      console.info(range);
      editor.tf.setSelection(range);
    },
    [editorHandle, at]
  );
  await page.waitForTimeout(200);
};
export {
  PlaywrightPlugin,
  clickAtPath,
  getDOMNodeByPath,
  getEditable,
  getEditorHandle,
  getNodeByPath,
  getSelection,
  getTypeAtPath,
  setSelection,
  usePlaywrightAdapter
};
//# sourceMappingURL=index.mjs.map