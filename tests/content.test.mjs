import test from 'node:test';
import assert from 'node:assert/strict';
import { coreCategories, loadBrowserGlobals, supportedLocales } from './helpers.mjs';

test('core challenge content has 30 valid entries per locale and category', async () => {
  const { config } = await loadBrowserGlobals();

  for (const locale of supportedLocales) {
    assert.ok(config[locale], `missing config for ${locale}`);

    for (const category of coreCategories) {
      const entries = config[locale][category];
      assert.equal(entries.length, 30, `${locale}/${category} should have 30 challenges`);

      const ids = new Set();
      const difficulties = { easy: 0, normal: 0, hard: 0 };
      for (const entry of entries) {
        assert.ok(entry.id, 'entry needs id');
        assert.ok(entry.text, `${entry.id} needs text`);
        assert.ok(entry.clue, `${entry.id} needs clue`);
        assert.ok(entry.answer, `${entry.id} needs answer`);
        assert.ok(entry.hint, `${entry.id} needs hint`);
        assert.ok(['easy', 'normal', 'hard'].includes(entry.difficulty), `${entry.id} needs valid difficulty`);
        assert.equal(entry.text, entry.clue, `${entry.id} should keep text and clue aligned`);
        assert.equal(/Resposta:/i.test(entry.text), false, `${entry.id} leaks answer in clue`);
        assert.equal(ids.has(entry.id), false, `${entry.id} is duplicated`);
        ids.add(entry.id);
        difficulties[entry.difficulty] += 1;
      }
      assert.deepEqual(difficulties, { easy: 10, normal: 10, hard: 10 }, `${locale}/${category} should balance difficulties`);
    }
  }
});

test('translations expose required gameplay keys for every supported locale', async () => {
  const { translations } = await loadBrowserGlobals();

  for (const locale of supportedLocales) {
    const t = translations[locale];
    assert.equal(t.home.title, 'EmojiDecoder');
    assert.ok(t.category.objetos.plural);
    assert.ok(t.game.revealWord);
    assert.ok(t.game.secretAnswerLabel);
    assert.ok(t.result.answerReveal({ answer: 'Teste' }).includes('Teste'));
    assert.ok(t.wordbank.emptyCategory);
    assert.ok(t.multiDevice.guestSecretAnswer);
  }
});

test('english and spanish have localized priority answers', async () => {
  const { config } = await loadBrowserGlobals();

  assert.equal(config.en.objetos[4].answer, 'Electric toothbrush');
  assert.equal(config.en.pessoas[10].answer, 'Doctor');
  assert.equal(config.en.filmes_series[4].answer, 'The Lion King');
  assert.equal(config.en.expressoes[10].answer, 'Break the ice');

  assert.equal(config.es.objetos[4].answer, 'Cepillo de dientes eléctrico');
  assert.equal(config.es.pessoas[10].answer, 'Médico');
  assert.equal(config.es.filmes_series[0].answer, 'El Señor de los Anillos');
  assert.equal(config.es.expressoes[10].answer, 'Romper el hielo');
});
