# Regras de pontuação do EmojiDecoder

## 1 x 1

- O jogador da vez é quem tenta decodificar os emojis.
- Se acertar o nome secreto, esse jogador recebe os pontos configurados.
- Se errar ou o tempo acabar, aplica-se a penalidade configurada para esse jogador.

## Times

- O jogador da vez representa seu time.
- Se acertar, o jogador e o time recebem os pontos configurados.
- Se errar ou o tempo acabar, a penalidade configurada é aplicada ao jogador e ao time.
- O placar principal da partida por times usa o placar dos times.

## Bônus e penalidades

- Acerto = pontos base + bônus por velocidade + bônus por dificuldade - custo de dica.
- A dica começa oculta e, quando solicitada, reduz a pontuação do acerto.
- A dificuldade do desafio pode ser fácil, normal ou difícil; normal/difícil adicionam bônus.
- A penalidade por erro/tempo é configurável e pode ser 0.

## Modos especiais

- Buzz: todos podem responder; no resultado, o host escolhe quem acertou primeiro.
- Roubo: após erro/tempo, o próximo jogador pode tentar roubar metade dos pontos.
- Combo: acertos consecutivos do mesmo jogador multiplicam a pontuação, até o limite atual do jogo.
- Palpite digitado: valida texto normalizado, ignorando maiúsculas, acentos e artigos.
- Desafio Diário: usa seleção determinística por data e registra placar diário separado.

## Diferença para NoLaughingAllowed

- No jogo original, pontuava quem lia a piada e fazia o outro lado rir.
- No EmojiDecoder, pontua quem tenta adivinhar e acerta o nome secreto.
