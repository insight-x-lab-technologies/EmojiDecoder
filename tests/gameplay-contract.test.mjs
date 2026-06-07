import test from 'node:test';
import assert from 'node:assert/strict';
import { readText } from './helpers.mjs';

test('single-device preparation has a secret answer preview for the validator', () => {
  const html = readText('src/index.html');
  const script = readText('src/script.js');

  assert.ok(html.includes('id="secret-answer-card"'));
  assert.ok(html.includes('id="secret-answer-text"'));
  assert.ok(script.includes('function syncSecretAnswerPreview()'));
  assert.ok(script.includes('!shouldShowSecretAnswerOnCompanion()'));
});

test('multi-device payload sends secret answer to companion screen', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes('secretMode'));
  assert.ok(script.includes('shouldShowSecretOnCompanion'));
  assert.ok(script.includes('function shouldShowSecretAnswerOnCompanion()'));
  assert.ok(script.includes("t('multiDevice.guestSecretAnswer')"));
  assert.ok(script.includes("t('game.secretAnswerCompanionSub')"));
});

test('multi-device companion receives challenge and requested hint only for the guessing player', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes('const showJokeOnCompanion = shouldPresentJokeOnCompanion();'));
  assert.ok(script.includes('const showSecretAnswerOnCompanion = shouldShowSecretAnswerOnCompanion();'));
  assert.ok(script.includes('const helperText = getChallengeHelperText(gameState.currentWord, gameState.currentChallenge'));
  assert.ok(script.includes('includeHint: gameState.hintRequested'));
  assert.ok(script.includes("jokeText: shouldShowSecretOnCompanion ? answerText : (showJokeOnCompanion ? challengeText : '')"));
  assert.ok(script.includes("challengeText: shouldShowSecretOnCompanion ? t('game.secretAnswerCompanionSub') : (showJokeOnCompanion ? helperText : '')"));
  assert.ok(script.includes('const shouldShowOnHost = Boolean(answer) && !shouldShowSecretAnswerOnCompanion();'));
  assert.ok(script.includes('buzzMode: Boolean(gameState.buzzMode)'));
  assert.ok(script.includes('stealMode: Boolean(gameState.stealMode)'));
  assert.ok(script.includes('comboMode: Boolean(gameState.comboMode)'));
  assert.ok(script.includes('typedGuessMode: Boolean(gameState.typedGuessMode)'));
});

test('scoring rewards the current decoder in free-for-all mode', () => {
  const script = readText('src/script.js');
  const ffaScorePattern = /else\s*\{\s*addScore\(playerName,\s*correctPoints\);\s*\}/;

  assert.match(script, ffaScorePattern);
});

test('scoring rewards both team and current decoder in team mode', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes("addScore('team' + player.team, correctPoints);"));
  assert.ok(script.includes('addScore(playerName, correctPoints);'));
  assert.ok(script.includes("addScore('team' + player.team, -wrongPenaltyPoints);"));
});

test('correct scoring includes optional speed bonus decomposition', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes('const DEFAULT_SPEED_BONUS_ENABLED = true;'));
  assert.ok(script.includes('const DEFAULT_SPEED_BONUS_MAX = 5;'));
  assert.ok(script.includes('function calculateSpeedBonus(timerLeft, timerTotal, bonusMax)'));
  assert.ok(script.includes('Math.round((safeLeft / safeTotal) * safeBonusMax)'));
  assert.ok(script.includes('function getCorrectScoreBreakdown()'));
  assert.ok(script.includes('const correctPoints = correctScore.total;'));
  assert.ok(script.includes("t('dynamic.correctScoreBreakdown', correctScore)"));
});

test('settings persist speed bonus configuration', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes('speedBonusEnabled: isSpeedBonusEnabled()'));
  assert.ok(script.includes('speedBonusMax: getConfiguredSpeedBonusMax()'));
  assert.ok(script.includes('speedBonusEnabled: DEFAULT_SPEED_BONUS_ENABLED'));
  assert.ok(script.includes('speedBonusMax: DEFAULT_SPEED_BONUS_MAX'));
  assert.ok(script.includes("document.getElementById('speed-bonus-toggle')?.addEventListener('change', saveSettings)"));
});

test('paid hint stays hidden until requested and discounts correct score', () => {
  const script = readText('src/script.js');
  const translations = readText('src/translations.js');

  assert.ok(script.includes('const DEFAULT_HINT_PENALTY_POINTS = 3;'));
  assert.ok(script.includes('hintRequested: false'));
  assert.ok(script.includes('includeHint: gameState.hintRequested'));
  assert.ok(script.includes('function requestHint()'));
  assert.ok(script.includes('gameState.hintRequested = true;'));
  assert.ok(script.includes('const hintPenalty = getCurrentHintPenaltyPoints();'));
  assert.ok(script.includes('total: Math.max(0, base + speedBonus + difficultyBonus - hintPenalty)'));
  assert.ok(translations.includes('- dica'));
  assert.ok(translations.includes('- hint'));
});

test('challenge difficulty filters the deck and adds a score bonus', () => {
  const script = readText('src/script.js');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('const DIFFICULTY_BONUS_POINTS = { easy: 0, normal: 2, hard: 4 };'));
  assert.ok(script.includes('function filterJokesByDifficulty(jokes, difficulty = gameState.difficulty)'));
  assert.ok(script.includes('function getDifficultyBonusPoints'));
  assert.ok(script.includes('const difficultyBonus = getDifficultyBonusPoints();'));
  assert.ok(script.includes('gameState.difficulty = document.getElementById(\'difficulty-select\')?.value || \'easy\';'));
  assert.ok(script.includes('filterJokesByDifficulty(jokes, gameState.difficulty).forEach(joke => {'));
  assert.ok(script.includes('difficulty: getChallengeDifficulty(joke)'));
  assert.ok(script.includes('difficulty: gameState.currentWord?.difficulty || gameState.difficulty'));
  assert.ok(doc.includes('[x] **Dificuldade por desafio**'));
});

test('daily challenge uses deterministic deck, separate leaderboard, sharing, and host payload', () => {
  const script = readText('src/script.js');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('dailyChallenge: false'));
  assert.ok(script.includes('dailyDate: \'\''));
  assert.ok(script.includes('function getDailyChallengeDateKey(date = new Date())'));
  assert.ok(script.includes('function hashDailyToken(token = \'\')'));
  assert.ok(script.includes('function selectDailyChallenge(candidates = [])'));
  assert.ok(script.includes('gameState.dailyChallenge = Boolean(document.getElementById(\'daily-challenge-toggle\')?.checked);'));
  assert.ok(script.includes('gameState.dailyDate = gameState.dailyChallenge ? getDailyChallengeDateKey() : \'\';'));
  assert.ok(script.includes('dailyMimeTeams'));
  assert.ok(script.includes('isDailyLeaderboardMode(modeKey)'));
  assert.ok(script.includes('filters.scope === \'daily\''));
  assert.ok(script.includes('dailyChallenge: Boolean(gameState.dailyChallenge)'));
  assert.ok(script.includes('dailyDate: gameState.dailyDate'));
  assert.ok(script.includes('function shareDailyResult()'));
  assert.ok(script.includes('dynamic.dailyShareText'));
  assert.ok(doc.includes('[x] **Desafio Diário:**'));
});

test('word bank curation filters use local challenge stats', () => {
  const script = readText('src/script.js');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('const curationFilter = document.getElementById(\'joke-curation-filter\')?.value || \'topRated\';'));
  assert.ok(script.includes("curationFilter === 'highSuccess'"));
  assert.ok(script.includes('joke.timesPlayed > 0 && joke.laughRate >= 0.7'));
  assert.ok(script.includes("curationFilter === 'needsReview'"));
  assert.ok(script.includes('joke.averageRating < 3'));
  assert.ok(script.includes("curationFilter === 'neverAgain'"));
  assert.ok(script.includes('joke.neverAgain ?'));
  assert.ok(script.includes("document.getElementById('joke-curation-filter')?.addEventListener('change', renderJokeRanking)"));
  assert.ok(doc.includes('[x] Curadoria: filtros por taxa de acerto/avaliação'));
});

test('local pack creator exports and imports schema v1 JSON', () => {
  const script = readText('src/script.js');
  const doc = readText('docs/proposta-roadmap.md');
  const schema = readText('docs/challenge-pack-schema.md');

  assert.ok(script.includes('function buildLocalPackContent(pack, options = {})'));
  assert.ok(script.includes('function validateLocalPackExportEnvelope(envelope)'));
  assert.ok(script.includes("export_type: 'local'"));
  assert.ok(script.includes('function createLocalPackExportEnvelope()'));
  assert.ok(script.includes('function exportLocalPack()'));
  assert.ok(script.includes("envelope?.export_type === 'local'"));
  assert.ok(script.includes('buildInstalledPackFromLocalEnvelope(envelope)'));
  assert.ok(script.includes("if (getPackTotalContentCount(pack) === 0) throw new Error(t('packErrors.emptyPack'));"));
  assert.ok(doc.includes('[x] **Criador de Packs**'));
  assert.ok(schema.includes('"export_type": "local"'));
});

test('local packs can be shared by hash-validated URL and QR', () => {
  const script = readText('src/script.js');
  const doc = readText('docs/proposta-roadmap.md');
  const schema = readText('docs/challenge-pack-schema.md');

  assert.ok(script.includes('function createShareableLocalPackEnvelope()'));
  assert.ok(script.includes('envelope.content_sha256 = await sha256Base64Url(canonicalize(envelope.content || {}));'));
  assert.ok(script.includes('function createPackShareUrl(envelope)'));
  assert.ok(script.includes('url.hash = `pack=${encodeURIComponent(textToBase64Url(JSON.stringify(envelope)))}`;'));
  assert.ok(script.includes('function renderPackShareQRCode(url)'));
  assert.ok(script.includes('function shareLocalPack()'));
  assert.ok(script.includes('function getPackEnvelopeFromUrlHash()'));
  assert.ok(script.includes('function installSharedPackFromUrl()'));
  assert.ok(script.includes('if (contentHash !== envelope.content_sha256) throw new Error(t(\'packErrors.invalidContentHash\'));'));
  assert.ok(script.includes('installSharedPackFromUrl();'));
  assert.ok(doc.includes('[x] Compartilhar pack por URL/QR'));
  assert.ok(schema.includes('#pack=<envelope-json-base64url>'));
});

test('documentation reflects current implemented roadmap state', () => {
  const readme = readText('README.md');
  const adaptation = readText('docs/adaptation-plan.md');
  const evolution = readText('docs/evolution-roadmap.md');
  const scoring = readText('docs/scoring-rules.md');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(doc.includes('[x] Atualizar `docs/` para refletir o estado real'));
  assert.ok(readme.includes('30 desafios por categoria em PT, EN, ES, FR, DE e IT'));
  assert.ok(adaptation.includes('Concluído: packs com schema v1'));
  assert.ok(evolution.includes('Próximas evoluções'));
  assert.ok(scoring.includes('Buzz: todos podem responder'));
});

test('internal glossary defines canonical EmojiDecoder domain terms', () => {
  const readme = readText('README.md');
  const glossary = readText('docs/internal-glossary.md');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(doc.includes('[x] Glossário interno'));
  assert.ok(readme.includes('docs/internal-glossary.md'));
  assert.ok(glossary.includes('`challenge`: desafio de emojis'));
  assert.ok(glossary.includes('`solved`: acerto do nome secreto'));
  assert.ok(glossary.includes('`joke`: usar apenas em funções antigas'));
  assert.ok(glossary.includes('Código novo deve usar `challenge`, `solved`, `decoder`, `companion`'));
});

test('accessibility announces challenge state on host and guest screens', () => {
  const script = readText('src/script.js');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('function setA11yLiveText(text = \'\')'));
  assert.ok(script.includes('function buildChallengeA11yLabel'));
  assert.ok(script.includes('function syncChallengeA11y(element, options = {})'));
  assert.ok(script.includes("element.setAttribute('aria-label', label);"));
  assert.ok(script.includes("if (options.announce) setA11yLiveText(label);"));
  assert.ok(script.includes('syncChallengeA11y(gameWord, {'));
  assert.ok(script.includes('syncChallengeA11y(guestWord, {'));
  assert.ok(script.includes("text.setAttribute('aria-label', buildChallengeA11yLabel({ answer, secret: true }));"));
  assert.ok(doc.includes('[x] Acessibilidade: foco visível'));
});

test('wrong answers have an optional but meaningful default penalty', () => {
  const html = readText('src/index.html');
  const script = readText('src/script.js');
  const translations = readText('src/translations.js');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('const DEFAULT_WRONG_PENALTY_POINTS = 3;'));
  assert.ok(html.includes('id="wrong-points-input" type="number" min="0" max="999" step="1" value="3"'));
  assert.ok(html.includes('id="setup-scoring-tradeoff"'));
  assert.ok(translations.includes('Use 0'));
  assert.ok(doc.includes('Penalidade significativa opcional'));
});

test('buzz mode lets host pick the player who solved first before scoring', () => {
  const script = readText('src/script.js');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('buzzMode: false'));
  assert.ok(script.includes("gameState.buzzMode = Boolean(document.getElementById('buzz-mode-toggle')?.checked);"));
  assert.ok(script.includes('function renderResultGuesserPicker(correctScore)'));
  assert.ok(script.includes('function selectResultGuesser(playerName)'));
  assert.ok(script.includes('gameState.pendingBuzzScore = correctScore;'));
  assert.ok(script.includes('nextButton.disabled = true;'));
  assert.ok(script.includes('addBuzzScore(playerName, comboScore.total)'));
  assert.ok(script.includes('if (gameState.buzzMode) {'));
  assert.ok(doc.includes('[x] **Modo Disputa/Buzz:**'));
});

test('buzz scoring can reward both selected player and their team', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes('function addBuzzScore(playerName, points)'));
  assert.ok(script.includes("addScore('team' + scoringPlayer.team, points);"));
  assert.ok(script.includes('addScore(playerName, points);'));
  assert.ok(script.includes("t('dynamic.buzzCorrectTeamPoints'"));
  assert.ok(script.includes("t('dynamic.buzzCorrectPlayerPoints'"));
});

test('steal mode lets the next player claim half points after a miss', () => {
  const script = readText('src/script.js');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('stealMode: false'));
  assert.ok(script.includes("gameState.stealMode = Boolean(document.getElementById('steal-mode-toggle')?.checked);"));
  assert.ok(script.includes('function calculateStealPoints(points)'));
  assert.ok(script.includes('function getNextStealPlayer()'));
  assert.ok(script.includes('function renderStealPanel(correctScore)'));
  assert.ok(script.includes('function applySteal()'));
  assert.ok(script.includes('renderStealPanel(correctScore);'));
  assert.ok(script.includes('calculateStealPoints(correctScore.total)'));
  assert.ok(doc.includes('[x] **Modo Roubo:**'));
});

test('steal scoring can reward the next player and their team from the host', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes("addScore('team' + stealPlayer.team, pendingSteal.points);"));
  assert.ok(script.includes('addScore(pendingSteal.playerName, pendingSteal.points);'));
  assert.ok(script.includes("t('dynamic.stealTeamPoints'"));
  assert.ok(script.includes("t('dynamic.stealPlayerPoints'"));
  assert.ok(script.includes("if (action === 'apply-steal')"));
});

test('combo mode multiplies consecutive correct answers and resets on miss', () => {
  const script = readText('src/script.js');
  const translations = readText('src/translations.js');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('comboMode: false'));
  assert.ok(script.includes('comboStreaks: {}'));
  assert.ok(script.includes("gameState.comboMode = Boolean(document.getElementById('combo-mode-toggle')?.checked);"));
  assert.ok(script.includes('function getComboMultiplier(playerName)'));
  assert.ok(script.includes('Math.min(3, getComboStreak(playerName) + 1)'));
  assert.ok(script.includes('function applyComboToScore(score, playerName)'));
  assert.ok(script.includes('recordComboSuccess(playerName);'));
  assert.ok(script.includes('resetComboStreak(playerName);'));
  assert.ok(translations.includes('comboMultiplier'));
  assert.ok(doc.includes('[x] **Combo/Sequência:**'));
});

test('buzz mode applies combo to the selected solver instead of the turn owner', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes('const comboScore = applyComboToScore(pendingScore, playerName);'));
  assert.ok(script.includes('addBuzzScore(playerName, comboScore.total)'));
  assert.ok(script.includes('recordComboSuccess(playerName);'));
  assert.ok(script.includes('if (comboScore.comboMultiplier > 1) playComboSound(comboScore.comboMultiplier);'));
  assert.ok(script.includes("t('dynamic.correctScoreBreakdown', comboScore)"));
});

test('decoding microinteraction animates host and guest challenge cards', () => {
  const script = readText('src/script.js');
  const styles = readText('src/style.css');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('function playDecodeAnimation(element)'));
  assert.ok(script.includes("element.classList.add('decoding-burst');"));
  assert.ok(script.includes("card?.classList.add('decoding-burst');"));
  assert.ok(script.includes("playDecodeAnimation(document.getElementById('word-display'));"));
  assert.ok(script.includes('if (changed && payload.phase === \'playing\') playDecodeAnimation(guestWord);'));
  assert.ok(styles.includes('@keyframes decode-pop'));
  assert.ok(styles.includes('@keyframes decode-sheen'));
  assert.ok(doc.includes('[x] Microinterações de "decodificação"'));
});

test('combo mode has a dedicated sound cue when multiplier is active', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes('function playComboSound(multiplier = 1)'));
  assert.ok(script.includes("osc.type = 'triangle';"));
  assert.ok(script.includes('if (!gameState.buzzMode && correctScore.comboMultiplier > 1) playComboSound(correctScore.comboMultiplier);'));
  assert.ok(script.includes('if (comboScore.comboMultiplier > 1) playComboSound(comboScore.comboMultiplier);'));
});

test('typed guess mode normalizes text and can validate locally', () => {
  const script = readText('src/script.js');
  const doc = readText('docs/proposta-roadmap.md');

  assert.ok(script.includes('typedGuessMode: false'));
  assert.ok(script.includes("gameState.typedGuessMode = Boolean(document.getElementById('typed-guess-mode-toggle')?.checked);"));
  assert.ok(script.includes('function normalizeGuessText(value = \'\')'));
  assert.ok(script.includes("normalize('NFD')"));
  assert.ok(script.includes('articles.has(token)'));
  assert.ok(script.includes('function isTypedGuessCorrect(guess, answer)'));
  assert.ok(script.includes('function submitTypedGuess(rawGuess)'));
  assert.ok(script.includes('markResult(true);'));
  assert.ok(doc.includes('[x] (Opcional) **Palpite digitado**'));
});

test('typed guesses can be submitted from guest device to host', () => {
  const script = readText('src/script.js');

  assert.ok(script.includes("sendToGuest(multiDeviceState.hostConnection, { type: 'guest-guess', guess })"));
  assert.ok(script.includes("if (data?.type === 'guest-guess') submitTypedGuess(data.guess);"));
  assert.ok(script.includes("guestGuessPanel?.classList.toggle('hidden', !payload.typedGuessMode || payload.secretMode || payload.phase !== 'playing')"));
  assert.ok(script.includes("if (action === 'submit-guest-guess')"));
});

test('scoring rules documentation records the EmojiDecoder mechanic', () => {
  const doc = readText('docs/scoring-rules.md');

  assert.ok(doc.includes('pontua quem tenta adivinhar'));
  assert.ok(doc.includes('jogador e o time recebem'));
});
