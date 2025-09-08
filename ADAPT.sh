#!/bin/bash

# 切换到 plate-editor 目录
cd apps/plate-editor

# 临时安装所有必需的 semantic-release 插件，使用 --legacy-peer-deps 解决依赖冲突
npm install --no-save --legacy-peer-deps \
  semantic-release \
  @semantic-release/changelog \
  @semantic-release/git \
  @semantic-release/gitlab \
  @semantic-release/npm

# 执行 semantic-release
./node_modules/.bin/semantic-release