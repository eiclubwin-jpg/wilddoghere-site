# WildDogHere / 野狗軍團出沒中

Next.js + Tailwind CSS + TypeScript 製作的部落格型品牌網站 MVP。
正式網站是靜態網站，沒有資料庫、雲端 CMS、購物車或複雜表單；文章內容用本機 CMS 管理後，再推送到 GitHub 與 Vercel。正式網站主網址為：

```text
https://www.wilddoghere.com
```

## 本機預覽

```bash
npm install
npm run dev
```

開啟：

```text
http://localhost:3000
```

如果本機 npm 快取權限異常，可以改用專案外的暫存快取：

```bash
npm install --cache /tmp/wilddog-npm-cache
```

或使用 pnpm：

```bash
pnpm install
pnpm dev
```

## 本機文章 CMS

目前文章可用本機 CMS 管理，不需要資料庫或雲端 CMS。CMS 有本機登入保護，只在自己的電腦上開啟。

```bash
npm run cms
```

開啟：

```text
http://127.0.0.1:4173
```

預設後台帳號：

```text
帳號：wilddoghere
密碼：WildDogHere2026!
```

修改 CMS 密碼：

```bash
npm run cms:set-password -- wilddoghere 新密碼
```

可以在 CMS 裡新增、編輯、刪除文章，選擇分類、敘事者、狀態、是否精選，並上傳文章縮圖。內文可直接在所見所得編輯器撰寫，支援標題、粗體、清單、連結與圖片。按「儲存文章」後會更新 `data/contents.json`，圖片會存到 `public/images/contents/`。

上架前可在 CMS 右側預覽文章卡片與內文。確認沒問題後，把狀態改為 `published`。若是外部文章，連結填正式文章網址；若是站內文章，可留空或使用 `/posts/文章-slug`。CMS 裡的「檢查建置」會執行 `npm run build`。

## Windows 電腦使用 CMS

macOS 可用 `open-wilddog-cms.command`；這個 `.command` 檔是 Mac 專用，Windows 不使用它。

### 建議方法：用 GitHub Actions 產生 Windows exe

這台 Mac 無法直接產生 Windows `.exe`，但 repository 內已提供 GitHub Actions workflow，可用 GitHub 的 Windows 環境產生：

1. 先把目前專案 commit 並 push 到 GitHub。
2. 到 GitHub repository。
3. 進入 Actions。
4. 選擇 `Build Windows CMS Package`。
5. 點 `Run workflow`。
6. 等待完成後，下載 artifacts 裡的 `wilddoghere-cms-windows`。

下載後會包含：

```text
wilddoghere-cms-windows.zip
WINDOWS-HANDOFF.txt
WildDogHere-CMS-Windows.exe
```

Windows 電腦請先安裝 Node.js LTS，然後雙擊根目錄的：

```text
WINDOWS-SETUP.cmd
```

或進入 `windows` 資料夾雙擊：

```text
windows/Setup-WildDogHere-CMS.cmd
```

Setup 會安裝依賴、確認後台帳號，並產生 `windows\WildDogHereCMS.exe`。之後可直接雙擊 exe 開啟後台。

Windows 壓縮包內也有 `WINDOWS-README-FIRST.txt`，給另一台電腦第一次操作時使用。

若只想直接開啟後台，也可以雙擊：

```text
windows/Start-WildDogHere-CMS.cmd
```

Windows 可用的是 `.cmd` 或產生後的 `.exe`：

```text
windows/Setup-WildDogHere-CMS.cmd
windows/Start-WildDogHere-CMS.cmd
windows/WildDogHereCMS.exe
```

若要產生 Windows 啟動器 exe，請在 Windows PowerShell 執行：

```powershell
powershell -ExecutionPolicy Bypass -File windows\Build-WildDogHere-CMS-EXE.ps1
```

完成後可雙擊：

```text
windows\WildDogHereCMS.exe
```

這個 exe 是本機 CMS 啟動器，需要跟專案資料夾放在一起，並且 Windows 電腦要已安裝 Node.js。

若要在 Windows 電腦產生「整包自解壓 exe」，雙擊：

```text
WINDOWS-CREATE-EXE.cmd
```

輸出：

```text
dist/WildDogHere-CMS-Windows.exe
```

這個 exe 會包含專案檔案並啟動 Windows setup，但 Windows 電腦仍需要先安裝 Node.js LTS。
自解壓 exe 預設會安裝到 `%USERPROFILE%\WildDogHere-CMS`。

若要產生給 Windows 電腦使用的壓縮包：

```bash
npm run package:windows
npm run package:windows:notes
npm run package:windows:handoff-check
```

輸出位置：

```text
dist/wilddoghere-cms-windows.zip
dist/WINDOWS-HANDOFF.txt
```

Windows 電腦上若要確認後台設定完整，可雙擊：

```text
WINDOWS-VERIFY.cmd
```

Windows 電腦上若要修改 CMS 後台帳號，可雙擊：

```text
WINDOWS-CHANGE-ACCOUNT.cmd
```

## 可維護資料

- `data/characters.ts`：野狗軍團家庭成員與敘事者資料
- `data/contents.json`：文章內容資料，建議用本機 CMS 更新
- `data/contents.ts`：文章型別與資料匯出
- `data/socialLinks.ts`：社群與聯絡方式

角色與作品資料都已保留正式圖片欄位。圖片檔案尚未放入 repo 前，網站會顯示輕量 placeholder。

## Reusable components

- `components/CharacterCard.tsx`
- `components/ContentCard.tsx`
- `components/SectionTitle.tsx`
- `components/CTAButton.tsx`

## Phase 2 文件

- `docs/content-update-sop.md`：文章、角色與社群連結更新流程
- `docs/local-cms-guide.md`：本機 CMS 開啟、編輯、預覽與上架流程
- `docs/image-strategy.md`：圖片命名、存放位置、尺寸與壓縮策略
- `docs/blog-roadmap.md`：未來文章系統規劃，不導入 CMS 的前提下逐步擴充

## 部署到 Vercel

1. 將此資料夾推到 GitHub repository。
2. 到 Vercel 建立 New Project。
3. 選擇該 repository。
4. Framework Preset 選 Next.js。
5. Build Command 使用 `npm run build`。
6. Output Directory 維持 Vercel 預設值。
7. Deploy。

## 綁定自訂網域

1. 在 Vercel 專案頁面進入 Settings → Domains。
2. 輸入要綁定的網域，例如 `wilddoghere.com` 或 `www.wilddoghere.com`。
3. 依照 Vercel 顯示的指示，到網域商後台新增 DNS 記錄。
4. 根網域通常使用 A record 指向 Vercel 指定 IP；`www` 子網域通常使用 CNAME 指向 Vercel 指定主機。
5. 回到 Vercel Domains 頁面，等待狀態變成 Valid Configuration。
6. 若正式網域不是 `www.wilddoghere.com`，請同步更新 `app/layout.tsx` 的 `metadataBase` 與 Open Graph `url`。

## 後續內容更新

- 更新文章：優先使用本機 CMS；資料會寫入 `data/contents.json`。
- 更新家庭成員與敘事者：編輯 `data/characters.ts`。
- 更新社群與合作信箱：編輯 `data/socialLinks.ts`。
- 若要加入真實照片，請依照 `docs/image-strategy.md` 放在 `public/images/`，再逐步替換目前的 placeholder 視覺。
