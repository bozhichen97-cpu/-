$ErrorActionPreference = 'Stop'

$launcher = Join-Path $PSScriptRoot 'Codex-Proxy.vbs'
if (-not (Test-Path -LiteralPath $launcher)) {
  throw "Launcher not found: $launcher"
}

$content = Get-Content -LiteralPath $launcher -Raw
$required = @(
  'HTTP_PROXY',
  'HTTPS_PROXY',
  'ALL_PROXY',
  'NO_PROXY',
  'shell.Run'
)

foreach ($item in $required) {
  if ($content -notmatch [regex]::Escape($item)) {
    throw "Launcher is missing: $item"
  }
}

$hash = Get-FileHash -LiteralPath $launcher -Algorithm SHA256
Write-Host "Launcher verification passed"
Write-Host "Path: $launcher"
Write-Host "SHA256: $($hash.Hash)"
Write-Host ""
Write-Host "Note: Windows .vbs launchers do not use macOS codesign. This verifies required content and records the SHA256 hash."
