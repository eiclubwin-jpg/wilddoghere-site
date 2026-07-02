const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const packagePath = path.join(root, "dist", "wilddoghere-cms-windows.zip");
const notesPath = path.join(root, "dist", "WINDOWS-HANDOFF.txt");

if (!fs.existsSync(packagePath)) {
  throw new Error("Missing dist/wilddoghere-cms-windows.zip.");
}

if (!fs.existsSync(notesPath)) {
  throw new Error("Missing dist/WINDOWS-HANDOFF.txt.");
}

const hash = crypto
  .createHash("sha256")
  .update(fs.readFileSync(packagePath))
  .digest("hex");
const notes = fs.readFileSync(notesPath, "utf8");

if (!notes.includes(hash)) {
  throw new Error("WINDOWS-HANDOFF.txt SHA256 does not match the current Windows zip.");
}

for (const expected of [
  "WINDOWS-SETUP.cmd",
  "WINDOWS-VERIFY.cmd",
  "WINDOWS-CHANGE-ACCOUNT.cmd",
  "WINDOWS-CREATE-EXE.cmd",
  "wilddoghere",
  "WildDogHere2026!"
]) {
  if (!notes.includes(expected)) {
    throw new Error(`WINDOWS-HANDOFF.txt is missing ${expected}.`);
  }
}

console.log("Windows handoff check passed.");
