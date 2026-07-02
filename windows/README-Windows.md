# WildDogHere CMS for Windows

這個資料夾提供 Windows 電腦使用的本機文章後台啟動方式。

若你收到的是 `dist/wilddoghere-cms-windows.zip`，同資料夾可能也會有 `dist/WINDOWS-HANDOFF.txt`。那份檔案包含檔案大小、SHA256 與 Windows 第一次使用步驟。

## 第一次使用：建議流程

1. 建議先安裝 Node.js LTS：<https://nodejs.org/>。若尚未安裝，setup 會先嘗試用 `winget` 自動安裝。
2. 將整個專案資料夾放到 Windows 電腦。
3. 雙擊根目錄的 `WINDOWS-SETUP.cmd`，或雙擊 `windows/Setup-WildDogHere-CMS.cmd`。
4. Setup 會安裝依賴、確認後台帳號，並產生 `windows\WildDogHereCMS.exe`。
5. 之後雙擊 `windows\WildDogHereCMS.exe` 開啟後台。

也可以先打開專案根目錄的 `WINDOWS-README-FIRST.txt`，照裡面的簡短步驟操作。

請注意：`open-wilddog-cms.command` 是 macOS 專用，Windows 不使用 `.command` 檔。

如果不想產生 exe，也可以直接雙擊：

```txt
windows/Start-WildDogHere-CMS.cmd
```

## 產生 exe 啟動器

在 Windows PowerShell 執行：

```powershell
powershell -ExecutionPolicy Bypass -File windows\Build-WildDogHere-CMS-EXE.ps1
```

完成後會產生：

```txt
windows\WildDogHereCMS.exe
```

之後可雙擊 `WildDogHereCMS.exe` 開啟本機文章後台。

## 產生整包自解壓 exe

若你想把整個 Windows 後台包成一個 `.exe` 檔，請在 Windows 電腦雙擊：

```txt
WINDOWS-CREATE-EXE.cmd
```

完成後會產生：

```txt
dist\WildDogHere-CMS-Windows.exe
```

這個檔案會包含專案檔案，執行後會解壓並啟動 `windows\Setup-WildDogHere-CMS.cmd`。Windows 電腦仍需要先安裝 Node.js LTS。

自解壓 exe 預設會安裝到：

```txt
%USERPROFILE%\WildDogHere-CMS
```

## 預設後台帳號

```txt
帳號：wilddoghere
密碼：WildDogHere2026!
```

建議第一次使用後修改密碼：

```bash
node scripts/set-cms-password.js wilddoghere 新密碼
```

也可以在第一次執行 `Setup-WildDogHere-CMS.cmd` 時依照提示修改。

之後若要再次修改後台帳號，雙擊根目錄：

```txt
WINDOWS-CHANGE-ACCOUNT.cmd
```

## 驗證 Windows 設定

若要確認 Windows 電腦上的設定是否完整，雙擊：

```txt
WINDOWS-VERIFY.cmd
```

它會檢查：

- Node.js 是否存在
- CMS 帳號設定檔是否存在
- 專案依賴是否已安裝
- CMS 自檢是否通過
- TypeScript 是否通過
- Next.js build 是否通過
- exe 啟動器是否存在，若沒有會嘗試建立

## 注意

這個 exe 是啟動器，會開啟本機 CMS 與瀏覽器。它需要跟專案資料夾放在一起，也需要電腦已安裝 Node.js。
