#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"

node --check src/script.js
node --check src/translations.js
node --check src/jokes-config.js
node --check src/service-worker.js

node <<'NODE'
const fs = require('fs');

JSON.parse(fs.readFileSync('package.json', 'utf8'));
JSON.parse(fs.readFileSync('src/manifest.webmanifest', 'utf8'));

const requiredFiles = [
  'src/index.html',
  'src/style.css',
  'src/themes.css',
  'src/jokes-config.js',
  'src/script.js',
  'src/translations.js',
  'src/service-worker.js',
  'src/assets/icons/icon.svg',
  'src/assets/player-default.svg'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

globalThis.window = globalThis;
require('./src/jokes-config.js');
require('./src/translations.js');

const categories = ['objetos', 'pessoas', 'filmes_series', 'lugares', 'marcas', 'expressoes'];
for (const locale of ['pt', 'en', 'es', 'fr', 'de', 'it']) {
  const content = globalThis.NPR_JOKES_CONFIG?.[locale];
  if (!content) throw new Error(`Missing ${locale} challenge content`);

  for (const category of categories) {
    const entries = content[category];
    if (!Array.isArray(entries) || entries.length < 30) {
      throw new Error(`Expected 30 challenges for ${locale}/${category}`);
    }
    for (const entry of entries) {
      if (!entry.id || !entry.text || !entry.clue || !entry.answer || !entry.hint) {
        throw new Error(`Invalid challenge entry in ${locale}/${category}`);
      }
      if (!['easy', 'normal', 'hard'].includes(entry.difficulty)) {
        throw new Error(`Invalid challenge difficulty in ${locale}/${category}: ${entry.id}`);
      }
      if (/Resposta:/i.test(entry.text)) {
        throw new Error(`Answer leaked in challenge text: ${entry.id}`);
      }
    }
  }
}

for (const locale of ['pt', 'en', 'es', 'fr', 'de', 'it']) {
  const translations = globalThis.NPR_TRANSLATIONS?.[locale];
  if (!translations?.home?.title || !translations?.category?.objetos?.plural) {
    throw new Error(`Missing required translations for ${locale}`);
  }
}

console.log('static smoke ok');
NODE
