#!/bin/bash

# 切换到 plate-editor 目录
cd apps/plate-editor

# 保存当前目录路径
PROJECT_DIR=$(pwd)

# 创建临时目录用于安装 semantic-release 插件
mkdir -p .semantic-release-temp
cd .semantic-release-temp

# 初始化临时 package.json
echo '{"name": "temp-semantic-release", "version": "1.0.0"}' > package.json

# 在临时目录安装所有必需的 semantic-release 插件
npm install \
  semantic-release \
  @semantic-release/changelog \
  @semantic-release/git \
  @semantic-release/gitlab \
  @semantic-release/npm

# 回到项目目录执行 semantic-release，但使用临时目录中的插件
cd "$PROJECT_DIR"
NODE_PATH="$PROJECT_DIR/.semantic-release-temp/node_modules" \
  "$PROJECT_DIR/.semantic-release-temp/node_modules/.bin/semantic-release"

# 清理临时目录
rm -rf .semantic-release-temp