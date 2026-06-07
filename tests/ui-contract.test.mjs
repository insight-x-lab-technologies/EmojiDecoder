import test from 'node:test';
import assert from 'node:assert/strict';
import { readText } from './helpers.mjs';

test('html exposes the main navigation screens for the player journey', () => {
  const html = readText('src/index.html');
  const requiredScreens = [
    'screen-home',
    'screen-setup',
    'screen-game',
    'screen-score',
    'screen-final',
    'screen-wordbank',
    'screen-multidevice',
    'screen-guest'
  ];

  for (const screen of requiredScreens) {
    assert.match(html, new RegExp(`id="${screen}"`), `missing ${screen}`);
  }
});

test('html keeps critical journey actions wired', () => {
  const html = readText('src/index.html');
  const requiredActions = [
    'data-nav="setup"',
    'data-action="start-game"',
    'data-action="reveal-word"',
    'data-action="mark-correct"',
    'data-action="mark-wrong"',
    'data-action="next-turn"',
    'data-nav="wordbank"',
    'data-nav="multidevice"'
  ];

  for (const action of requiredActions) {
    assert.ok(html.includes(action), `missing ${action}`);
  }
});

test('settings expose configurable speed bonus controls', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  for (const id of ['speed-bonus-toggle', 'speed-bonus-input']) {
    assert.ok(html.includes(`id="${id}"`), `missing ${id}`);
  }
  for (const key of ['settings.speedBonusLabel', 'settings.speedBonusSub', 'settings.speedBonusMaxLabel', 'settings.speedBonusMaxSub']) {
    assert.ok(html.includes(key), `missing ${key}`);
  }
  for (const label of ['Bônus por velocidade', 'Speed bonus', 'Bono por velocidad', 'Bonus de vitesse', 'Tempo-Bonus', 'Bonus velocità']) {
    assert.ok(translations.includes(label), `missing ${label}`);
  }
});

test('game screen exposes paid hint request controls', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('id="hint-request-panel"'));
  assert.ok(html.includes('id="request-hint-btn"'));
  assert.ok(html.includes('data-action="request-hint"'));
  assert.ok(html.includes('id="hint-cost-label"'));
  for (const label of ['Pedir dica', 'Request hint', 'Pedir pista', 'Demander un indice', 'Hinweis anfordern', 'Chiedi indizio']) {
    assert.ok(translations.includes(label), `missing ${label}`);
  }
});

test('setup explains scoring tradeoffs before the match starts', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('id="setup-scoring-tradeoff"'));
  assert.ok(html.includes('setup.scoringTradeoff'));
  assert.ok(translations.includes('Acertos rápidos valem bônus'));
  assert.ok(translations.includes('Fast correct answers earn bonuses'));
});

test('setup and result expose buzz mode controls', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('id="buzz-mode-toggle"'));
  assert.ok(html.includes('setup.buzzModeLabel'));
  assert.ok(html.includes('id="result-guesser-picker"'));
  assert.ok(html.includes('id="result-guesser-select"'));
  assert.ok(translations.includes('Modo Disputa'));
  assert.ok(translations.includes('Who solved first?'));
});

test('setup and result expose steal mode controls', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('id="steal-mode-toggle"'));
  assert.ok(html.includes('setup.stealModeLabel'));
  assert.ok(html.includes('id="result-steal-panel"'));
  assert.ok(html.includes('id="result-steal-btn"'));
  assert.ok(translations.includes('Modo Roubo'));
  assert.ok(translations.includes('Steal mode'));
});

test('setup exposes combo mode controls', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('id="combo-mode-toggle"'));
  assert.ok(html.includes('setup.comboModeLabel'));
  assert.ok(translations.includes('Modo Combo'));
  assert.ok(translations.includes('Combo mode'));
});

test('typed guess mode exposes host and guest controls', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('id="typed-guess-mode-toggle"'));
  assert.ok(html.includes('id="typed-guess-panel"'));
  assert.ok(html.includes('id="typed-guess-input"'));
  assert.ok(html.includes('data-action="submit-typed-guess"'));
  assert.ok(html.includes('id="guest-guess-panel"'));
  assert.ok(html.includes('data-action="submit-guest-guess"'));
  assert.ok(translations.includes('Palpite digitado'));
  assert.ok(translations.includes('Typed guess'));
});

test('setup exposes challenge difficulty filter', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('id="difficulty-filter-wrap"'));
  assert.ok(html.includes('id="difficulty-select"'));
  assert.ok(html.includes('setup.difficultySub'));
  for (const label of ['Filtra desafios', 'Filters challenges', 'Filtra desafíos', 'Filtre les défis', 'Filtert Herausforderungen', 'Filtra le sfide']) {
    assert.ok(translations.includes(label), `missing ${label}`);
  }
});

test('daily challenge exposes setup, leaderboard, and final sharing controls', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('id="daily-challenge-toggle"'));
  assert.ok(html.includes('setup.dailyChallengeLabel'));
  assert.ok(html.includes('data-leaderboard-filter="scope"'));
  assert.ok(html.includes('data-leaderboard-value="daily"'));
  assert.ok(html.includes('id="share-daily-result-btn"'));
  assert.ok(html.includes('data-action="share-daily-result"'));
  for (const label of ['Desafio Diário', 'Daily Challenge', 'Desafío diario', 'Défi quotidien', 'Tagesherausforderung', 'Sfida giornaliera']) {
    assert.ok(translations.includes(label), `missing ${label}`);
  }
});

test('word bank exposes local curation filters', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('id="joke-curation-filter"'));
  for (const value of ['topRated', 'highSuccess', 'needsReview', 'neverAgain', 'allStats']) {
    assert.ok(html.includes(`value="${value}"`), `missing curation filter ${value}`);
  }
  for (const label of ['Melhores avaliados', 'Top rated', 'Mejor evaluados', 'Mieux notés', 'Bestbewertet', 'Migliori valutazioni']) {
    assert.ok(translations.includes(label), `missing ${label}`);
  }
});

test('word bank exposes local pack creator controls', () => {
  const html = readText('src/index.html');
  const translations = readText('src/translations.js');

  assert.ok(html.includes('wordbank-pack-creator-card'));
  assert.ok(html.includes('id="pack-creator-name"'));
  assert.ok(html.includes('id="pack-creator-description"'));
  assert.ok(html.includes('data-action="export-local-pack"'));
  assert.ok(html.includes('data-action="share-local-pack"'));
  assert.ok(html.includes('id="pack-share-qr"'));
  for (const label of ['Criador de Packs', 'Pack Creator', 'Creador de packs', 'Créateur de packs', 'Pack-Ersteller', 'Creatore di pack']) {
    assert.ok(translations.includes(label), `missing ${label}`);
  }
  assert.ok(translations.includes('Compartilhar por link/QR'));
  assert.ok(translations.includes('Share by link/QR'));
});

test('html and css expose baseline accessibility affordances', () => {
  const html = readText('src/index.html');
  const styles = readText('src/style.css');
  const themes = readText('src/themes.css');

  assert.ok(html.includes('id="a11y-live-region"'));
  assert.ok(html.includes('aria-live="polite"'));
  assert.ok(html.includes('id="word-display" role="text"'));
  assert.ok(html.includes('id="guest-word-display" role="text"'));
  assert.ok(html.includes('id="resultSub" role="status"'));
  assert.ok(styles.includes(':where(a, button, input, select, textarea, summary, [tabindex]):focus-visible'));
  assert.ok(styles.includes('.sr-only'));
  assert.ok(themes.includes('--focus-ring-color: #ffff00;'));
});

test('html loads app scripts in dependency order', () => {
  const html = readText('src/index.html');
  const translations = html.indexOf('src="translations.js"');
  const config = html.indexOf('src="jokes-config.js"');
  const script = html.indexOf('src="script.js"');

  assert.ok(translations > 0, 'translations.js should be loaded');
  assert.ok(config > 0, 'jokes-config.js should be loaded');
  assert.ok(script > config, 'script.js should load after content config');
  assert.ok(script > translations, 'script.js should load after translations');
});

test('manifest and service worker reference the PWA shell', () => {
  const manifest = JSON.parse(readText('src/manifest.webmanifest'));
  const sw = readText('src/service-worker.js');

  assert.equal(manifest.name, 'EmojiDecoder');
  assert.equal(manifest.short_name, 'EmojiDecoder');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 4);
  for (const asset of ['index.html', 'style.css', 'themes.css', 'jokes-config.js', 'script.js', 'manifest.webmanifest']) {
    assert.ok(sw.includes(asset), `service worker should cache ${asset}`);
  }
});
