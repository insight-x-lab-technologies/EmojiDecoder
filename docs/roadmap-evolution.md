# EmojiDecoder - Evolution Roadmap Analysis and Proposal

> Solo hobby project. Serverless / offline-first PWA, pass-and-play + multi-device.
> Vision document for evolving the game from "functional" to "fantastic" without turning it into a heavy product.

## 1. How the game works today (architecture and journey)

**Stack:** static PWA (`index.html` + `script.js` ~5.7k lines + `style.css`/`themes.css`),
`service-worker.js` for offline cache, `translations.js` (6 languages), and `jokes-config.js`
(challenge bank). No backend: state lives in `localStorage`, and multi-device works through a local channel
(the host broadcasts `broadcastHostGameState`; the companion `screen-guest` only observes).

**Player journey:**
1. Home -> Setup (players/teams, categories, rounds, timer, points).
2. Turn: the active player taps "Draw challenge".
3. Memorize (3s): the **secret answer** appears only on the host/validator.
4. Playing: emojis + timer appear; the group can request a hint at a cost before answering.
5. Someone taps **✅ Correct** / **❌ Wrong** (manual / honor-based validation).
6. Result: points, confetti, challenge rating (star, "never again"), next turn.
7. End: final scoreboard + winner. There is a local leaderboard, achievements, and a content bank/packs.

**Current scoring:** correct answer = `correctPoints` + speed bonus + difficulty bonus - hint cost; wrong/timeout = `wrongPenaltyPoints`
(default 3, optionally set to 0). In team mode, player and team score equally. Combo multiplies consecutive correct answers,
Buzz lets you choose who answered first, and Steal allows a half-points attempt after a miss.
Challenge selection is weighted by history (success rate, "never again", repetition) and can be filtered by difficulty.

## 2. What is already coherent and functional

- The main loop is solid and does not get stuck; states (preparing/memorize/playing/score) are well isolated.
- Multi-device with delayed answer reveal is a strong differentiator for a party game.
- Selection weighting avoids immediate repetition and respects "never again".
- i18n, themes, soundtracks, offline PWA support, and achievements give the project a polish above the usual hobby baseline.
- PT content is robust: **30 challenges per category** (6 categories = 180 items).
- Static smoke tests (`npm test`) protect against major regressions.

## 3. Gap status

1. **Scoring and timer:** addressed with a speed bonus and result breakdown.
2. **Manual validation:** mitigated with a tolerant typed-guess mode; manual marking remains available.
3. **Hint:** addressed with a "Request hint" button and configurable cost.
4. **Penalty:** addressed with an optional, meaningful penalty.
5. **Social tension:** addressed with Buzz, Steal, and Combo.
6. **Replayability:** addressed with per-challenge difficulty, Daily Challenge, curation, and packs.
7. **Content/i18n:** 30 challenges per category in the 6 supported languages.
8. **Naming debt:** addressed with an internal glossary and a gradual migration rule; refactors remain incremental.

## 4. Proposed roadmap

Phased by effort vs. impact. Each item fits into a hobby weekend.

### Phase 0 - Hygiene (low effort, unlocks the rest)
- [x] Update `docs/` to reflect the real state (content by language, modes, and packs).
- [x] Internal glossary: decide to rename `joke -> challenge`, `laughed -> solved` gradually
      (start with new functions; do not refactor everything at once).
- [x] Cover content, i18n, navigability, main journey, and scoring with `node:test`
      + static smoke in `npm test`.

### Phase 1 - Scoring with soul (high impact, low churn)
- [x] **Speed bonus:** `points = base + round(remaining/total * bonusMax)`. Toggle in settings and result breakdown.
- [x] **Paid hint:** hide the hint by default; "Request hint (-X pts)" button in playing.
      Implements the original "Progressive Hint Mode" with a real penalty.
- [x] **Optional meaningful penalty** + microcopy explaining the trade-off in setup.
- [x] Show the breakdown in the result ("Base 10 +4 speed -3 hint = 11").

### Phase 2 - Social tension (what makes a party game memorable)
- [x] **Dispute/Buzz mode:** instead of only the current player, everyone can decode; the host marks
      who answered first (player picker in the result - the `resultGuesser` infrastructure already exists).
- [x] **Steal mode:** after a miss/timeout, the next player tries to steal half the points.
- [x] **Combo/Sequence:** multiplier for consecutive correct answers, resets on a miss.
- [x] (Optional) **Typed guess** with tolerant normalization (lowercase, no accents,
      article removal) as an alternative to manual "Correct/Wrong".

### Phase 3 - Content and replayability
- [x] Balance the languages: translate answers and bring EN/ES to ~15-30/category
      (can be incremental; prioritize EN and ES).
- [x] **Per-challenge difficulty** (`easy/normal/hard`) used in scoring and filters.
- [x] **Daily Challenge:** deterministic seed by date -> same set for everyone, separate local leaderboard,
      and share-result button (Wordle-style) - a strong retention hook.
- [x] Curation: success-rate/rating filters in the bank (already mentioned in the roadmap; data already exists).

### Phase 4 - Community and polish (if there is energy left)
- [x] **Pack Creator** with validation and JSON export/import (v1 schema already documented).
- [x] Share packs by signed URL/QR (the `sha256`/signature infrastructure already exists in the code).
- [x] "Decoding" microinteractions (emoji animation while decoding) and dedicated combo sound.
- [x] Accessibility: visible focus, AA contrast, screen-reader reading of the challenge.

## 5. Success metric ("it feels fantastic" when...)

- A 30-minute family session rarely repeats a challenge and generates discussion/laughter.
- The timer matters to the people who solve, not just to the people who fail.
- There is at least one mode with social tension (steal or dispute).
- EN/ES are playable end-to-end without falling back to English.
- The Daily Challenge brings people back the next day.

## 6. Recommended quick wins to start now

1. Speed bonus (Phase 1) - ~1 function in `markResult`, a huge improvement in feel.
2. Paid hint (Phase 1) - reuses `getChallengeHelperText`, gives purpose to `hint`.
3. Daily Challenge (Phase 3) - `pickWord` with a date-based seed; strong retention hook.
