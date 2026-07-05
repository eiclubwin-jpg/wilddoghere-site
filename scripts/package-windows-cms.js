const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const packageName = "wilddoghere-cms-windows.zip";
const outputPath = path.join(distDir, packageName);

fs.mkdirSync(distDir, { recursive: true });
if (fs.existsSync(outputPath)) {
  fs.rmSync(outputPath);
}

const excludedDirectoryNames = new Set([
  ".git",
  ".next",
  ".vercel",
  ".wilddoghere-publish-worktree",
  "node_modules",
  "dist"
]);

const excludedFileNames = new Set([
  ".DS_Store",
  "open-wilddog-cms.command"
]);

function shouldSkipFile(fileName) {
  return (
    excludedFileNames.has(fileName) ||
    fileName.startsWith(".env") ||
    fileName.endsWith(".tsbuildinfo")
  );
}

function toZipPath(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function collectFiles(directory) {
  const files = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!excludedDirectoryNames.has(entry.name)) {
        files.push(...collectFiles(fullPath));
      }
      continue;
    }

    if (entry.isFile() && !shouldSkipFile(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const crcTable = (() => {
  const table = new Uint32Array(256);

  for (let index = 0; index < 256; index += 1) {
    let value = index;

    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }

    table[index] = value >>> 0;
  }

  return table;
})();

function crc32(buffer) {
  let value = 0xffffffff;

  for (const byte of buffer) {
    value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8);
  }

  return (value ^ 0xffffffff) >>> 0;
}

function getDosDateTime(date = new Date()) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2);
  const dosDate =
    ((year - 1980) << 9) |
    ((date.getMonth() + 1) << 5) |
    date.getDate();

  return { dosDate, dosTime };
}

function createZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const filePath of files) {
    const name = toZipPath(filePath);
    const nameBuffer = Buffer.from(name, "utf8");
    const data = fs.readFileSync(filePath);
    const stat = fs.statSync(filePath);
    const { dosDate, dosTime } = getDosDateTime(stat.mtime);
    const checksum = crc32(data);

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt16LE(dosTime, 10);
    localHeader.writeUInt16LE(dosDate, 12);
    localHeader.writeUInt32LE(checksum, 14);
    localHeader.writeUInt32LE(data.length, 18);
    localHeader.writeUInt32LE(data.length, 22);
    localHeader.writeUInt16LE(nameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28);

    localParts.push(localHeader, nameBuffer, data);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(dosTime, 12);
    centralHeader.writeUInt16LE(dosDate, 14);
    centralHeader.writeUInt32LE(checksum, 16);
    centralHeader.writeUInt32LE(data.length, 20);
    centralHeader.writeUInt32LE(data.length, 24);
    centralHeader.writeUInt16LE(nameBuffer.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);

    centralParts.push(centralHeader, nameBuffer);
    offset += localHeader.length + nameBuffer.length + data.length;
  }

  const centralDirectorySize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const endOfCentralDirectory = Buffer.alloc(22);
  endOfCentralDirectory.writeUInt32LE(0x06054b50, 0);
  endOfCentralDirectory.writeUInt16LE(0, 4);
  endOfCentralDirectory.writeUInt16LE(0, 6);
  endOfCentralDirectory.writeUInt16LE(files.length, 8);
  endOfCentralDirectory.writeUInt16LE(files.length, 10);
  endOfCentralDirectory.writeUInt32LE(centralDirectorySize, 12);
  endOfCentralDirectory.writeUInt32LE(offset, 16);
  endOfCentralDirectory.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, ...centralParts, endOfCentralDirectory]);
}

const files = collectFiles(root).sort((left, right) =>
  toZipPath(left).localeCompare(toZipPath(right))
);

if (files.length === 0) {
  throw new Error("No files were collected for the Windows package.");
}

fs.writeFileSync(outputPath, createZip(files));
console.log(`Created ${outputPath} with ${files.length} files.`);
