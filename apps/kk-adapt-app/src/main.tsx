/**
 *react应用入口
 */

import { createRoot } from "react-dom/client";
import App from "./app";
import { loadGoogleFonts, applyFontVariables } from "./lib/fonts-vite";

// 导入 Tailwind CSS 样式
import "./app/globals.css";

// 初始化字体
loadGoogleFonts();
applyFontVariables();

const container = document.querySelector("#root");
if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);
root.render(<App />);
