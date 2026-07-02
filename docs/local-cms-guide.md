# Local CMS Guide

WildDogHere 的文章目前用本機 CMS 管理，不使用雲端 CMS 或資料庫。CMS 有本機登入保護，適合在自己的 Mac 或 Windows 電腦使用。

## 開啟 CMS

```bash
npm run cms
```

開啟：

```text
http://127.0.0.1:4173
```

也可以雙擊專案根目錄的：

```text
open-wilddog-cms.command
```

`.command` 是 macOS 專用啟動檔，Windows 不使用它。

預設後台帳號：

```text
帳號：wilddoghere
密碼：WildDogHere2026!
```

修改密碼：

```bash
npm run cms:set-password -- wilddoghere 新密碼
```

## Windows 開啟方式

Windows 電腦請先安裝 Node.js LTS，然後雙擊根目錄的：

```text
WINDOWS-SETUP.cmd
```

或進入 `windows` 資料夾雙擊：

```text
windows/Setup-WildDogHere-CMS.cmd
```

Windows 使用 `.cmd` 或產生後的 `.exe`，不要使用 Mac 的 `.command` 檔。

Setup 會安裝依賴、確認後台帳號，並產生：

```text
windows\WildDogHereCMS.exe
```

若不想產生 exe，也可以直接雙擊：

```text
windows/Start-WildDogHere-CMS.cmd
```

Windows 電腦上若要確認後台設定完整，可雙擊：

```text
WINDOWS-VERIFY.cmd
```

Windows 電腦上若要修改 CMS 後台帳號，可雙擊：

```text
WINDOWS-CHANGE-ACCOUNT.cmd
```

若要在 Windows 電腦產生整包自解壓 exe，可雙擊：

```text
WINDOWS-CREATE-EXE.cmd
```

輸出會在：

```text
dist/WildDogHere-CMS-Windows.exe
```

自解壓 exe 預設會安裝到：

```text
%USERPROFILE%\WildDogHere-CMS
```

若要產生 exe 啟動器，在 Windows PowerShell 執行：

```powershell
powershell -ExecutionPolicy Bypass -File windows\Build-WildDogHere-CMS-EXE.ps1
```

完成後會產生：

```text
windows\WildDogHereCMS.exe
```

## 新增文章

1. 點「新增文章」。
2. 填標題、Slug、摘要、分類、敘事者、日期、平台、標籤。
3. 上傳縮圖。
4. 在「文章內文」直接撰寫內容，可用工具列加入標題、清單、連結與圖片。
5. 右側「上架前預覽」確認卡片與內文呈現。
6. 若先不要公開，狀態選 `draft` 或 `coming-soon`。
7. 若要公開，狀態選 `published`。

## 外部文章與站內文章

- 外部文章：填入 Mobile01 或其他平台網址。
- 站內文章：不填外部網址，CMS 會使用 `/posts/文章-slug`。

## 圖片位置

CMS 上傳的縮圖與內文圖片會放在：

```text
public/images/contents/
```

## 上架前檢查

CMS 裡的「檢查建置」會執行：

```bash
npm run build
```

也可以在終端機執行：

```bash
npm run cms:check
npm run build
```

## 正式更新網站

```bash
git add .
git commit -m "Update articles"
git push origin main
```

推上 GitHub 後，Vercel 會自動部署正式站。
