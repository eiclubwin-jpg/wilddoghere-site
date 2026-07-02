const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const packagePath = path.join(distDir, "wilddoghere-cms-windows.zip");
const notesPath = path.join(distDir, "WINDOWS-HANDOFF.txt");

if (!fs.existsSync(packagePath)) {
  throw new Error("Missing dist/wilddoghere-cms-windows.zip. Run npm run package:windows first.");
}

const file = fs.readFileSync(packagePath);
const hash = crypto.createHash("sha256").update(file).digest("hex");
const sizeMb = (file.length / 1024 / 1024).toFixed(1);

const notes = `WildDogHere CMS Windows Handoff
=================================

Package:
  wilddoghere-cms-windows.zip

Size:
  ${sizeMb} MB

SHA256:
  ${hash}

Windows first steps:
  1. Install Node.js LTS:
     https://nodejs.org/

  2. Unzip wilddoghere-cms-windows.zip

  3. Double-click:
     WINDOWS-SETUP.cmd

  4. Open the CMS later with:
     windows\\WildDogHereCMS.exe

CMS default account:
  username: wilddoghere
  password: WildDogHere2026!

Change CMS account:
  Double-click WINDOWS-CHANGE-ACCOUNT.cmd

Verify Windows setup:
  Double-click WINDOWS-VERIFY.cmd

Create self-extracting exe on Windows:
  Double-click WINDOWS-CREATE-EXE.cmd
  Output: dist\\WildDogHere-CMS-Windows.exe

Notes:
  - Do not use open-wilddog-cms.command on Windows. It is macOS only.
  - The live website remains a static Next.js site deployed by Vercel.
  - After editing content, commit and push to update the live website.
`;

fs.writeFileSync(notesPath, notes);
console.log(`Created ${notesPath}`);
