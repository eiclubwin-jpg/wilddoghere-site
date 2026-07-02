const { spawnSync } = require("child_process");
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

const excludes = [
  ".git/*",
  ".next/*",
  ".vercel/*",
  "node_modules/*",
  "dist/*",
  "open-wilddog-cms.command",
  ".env*",
  "*.tsbuildinfo",
  ".DS_Store",
  "*.DS_Store",
  "**/.DS_Store"
];

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe"
  });

  if (result.status !== 0) {
    throw new Error(
      [
        `${command} failed.`,
        result.stdout ? `stdout:\n${result.stdout}` : "",
        result.stderr ? `stderr:\n${result.stderr}` : ""
      ]
        .filter(Boolean)
        .join("\n")
    );
  }
}

if (process.platform === "win32") {
  const excluded = excludes
    .map((item) => `-not ($_.FullName -like '*\\${item.replace(/\//g, "\\")}')`)
    .join(" -and ");
  const command = [
    "$ErrorActionPreference='Stop';",
    `$files = Get-ChildItem -Path . -Recurse | Where-Object { ${excluded} };`,
    `Compress-Archive -Path $files.FullName -DestinationPath '${outputPath}' -Force;`
  ].join(" ");
  run("powershell", ["-ExecutionPolicy", "Bypass", "-Command", command]);
} else {
  run("zip", [
    "-r",
    "-X",
    outputPath,
    ".",
    ...excludes.flatMap((item) => ["-x", item])
  ]);
}

console.log(`Created ${outputPath}`);
