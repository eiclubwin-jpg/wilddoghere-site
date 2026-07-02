@echo off
setlocal
cd /d "%~dp0\.."

powershell -ExecutionPolicy Bypass -File "%~dp0Build-WildDogHere-CMS-SelfExtracting-EXE.ps1"
if errorlevel 1 (
  echo Failed to create self-extracting exe.
  pause
  exit /b 1
)

echo.
echo Self-extracting exe created:
echo   dist\WildDogHere-CMS-Windows.exe
echo.
pause
