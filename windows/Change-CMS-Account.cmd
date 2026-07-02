@echo off
setlocal
cd /d "%~dp0\.."

call windows\Ensure-Node-LTS.cmd
if errorlevel 1 (
  pause
  exit /b 1
)

echo Change WildDogHere CMS account
echo.
set /p CMS_USERNAME="New username: "
set /p CMS_PASSWORD="New password: "

if "%CMS_USERNAME%"=="" (
  echo Username cannot be empty.
  pause
  exit /b 1
)

if "%CMS_PASSWORD%"=="" (
  echo Password cannot be empty.
  pause
  exit /b 1
)

call node scripts\set-cms-password.js "%CMS_USERNAME%" "%CMS_PASSWORD%"
if errorlevel 1 (
  echo Failed to update CMS account.
  pause
  exit /b 1
)

echo.
echo CMS account updated.
pause
