@echo off
setlocal
cd /d "%~dp0\.."

echo WildDogHere CMS verification
echo.

call windows\Ensure-Node-LTS.cmd
if errorlevel 1 (
  echo [FAIL] Node.js is not installed.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo [FAIL] Node.js is not installed.
  pause
  exit /b 1
)
echo [OK] Node.js found.

if not exist cms\auth.json (
  echo [FAIL] Missing cms\auth.json.
  pause
  exit /b 1
)
echo [OK] CMS account file exists.

if not exist node_modules (
  echo [INFO] node_modules is missing. Installing dependencies first...
  call npm install
  if errorlevel 1 (
    echo [FAIL] npm install failed.
    pause
    exit /b 1
  )
)
echo [OK] Dependencies are ready.

call npm run cms:check
if errorlevel 1 (
  echo [FAIL] CMS check failed.
  pause
  exit /b 1
)
echo [OK] CMS check passed.

call npm run typecheck
if errorlevel 1 (
  echo [FAIL] TypeScript check failed.
  pause
  exit /b 1
)
echo [OK] TypeScript check passed.

call npm run build
if errorlevel 1 (
  echo [FAIL] Website build failed.
  pause
  exit /b 1
)
echo [OK] Website build passed.

if exist windows\WildDogHereCMS.exe (
  echo [OK] Windows exe launcher exists.
) else (
  echo [INFO] Windows exe launcher not found. Creating it now...
  powershell -ExecutionPolicy Bypass -File "%~dp0Build-WildDogHere-CMS-EXE.ps1"
  if errorlevel 1 (
    echo [WARN] Could not create exe launcher. Start-WildDogHere-CMS.cmd is still available.
  ) else (
    echo [OK] Windows exe launcher created.
  )
)

echo.
echo Verification complete.
pause
