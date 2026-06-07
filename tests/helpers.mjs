import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const rootDir = path.resolve(new URL('..', import.meta.url).pathname);

export function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

export async function loadBrowserGlobals() {
  globalThis.window = globalThis;
  await import(pathToFileURL(path.join(rootDir, 'src/jokes-config.js')).href);
  await import(pathToFileURL(path.join(rootDir, 'src/translations.js')).href);
  return {
    config: globalThis.NPR_JOKES_CONFIG,
    translations: globalThis.NPR_TRANSLATIONS
  };
}

export const supportedLocales = ['pt', 'en', 'es', 'fr', 'de', 'it'];
export const coreCategories = ['objetos', 'pessoas', 'filmes_series', 'lugares', 'marcas', 'expressoes'];
