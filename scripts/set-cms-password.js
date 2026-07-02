const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const [, , username, password] = process.argv;

if (!username || !password) {
  console.error("Usage: node scripts/set-cms-password.js <username> <password>");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const passwordHash = crypto
  .createHash("sha256")
  .update(`${salt}:${password}`)
  .digest("hex");

const authPath = path.join(__dirname, "..", "cms", "auth.json");
fs.writeFileSync(
  authPath,
  JSON.stringify({ username, salt, passwordHash }, null, 2) + "\n"
);

console.log(`CMS account updated for "${username}".`);
