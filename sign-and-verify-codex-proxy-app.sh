#!/bin/sh
set -eu

APP_PATH="${1:-./Codex 代理版.app}"

if [ ! -d "$APP_PATH" ]; then
  printf '找不到 app：%s\n' "$APP_PATH" >&2
  exit 1
fi

chmod +x "$APP_PATH/Contents/MacOS/CodexProxyLauncher"
plutil -lint "$APP_PATH/Contents/Info.plist"

codesign --force --deep --sign - "$APP_PATH"
codesign --verify --deep --strict --verbose=4 "$APP_PATH"
spctl --assess --type execute --verbose=4 "$APP_PATH" || true

printf '\n签名验证完成：%s\n' "$APP_PATH"
