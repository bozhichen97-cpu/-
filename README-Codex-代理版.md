# Codex 代理版.app

这个 app 是一个 macOS 包装启动器，只给 Codex 进程注入：

- `HTTP_PROXY`
- `HTTPS_PROXY`
- `ALL_PROXY`
- `NO_PROXY`

它不会修改 macOS 系统代理，也不会修改其它软件的代理设置。

## 内置代理配置

当前写入 `Codex 代理版.app/Contents/MacOS/CodexProxyLauncher` 的值是：

```sh
HTTP_PROXY=http://127.0.0.1:7890
HTTPS_PROXY=http://127.0.0.1:7890
ALL_PROXY=socks5://127.0.0.1:7890
NO_PROXY=localhost,127.0.0.1,::1,.local
```

如果你的代理端口不同，只改这个启动器顶部的四个 `*_VALUE` 值即可。

## 放入应用程序

把 `Codex 代理版.app` 放到 `/Applications`。原版 `Codex.app` 也需要放在 `/Applications` 或 `~/Applications`。

## 签名验证

在 macOS 上进入本目录后运行：

```sh
sh ./sign-and-verify-codex-proxy-app.sh "./Codex 代理版.app"
```

脚本会完成：

- 给启动器补执行权限
- 检查 `Info.plist`
- 使用 ad-hoc 签名
- 执行 `codesign --verify`
- 执行 `spctl --assess`

`spctl` 对 ad-hoc 签名可能提示未通过 Gatekeeper 认可；这不代表 `codesign --verify` 失败，只表示它不是 Apple Developer ID 公证应用。
