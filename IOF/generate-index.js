#!/usr/bin/env node
/**
 * generate-index.js
 * Crawls all data directories and writes file-index.json.
 * Run: node generate-index.js
 */

const fs   = require("fs");
const path = require("path");

const ROOT = __dirname;

// Directories to include — ordered by type for human readability
const SCAN_DIRS = [
  "governance-profiles",
  "policies",
  "analysis-profiles",
  "domains",
  "regions",
  "docs"
];

// Files/patterns to exclude
const EXCLUDE = [
  "README.md",
  "file-index.json",
  "manifest.json"
];

function scanDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => {
      // Directories before files, then alphabetical
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanDir(fullPath));
    } else if (
      entry.name.endsWith(".json") &&
      !EXCLUDE.includes(entry.name)
    ) {
      // Relative path from ROOT, using ./
      const rel = "./" + path.relative(ROOT, fullPath).replace(/\\/g, "/");
      results.push(rel);
    }
  }
  return results;
}

const files = [];
for (const dir of SCAN_DIRS) {
  files.push(...scanDir(path.join(ROOT, dir)));
}

const index = { generated: new Date().toISOString(), files };
fs.writeFileSync(
  path.join(ROOT, "file-index.json"),
  JSON.stringify(index, null, 2) + "\n"
);

console.log(`✓ file-index.json — ${files.length} files indexed`);
files.forEach(f => console.log("  " + f));
