@echo off
setlocal

where node >nul 2>nul
if not errorlevel 1 (
  exit /b 0
)

echo Node.js LTS is required for WildDogHere CMS.
echo.

where winget >nul 2>nul
if errorlevel 1 (
  echo winget is not available on this Windows computer.
  echo Opening Node.js download page...
  start "" "https://nodejs.org/"
  pause
  exit /b 1
)

echo Trying to install Node.js LTS with winget...
winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
if errorlevel 1 (
  echo Could not install Node.js with winget.
  echo Opening Node.js download page...
  start "" "https://nodejs.org/"
  pause
  exit /b 1
)

echo Node.js LTS was installed. Please close and reopen this setup window if node is still not found.
exit /b 0
