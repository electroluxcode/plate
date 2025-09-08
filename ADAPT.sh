#!/bin/bash

# 切换到 plate-editor 目录
cd apps/plate-editor

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

# 回到 plate-editor 目录
cd ..

# 使用临时目录中的 semantic-release 执行发版
./.semantic-release-temp/node_modules/.bin/semantic-release

# 清理临时目录
rm -rf .semantic-release-temp