# Codex 代理版 Windows 启动器

双击 `Codex-Proxy.vbs` 即可启动。这个文件名用纯英文，是为了避开 Windows PowerShell 5 的中文文件名编码问题。

这个启动器只给 Codex 当前进程注入代理环境变量：

```text
HTTP_PROXY=http://127.0.0.1:7890
HTTPS_PROXY=http://127.0.0.1:7890
ALL_PROXY=socks5://127.0.0.1:7890
NO_PROXY=localhost,127.0.0.1,::1,.local
```

它不会修改 Windows 系统代理，也不会修改其它软件的代理设置。

## 如果提示找不到 Codex.exe

右键编辑 `Codex-Proxy.vbs`，把 `codexPath` 改成你的 Codex 程序完整路径，或者把你的路径加到 `candidates = Array(...)` 里面。

## 验证

在 PowerShell 里运行：

```powershell
powershell -ExecutionPolicy Bypass -File ".\verify-codex-proxy-windows.ps1"
```

Windows 的 `.vbs` 没有 macOS `codesign` 机制；验证脚本会检查启动器内容并输出 SHA256，方便你确认文件没有被改动。
