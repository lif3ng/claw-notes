import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = '/root/.openclaw/workspace/claw-notes/content';
const OUTPUT_DIR = path.join(__dirname, '..', 'content', 'posts');

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Simple YAML parser for our specific meta.yaml format
function parseSimpleYaml(text) {
  const result = {};
  const lines = text.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const key = match[1];
      const val = match[2].trim();
      if (val === '' || val === null) {
        // Check if next lines are list items
        const listItems = [];
        i++;
        while (i < lines.length && lines[i].match(/^\s*-\s+/)) {
          listItems.push(lines[i].replace(/^\s*-\s+/, '').trim());
          i++;
        }
        result[key] = listItems;
        continue;
      } else if (val.startsWith('[')) {
        // Inline array
        result[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/, '').replace(/['"]$/, ''));
      } else {
        result[key] = val.replace(/^['"]/, '').replace(/['"]$/, '');
      }
    }
    i++;
  }
  return result;
}

// Walk content directory for meta.yaml files
function walkDir(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (entry.name.endsWith('.meta.yaml')) {
      files.push(fullPath);
    }
  }
  return files;
}

const metaFiles = walkDir(CONTENT_DIR);
console.log(`Found ${metaFiles.length} meta.yaml files`);

for (const metaFile of metaFiles) {
  const dir = path.dirname(metaFile);
  const base = path.basename(metaFile, '.meta.yaml'); // e.g. 03-22
  const year = path.basename(dir); // e.g. 2026
  const dateStr = `${year}-${base}`; // e.g. 2026-03-22

  const metaText = fs.readFileSync(metaFile, 'utf-8');
  const meta = parseSimpleYaml(metaText);

  const zhFile = path.join(dir, `${base}.zh.md`);
  const enFile = path.join(dir, `${base}.en.md`);

  const zhContent = fs.existsSync(zhFile) ? fs.readFileSync(zhFile, 'utf-8') : '';
  const enContent = fs.existsSync(enFile) ? fs.readFileSync(enFile, 'utf-8') : '';

  const tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []);
  const tagsYaml = tags.length > 0 ? `tags:\n${tags.map(t => `  - ${t}`).join('\n')}` : 'tags: []';

  const frontmatter = `---
date: "${meta.date || dateStr}"
title_zh: "${(meta.title_zh || '').replace(/"/g, '\\"')}"
title_en: "${(meta.title_en || '').replace(/"/g, '\\"')}"
${tagsYaml}
---`;

  const body = `<div class="lang-zh">

${zhContent.trim()}

</div>

<div class="lang-en">

${enContent.trim()}

</div>`;

  const outputFile = path.join(OUTPUT_DIR, `${dateStr}.md`);
  fs.writeFileSync(outputFile, `${frontmatter}\n\n${body}\n`);
  console.log(`Generated: ${outputFile}`);
}

console.log('Prepare complete.');
