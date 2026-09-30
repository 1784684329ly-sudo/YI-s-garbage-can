@echo off
chcp 65001 >nul
title 心理学人体模型
cd /d "%~dp0"
python serve.py
if errorlevel 1 (
  echo.
  echo 没能启动。请确认电脑装了 Python，或把这个窗口的报错截图发给 Claude。
  pause
)
