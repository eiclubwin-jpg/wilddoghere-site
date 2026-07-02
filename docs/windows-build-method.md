# Windows CMS Build Method

本機 Mac 無法直接產生 Windows `.exe` 時，建議使用 GitHub Actions 的 Windows runner 產生。

## 操作步驟

1. 將專案 commit 並 push 到 GitHub。
2. 開啟 GitHub repository。
3. 進入 Actions。
4. 選擇 `Build Windows CMS Package`。
5. 點 `Run workflow`。
6. 完成後下載 artifact：`wilddoghere-cms-windows`。

artifact 內會包含：

```text
wilddoghere-cms-windows.zip
WINDOWS-HANDOFF.txt
WildDogHere-CMS-Windows.exe
```

## Windows 使用方式

若直接使用 exe：

```text
WildDogHere-CMS-Windows.exe
```

若使用 zip：

```text
1. 解壓縮 wilddoghere-cms-windows.zip
2. 雙擊 WINDOWS-SETUP.cmd
3. 之後雙擊 windows\WildDogHereCMS.exe 開後台
```

預設後台帳號：

```text
帳號：wilddoghere
密碼：WildDogHere2026!
```
