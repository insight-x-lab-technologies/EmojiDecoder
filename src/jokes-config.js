(() => {
  const inferDifficultyFromId = id => {
    const number = Number(String(id || '').match(/(\d+)/)?.[1]) || 1;
    if (number >= 21) return 'hard';
    if (number >= 11) return 'normal';
    return 'easy';
  };

  const makeEntry = (id, emoji, answer, hint = '', difficulty = inferDifficultyFromId(id)) => ({
    id,
    text: emoji,
    clue: emoji,
    answer,
    hint,
    difficulty
  });

  const DEFAULT_EMOJI_DECODER_PT = {
    objetos: [
      makeEntry('obj-001', '☕📱', 'Copo térmico inteligente', 'Objeto do dia a dia'),
      makeEntry('obj-002', '🔑🏠', 'Chave de casa', 'Objeto comum'),
      makeEntry('obj-003', '🎧🏃', 'Fone de ouvido esportivo', 'Acessório'),
      makeEntry('obj-004', '🧊📦', 'Caixa térmica', 'Objeto para viagem'),
      makeEntry('obj-005', '🪥⚡', 'Escova de dentes elétrica', 'Objeto de banheiro'),
      makeEntry('obj-006', '📷🕶️', 'Óculos com câmera', 'Tecnologia vestível'),
      makeEntry('obj-007', '🕯️🌸', 'Vela aromática', 'Decoração'),
      makeEntry('obj-008', '🧳✈️', 'Mala de viagem', 'Objeto de aeroporto')
    ],
    pessoas: [
      makeEntry('pes-001', '👑🎤', 'Rainha do pop', 'Pessoa famosa'),
      makeEntry('pes-002', '⚽🐐', 'Melhor jogador de futebol', 'Ídolo esportivo'),
      makeEntry('pes-003', '🧪👩‍🔬', 'Cientista', 'Profissão'),
      makeEntry('pes-004', '🕵️‍♂️🔎', 'Detetive', 'Personagem ou profissão'),
      makeEntry('pes-005', '👨‍🍳🔥', 'Chef de cozinha', 'Profissão'),
      makeEntry('pes-006', '🚀👩‍🚀', 'Astronauta', 'Profissão'),
      makeEntry('pes-007', '🎬🧛', 'Ator de filme de vampiro', 'Pessoa do cinema'),
      makeEntry('pes-008', '🎨👂', 'Van Gogh', 'Artista famoso')
    ],
    filmes_series: [
      makeEntry('fil-001', '🧙‍♂️💍🗻', 'O Senhor dos Anéis', 'Filme'),
      makeEntry('fil-002', '🦖🏝️🚙', 'Jurassic Park', 'Filme'),
      makeEntry('fil-003', '🚢🧊💔', 'Titanic', 'Filme'),
      makeEntry('fil-004', '🕷️👨‍🦱🏙️', 'Homem-Aranha', 'Filme ou herói'),
      makeEntry('fil-005', '👑🦁🌅', 'O Rei Leão', 'Animação'),
      makeEntry('fil-006', '🧊👭⛄', 'Frozen', 'Animação'),
      makeEntry('fil-007', '👽🚲🌕', 'E.T.', 'Filme clássico'),
      makeEntry('fil-008', '🧟‍♂️📺', 'The Walking Dead', 'Série')
    ],
    lugares: [
      makeEntry('lug-001', '🗽🍎', 'Nova York', 'Cidade'),
      makeEntry('lug-002', '🗼🥐', 'Paris', 'Cidade'),
      makeEntry('lug-003', '🏖️🌊🎶', 'Rio de Janeiro', 'Cidade brasileira'),
      makeEntry('lug-004', '🏜️🐪', 'Deserto do Saara', 'Lugar natural'),
      makeEntry('lug-005', '🎰🌃', 'Las Vegas', 'Cidade'),
      makeEntry('lug-006', '⛩️🍣', 'Japão', 'País'),
      makeEntry('lug-007', '🏰☔', 'Londres', 'Cidade'),
      makeEntry('lug-008', '🧊🐧', 'Antártida', 'Continente')
    ],
    marcas: [
      makeEntry('mar-001', '🍎📱', 'Apple', 'Marca de tecnologia'),
      makeEntry('mar-002', '▶️📺', 'YouTube', 'Plataforma'),
      makeEntry('mar-003', '🔍🌐', 'Google', 'Marca de internet'),
      makeEntry('mar-004', '🎧🟢', 'Spotify', 'Streaming'),
      makeEntry('mar-005', '📦🚚', 'Amazon', 'Loja online'),
      makeEntry('mar-006', '🎮🟩', 'Xbox', 'Videogame'),
      makeEntry('mar-007', '☕🟢', 'Starbucks', 'Cafeteria'),
      makeEntry('mar-008', '🍟👑', 'Burger King', 'Fast food')
    ],
    expressoes: [
      makeEntry('exp-001', '💧🪨', 'Água mole em pedra dura', 'Ditado popular'),
      makeEntry('exp-002', '🐟💀👄', 'O peixe morre pela boca', 'Ditado popular'),
      makeEntry('exp-003', '🧠💡', 'Ter uma ideia', 'Expressão'),
      makeEntry('exp-004', '🦶🍈', 'Pisar na bola', 'Expressão'),
      makeEntry('exp-005', '🔥🧊', 'Entre o fogo e o gelo', 'Expressão'),
      makeEntry('exp-006', '🐄🌧️', 'Chover canivete', 'Expressão exagerada'),
      makeEntry('exp-007', '👀🍽️', 'Comer com os olhos', 'Expressão'),
      makeEntry('exp-008', '🎭😐', 'Fazer cara de paisagem', 'Expressão')
    ]
  };

  const EXTRA_EMOJI_DECODER_PT = {
    objetos: [
      ['obj-009', '💻☕', 'Notebook', 'Objeto de trabalho'],
      ['obj-010', '⌚❤️', 'Relógio inteligente', 'Acessório'],
      ['obj-011', '🚲⚡', 'Bicicleta elétrica', 'Transporte'],
      ['obj-012', '☂️🌧️', 'Guarda-chuva', 'Objeto comum'],
      ['obj-013', '🧯🔥', 'Extintor de incêndio', 'Segurança'],
      ['obj-014', '🧲📌', 'Ímã de geladeira', 'Objeto doméstico'],
      ['obj-015', '🧴☀️', 'Protetor solar', 'Cuidado pessoal'],
      ['obj-016', '🔦🌙', 'Lanterna', 'Objeto para noite'],
      ['obj-017', '🎒📚', 'Mochila escolar', 'Objeto de estudo'],
      ['obj-018', '🛏️💤', 'Travesseiro', 'Objeto de quarto'],
      ['obj-019', '🧼🫧', 'Sabonete', 'Objeto de banheiro'],
      ['obj-020', '🧻🚽', 'Papel higiênico', 'Objeto de banheiro'],
      ['obj-021', '🔌🔋', 'Carregador', 'Tecnologia'],
      ['obj-022', '🖨️📄', 'Impressora', 'Escritório'],
      ['obj-023', '🪑💼', 'Cadeira de escritório', 'Móvel'],
      ['obj-024', '🧹🏠', 'Vassoura', 'Limpeza'],
      ['obj-025', '🥄🍲', 'Colher', 'Cozinha'],
      ['obj-026', '🔒🚪', 'Cadeado', 'Segurança'],
      ['obj-027', '🧺👕', 'Cesto de roupa', 'Objeto doméstico'],
      ['obj-028', '📺🛋️', 'Televisão', 'Sala'],
      ['obj-029', '🎮🕹️', 'Controle de videogame', 'Entretenimento'],
      ['obj-030', '🧽🍽️', 'Esponja de louça', 'Cozinha']
    ],
    pessoas: [
      ['pes-009', '🦸‍♂️🛡️', 'Super-herói', 'Personagem'],
      ['pes-010', '🧑‍🏫📚', 'Professor', 'Profissão'],
      ['pes-011', '🧑‍⚕️🩺', 'Médico', 'Profissão'],
      ['pes-012', '🧑‍🚒🔥', 'Bombeiro', 'Profissão'],
      ['pes-013', '👮‍♀️🚓', 'Policial', 'Profissão'],
      ['pes-014', '🧑‍🎨🎨', 'Pintor', 'Profissão'],
      ['pes-015', '🧑‍💻💻', 'Programador', 'Profissão'],
      ['pes-016', '🧑‍🌾🌽', 'Agricultor', 'Profissão'],
      ['pes-017', '🧑‍🔧🔧', 'Mecânico', 'Profissão'],
      ['pes-018', '🧑‍✈️✈️', 'Piloto', 'Profissão'],
      ['pes-019', '👸🏰', 'Princesa', 'Personagem'],
      ['pes-020', '🧙‍♀️✨', 'Bruxa', 'Personagem'],
      ['pes-021', '🧛‍♂️🌙', 'Vampiro', 'Personagem'],
      ['pes-022', '🧟‍♀️🧠', 'Zumbi', 'Personagem'],
      ['pes-023', '🎅🎁', 'Papai Noel', 'Personagem'],
      ['pes-024', '🤹‍♂️🎪', 'Artista de circo', 'Profissão'],
      ['pes-025', '🧑‍🚀🌕', 'Astronauta', 'Profissão'],
      ['pes-026', '🏃‍♀️🏅', 'Atleta', 'Pessoa do esporte'],
      ['pes-027', '🎸🎤', 'Músico', 'Profissão'],
      ['pes-028', '🧑‍⚖️⚖️', 'Juiz', 'Profissão'],
      ['pes-029', '🕵️‍♀️📁', 'Investigadora', 'Profissão'],
      ['pes-030', '👑♟️', 'Rainha', 'Título']
    ],
    filmes_series: [
      ['fil-009', '🧙‍♀️🧹🏫', 'Harry Potter', 'Filme ou livro'],
      ['fil-010', '🤖🚗', 'Transformers', 'Filme'],
      ['fil-011', '🦇🏙️', 'Batman', 'Herói'],
      ['fil-012', '🛡️🇺🇸', 'Capitão América', 'Herói'],
      ['fil-013', '🔨⚡', 'Thor', 'Herói'],
      ['fil-014', '🧞‍♂️🪔', 'Aladdin', 'Animação'],
      ['fil-015', '🐠🔎', 'Procurando Nemo', 'Animação'],
      ['fil-016', '🚗⚡', 'Carros', 'Animação'],
      ['fil-017', '🐼🥋', 'Kung Fu Panda', 'Animação'],
      ['fil-018', '👻🚫', 'Caça-Fantasmas', 'Filme'],
      ['fil-019', '💍👰', 'Casamento Grego', 'Filme'],
      ['fil-020', '🧠💭👧', 'Divertida Mente', 'Animação'],
      ['fil-021', '🐭🏰', 'Mickey Mouse', 'Personagem'],
      ['fil-022', '⭐⚔️🚀', 'Star Wars', 'Filme'],
      ['fil-023', '🕶️💊', 'Matrix', 'Filme'],
      ['fil-024', '🧑‍🚀🌽', 'Interestelar', 'Filme'],
      ['fil-025', '👑🐉', 'Game of Thrones', 'Série'],
      ['fil-026', '🏠👦😱', 'Esqueceram de Mim', 'Filme'],
      ['fil-027', '🍫🏭', 'A Fantástica Fábrica de Chocolate', 'Filme'],
      ['fil-028', '🧜‍♀️🌊', 'A Pequena Sereia', 'Animação'],
      ['fil-029', '🧸👦', 'Toy Story', 'Animação'],
      ['fil-030', '🦸‍♀️⭐', 'Mulher-Maravilha', 'Heroína']
    ],
    lugares: [
      ['lug-009', '🕌🐪', 'Dubai', 'Cidade'],
      ['lug-010', '🏛️🍝', 'Roma', 'Cidade'],
      ['lug-011', '🦘🏖️', 'Austrália', 'País'],
      ['lug-012', '🌋🌺', 'Havaí', 'Lugar turístico'],
      ['lug-013', '🗿🌊', 'Ilha de Páscoa', 'Ilha'],
      ['lug-014', '⛰️🙏', 'Tibete', 'Região'],
      ['lug-015', '🏔️🇳🇵', 'Monte Everest', 'Montanha'],
      ['lug-016', '🛕🪷', 'Índia', 'País'],
      ['lug-017', '🏟️⚽', 'Maracanã', 'Estádio'],
      ['lug-018', '🌉🌁', 'São Francisco', 'Cidade'],
      ['lug-019', '🧱🐉', 'Muralha da China', 'Monumento'],
      ['lug-020', '🏰🍺', 'Alemanha', 'País'],
      ['lug-021', '🌷🚲', 'Holanda', 'País'],
      ['lug-022', '❄️🏔️', 'Suíça', 'País'],
      ['lug-023', '🦁🌍', 'África', 'Continente'],
      ['lug-024', '🏖️🥥', 'Caribe', 'Região'],
      ['lug-025', '🛶🌳', 'Amazônia', 'Floresta'],
      ['lug-026', '🎭🌉', 'Veneza', 'Cidade'],
      ['lug-027', '🗻🍣', 'Monte Fuji', 'Montanha'],
      ['lug-028', '🏜️🎲', 'Las Vegas', 'Cidade'],
      ['lug-029', '🧊🌌', 'Islândia', 'País'],
      ['lug-030', '🐪🏺', 'Egito', 'País']
    ],
    marcas: [
      ['mar-009', '🟥▶️', 'Netflix', 'Streaming'],
      ['mar-010', '📸🌈', 'Instagram', 'Rede social'],
      ['mar-011', '🎵📱', 'TikTok', 'Rede social'],
      ['mar-012', '💬🟢', 'WhatsApp', 'Aplicativo'],
      ['mar-013', '👟✔️', 'Nike', 'Marca esportiva'],
      ['mar-014', '👟三', 'Adidas', 'Marca esportiva'],
      ['mar-015', '🥤🔴', 'Coca-Cola', 'Bebida'],
      ['mar-016', '🍔Ⓜ️', 'McDonald’s', 'Fast food'],
      ['mar-017', '🚗⚡', 'Tesla', 'Automóveis'],
      ['mar-018', '💻🪟', 'Microsoft', 'Tecnologia'],
      ['mar-019', '🎮🔵', 'PlayStation', 'Videogame'],
      ['mar-020', '🍕🛵', 'iFood', 'Delivery'],
      ['mar-021', '🛒💛', 'Mercado Livre', 'Marketplace'],
      ['mar-022', '💳🟣', 'Nubank', 'Banco digital'],
      ['mar-023', '✈️🏠', 'Airbnb', 'Viagem'],
      ['mar-024', '🚕📱', 'Uber', 'Transporte'],
      ['mar-025', '🧱🎮', 'Lego', 'Brinquedos'],
      ['mar-026', '🎬🏰', 'Disney', 'Entretenimento'],
      ['mar-027', '📦🟠', 'Shopee', 'Marketplace'],
      ['mar-028', '🛍️🟠', 'AliExpress', 'Marketplace'],
      ['mar-029', '🎧🍎', 'Apple Music', 'Streaming'],
      ['mar-030', '☁️💾', 'Dropbox', 'Armazenamento']
    ],
    expressoes: [
      ['exp-009', '🐘🦶', 'Memória de elefante', 'Expressão'],
      ['exp-010', '🐍🛒', 'Comprar gato por lebre', 'Ditado popular'],
      ['exp-011', '🧊🗣️', 'Quebrar o gelo', 'Expressão'],
      ['exp-012', '🌧️☔', 'Chover no molhado', 'Expressão'],
      ['exp-013', '🪙🪙', 'Dois lados da moeda', 'Expressão'],
      ['exp-014', '🐒🌿', 'Cada macaco no seu galho', 'Ditado popular'],
      ['exp-015', '👂🧱', 'As paredes têm ouvidos', 'Ditado popular'],
      ['exp-016', '🦁🦷', 'Matar um leão por dia', 'Expressão'],
      ['exp-017', '🧂🥘', 'Dar uma pitada', 'Expressão'],
      ['exp-018', '🧵🪡', 'Perder o fio da meada', 'Expressão'],
      ['exp-019', '🔥🫙', 'Colocar lenha na fogueira', 'Expressão'],
      ['exp-020', '🌊🪣', 'Tempestade em copo d’água', 'Expressão'],
      ['exp-021', '🐎🌧️', 'Tirar o cavalo da chuva', 'Expressão'],
      ['exp-022', '🦋🤰', 'Borboletas no estômago', 'Expressão'],
      ['exp-023', '🧱🧱', 'Bater na mesma tecla', 'Expressão'],
      ['exp-024', '🤐🔒', 'Guardar segredo', 'Expressão'],
      ['exp-025', '🪙🛏️', 'Dormir no ponto', 'Expressão'],
      ['exp-026', '🐂🪢', 'Segurar o touro pelos chifres', 'Expressão'],
      ['exp-027', '🍞💰', 'Ganhar o pão', 'Expressão'],
      ['exp-028', '🧠☁️', 'Viajar na maionese', 'Expressão'],
      ['exp-029', '🦶🚪', 'Meter o pé na porta', 'Expressão'],
      ['exp-030', '🔑🧩', 'A chave do mistério', 'Expressão']
    ]
  };

  Object.entries(EXTRA_EMOJI_DECODER_PT).forEach(([category, entries]) => {
    DEFAULT_EMOJI_DECODER_PT[category].push(
      ...entries.map(([id, emoji, answer, hint]) => makeEntry(id, emoji, answer, hint))
    );
  });

  const LOCALIZED_CATEGORY_HINTS = {
    en: { objetos: 'Object', pessoas: 'Person', filmes_series: 'Movie or series', lugares: 'Place', marcas: 'Brand', expressoes: 'Expression' },
    es: { objetos: 'Objeto', pessoas: 'Persona', filmes_series: 'Película o serie', lugares: 'Lugar', marcas: 'Marca', expressoes: 'Expresión' },
    fr: { objetos: 'Objet', pessoas: 'Personne', filmes_series: 'Film ou série', lugares: 'Lieu', marcas: 'Marque', expressoes: 'Expression' },
    de: { objetos: 'Objekt', pessoas: 'Person', filmes_series: 'Film oder Serie', lugares: 'Ort', marcas: 'Marke', expressoes: 'Redewendung' },
    it: { objetos: 'Oggetto', pessoas: 'Persona', filmes_series: 'Film o serie', lugares: 'Luogo', marcas: 'Brand', expressoes: 'Espressione' }
  };

  const LOCALIZED_ANSWER_OVERRIDES = {
    en: {
      'obj-001': 'Smart travel mug', 'obj-002': 'House key', 'obj-003': 'Sport headphones', 'obj-004': 'Cooler box', 'obj-005': 'Electric toothbrush',
      'obj-006': 'Camera glasses', 'obj-007': 'Scented candle', 'obj-008': 'Suitcase', 'obj-009': 'Laptop', 'obj-010': 'Smartwatch',
      'obj-011': 'Electric bicycle', 'obj-012': 'Umbrella', 'obj-013': 'Fire extinguisher', 'obj-014': 'Fridge magnet', 'obj-015': 'Sunscreen',
      'pes-001': 'Queen of pop', 'pes-002': 'Greatest football player', 'pes-003': 'Scientist', 'pes-004': 'Detective', 'pes-005': 'Chef',
      'pes-006': 'Astronaut', 'pes-007': 'Vampire movie actor', 'pes-008': 'Van Gogh', 'pes-009': 'Superhero', 'pes-010': 'Teacher',
      'pes-011': 'Doctor', 'pes-012': 'Firefighter', 'pes-013': 'Police officer', 'pes-014': 'Painter', 'pes-015': 'Programmer',
      'fil-001': 'The Lord of the Rings', 'fil-002': 'Jurassic Park', 'fil-003': 'Titanic', 'fil-004': 'Spider-Man', 'fil-005': 'The Lion King',
      'fil-006': 'Frozen', 'fil-007': 'E.T.', 'fil-008': 'The Walking Dead', 'fil-009': 'Harry Potter', 'fil-010': 'Transformers',
      'fil-011': 'Batman', 'fil-012': 'Captain America', 'fil-013': 'Thor', 'fil-014': 'Aladdin', 'fil-015': 'Finding Nemo',
      'lug-001': 'New York', 'lug-002': 'Paris', 'lug-003': 'Rio de Janeiro', 'lug-004': 'Sahara Desert', 'lug-005': 'Las Vegas',
      'lug-006': 'Japan', 'lug-007': 'London', 'lug-008': 'Antarctica', 'lug-009': 'Dubai', 'lug-010': 'Rome',
      'lug-011': 'Australia', 'lug-012': 'Hawaii', 'lug-013': 'Easter Island', 'lug-014': 'Tibet', 'lug-015': 'Mount Everest',
      'mar-001': 'Apple', 'mar-002': 'YouTube', 'mar-003': 'Google', 'mar-004': 'Spotify', 'mar-005': 'Amazon',
      'mar-006': 'Xbox', 'mar-007': 'Starbucks', 'mar-008': 'Burger King', 'mar-009': 'Netflix', 'mar-010': 'Instagram',
      'mar-011': 'TikTok', 'mar-012': 'WhatsApp', 'mar-013': 'Nike', 'mar-014': 'Adidas', 'mar-015': 'Coca-Cola',
      'exp-001': 'Constant dripping wears away stone', 'exp-002': 'Loose lips sink ships', 'exp-003': 'Have an idea', 'exp-004': 'Drop the ball', 'exp-005': 'Between fire and ice',
      'exp-006': 'Raining cats and dogs', 'exp-007': 'Eat with your eyes', 'exp-008': 'Keep a poker face', 'exp-009': 'Memory like an elephant', 'exp-010': 'Buy a pig in a poke',
      'exp-011': 'Break the ice', 'exp-012': 'Preach to the choir', 'exp-013': 'Two sides of the coin', 'exp-014': 'Stay in your lane', 'exp-015': 'The walls have ears'
    },
    es: {
      'obj-001': 'Vaso térmico inteligente', 'obj-002': 'Llave de casa', 'obj-003': 'Auriculares deportivos', 'obj-004': 'Nevera portátil', 'obj-005': 'Cepillo de dientes eléctrico',
      'obj-006': 'Gafas con cámara', 'obj-007': 'Vela aromática', 'obj-008': 'Maleta de viaje', 'obj-009': 'Portátil', 'obj-010': 'Reloj inteligente',
      'obj-011': 'Bicicleta eléctrica', 'obj-012': 'Paraguas', 'obj-013': 'Extintor de incendios', 'obj-014': 'Imán de nevera', 'obj-015': 'Protector solar',
      'pes-001': 'Reina del pop', 'pes-002': 'Mejor jugador de fútbol', 'pes-003': 'Científica', 'pes-004': 'Detective', 'pes-005': 'Chef',
      'pes-006': 'Astronauta', 'pes-007': 'Actor de película de vampiros', 'pes-008': 'Van Gogh', 'pes-009': 'Superhéroe', 'pes-010': 'Profesor',
      'pes-011': 'Médico', 'pes-012': 'Bombero', 'pes-013': 'Policía', 'pes-014': 'Pintor', 'pes-015': 'Programador',
      'fil-001': 'El Señor de los Anillos', 'fil-002': 'Jurassic Park', 'fil-003': 'Titanic', 'fil-004': 'Spider-Man', 'fil-005': 'El Rey León',
      'fil-006': 'Frozen', 'fil-007': 'E.T.', 'fil-008': 'The Walking Dead', 'fil-009': 'Harry Potter', 'fil-010': 'Transformers',
      'fil-011': 'Batman', 'fil-012': 'Capitán América', 'fil-013': 'Thor', 'fil-014': 'Aladdín', 'fil-015': 'Buscando a Nemo',
      'lug-001': 'Nueva York', 'lug-002': 'París', 'lug-003': 'Río de Janeiro', 'lug-004': 'Desierto del Sahara', 'lug-005': 'Las Vegas',
      'lug-006': 'Japón', 'lug-007': 'Londres', 'lug-008': 'Antártida', 'lug-009': 'Dubái', 'lug-010': 'Roma',
      'lug-011': 'Australia', 'lug-012': 'Hawái', 'lug-013': 'Isla de Pascua', 'lug-014': 'Tíbet', 'lug-015': 'Monte Everest',
      'mar-001': 'Apple', 'mar-002': 'YouTube', 'mar-003': 'Google', 'mar-004': 'Spotify', 'mar-005': 'Amazon',
      'mar-006': 'Xbox', 'mar-007': 'Starbucks', 'mar-008': 'Burger King', 'mar-009': 'Netflix', 'mar-010': 'Instagram',
      'mar-011': 'TikTok', 'mar-012': 'WhatsApp', 'mar-013': 'Nike', 'mar-014': 'Adidas', 'mar-015': 'Coca-Cola',
      'exp-001': 'Tanto va el cántaro a la fuente', 'exp-002': 'Por la boca muere el pez', 'exp-003': 'Tener una idea', 'exp-004': 'Meter la pata', 'exp-005': 'Entre el fuego y el hielo',
      'exp-006': 'Llover a cántaros', 'exp-007': 'Comer con los ojos', 'exp-008': 'Poner cara de póker', 'exp-009': 'Memoria de elefante', 'exp-010': 'Dar gato por liebre',
      'exp-011': 'Romper el hielo', 'exp-012': 'Llover sobre mojado', 'exp-013': 'Dos caras de la moneda', 'exp-014': 'Cada uno en lo suyo', 'exp-015': 'Las paredes oyen'
    }
  };

  const localizeConfig = locale => Object.fromEntries(
    Object.entries(DEFAULT_EMOJI_DECODER_PT).map(([category, entries]) => [
      category,
      entries.map(entry => makeEntry(
        `${entry.id}-${locale}`,
        entry.clue,
        LOCALIZED_ANSWER_OVERRIDES[locale]?.[entry.id] || entry.answer,
        LOCALIZED_CATEGORY_HINTS[locale]?.[category] || entry.hint
      ))
    ])
  );

  const DEFAULT_EMOJI_DECODER_EN = {
    objects: [
      makeEntry('obj-en-001', '☕📱', 'Smart travel mug', 'Everyday object'),
      makeEntry('obj-en-002', '🔑🏠', 'House key', 'Common object'),
      makeEntry('obj-en-003', '🎧🏃', 'Sport headphones', 'Accessory'),
      makeEntry('obj-en-004', '🧊📦', 'Cooler box', 'Travel object')
    ],
    people: [
      makeEntry('pes-en-001', '👑🎤', 'Queen of pop', 'Famous person'),
      makeEntry('pes-en-002', '⚽🐐', 'Greatest football player', 'Sports icon'),
      makeEntry('pes-en-003', '🧪👩‍🔬', 'Scientist', 'Profession'),
      makeEntry('pes-en-004', '🕵️‍♂️🔎', 'Detective', 'Character or profession')
    ],
    movies: [
      makeEntry('fil-en-001', '🧙‍♂️💍🗻', 'The Lord of the Rings', 'Movie'),
      makeEntry('fil-en-002', '🦖🏝️🚙', 'Jurassic Park', 'Movie'),
      makeEntry('fil-en-003', '🚢🧊💔', 'Titanic', 'Movie'),
      makeEntry('fil-en-004', '🕷️👨‍🦱🏙️', 'Spider-Man', 'Movie or hero')
    ],
    places: [
      makeEntry('lug-en-001', '🗽🍎', 'New York', 'City'),
      makeEntry('lug-en-002', '🗼🥐', 'Paris', 'City'),
      makeEntry('lug-en-003', '🏖️🌊🎶', 'Rio de Janeiro', 'Brazilian city'),
      makeEntry('lug-en-004', '🏜️🐪', 'Sahara Desert', 'Natural place')
    ],
    brands: [
      makeEntry('mar-en-001', '🍎📱', 'Apple', 'Tech brand'),
      makeEntry('mar-en-002', '▶️📺', 'YouTube', 'Platform'),
      makeEntry('mar-en-003', '🔍🌐', 'Google', 'Internet brand'),
      makeEntry('mar-en-004', '🎧🟢', 'Spotify', 'Streaming')
    ],
    sayings: [
      makeEntry('exp-en-001', '🧠💡', 'Have an idea', 'Expression'),
      makeEntry('exp-en-002', '🦶🍈', 'Drop the ball', 'Expression'),
      makeEntry('exp-en-003', '👀🍽️', 'Eat with your eyes', 'Expression'),
      makeEntry('exp-en-004', '🎭😐', 'Keep a poker face', 'Expression')
    ]
  };

  const aliasCategories = (source, map) => Object.fromEntries(
    Object.entries(map).map(([target, origin]) => [target, source[origin] || []])
  );

  const DEFAULT_EMOJI_DECODER_CONFIG = {
    pt: DEFAULT_EMOJI_DECODER_PT,
    en: localizeConfig('en'),
    es: localizeConfig('es'),
    fr: localizeConfig('fr'),
    de: localizeConfig('de'),
    it: localizeConfig('it')
  };

  globalThis.NPR_JOKES_CONFIG = DEFAULT_EMOJI_DECODER_CONFIG;
})();
