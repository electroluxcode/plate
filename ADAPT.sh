#!/bin/bash

# 设置错误时退出
set -e

echo "🚀 开始 Plate Editor 发版流程..."

# 切换到 plate-editor 目录
cd apps/plate-editor

npm install -f 
npm run semantic-release