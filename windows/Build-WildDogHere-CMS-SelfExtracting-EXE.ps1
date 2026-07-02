$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$dist = Join-Path $root "dist"
$work = Join-Path $env:TEMP ("wilddoghere-cms-sfx-" + [Guid]::NewGuid().ToString("N"))
$payloadRoot = Join-Path $work "payload-root"
$source = Join-Path $work "source"
$payloadZip = Join-Path $source "payload.zip"
$installer = Join-Path $source "Install-WildDogHere-CMS.cmd"
$sed = Join-Path $work "wilddoghere-cms.sed"
$output = Join-Path $dist "WildDogHere-CMS-Windows.exe"

if (-not (Get-Command iexpress.exe -ErrorAction SilentlyContinue)) {
  throw "IExpress is not available on this Windows computer."
}

New-Item -ItemType Directory -Force -Path $dist | Out-Null
New-Item -ItemType Directory -Force -Path $payloadRoot | Out-Null
New-Item -ItemType Directory -Force -Path $source | Out-Null

$excludeDirectoryNames = @(
  ".git",
  ".next",
  ".vercel",
  "node_modules",
  "dist"
)

$excludeFileNames = @(
  ".DS_Store",
  "open-wilddog-cms.command",
  "tsconfig.tsbuildinfo"
)

Get-ChildItem -Path $root -Force | ForEach-Object {
  if (($excludeDirectoryNames -notcontains $_.Name) -and ($excludeFileNames -notcontains $_.Name)) {
    Copy-Item -Path $_.FullName -Destination $payloadRoot -Recurse -Force
  }
}

$setupPath = Join-Path $payloadRoot "windows\Setup-WildDogHere-CMS.cmd"
if (-not (Test-Path $setupPath)) {
  throw "Cannot find windows\Setup-WildDogHere-CMS.cmd in payload folder."
}

Compress-Archive -Path (Join-Path $payloadRoot "*") -DestinationPath $payloadZip -Force

$installerContent = @"
@echo off
setlocal
set INSTALL_DIR=%USERPROFILE%\WildDogHere-CMS

echo WildDogHere CMS self-extracting installer
echo.
echo Installing to:
echo   %INSTALL_DIR%
echo.

if not exist "%INSTALL_DIR%" (
  mkdir "%INSTALL_DIR%"
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%~dp0payload.zip' -DestinationPath '%INSTALL_DIR%' -Force"
if errorlevel 1 (
  echo Failed to extract WildDogHere CMS.
  pause
  exit /b 1
)

cd /d "%INSTALL_DIR%"
call windows\Setup-WildDogHere-CMS.cmd
"@

Set-Content -Path $installer -Value $installerContent -Encoding ASCII

$sedContent = @"
[Version]
Class=IEXPRESS
SEDVersion=3
[Options]
PackagePurpose=InstallApp
ShowInstallProgramWindow=1
HideExtractAnimation=0
UseLongFileName=1
InsideCompressed=0
CAB_FixedSize=0
CAB_ResvCodeSigning=0
RebootMode=N
InstallPrompt=
DisplayLicense=
FinishMessage=WildDogHere CMS setup finished.
TargetName=$output
FriendlyName=WildDogHere CMS
AppLaunched=Install-WildDogHere-CMS.cmd
PostInstallCmd=<None>
AdminQuietInstCmd=
UserQuietInstCmd=
SourceFiles=SourceFiles
[Strings]
FILE0="payload.zip"
FILE1="Install-WildDogHere-CMS.cmd"
[SourceFiles]
SourceFiles0=$source
[SourceFiles0]
%FILE0%=
%FILE1%=
[DestinationDirs]
DefaultDestDir=.
"@

Set-Content -Path $sed -Value $sedContent -Encoding ASCII

Push-Location $source
try {
  iexpress.exe /N /Q $sed
}
finally {
  Pop-Location
}

if (-not (Test-Path $output)) {
  throw "Self-extracting exe was not created."
}

Write-Host "Created $output"
Remove-Item -Path $work -Recurse -Force
