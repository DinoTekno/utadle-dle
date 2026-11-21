// ===== Ultimate Anime DLE · animes.js =====
// TÍTULO: Dados dos animes
// O QUE FAZ: Array com 100 objetos, um por anime. É a base de dados que o jogo inteiro usa.
// Substitui mulheres.js. O array global se chama window.ANIMES.
/*
  MODELO (copie, preencha e cole dentro da lista abaixo, separado por vírgula):
  {
    id: "",                  // OBRIGATÓRIO. Slug único e estável (ex.: "fullmetal-alchemist-brotherhood")
    nome: "",                // OBRIGATÓRIO. Nome oficial; aparece na busca
    anoLancamento: null,     // Número (ex.: 2009)
    studio: "",              // Nome do estúdio principal
    generos: [],             // Lista de strings (ex.: ["Ação", "Aventura"])
    faixaRating: "",         // Categórico: "9-10" | "8-9" | "7-8" | "6-7"
    numeroEpisodios: "",     // Categórico: "curto (1-13)" | "médio (14-26)" | "longo (27+)"
    pista: ""                // Descrição do anime SEM citar o nome, para o jogador adivinhar
  },
*/
window.ANIMES = [

  /* ═══════════════════════════════════════════
     RATING 9-10 — Obras-primas
  ═══════════════════════════════════════════ */

  {
    id: "fullmetal-alchemist-brotherhood",
    malId: 5114,
    nome: "Fullmetal Alchemist: Brotherhood",
    anoLancamento: 2009,
    studio: "Bones",
    generos: ["Ação", "Aventura", "Drama", "Fantasia", "Militarismo"],
    faixaRating: "9-10",
    numeroEpisodios: "longo (27+)",
    pista: "Dois irmãos usam alquimia para tentar ressuscitar a mãe, mas pagam um preço horrível — um perde um braço e uma perna, o outro perde o corpo inteiro. Para recuperar o que perderam, seguem uma jornada em busca da Pedra Filosofal em um mundo de alquimia e política militarista."
  },
  {
    id: "steins-gate",
    malId: 9253,
    nome: "Steins;Gate",
    anoLancamento: 2011,
    studio: "White Fox",
    generos: ["Drama", "Ficção Científica", "Romance", "Thriller"],
    faixaRating: "9-10",
    numeroEpisodios: "médio (14-26)",
    pista: "Um cientista excêntrico e seu grupo de amigos descobrem que podem enviar mensagens para o passado usando um microondas modificado. Alterar a linha do tempo parece inofensivo até que as consequências se tornam devastadoras e irreversíveis."
  },
  {
    id: "hunter-x-hunter-2011",
    malId: 11061,
    nome: "Hunter x Hunter (2011)",
    anoLancamento: 2011,
    studio: "Madhouse",
    generos: ["Ação", "Aventura", "Fantasia"],
    faixaRating: "9-10",
    numeroEpisodios: "longo (27+)",
    pista: "Um garoto determinado parte para se tornar caçador, como o pai que nunca conheceu. Ele e seus novos amigos enfrentam provas brutais, gangues criminosas e formigas assassinas em uma jornada que fica progressivamente mais sombria."
  },
  {
    id: "attack-on-titan",
    malId: 16498,
    nome: "Shingeki no Kyojin",
    anoLancamento: 2013,
    studio: "Wit Studio",
    generos: ["Ação", "Drama", "Fantasia", "Horror", "Militarismo", "Mistério"],
    faixaRating: "9-10",
    numeroEpisodios: "longo (27+)",
    pista: "A humanidade vive atrás de muros gigantescos para se proteger de criaturas que devoram pessoas. Um jovem com ódio profundo dessas criaturas se alista na tropa de elite e descobre verdades sombrias sobre o mundo em que vive."
  },
  {
    id: "gintama",
    malId: 918,
    nome: "Gintama",
    anoLancamento: 2006,
    studio: "Sunrise",
    generos: ["Ação", "Comédia", "Ficção Científica", "Histórico", "Paródia"],
    faixaRating: "9-10",
    numeroEpisodios: "longo (27+)",
    pista: "No Japão feudal dominado por alienígenas, um samurai preguiçoso aceita qualquer bico para sobreviver com seus companheiros de agência. A série alterna entre humor absurdo e quebrador de quarta parede e arcos de batalha épicos e emocionantes."
  },

  /* ═══════════════════════════════════════════
     RATING 8-9 — Excelentes
  ═══════════════════════════════════════════ */

  {
    id: "bakemonogatari",
    malId: 5081,
    nome: "Bakemonogatari",
    anoLancamento: 2009,
    studio: "Shaft",
    generos: ["Drama", "Mistério", "Romance", "Sobrenatural"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um estudante sobrevivente de vampiro ajuda garotas afligidas por aberrações sobrenaturais ligadas a seus traumas emocionais. A narrativa é fragmentada em arcos por personagem, cheia de diálogos rápidos e visuais estilizados e experimentais."
  },
  {
    id: "vinland-saga",
    malId: 37521,
    nome: "Vinland Saga",
    anoLancamento: 2019,
    studio: "Wit Studio",
    generos: ["Ação", "Aventura", "Drama", "Histórico"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um jovem viking busca vingança pelo assassinato de seu pai na Europa medieval. Forçado a servir ao homem responsável pela morte paterna, ele tece seu plano enquanto as invasões vikings mudam o continente."
  },
  {
    id: "violet-evergarden",
    malId: 33352,
    nome: "Violet Evergarden",
    anoLancamento: 2018,
    studio: "Kyoto Animation",
    generos: ["Drama", "Fantasia", "Romance", "Vida Cotidiana"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Uma ex-soldado com próteses nos braços começa a trabalhar como escritora de cartas. Em cada missão, ela aprende um pouco mais sobre sentimentos humanos e sobre a última mensagem do oficial que amou."
  },
  {
    id: "ping-pong-the-animation",
    malId: 22135,
    nome: "Ping Pong the Animation",
    anoLancamento: 2014,
    studio: "Tatsunoko Production",
    generos: ["Drama", "Esporte", "Psicológico"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Dois amigos de infância competem no circuito de tênis de mesa. Enquanto um usa o esporte para buscar algo além da vitória, o outro carrega o peso de precisar sempre provar seu valor. A animação tem um visual marcante e único."
  },
  {
    id: "neon-genesis-evangelion",
    malId: 30,
    nome: "Shinseiki Evangelion",
    anoLancamento: 1995,
    studio: "Gainax",
    generos: ["Ação", "Drama", "Ficção Científica", "Mecha", "Psicológico"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "No futuro pós-apocalíptico, adolescentes pilotam robôs gigantes para combater criaturas monstruosas chamadas Anjos. O protagonista carrega traumas profundos e a série mergulha progressivamente na psicologia perturbada dos personagens."
  },
  {
    id: "cowboy-bebop",
    malId: 1,
    nome: "Cowboy Bebop",
    anoLancamento: 1998,
    studio: "Sunrise",
    generos: ["Ação", "Aventura", "Drama", "Ficção Científica", "Noir"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Uma equipe disfuncional de caçadores de recompensas viaja pelo sistema solar a bordo de uma nave de pesca velha. Jazz, blues e histórias melancólicas se misturam em episódios autônomos com um fio condutor trágico."
  },
  {
    id: "death-note",
    malId: 1535,
    nome: "Death Note",
    anoLancamento: 2006,
    studio: "Madhouse",
    generos: ["Mistério", "Psicológico", "Sobrenatural", "Thriller"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Um estudante genial encontra um caderno sobrenatural que mata qualquer pessoa cujo nome for escrito nele. Obcecado em criar um mundo perfeito, ele entra em um duelo de inteligência com um detetive excêntrico e anônimo."
  },
  {
    id: "code-geass",
    malId: 1575,
    nome: "Code Geass: Hangyaku no Lelouch",
    anoLancamento: 2006,
    studio: "Sunrise",
    generos: ["Ação", "Drama", "Ficção Científica", "Mecha", "Militarismo"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um príncipe exilado recebe um poder que o obriga a ser obedecido e assume uma identidade secreta para liderar uma revolução. Ele usa estratégia e sacrifício para derrubar o Império Britannia, que colonizou o Japão."
  },
  {
    id: "one-piece",
    malId: 21,
    nome: "One Piece",
    anoLancamento: 1999,
    studio: "Toei Animation",
    generos: ["Ação", "Aventura", "Comédia", "Fantasia"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Um garoto com o corpo de borracha sonha em reunir uma tripulação e encontrar o maior tesouro do mundo. Ele percorre mares imensos enfrentando piratas, marines e organizações criminosas em busca de liberdade."
  },
  {
    id: "dragon-ball-z",
    malId: 813,
    nome: "Dragon Ball Z",
    anoLancamento: 1989,
    studio: "Toei Animation",
    generos: ["Ação", "Aventura", "Comédia", "Fantasia"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Um guerreiro alienígena com uma cauda defende a Terra de invasores cada vez mais poderosos. As batalhas são longas e épicas; cada personagem pode atingir novos níveis de poder com transformações de cabelo luminoso."
  },
  {
    id: "demon-slayer",
    malId: 38000,
    nome: "Kimetsu no Yaiba",
    anoLancamento: 2019,
    studio: "ufotable",
    generos: ["Ação", "Aventura", "Fantasia", "Histórico"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Após encontrar sua família massacrada, um jovem gentil treina para se tornar um matador de demônios. Sua irmã foi transformada em demônio e ele luta para encontrar uma cura enquanto domina técnicas de respiração elementais."
  },
  {
    id: "jujutsu-kaisen",
    malId: 40748,
    nome: "Jujutsu Kaisen",
    anoLancamento: 2020,
    studio: "MAPPA",
    generos: ["Ação", "Escola", "Fantasia", "Horror"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um colegial devora um dedo amaldiçoado de um demônio supremo para salvar amigos e é matriculado em uma escola secreta que treina exorcistas. Sua missão é consumir todos os dedos restantes daquele demônio."
  },
  {
    id: "mob-psycho-100",
    malId: 32182,
    nome: "Mob Psycho 100",
    anoLancamento: 2016,
    studio: "Bones",
    generos: ["Ação", "Comédia", "Psicológico", "Sobrenatural"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um garoto com poderes psíquicos imensos tenta viver como uma pessoa comum. Seu mestre charlatão o explora, mas enquanto ele reprime as emoções, o perigo de um colapso explosivo cresce a cada situação estressante."
  },
  {
    id: "one-punch-man",
    malId: 30276,
    nome: "One Punch Man",
    anoLancamento: 2015,
    studio: "Madhouse",
    generos: ["Ação", "Comédia", "Paródia", "Super-Herói"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um herói treinou tanto que agora vence todos os inimigos com um único soco. Essa força absurda o deixa entediado e sem reconhecimento na associação oficial de heróis, que o classifica na categoria mais baixa."
  },
  {
    id: "the-promised-neverland",
    malId: 37779,
    nome: "Yakusoku no Neverland",
    anoLancamento: 2019,
    studio: "CloverWorks",
    generos: ["Horror", "Mistério", "Psicológico", "Ficção Científica"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Crianças adoráveis vivem em um orfanato idílico com uma mãe amorosa — até descobrirem a verdade horrível sobre seu destino. O trio mais inteligente planeja meticulosamente uma fuga coletiva."
  },
  {
    id: "made-in-abyss",
    malId: 34599,
    nome: "Made in Abyss",
    anoLancamento: 2017,
    studio: "Kinema Citrus",
    generos: ["Aventura", "Drama", "Fantasia", "Horror"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Uma menina aprendiz de Mergulhadora desce para o fundo de um abismo misterioso em busca de sua mãe exploradora. Quanto mais fundo ela desce, mais perigosa, bizarra e perturbadora fica a jornada."
  },
  {
    id: "re-zero",
    malId: 31240,
    nome: "Re:Zero kara Hajimeru Isekai Seikatsu",
    anoLancamento: 2016,
    studio: "White Fox",
    generos: ["Ação", "Drama", "Fantasia", "Psicológico"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um jovem otaku é transportado para um mundo de fantasia com um único poder: reviver desde o seu ponto de morte mais recente. Ele usa essa habilidade sofrida e dolorosa para salvar as pessoas que ama."
  },
  {
    id: "haikyuu",
    malId: 20583,
    nome: "Haikyuu!!",
    anoLancamento: 2014,
    studio: "Production I.G",
    generos: ["Comédia", "Drama", "Esporte"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um garoto baixo mas explosivo se apaixona pelo vôlei e entra no clube de um colégio rival de seu ídolo. Ele deve aprender a jogar em equipe e encontrar seu papel único mesmo sem a altura privilegiada dos demais."
  },
  {
    id: "kuroko-no-basket",
    malId: 11771,
    nome: "Kuroko no Basket",
    anoLancamento: 2012,
    studio: "Production I.G",
    generos: ["Comédia", "Drama", "Esporte"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "O sexto jogador fantasma de um time lendário agora integra um clube fraco. Com suas habilidades de passe invisível, ele ajuda um talento físico extraordinário a enfrentar os ex-companheiros que dominam o basquete colegial."
  },
  {
    id: "slam-dunk",
    malId: 170,
    nome: "Slam Dunk",
    anoLancamento: 1993,
    studio: "Toei Animation",
    generos: ["Comédia", "Drama", "Esporte"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Um delinquente rejeitado no amor entra no clube de basquete para impressionar uma garota. Ele descobre um talento natural e o time começa a sonhar com o campeonato nacional do Japão."
  },
  {
    id: "hajime-no-ippo",
    malId: 263,
    nome: "Hajime no Ippo",
    anoLancamento: 2000,
    studio: "Madhouse",
    generos: ["Comédia", "Drama", "Esporte"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Um garoto tímido constantemente intimidado descobre o boxe ao ser defendido por um lutador profissional. Ele começa a treinar e transforma sua timidez e determinação em força no ringue."
  },
  {
    id: "yuri-on-ice",
    malId: 32995,
    nome: "Yuri!!! on Ice",
    anoLancamento: 2016,
    studio: "MAPPA",
    generos: ["Drama", "Esporte", "Romance", "Vida Cotidiana"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um patinador artístico japonês em crise depois de uma derrota recebe o apoio de seu ídolo russo, que se muda para o Japão para treiná-lo. A temporada de competições se mistura a um romance delicado e implícito."
  },
  {
    id: "madoka-magica",
    malId: 9756,
    nome: "Mahou Shoujo Madoka?Magica",
    anoLancamento: 2011,
    studio: "Shaft",
    generos: ["Drama", "Magia", "Psicológico"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Uma menina comum recebe a oferta de tornar qualquer desejo realidade em troca de se tornar uma garota mágica. A realidade desse contrato se revela cruel e a série desconstrói impiedosamente o gênero magical girl."
  },
  {
    id: "cardcaptor-sakura",
    malId: 232,
    nome: "Cardcaptor Sakura",
    anoLancamento: 1998,
    studio: "Madhouse",
    generos: ["Aventura", "Comédia", "Magia", "Romance"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Uma menina encontra um livro mágico e libera acidentalmente um baralho de cartas encantadas. Com a ajuda de seu mascote e um amigo fotógrafo, ela deve recuperar cada carta e evitar que o caos se instale."
  },
  {
    id: "kaguya-sama-love-is-war",
    malId: 37999,
    nome: "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen",
    anoLancamento: 2019,
    studio: "A-1 Pictures",
    generos: ["Comédia", "Escola", "Romance"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "O presidente e a vice-presidente do conselho estudantil de um colégio de elite se apaixonam, mas nenhum está disposto a ser o primeiro a confessar. Cada episódio é uma batalha de estratégias e orgulho ferido."
  },
  {
    id: "oregairu",
    malId: 14813,
    nome: "Yahari Ore no Seishun Love Comedy wa Machigatteiru.",
    anoLancamento: 2013,
    studio: "Brain's Base",
    generos: ["Comédia", "Drama", "Escola", "Romance"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um estudante cínico e solitário é forçado a integrar o clube de serviços da escola junto com a garota mais popular. Suas formas tortuosas de resolver problemas revelam a hipocrisia das relações sociais adolescentes."
  },
  {
    id: "toradora",
    malId: 4224,
    nome: "Toradora!",
    anoLancamento: 2008,
    studio: "J.C. Staff",
    generos: ["Comédia", "Drama", "Escola", "Romance"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um garoto de expressão intimidadora mas gentil por dentro e uma garota pequena mas feroz ficam em conluio para ajudar um ao outro a conquistar seus paqueras. A situação inevitavelmente se complica para os dois."
  },
  {
    id: "clannad-after-story",
    malId: 4181,
    nome: "Clannad: After Story",
    anoLancamento: 2008,
    studio: "Kyoto Animation",
    generos: ["Drama", "Fantasia", "Romance", "Vida Cotidiana"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "A vida adulta de um jovem que superou um passado difícil é acompanhada de perto: casamento, trabalho e perdas profundas. Uma das histórias mais emocionantes sobre a passagem do tempo no anime."
  },
  {
    id: "angel-beats",
    malId: 6547,
    nome: "Angel Beats!",
    anoLancamento: 2010,
    studio: "P.A. Works",
    generos: ["Ação", "Comédia", "Drama", "Escola"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um grupo de adolescentes mortos acorda em um limbo que se parece com uma escola e se recusa a aceitar seu destino. Eles lutam contra a representante do sistema naquele lugar entre momentos cômicos e profundamente emocionantes."
  },
  {
    id: "your-lie-in-april",
    malId: 23273,
    nome: "Shigatsu wa Kimi no Uso",
    anoLancamento: 2014,
    studio: "A-1 Pictures",
    generos: ["Drama", "Escola", "Música", "Romance"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um ex-prodígio do piano que parou de ouvir as notas que toca conhece uma violinista exuberante e livre. Ela o tira de seu luto musical e reaviva sua paixão pela música à custa de um segredo doloroso."
  },
  {
    id: "berserk-1997",
    malId: 33,
    nome: "Kenpuu Denki Berserk",
    anoLancamento: 1997,
    studio: "OLM",
    generos: ["Ação", "Aventura", "Drama", "Fantasia", "Horror"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um mercenário colossal com uma espada enorme percorre um mundo de fantasia sombrio. Ele se une a uma gangue de guerreiros e forja uma amizade intensa com um carismático líder — até uma noite que muda tudo para sempre."
  },
  {
    id: "parasyte-the-maxim",
    malId: 22535,
    nome: "Kiseijuu: Sei no Kakuritsu",
    anoLancamento: 2014,
    studio: "Madhouse",
    generos: ["Ação", "Ficção Científica", "Horror", "Psicológico"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Criaturas alienígenas tomam o controle de humanos pelo cérebro. Um estudante é atacado, mas o parasita fica preso em sua mão direita; os dois precisam coexistir e se proteger de outros parasitas que caçam humanos."
  },
  {
    id: "psycho-pass",
    malId: 13601,
    nome: "Psycho-Pass",
    anoLancamento: 2012,
    studio: "Production I.G",
    generos: ["Ação", "Ficção Científica", "Psicológico", "Thriller"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Em um futuro distópico, um sistema de IA mede o índice de criminalidade de cada pessoa e executa pré-condenados. Uma jovem inspetora questiona a justiça desse sistema enquanto persegue um criminoso que burla a tecnologia."
  },
  {
    id: "samurai-champloo",
    malId: 205,
    nome: "Samurai Champloo",
    anoLancamento: 2004,
    studio: "Manglobe",
    generos: ["Ação", "Aventura", "Comédia", "Histórico"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Uma servidora recruta dois samurais com estilos radicalmente opostos para ajudá-la a encontrar um samurai misterioso. Os três percorrem o Japão do período Edo ao ritmo do hip-hop e do breakdance."
  },
  {
    id: "erased",
    malId: 31043,
    nome: "Boku dake ga Inai Machi",
    anoLancamento: 2016,
    studio: "A-1 Pictures",
    generos: ["Drama", "Mistério", "Sobrenatural", "Thriller"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um jovem com a habilidade inconsciente de voltar alguns minutos no tempo retorna décadas para a infância após a morte da mãe. Ele deve encontrar o assassino que, quando criança, também matou uma colega de classe."
  },
  {
    id: "fate-zero",
    malId: 10087,
    nome: "Fate/Zero",
    anoLancamento: 2011,
    studio: "ufotable",
    generos: ["Ação", "Drama", "Fantasia", "Sobrenatural"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Sete magos convocam heróis lendários do passado para uma batalha secreta pelo Santo Graal que concede um desejo. Uma guerra de ideais e tragédias entre invocadores com motivações completamente diferentes."
  },
  {
    id: "kill-la-kill",
    malId: 18679,
    nome: "Kill la Kill",
    anoLancamento: 2013,
    studio: "Trigger",
    generos: ["Ação", "Comédia", "Escola", "Ecchi"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Uma estudante transferida com metade de uma tesoura gigante vai a uma escola dominada por uma presidente poderosa para descobrir quem matou seu pai. Ela usa um uniforme sentiente que a transforma em combate."
  },
  {
    id: "spice-and-wolf",
    malId: 2966,
    nome: "Ookami to Koushinryou",
    anoLancamento: 2008,
    studio: "Imagin",
    generos: ["Aventura", "Fantasia", "Romance"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um jovem mercador ambulante encontra uma divindade das colheitas na forma de uma mulher-lobo e decide levá-la ao seu lar no norte. Os dois fazem negócios juntos e desenvolvem uma dinâmica afetuosa e intelectual."
  },
  {
    id: "mushishi",
    malId: 457,
    nome: "Mushishi",
    anoLancamento: 2005,
    studio: "Artland",
    generos: ["Aventura", "Fantasia", "Horror", "Mistério", "Sobrenatural"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um viajante de cabelos brancos percorre o Japão investigando criaturas invisíveis que vivem entre a fronteira da vida e da morte. Cada episódio é uma história independente e melancólica sem um arco central."
  },
  {
    id: "natsume-yuujinchou",
    malId: 4081,
    nome: "Natsume Yuujinchou",
    anoLancamento: 2008,
    studio: "Brain's Base",
    generos: ["Drama", "Fantasia", "Sobrenatural", "Vida Cotidiana"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um garoto que pode ver espíritos herda da avó um livro com nomes de criaturas sobrenaturais. Ele decide devolver os nomes a cada entidade para liberá-las do contrato que as prendia ao poder de sua avó."
  },
  {
    id: "anohana",
    malId: 9989,
    nome: "Ano Hi Mita Hana no Namae wo Bokutachi wa Mada Shiranai.",
    anoLancamento: 2011,
    studio: "A-1 Pictures",
    generos: ["Drama", "Romance", "Sobrenatural", "Vida Cotidiana"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "O fantasma de uma menina que morreu na infância reaparece para seu melhor amigo, que se isolou do mundo. Para que ela parta em paz, ele precisa reunir o grupo de amigos da infância e realizar o desejo dela."
  },
  {
    id: "fruits-basket-2019",
    malId: 38680,
    nome: "Fruits Basket 1st Season",
    anoLancamento: 2019,
    studio: "TMS Entertainment",
    generos: ["Comédia", "Drama", "Romance", "Sobrenatural"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Uma garota otimista vai morar com uma família cujos membros se transformam nos animais do zodíaco ao serem abraçados. Por trás dos momentos doces e cômicos, há traumas familiares profundos a superar."
  },
  {
    id: "nana",
    malId: 877,
    nome: "Nana",
    anoLancamento: 2006,
    studio: "Madhouse",
    generos: ["Drama", "Música", "Romance", "Vida Cotidiana"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Duas jovens com o mesmo nome se encontram num trem e acabam dividindo um apartamento em Tóquio. Uma é ingênua e sonhadora; a outra, durona e punk. Suas histórias de amor e amizade se entrelaçam intensamente."
  },
  {
    id: "ouran-host-club",
    malId: 853,
    nome: "Ouran Koukou Host Club",
    anoLancamento: 2006,
    studio: "Bones",
    generos: ["Comédia", "Drama", "Escola", "Paródia", "Romance"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Uma estudante bolsista de um colégio de elite quebra um vaso caríssimo e é forçada a se juntar ao clube de anfitriões masculinos para pagar a dívida. A série inverte e satiriza deliciosamente os clichês do gênero shoujo."
  },
  {
    id: "yuyuhakusho",
    malId: 392,
    nome: "Yuu?Yuu?Hakusho",
    anoLancamento: 1992,
    studio: "Pierrot",
    generos: ["Ação", "Artes Marciais", "Aventura", "Sobrenatural"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Um delinquente morre salvando uma criança e é ressuscitado como detetive do mundo espiritual. Ele forma uma equipe para combater demônios e participar de torneios de artes marciais sobrenaturais."
  },
  {
    id: "trigun",
    malId: 6,
    nome: "Trigun",
    anoLancamento: 1998,
    studio: "Madhouse",
    generos: ["Ação", "Aventura", "Comédia", "Ficção Científica"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um homem com enorme recompensa pela cabeça vagueia pelo deserto de um planeta árido fazendo bondades aleatórias. Sua natureza pacifista esconde uma história trágica e poderes destrutivos imensos."
  },
  {
    id: "rurouni-kenshin",
    malId: 45,
    nome: "Rurouni Kenshin: Meiji Kenkaku Romantan",
    anoLancamento: 1996,
    studio: "Deen",
    generos: ["Ação", "Aventura", "Drama", "Histórico", "Romance"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Um assassino lendário da era Meiji jurou nunca mais matar e vagabundeia com uma espada de fio invertido. Ele protege os fracos enquanto tenta expiar os crimes do passado."
  },
  {
    id: "fate-ubw",
    malId: 22297,
    nome: "Fate/stay night: Unlimited Blade Works",
    anoLancamento: 2014,
    studio: "ufotable",
    generos: ["Ação", "Fantasia", "Romance", "Sobrenatural"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um estudante sem treinamento é arrastado para uma guerra secreta entre magos e heróis lendários do passado. Ele faz parceria com uma monarca britânica invocada e descobre seu próprio legado mágico singular."
  },
  {
    id: "assassination-classroom",
    malId: 24833,
    nome: "Ansatsu Kyoushitsu",
    anoLancamento: 2015,
    studio: "Lerche",
    generos: ["Ação", "Comédia", "Escola"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um monstro amarelo e tentaculado que destruiu metade da lua torna-se professor de uma turma de alunos fracassados. Os alunos devem matá-lo antes do final do ano ou ele destruirá a Terra — mas o professor é incrível."
  },
  {
    id: "k-on",
    malId: 5680,
    nome: "K-On!",
    anoLancamento: 2009,
    studio: "Kyoto Animation",
    generos: ["Comédia", "Escola", "Música", "Vida Cotidiana"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Uma garota displicente entra no clube de música leve para não deixá-lo ser dissolvido, mesmo sem saber tocar instrumento. Ela aprende guitarra ao lado de amigas e o clube vira um grupo de rock colegial."
  },
  {
    id: "hyouka",
    malId: 12189,
    nome: "Hyouka",
    anoLancamento: 2012,
    studio: "Kyoto Animation",
    generos: ["Escola", "Mistério", "Romance", "Vida Cotidiana"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um estudante que economiza energia e evita qualquer esforço é convencido a entrar no clube de literatura clássica. Sua sócia curiosa o arrasta para resolver mistérios cotidianos usando seu raciocínio afiado."
  },
  {
    id: "nichijou",
    malId: 10165,
    nome: "Nichijou",
    anoLancamento: 2011,
    studio: "Kyoto Animation",
    generos: ["Comédia", "Escola", "Vida Cotidiana"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "O cotidiano absurdo de três amigas do colégio se mistura com as aventuras de uma professora robô criança e sua criadora. O humor é construído com reações exageradas e altamente animadas a situações mundanas."
  },
  {
    id: "fullmetal-alchemist-2003",
    malId: 121,
    nome: "Fullmetal Alchemist",
    anoLancamento: 2003,
    studio: "Bones",
    generos: ["Ação", "Aventura", "Drama", "Fantasia", "Militarismo"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Dois irmãos alquimistas buscam a Pedra Filosofal para recuperar seus corpos perdidos. Esta versão segue uma rota original e mais sombria diferente do mangá, com um desfecho completamente próprio."
  },
  {
    id: "gurren-lagann",
    malId: 2001,
    nome: "Tengen Toppa Gurren Lagann",
    anoLancamento: 2007,
    studio: "Gainax",
    generos: ["Ação", "Aventura", "Comédia", "Ficção Científica", "Mecha"],
    faixaRating: "8-9",
    numeroEpisodios: "longo (27+)",
    pista: "Dois jovens que viviam em uma aldeia subterrânea encontram um robô enterrado e escapam para a superfície. Uma história de evolução e determinação que cresce de aventura mecha para épico de escala cósmica."
  },
  {
    id: "haruhi-suzumiya",
    malId: 849,
    nome: "Suzumiya Haruhi no Yuuutsu",
    anoLancamento: 2006,
    studio: "Kyoto Animation",
    generos: ["Aventura", "Comédia", "Ficção Científica", "Mistério"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Uma garota excêntrica funda um clube para investigar alienígenas, viajantes do tempo e poderes sobrenaturais sem perceber que ela mesma é o fenômeno que atrai todas essas anomalias."
  },
  {
    id: "blue-lock",
    malId: 49596,
    nome: "Blue Lock",
    anoLancamento: 2022,
    studio: "8bit",
    generos: ["Drama", "Esporte", "Psicológico"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Para criar o melhor atacante do mundo, a seleção japonesa de futebol convoca trezentos jovens para um programa de eliminação extrema. O egoísmo é celebrado e a habilidade de fazer gols é a única moeda de valor."
  },
  {
    id: "spy-x-family",
    malId: 50265,
    nome: "Spy x Family",
    anoLancamento: 2022,
    studio: "Wit Studio",
    generos: ["Ação", "Comédia", "Escola"],
    faixaRating: "8-9",
    numeroEpisodios: "médio (14-26)",
    pista: "Um espião de elite precisa montar uma família falsa para cumprir uma missão. Ele adota uma menina telepata e se casa com uma assassina; nenhum dos três conhece os segredos dos outros e a dinâmica familiar é deliciosa."
  },
  {
    id: "chainsaw-man",
    malId: 44511,
    nome: "Chainsaw Man",
    anoLancamento: 2022,
    studio: "MAPPA",
    generos: ["Ação", "Aventura", "Comédia", "Horror"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um jovem caçador de demônios endividado morre e funde-se com seu cão-demônio motosserra para sobreviver. Recrutado pela divisão pública de caça a demônios, ele descobre que o mundo é muito mais brutal do que imaginava."
  },
  {
    id: "black-lagoon",
    malId: 889,
    nome: "Black Lagoon",
    anoLancamento: 2006,
    studio: "Madhouse",
    generos: ["Ação", "Aventura", "Drama", "Thriller"],
    faixaRating: "8-9",
    numeroEpisodios: "curto (1-13)",
    pista: "Um funcionário de empresa japonesa é sequestrado por piratas mercenários e, abandonado pela empresa, decide se juntar ao grupo. A série acompanha contratos ilegais em uma cidade sem lei no Sudeste Asiático."
  },

  /* ═══════════════════════════════════════════
     RATING 7-8 — Populares
  ═══════════════════════════════════════════ */

  {
    id: "naruto",
    malId: 20,
    nome: "Naruto",
    anoLancamento: 2002,
    studio: "Pierrot",
    generos: ["Ação", "Artes Marciais", "Aventura", "Escola"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "Um garoto rejeitado que carrega uma raposa-demônio dentro de si sonha em se tornar o líder de sua aldeia ninja. Sua teimosia e espírito são postos à prova em missões e numa guerra iminente."
  },
  {
    id: "naruto-shippuden",
    malId: 1735,
    nome: "Naruto: Shippuuden",
    anoLancamento: 2007,
    studio: "Pierrot",
    generos: ["Ação", "Artes Marciais", "Aventura"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "Um jovem ninja retorna à aldeia depois de anos de treinamento intenso para enfrentar uma organização de criminosos e salvar um amigo que tomou o caminho das trevas."
  },
  {
    id: "bleach",
    malId: 269,
    nome: "Bleach",
    anoLancamento: 2004,
    studio: "Pierrot",
    generos: ["Ação", "Aventura", "Sobrenatural"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "Um adolescente que pode ver fantasmas acaba recebendo os poderes de um ceifeiro de almas. Ele luta para proteger as pessoas que ama de criaturas malignas e enfrenta um sistema que traiu seus ideais."
  },
  {
    id: "fairy-tail",
    malId: 6702,
    nome: "Fairy Tail",
    anoLancamento: 2009,
    studio: "A-1 Pictures",
    generos: ["Ação", "Aventura", "Comédia", "Fantasia"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "Uma maga que procura o pai se junta à guilda de magos mais famosa — e mais desordeira — do reino. As aventuras de equipe misturam batalhas épicas com humor e uma amizade que supera qualquer obstáculo."
  },
  {
    id: "my-hero-academia",
    malId: 31964,
    nome: "Boku no Hero Academia",
    anoLancamento: 2016,
    studio: "Bones",
    generos: ["Ação", "Comédia", "Escola", "Super-Herói"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "Em um mundo onde a maioria das pessoas tem poderes sobrenaturais, um garoto nasce sem nenhum. Ele herda a habilidade do maior herói do mundo e entra em uma escola que forma heróis profissionais."
  },
  {
    id: "black-clover",
    malId: 34572,
    nome: "Black Clover",
    anoLancamento: 2017,
    studio: "Pierrot",
    generos: ["Ação", "Aventura", "Comédia", "Fantasia"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "Um garoto sem magia em um mundo onde todos a têm recebe um grimório de quatro folhas e jura ser o Rei Mago. Aos gritos, ele compensa a falta de habilidade mágica com determinação inabalável."
  },
  {
    id: "tokyo-revengers",
    malId: 42249,
    nome: "Tokyo Revengers",
    anoLancamento: 2021,
    studio: "Liden Films",
    generos: ["Ação", "Drama", "Ficção Científica", "Romance"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Um jovem fracassado descobre que pode viajar no tempo ao toque de seu ex. Ele volta à adolescência para mudar o destino do chefe de uma gangue criminosa e evitar a morte de pessoas queridas."
  },
  {
    id: "tokyo-ghoul",
    malId: 22319,
    nome: "Tokyo Ghoul",
    anoLancamento: 2014,
    studio: "Pierrot",
    generos: ["Ação", "Drama", "Horror", "Psicológico"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "Um estudante universitário tímido quase é devorado por uma criatura comedora de humanos e se torna um híbrido. Ele tenta manter sua humanidade enquanto vive entre dois mundos que se odeiam mutuamente."
  },
  {
    id: "sword-art-online",
    malId: 11757,
    nome: "Sword Art Online",
    anoLancamento: 2012,
    studio: "A-1 Pictures",
    generos: ["Ação", "Aventura", "Fantasia", "Romance"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Jogadores de um jogo de realidade virtual são presos no mundo do jogo e só podem sair derrotando o último chefe. Se morrerem no jogo, morrem de verdade; um jogador habilidoso lidera a resistência."
  },
  {
    id: "overlord",
    malId: 29803,
    nome: "Overlord",
    anoLancamento: 2015,
    studio: "Madhouse",
    generos: ["Ação", "Aventura", "Fantasia"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "O último jogador de um MMORPG prestes a ser desligado é transportado para dentro do jogo como seu personagem esquelético supremo. Ele explora o novo mundo com seus servos NPC que ganharam consciência."
  },
  {
    id: "tensura",
    malId: 37430,
    nome: "Tensei shitara Slime Datta Ken",
    anoLancamento: 2018,
    studio: "Eight Bit",
    generos: ["Ação", "Aventura", "Comédia", "Fantasia"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Um homem morto e reencarnado como uma gosma em um mundo de fantasia descobre poderes imensos. Sua liderança pacifista atrai aliados de todas as espécies e ele começa a construir uma nação de monstros."
  },
  {
    id: "inuyasha",
    malId: 249,
    nome: "InuYasha",
    anoLancamento: 2000,
    studio: "Sunrise",
    generos: ["Ação", "Aventura", "Fantasia", "Histórico", "Romance"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "Uma estudante japonesa cai em um poço e é transportada para o Japão feudal, onde encontra um meio-demônio preso a uma árvore. Juntos, buscam os fragmentos de uma joia poderosa espalhados pelo país."
  },
  {
    id: "sailor-moon",
    malId: 530,
    nome: "Bishoujo Senshi Sailor Moon",
    anoLancamento: 1992,
    studio: "Toei Animation",
    generos: ["Aventura", "Comédia", "Drama", "Magia", "Romance"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "Uma garota displicente descobre ser a reencarnação de uma guerreira lunar. Ela e suas amigas, também guerreiras reencarnadas, protegem a Terra de forças das trevas usando joias e transformações mágicas."
  },
  {
    id: "black-butler",
    malId: 4898,
    nome: "Kuroshitsuji",
    anoLancamento: 2008,
    studio: "A-1 Pictures",
    generos: ["Ação", "Comédia", "Fantasia", "Mistério", "Sobrenatural"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Um jovem nobre da era vitoriana faz um pacto com um demônio para obter vingança pelos pais assassinados. O demônio, disfarçado de mordomo perfeito em todos os sentidos, serve e aguarda o momento de cobrar o contrato."
  },
  {
    id: "noragami",
    malId: 20507,
    nome: "Noragami",
    anoLancamento: 2014,
    studio: "Bones",
    generos: ["Ação", "Aventura", "Comédia", "Sobrenatural"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "Um deus menor sem templo realiza pequenos trabalhos por cinco ienes para sobreviver. Ele aceita a alma de uma garota que saiu de seu corpo como arma espiritual e começa a construir seu próprio panteão."
  },
  {
    id: "fire-force",
    malId: 38671,
    nome: "Enen no Shouboutai",
    anoLancamento: 2019,
    studio: "David Production",
    generos: ["Ação", "Ficção Científica", "Sobrenatural"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "No futuro, pessoas podem espontaneamente pegar fogo e se transformar em criaturas flamejantes. Uma brigada especial de bombeiros com poderes de fogo combate essas chamas e investiga a conspiração por trás delas."
  },
  {
    id: "rising-of-the-shield-hero",
    malId: 35790,
    nome: "Tate no Yuusha no Nariagari",
    anoLancamento: 2019,
    studio: "Kinema Citrus",
    generos: ["Ação", "Aventura", "Drama", "Fantasia"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Um jovem otaku é invocado para um mundo de fantasia como o herói do escudo. Falsamente acusado logo na chegada, ele deve reconstruir sua reputação do zero com uma única companheira escrava ao lado."
  },
  {
    id: "seven-deadly-sins",
    malId: 23755,
    nome: "Nanatsu no Taizai",
    anoLancamento: 2014,
    studio: "A-1 Pictures",
    generos: ["Ação", "Aventura", "Comédia", "Fantasia"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Uma princesa foge do palácio e procura um grupo lendário de cavaleiros banidos por supostamente trair o reino. Ela precisa deles para retomar o trono usurpado por cavaleiros divinos corruptos."
  },
  {
    id: "danmachi",
    malId: 28121,
    nome: "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka",
    anoLancamento: 2015,
    studio: "J.C. Staff",
    generos: ["Ação", "Aventura", "Comédia", "Fantasia", "Romance"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "Um jovem aventureiro ingênuo é o único membro da família de uma deusa menor em uma cidade guiada por divindades. Ele tem um crescimento acelerado estranho e se apaixona por uma guerreira de família rival."
  },
  {
    id: "log-horizon",
    malId: 17265,
    nome: "Log Horizon",
    anoLancamento: 2013,
    studio: "Satelight",
    generos: ["Ação", "Aventura", "Fantasia", "Ficção Científica"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Trinta mil jogadores são presos em um MMORPG sem memória de como chegaram lá. Este estrategista usa política, economia e alianças para organizar os jogadores em uma sociedade funcional, não apenas sobreviver."
  },
  {
    id: "ao-no-exorcist",
    malId: 9919,
    nome: "Ao no Exorcist",
    anoLancamento: 2011,
    studio: "A-1 Pictures",
    generos: ["Ação", "Aventura", "Escola", "Fantasia", "Sobrenatural"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Um jovem furioso descobre ser o filho de Satanás e decide tornar-se exorcista para derrotar o próprio pai. Ele estuda em uma escola secreta com outros exorcistas aprendizes que não conhecem sua origem."
  },
  {
    id: "goblin-slayer",
    malId: 37349,
    nome: "Goblin Slayer",
    anoLancamento: 2018,
    studio: "White Fox",
    generos: ["Ação", "Aventura", "Drama", "Fantasia", "Horror"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "Em um mundo de RPG, um guerreiro silencioso com armadura surrada recusa qualquer missão que não envolva goblins. Obcecado por matar apenas uma espécie, ele mostra que criaturas consideradas fracas podem ser terríveis."
  },
  {
    id: "dr-stone",
    malId: 38691,
    nome: "Dr. Stone",
    anoLancamento: 2019,
    studio: "TMS Entertainment",
    generos: ["Aventura", "Comédia", "Drama", "Ficção Científica"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Toda a humanidade é petrificada por uma luz misteriosa. Milhares de anos depois, um gênio científico desperta na pré-história e decide reconstruir a civilização usando apenas a ciência, passo a passo."
  },
  {
    id: "little-witch-academia",
    malId: 33489,
    nome: "Little Witch Academia (TV)",
    anoLancamento: 2017,
    studio: "Trigger",
    generos: ["Aventura", "Comédia", "Escola", "Magia"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Uma garota sem origem mágica entra em uma academia de bruxas inspirada por uma famosa bruxa que se aposentou. Mesmo sem talento natural, ela persegue o sonho de fazer as pessoas sorrirem com sua magia."
  },
  {
    id: "free",
    malId: 18507,
    nome: "Free!",
    anoLancamento: 2013,
    studio: "Kyoto Animation",
    generos: ["Comédia", "Drama", "Esporte", "Vida Cotidiana"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "Quatro ex-colegas de colégio que nadavam juntos se reencontram em equipes diferentes. Um deles, obcecado pelo estilo livre, precisa superar uma rivalidade antiga e redescobrir o prazer de nadar em equipe."
  },
  {
    id: "lucky-star",
    malId: 1887,
    nome: "Lucky?Star",
    anoLancamento: 2007,
    studio: "Kyoto Animation",
    generos: ["Comédia", "Escola", "Vida Cotidiana"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "O cotidiano descompromissado de quatro amigas do colégio: conversas sobre comida, anime e momentos mundanos. Um anime famoso por celebrar a cultura otaku sem um enredo central ou conflito."
  },
  {
    id: "charlotte",
    malId: 28999,
    nome: "Charlotte",
    anoLancamento: 2015,
    studio: "P.A. Works",
    generos: ["Ação", "Drama", "Escola", "Super-Herói"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "Adolescentes ao redor do mundo têm poderes especiais que somem ao entrarem na fase adulta. Um jovem que usa sua habilidade para trapacear é recrutado por uma garota de uma escola especial para proteger outros poderes."
  },
  {
    id: "accel-world",
    malId: 11759,
    nome: "Accel World",
    anoLancamento: 2012,
    studio: "Sunrise",
    generos: ["Ação", "Aventura", "Ficção Científica", "Romance"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Um garoto gordo e bullied no futuro próximo recebe convite de uma veterana popular para instalar um programa secreto. Ele entra em um jogo de realidade virtual de alta velocidade onde a derrota total significa banimento eterno."
  },
  {
    id: "ancient-magus-bride",
    malId: 35062,
    nome: "Mahoutsukai no Yome",
    anoLancamento: 2017,
    studio: "Wit Studio",
    generos: ["Drama", "Fantasia", "Romance", "Sobrenatural"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Uma garota sem família que se vendeu a leilão é comprada por uma criatura mágica de cabeça de cavalo que a declara sua aprendiz e noiva. Ela aprende magia no interior da Inglaterra enquanto descobre sua habilidade especial."
  },
  {
    id: "plastic-memories",
    malId: 27775,
    nome: "Plastic Memories",
    anoLancamento: 2015,
    studio: "Doga Kobo",
    generos: ["Drama", "Ficção Científica", "Romance"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "No futuro, robôs com emoções idênticas a humanas têm vida útil limitada. Um funcionário novato é designado para recuperar androides no fim da vida útil e se apaixona pela parceira robô que também está quase no limite."
  },
  {
    id: "claymore",
    malId: 1818,
    nome: "Claymore",
    anoLancamento: 2007,
    studio: "Madhouse",
    generos: ["Ação", "Aventura", "Drama", "Fantasia", "Horror"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Guerreiras meio humanas, meio monstro percorrem um mundo medieval caçando criaturas que devoram entranhas humanas. Uma dessas guerreiras promete proteger um garoto órfão que a acompanha na jornada."
  },
  {
    id: "d-gray-man",
    malId: 1482,
    nome: "D.Gray-man",
    anoLancamento: 2006,
    studio: "TMS Entertainment",
    generos: ["Ação", "Aventura", "Comédia", "Fantasia", "Horror"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "No século XIX, um jovem com um braço amaldiçoado ingressa em uma organização que combate um conde demônio. Os exorcistas usam substâncias antigas contra criaturas feitas de almas de mortos revividas como armas."
  },
  {
    id: "katekyo-hitman-reborn",
    malId: 1604,
    nome: "Katekyou Hitman Reborn!",
    anoLancamento: 2006,
    studio: "Artland",
    generos: ["Ação", "Comédia", "Escola"],
    faixaRating: "7-8",
    numeroEpisodios: "longo (27+)",
    pista: "Um garoto azarado descobre ser o herdeiro de uma família da máfia italiana. Um bebê assassino vira seu tutor e o força a crescer usando balas especiais que revelam momentaneamente o potencial oculto da pessoa."
  },
  {
    id: "initial-d",
    malId: 185,
    nome: "Initial D First Stage",
    anoLancamento: 1998,
    studio: "OLM",
    generos: ["Ação", "Drama", "Esporte"],
    faixaRating: "7-8",
    numeroEpisodios: "médio (14-26)",
    pista: "Um entregador de tofu aprende a pilotar ao fazer entregas nas montanhas à noite com o carro do pai. Sem perceber, ele domina técnicas de drift que surpreendem corredores profissionais de mountain racing."
  },
  {
    id: "hellsing-ultimate",
    malId: 777,
    nome: "Hellsing Ultimate",
    anoLancamento: 2006,
    studio: "Madhouse",
    generos: ["Ação", "Horror", "Sobrenatural"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "Uma organização britânica secreta usa um vampiro antigo e absolutamente poderoso para combater monstros sobrenaturais. Quando nazistas sobrenaturais ameaçam a Europa, as batalhas tomam escala apocalíptica."
  },
  {
    id: "no-game-no-life",
    malId: 19815,
    nome: "No Game No Life",
    anoLancamento: 2014,
    studio: "Madhouse",
    generos: ["Aventura", "Comédia", "Ecchi", "Fantasia"],
    faixaRating: "7-8",
    numeroEpisodios: "curto (1-13)",
    pista: "Dois irmãos hikikomori invencíveis em qualquer jogo são transportados para um mundo onde todas as disputas são resolvidas em jogos. Eles decidem conquistar esse novo mundo usando sua inteligência extraordinária."
  }

];
