# EmojiDecoder

EmojiDecoder is an offline-first PWA party game where players decode emoji clues and guess the secret name of objects, people, movies, places, brands, or expressions.

Play the game at: https://insight-x-lab-technologies.github.io/EmojiDecoder

## About the Game

Each round shows a sequence of emojis as a clue. The current player, called the decoder, tries to identify the secret answer before time runs out. The host or validator controls the match, reveals the answer, records correct and incorrect guesses, applies hints, and keeps track of the score.

The game is designed for local sessions, family play, and group play, with support for pass-and-play on a single device and a multi-device mode that turns another device into a companion screen.

## Features

- 6 core categories, with 30 desafios por categoria em PT, EN, ES, FR, DE e IT.
- 1 x 1 and team match modes.
- Quick game mode with persisted configuration.
- Local pass-and-play and multi-device sessions with host setup, code/link connection, and QR Code pairing.
- A companion screen that can follow the timer, challenge, hint, or secret answer depending on the round settings.
- Secret answers are visible to the host/validator and hidden from the player trying to solve the challenge.
- Scoring with base points, speed bonus, difficulty bonus, hint cost, and penalties for mistakes or timeouts.
- Special modes: Buzz, Steal, Combo, and typed guess.
- Daily Challenge with deterministic date-based selection, local daily leaderboard, and result sharing.
- Local all-time leaderboard by player, mode, and match scope.
- Local trophies and achievements.
- Local content bank with creation, editing, ratings, success-rate filtering, curation filters, and a "do not repeat" option.
- Pack creator with JSON import/export, link/QR sharing, and hash-based integrity validation.
- Visual themes, lobby and gameplay music, persisted settings, and PWA installation.
- Offline cache support through a service worker.
- Internationalization in Portuguese, English, Spanish, French, German, and Italian.
- Basic accessibility support with `aria-live` regions, challenge labels, visible focus states, and keyboard-friendly HTML controls.

## Architecture

EmojiDecoder is a static web application with no required backend. It can be hosted on any static file host, including GitHub Pages.

- `src/index.html`: main app screens, including home, setup, gameplay, scoreboard, end screen, content bank, multi-device, and guest views.
- `src/script.js`: core game engine. It manages match state, current round, scoring, leaderboard data, achievements, packs, multi-device flows, settings, and local persistence.
- `src/jokes-config.js`: base game content, categories, challenges, and the default content bank.
- `src/translations.js`: localized text dictionary and helper functions.
- `src/style.css` and `src/themes.css`: layout, visual components, themes, responsiveness, and accessibility states.
- `src/service-worker.js`: app shell caching and offline/runtime caching for local assets.
- `src/manifest.webmanifest`: PWA metadata, icons, scope, and display mode.
- `src/assets/`: images, icons, backgrounds, default avatar, and music.
- `docs/`: domain documentation, roadmap, scoring rules, pack schema, and the internal glossary.
- `tests/`: UI contract, gameplay, content, and static validation tests.
- `scripts/`: helper scripts for local execution and static checks.

## Data Model and Persistence

The game uses `localStorage` to persist settings, players, the last match setup, leaderboard data, achievements, local challenge stats, and installed packs.

Exported packs follow the `emojidecoder.challengepack.v1` schema. Link sharing uses the `#pack=<envelope-json-base64url>` fragment and validates `content_sha256` before the content is installed on a device.

Domain terms are documented in `docs/internal-glossary.md`.

## Scoring Rules

- In 1 x 1, the player who is decoding earns the points for a correct answer.
- In team mode, both the player and the team earn points for a correct answer.
- Correct answers can add base points, speed bonus, and difficulty bonus.
- Hints reduce the score for a correct answer.
- Mistakes and timeouts can apply a configurable penalty.
- Buzz lets everyone answer, and the host chooses who answered first.
- Steal gives the next player an additional chance for half the points.
- Combo multiplies consecutive correct answers up to the current game limit.
- Typed guess normalizes text by ignoring case, accents, and articles.

More details are available in `docs/scoring-rules.md`.

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

The test suite uses `node:test` and a static smoke check that validates scripts, the manifest, the main content, and UI/gameplay contracts.

## Documentation

- Roadmap: `docs/roadmap.md`
- Evolution roadmap: `docs/roadmap-evolution.md`
- Adaptation plan: `docs/adaptation-plan.md`
- Scoring rules: `docs/scoring-rules.md`
- Internal glossary: `docs/internal-glossary.md`
- Pack schema: `docs/challenge-pack-schema.md`

## License

MIT. See `LICENSE`.
