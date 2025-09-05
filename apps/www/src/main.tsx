/**
 *react应用入口
 */

 import { createRoot } from "react-dom/client";
 import { Suspense } from "react";
 import PlaygroundDemo from "./registry/examples/playground-demo";
 import { cn } from "./lib/utils";
 
 function App() {
   return (
    <PlaygroundDemo />
   );
 }
 
 // 导入 Tailwind CSS 样式
 import "./app/globals.css";
 
 
 const container = document.querySelector("#root");
 if (!container) {
   throw new Error("Failed to find the root element");
 }
 
 const root = createRoot(container);
 root.render(<App />);
 