@echo off
setlocal
cd /d "%~dp0\.."

call windows\Ensure-Node-LTS.cmd
if errorlevel 1 (
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing project dependencies. This only runs the first time.
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

start "" "http://127.0.0.1:4173"
call npm run cms
pause
