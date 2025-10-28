param()
$ErrorActionPreference = "Stop"
$Host.UI.RawUI.WindowTitle = "CLIENT - iguideu"

$FRONT = "$env:USERPROFILE\Desktop\iguideu-frontend"
cd $FRONT

# Node por NVM
if (-not (Get-Command nvm -ErrorAction SilentlyContinue)) { Write-Host "⚠️ Instalá NVM for Windows" -ForegroundColor Yellow; exit 1 }
nvm install 22.20.0 | Out-Null
nvm use 22.20.0     | Out-Null

# npm path
$npm = (Get-Command npm -ErrorAction SilentlyContinue).Source
if (-not $npm -and $env:NVM_SYMLINK) {
  $npm = Join-Path $env:NVM_SYMLINK 'npm.cmd'
}
if (-not (Test-Path $npm)) { Write-Host "❌ npm no encontrado. Revisá NVM/Node." -ForegroundColor Red; exit 1 }

# IP LAN y VITE_API_BASE
$IP = (Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null } | Select-Object -First 1).IPv4Address.IPAddress
if (-not $IP) { throw "No pude detectar IP LAN. Conectate al WiFi y reintentá." }

# Si el .env tiene VITE_API_BASE vacío o 'http://', lo corrige
$envFile = "$FRONT\.env"
if (Test-Path $envFile) {
  $content = Get-Content $envFile -Raw
  if ($content -match "^VITE_API_BASE=http://\s*$" -or $content -match "^VITE_API_BASE=http://`r?`n") {
    $content = $content -replace "^VITE_API_BASE=.*","VITE_API_BASE=http://$IP:4020"
    $content | Set-Content -Encoding UTF8 $envFile
  } elseif ($content -notmatch "^VITE_API_BASE=") {
    Add-Content -Encoding UTF8 $envFile "`nVITE_API_BASE=http://$IP:4020"
  }
}

# deps
if (!(Test-Path ".\node_modules")) { & $npm i }

# Mostrar API base efectiva para la sesión (solo informativo)
$env:VITE_API_BASE = "http://$IP:4020"
Write-Host "🔗 VITE_API_BASE=$($env:VITE_API_BASE)" -ForegroundColor Cyan

# dev server
if (Test-Path ".\package.json") {
  $pkg = Get-Content ".\package.json" -Raw | ConvertFrom-Json -ErrorAction SilentlyContinue
  if ($pkg -and $pkg.scripts.dev) {
    & $npm run dev -- --host=0.0.0.0 --port=5177
  } else {
    & $npm exec vite -- --host=0.0.0.0 --port=5177
  }
} else {
  & $npm exec vite -- --host=0.0.0.0 --port=5177
}
