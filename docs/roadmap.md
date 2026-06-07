# EmojiDecoder evolution roadmap

## Status atual

- Base visual, temas, PWA, músicas, i18n e multi-device reaproveitados.
- Domínio principal adaptado para desafios de emojis com `clue`, `answer`, `hint` e `difficulty`, com 30 desafios por categoria em 6 idiomas.
- Banco local permite criar desafios com emojis, resposta e dica.
- Métricas, ranking, conquistas e curadoria local usam acertos/erros, avaliação, taxa de acerto e "não repetir".
- Packs têm schema documentado, prévia estruturada, criador local, export/import JSON e link/QR com hash.
- Smoke check estático roda com `npm test`.
- Pontuação revisada com bônus por velocidade, dificuldade, dica paga, penalidade, Buzz, Roubo e Combo.
- Desafio Diário, palpite digitado e microinterações de decodificação já foram implementados.
- Validação em navegador/mobile/PWA ainda depende de ambiente com permissão para abrir servidor local.

## Próximas validações

1. Rodar fluxo completo em navegador desktop.
2. Rodar fluxo completo em viewport mobile.
3. Validar instalação PWA e cache offline.
4. Testar multi-device com host e tela auxiliar reais.
5. Conferir em dispositivo real a acessibilidade já implementada: foco, contraste, screen reader e textos longos.

## Próximas evoluções

1. Migração gradual de nomenclatura conforme `docs/internal-glossary.md`.
2. Validação manual em navegador desktop, mobile, PWA instalado e sessão multi-device real.
3. Futuro opcional: modo Caos e novas animações/sons temáticos.
