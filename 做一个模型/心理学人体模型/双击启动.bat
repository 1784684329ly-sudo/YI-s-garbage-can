@echo off
chcp 65001 >nul
title 心理学人体模型
echo 正在启动本地服务器...
cd /d "%~dp0"
start "" http://localhost:8123/index.html
python -m http.server 8123
