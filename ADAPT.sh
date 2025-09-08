#!/bin/bash

# 设置错误时退出
set -e

echo "🚀 开始 Plate Editor 发版流程..."

# 切换到 plate-editor 目录
cd apps/plate-editor



cp package.json package.json.backup

# 创建一个只包含发版必要信息的 package.json
cat > package.json << 'EOF'
{
  "name": "@feb/plate-editor",
  "version": "0.0.41",
  "description": "A simple NextJS app with Plate",
  "type": "module",
  "module": "./dist/es/kk-adapt-export.js",
  "types": "./dist/es/kk-adapt-export.d.ts",
  "exports": {
    ".": {
      "import": "./dist/es/kk-adapt-export.js",
      "types": "./dist/es/kk-adapt-export.d.ts"
    },
    "./es/*": "./dist/es/*",
    "./lib/*": "./dist/lib/*"
  },
  "files": [
    "dist",
    "package.json"
  ],
  "scripts": {
    "semantic-release": "semantic-release",
    "build": "NODE_OPTIONS='--max-old-space-size=8192' vite build"
  },
  "devDependencies": {
    "semantic-release": "^19.0.5",
    "@semantic-release/commit-analyzer": "^9.0.2",
    "@semantic-release/release-notes-generator": "^10.0.3",
    "@semantic-release/changelog": "^6.0.1",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/gitlab": "^9.4.1",
    "@semantic-release/npm": "^9.0.1"
  }
}
EOF

echo "📥 安装发版依赖..."
npm install -f

echo "🏗️  开始构建项目..."
# 由于我们简化了 package.json，需要确保构建能正常进行
if [ -f "vite.config.ts" ]; then
    # 如果有 vite 配置，尝试用 npx 运行
    npx vite build
else
    npm run build
fi

echo "🚀 执行 semantic-release..."
npm run semantic-release

echo "🔄 恢复原始 package.json..."
mv package.json.backup package.json

echo "✅ 发版完成！"
echo "📋 检查发版结果:"
echo "   - 版本号已更新"
echo "   - CHANGELOG.md 已生成"  
echo "   - Git 标签已创建"
echo "   - NPM 包已发布"