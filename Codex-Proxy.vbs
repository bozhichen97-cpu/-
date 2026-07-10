' Windows launcher for Codex with per-process proxy variables.
' Double-click this file to start Codex without opening a terminal window.

Option Explicit

Dim shell, env, fso, candidates, candidate, codexPath, message
Set shell = CreateObject("WScript.Shell")
Set env = shell.Environment("PROCESS")
Set fso = CreateObject("Scripting.FileSystemObject")

' Built-in proxy configuration for this launcher only.
env("HTTP_PROXY") = "http://127.0.0.1:7890"
env("HTTPS_PROXY") = "http://127.0.0.1:7890"
env("ALL_PROXY") = "socks5://127.0.0.1:7890"
env("NO_PROXY") = "localhost,127.0.0.1,::1,.local"
env("http_proxy") = env("HTTP_PROXY")
env("https_proxy") = env("HTTPS_PROXY")
env("all_proxy") = env("ALL_PROXY")
env("no_proxy") = env("NO_PROXY")

candidates = Array( _
  "C:\Program Files\WindowsApps\OpenAI.Codex_26.707.3748.0_x64__2p2nqsd0c76g0\app\ChatGPT.exe", _
  env("LOCALAPPDATA") & "\Programs\Codex\Codex.exe", _
  env("LOCALAPPDATA") & "\Programs\codex\Codex.exe", _
  env("LOCALAPPDATA") & "\Programs\ChatGPT\ChatGPT.exe", _
  env("LOCALAPPDATA") & "\Microsoft\WindowsApps\Codex.exe", _
  env("ProgramFiles") & "\Codex\Codex.exe", _
  env("ProgramFiles") & "\ChatGPT\ChatGPT.exe" _
)

codexPath = ""
For Each candidate In candidates
  If fso.FileExists(candidate) Then
    codexPath = candidate
    Exit For
  End If
Next

If codexPath = "" Then
  message = "Codex.exe was not found." & vbCrLf & vbCrLf & _
            "Edit this file and add the full path to your Codex.exe."
  MsgBox message, vbCritical, "Codex Proxy"
  WScript.Quit 1
End If

shell.Run """" & codexPath & """", 0, False
