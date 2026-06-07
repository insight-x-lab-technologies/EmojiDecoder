# Glossário interno do EmojiDecoder

Este documento define os termos canônicos do domínio. A migração deve ser gradual: nomes novos devem usar o domínio atual, enquanto nomes herdados continuam aceitos quando já fazem parte de contratos salvos, storage local, packs ou compatibilidade com NoLaughingAllowed.

## Termos canônicos

- `challenge`: desafio de emojis exibido ao jogador.
- `clue`: sequência de emojis visível durante a rodada.
- `answer`: nome secreto que deve ser decodificado.
- `hint`: dica opcional com custo de pontuação.
- `solved`: acerto do nome secreto.
- `missed`: erro, tempo esgotado ou rodada sem acerto.
- `decoder`: jogador que está tentando acertar.
- `validator`: pessoa/dispositivo que pode ver o nome secreto.
- `companion`: tela auxiliar multi-device.
- `readingChallenge`: regra extra de palpite/leitura da rodada.

## Nomes herdados tolerados

- `joke`: usar apenas em funções antigas, storage legado, chaves de packs já existentes e compatibilidade com `jokes-config.js`.
- `laughed`: tratar como alias legado de `solved` em métricas/conquistas antigas.
- `mime`: tratar como alias legado do modo principal/local.
- `NPR_*`: manter apenas onde trocar quebraria cache, storage ou ordem de carregamento.

## Regra de migração

1. Código novo deve usar `challenge`, `solved`, `decoder`, `companion` e termos equivalentes.
2. Não renomear storage keys, schemas ou dados persistidos sem migração explícita.
3. Ao tocar funções antigas, preferir wrappers/aliases pequenos antes de renomear em massa.
4. Testes novos devem descrever comportamento com termos do EmojiDecoder, mesmo que o código legado ainda use `joke`.
5. UI, docs e traduções não devem expor `joke`, `laugh` ou `mime` quando o contexto for EmojiDecoder.
