$Host.UI.RawUI.WindowTitle = "CLIENT - iguideu18"

# Asegurar Node/npm disponibles en esta sesión
try { nvm use 22.20.0 *> $null } catch {}

# Ruta del frontend (ajustá si es otra)
$frontend = "$env:USERPROFILE\Desktop\iguideu-frontend"
if (-not (Test-Path $frontend)) {
  Write-Host "⚠️ No encuentro $frontend. Cambiá la ruta en este script."
  Start-Sleep 3600
  exit
}
Set-Location $frontend

# .env.local para Vite (si no existe)
$envPath = ".\.env.local"
if (-not (Test-Path $envPath)) {
@"
VITE_API_BASE=http://127.0.0.1:4026
"@ | Out-File -Encoding UTF8 $envPath
}

# Instalar y arrancar
if (-not (Test-Path .\node_modules)) { npm i }
npm run dev -- --port 5181
