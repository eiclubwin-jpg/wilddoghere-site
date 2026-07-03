const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const archivePath = path.join(root, "dist", "wilddoghere-cms-windows.zip");

if (!fs.existsSync(archivePath)) {
  throw new Error("Missing dist/wilddoghere-cms-windows.zip. Run npm run package:windows first.");
}

function listZipEntries(filePath) {
  const buffer = fs.readFileSync(filePath);
  const eocdSignature = 0x06054b50;
  const centralDirectorySignature = 0x02014b50;
  let eocdOffset = -1;

  for (let index = buffer.length - 22; index >= 0; index -= 1) {
    if (buffer.readUInt32LE(index) === eocdSignature) {
      eocdOffset = index;
      break;
    }
  }

  if (eocdOffset === -1) {
    throw new Error("Could not read ZIP central directory.");
  }

  const entryCount = buffer.readUInt16LE(eocdOffset + 10);
  let offset = buffer.readUInt32LE(eocdOffset + 16);
  const entries = [];

  for (let entryIndex = 0; entryIndex < entryCount; entryIndex += 1) {
    if (buffer.readUInt32LE(offset) !== centralDirectorySignature) {
      throw new Error("Invalid ZIP central directory entry.");
    }

    const fileNameLength = buffer.readUInt16LE(offset + 28);
    const extraFieldLength = buffer.readUInt16LE(offset + 30);
    const fileCommentLength = buffer.readUInt16LE(offset + 32);
    const fileNameStart = offset + 46;
    const fileNameEnd = fileNameStart + fileNameLength;
    const fileName = buffer
      .subarray(fileNameStart, fileNameEnd)
      .toString("utf8")
      .replace(/\\/g, "/");

    entries.push(fileName);
    offset = fileNameEnd + extraFieldLength + fileCommentLength;
  }

  return entries;
}

const entries = listZipEntries(archivePath);
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
  "public/images/brand/wilddoghere-watermark.png",
  "public/images/brand/wilddoghere-logo-wide.png",
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
  if (!entries.some((entry) => entry === file || entry.endsWith(`/${file}`))) {
    throw new Error(`Windows package is missing ${file}.`);
  }
}

for (const file of forbidden) {
  if (entries.some((entry) => entry.includes(file))) {
    throw new Error(`Windows package should not include ${file}.`);
  }
}

console.log("Windows package check passed.");
