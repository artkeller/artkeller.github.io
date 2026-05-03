#!/usr/bin/env node
/**
 * generate-index.js
 * Crawls all data directories and writes file-index.json.
 * Run after ANY structural change: node generate-index.js
 *
 * Selection logic (matches index.html runtime):
 *   - countries: ["*"]  → global node, appears in all region-views
 *   - countries: ["DE"] → appears only when region contains DE
 *   - no countries field → domain-only node, excluded from region-views
 */

const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;

const SCAN_DIRS = [
  'governance-profiles',
  'policies',
  'analysis-profiles',
  'domains',
  'regions',
  'docs'
];

const EXCLUDE_FILES = ['file-index.json', 'manifest.json'];

function scanDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...scanDir(full));
    } else if (e.name.endsWith('.json') && !EXCLUDE_FILES.includes(e.name)) {
      results.push('./' + path.relative(ROOT, full).replace(/\\/g, '/'));
    }
  }
  return results;
}

// Collect files
const files = [];
for (const d of SCAN_DIRS) files.push(...scanDir(path.join(ROOT, d)));

// Validate + annotate domain nodes for country scope
let globalCount = 0, scopedCount = 0, domainOnlyCount = 0, warnings = 0;

files.forEach(f => {
  if (!f.includes('/domains/')) return;
  try {
    const j = JSON.parse(fs.readFileSync(path.join(ROOT, f.replace('./', '')), 'utf8'));
    if (!j.countries) {
      domainOnlyCount++;
      console.warn(`  ⚠ no countries field (domain-only): ${f}`);
      warnings++;
    } else if (j.countries[0] === '*') {
      globalCount++;
    } else {
      scopedCount++;
    }
  } catch(e) {
    console.error(`  ✗ invalid JSON: ${f}`);
  }
});

const index = { generated: new Date().toISOString(), files };
fs.writeFileSync(path.join(ROOT, 'file-index.json'), JSON.stringify(index, null, 2) + '\n');

console.log(`\n✓ file-index.json — ${files.length} files indexed`);
console.log(`  domain nodes: ${globalCount} global (*), ${scopedCount} scoped, ${domainOnlyCount} domain-only`);
if (warnings) console.log(`  ⚠ ${warnings} warnings — see above`);
