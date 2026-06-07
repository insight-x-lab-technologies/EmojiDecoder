# EmojiDecoder challenge pack

Schema atual: `emojidecoder.challengepack.v1`.

Um desafio deve usar este formato:

- `id`: identificador único dentro do pack.
- `text`: emojis exibidos ao jogador.
- `clue`: mesmo conteúdo de `text`, mantido para clareza do domínio.
- `answer`: resposta correta revelada no fim da rodada.
- `hint`: dica curta opcional.

Categorias core:

- `objetos`
- `pessoas`
- `filmes_series`
- `lugares`
- `marcas`
- `expressoes`

Exemplo mínimo de conteúdo assinado:

```json
{
  "name": { "pt": "Pack Cinema" },
  "jokes": {
    "pt": {
      "filmes_series": [
        {
          "id": "cinema-001",
          "text": "🚢🧊💔",
          "clue": "🚢🧊💔",
          "answer": "Titanic",
          "hint": "Filme"
        }
      ]
    }
  },
  "readingChallenges": {
    "pt": ["Responda em até 3 palpites."]
  }
}
```

Envelope local exportado pelo criador de packs:

```json
{
  "schema": "emojidecoder.challengepack.v1",
  "export_type": "local",
  "pack_id": "local-pack-cinema",
  "exported_by": "EmojiDecoder",
  "content_sha256": "hash-base64url-do-content",
  "content": {
    "name": { "pt": "Pack Cinema" },
    "jokes": {},
    "readingChallenges": {}
  }
}
```

O compartilhamento por link usa o envelope local codificado em base64url no fragmento:

`#pack=<envelope-json-base64url>`

Ao abrir o link, o app valida `content_sha256` antes de instalar o pack.
