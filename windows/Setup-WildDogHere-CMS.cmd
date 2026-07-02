@echo off
setlocal
cd /d "%~dp0\.."

echo WildDogHere CMS Windows setup
echo.

call windows\Ensure-Node-LTS.cmd
if errorlevel 1 (
  pause
  exit /b 1
)

echo Installing project dependencies...
call npm install
if errorlevel 1 (
  echo npm install failed.
  pause
  exit /b 1
)

echo.
echo Current default CMS account:
echo   username: wilddoghere
echo   password: WildDogHere2026!
echo.
set /p CHANGE_ACCOUNT="Change CMS account now? (y/N): "
if /i "%CHANGE_ACCOUNT%"=="y" (
  call windows\Change-CMS-Account.cmd
  if errorlevel 1 (
    echo Failed to update CMS account.
    pause
    exit /b 1
  )
)

echo.
echo Creating Windows exe launcher...
powershell -ExecutionPolicy Bypass -File "%~dp0Build-WildDogHere-CMS-EXE.ps1"
if errorlevel 1 (
  echo Could not create WildDogHereCMS.exe. You can still use Start-WildDogHere-CMS.cmd.
  pause
  exit /b 1
)

echo.
echo Setup complete.
echo You can now open:
echo   windows\WildDogHereCMS.exe
echo.
pause
