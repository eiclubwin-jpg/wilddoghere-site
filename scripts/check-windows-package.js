const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const archivePath = path.join(root, "dist", "wilddoghere-cms-windows.zip");

if (!fs.existsSync(archivePath)) {
  throw new Error("Missing dist/wilddoghere-cms-windows.zip. Run npm run package:windows first.");
}

const result = spawnSync("unzip", ["-l", archivePath], {
  cwd: root,
  encoding: "utf8",
  stdio: "pipe"
});

if (result.status !== 0) {
  throw new Error(result.stderr || "Could not inspect Windows package.");
}

const listing = result.stdout;
const required = [
  "WINDOWS-README-FIRST.txt",
  "WINDOWS-SETUP.cmd",
  "WINDOWS-VERIFY.cmd",
  "WINDOWS-CREATE-EXE.cmd",
  "WINDOWS-CHANGE-ACCOUNT.cmd",
  "cms/auth.json",
  "cms/server.js",
  "cms/public/login.html",
  "cms/public/index.html",
  "windows/Setup-WildDogHere-CMS.cmd",
  "windows/Ensure-Node-LTS.cmd",
  "windows/Change-CMS-Account.cmd",
  "windows/Start-WildDogHere-CMS.cmd",
  "windows/Verify-WildDogHere-CMS.cmd",
  "windows/Build-WildDogHere-CMS-EXE.ps1",
  "windows/Build-WildDogHere-CMS-SelfExtracting-EXE.ps1",
  "windows/Build-WildDogHere-CMS-SelfExtracting-EXE.cmd",
  "scripts/set-cms-password.js",
  "scripts/check-cms.js",
  "package.json",
  "package-lock.json"
];

const forbidden = [
  ".git/",
  ".next/",
  "node_modules/",
  ".DS_Store",
  "open-wilddog-cms.command",
  "windows/WildDogHereCMS.exe"
];

for (const file of required) {
  if (!listing.includes(file)) {
    throw new Error(`Windows package is missing ${file}.`);
  }
}

for (const file of forbidden) {
  if (listing.includes(file)) {
    throw new Error(`Windows package should not include ${file}.`);
  }
}

console.log("Windows package check passed.");
