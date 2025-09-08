#!/bin/bash

# 切换到 plate-editor 目录
cd apps/plate-editor

# 临时安装所有必需的 semantic-release 插件
npm install --no-save \
  semantic-release \
  @semantic-release/changelog \
  @semantic-release/git \
  @semantic-release/gitlab \
  @semantic-release/npm

# 执行 semantic-release
npx semantic-release