// Vite 版本的字体配置
// 使用 Google Fonts CDN 或本地字体

export const fontVariables = {
  '--font-sans': 'Inter, system-ui, sans-serif',
  '--font-mono': 'JetBrains Mono, monospace',
};

// 添加 Google Fonts 链接到 head
export function loadGoogleFonts() {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.append(link);
  }
}

// 应用字体变量到根元素
export function applyFontVariables() {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    Object.entries(fontVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
} 