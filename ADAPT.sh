#!/bin/bash

# 设置错误时退出
set -e

echo "🚀 开始 Plate Editor 发版流程..."

# 切换到 plate-editor 目录
cd apps/plate-editor

# 输出当前目录

pnpm install
npm run semantic-release