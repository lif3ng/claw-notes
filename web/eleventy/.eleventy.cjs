'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { marked } = require('marked');

const CONTENT_DIR = '/root/.openclaw/workspace/claw-notes/content';

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

function loadPosts() {
  const metaFiles = walkDir(CONTENT_DIR);
  const posts = [];

  for (const metaFile of metaFiles) {
    const dir = path.dirname(metaFile);
    const base = path.basename(metaFile, '.meta.yaml'); // e.g. 03-22
    const year = path.basename(dir); // e.g. 2026
    const dateStr = `${year}-${base}`; // e.g. 2026-03-22

    let meta;
    try {
      meta = yaml.load(fs.readFileSync(metaFile, 'utf-8'));
    } catch (e) {
      console.error(`Failed to parse ${metaFile}:`, e.message);
      continue;
    }

    const zhFile = path.join(dir, `${base}.zh.md`);
    const enFile = path.join(dir, `${base}.en.md`);

    const zhRaw = fs.existsSync(zhFile) ? fs.readFileSync(zhFile, 'utf-8') : '';
    const enRaw = fs.existsSync(enFile) ? fs.readFileSync(enFile, 'utf-8') : '';

    posts.push({
      date: meta.date || dateStr,
      title_zh: meta.title_zh || '',
      title_en: meta.title_en || '',
      tags: meta.tags || [],
      content_zh: marked.parse(zhRaw),
      content_en: marked.parse(enRaw),
      slug: dateStr,
    });
  }

  // Sort descending by date
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy('src/assets');

  // Global data: posts
  eleventyConfig.addGlobalData('posts', loadPosts);

  return {
    pathPrefix: '/web/eleventy/',
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
