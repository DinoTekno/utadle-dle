// ===== BLOCO 4 de 60 · importância: importante =====
// TÍTULO: Configuração do exemplo guiado
// O QUE FAZ: Roda ao carregar: pega 3 animes da lista, define a resposta e localiza botões e área de resultado.
/* Exemplo independente: não altera a partida do visitante. */
(function () {
  "use strict";

  /* ---------- 1. DADOS ---------- */
  // Os 3 animes do exemplo, na ordem dos palpites (o último é a resposta)
  var nomes = ["Naruto", "Kimetsu no Yaiba", "Shingeki no Kyojin"];
  var animes = nomes.map(function (nome) {
    return window.ANIMES.find(function (anime) {
      return anime.nome === nome;
    });
  });
  var alvo = animes[2];
  var passo = 0;

  // Elementos da página que o exemplo usa
  var destino = document.getElementById("exemplo-resultado");
  var proximo = document.getElementById("exemplo-proximo");
  var reiniciar = document.getElementById("exemplo-reiniciar");

  // Um texto explicativo para cada passo
  var explicacoes = [
    "Naruto não é a resposta. A seta indica que o ano correto vem depois de 2002; os episódios longos coincidem e há gêneros em comum.",
    "Kimetsu no Yaiba aproxima a busca: o ano correto vem antes de 2019, e Ação e Fantasia coincidem parcialmente.",
    "Você acertou! Shingeki no Kyojin coincide nos cinco campos: ano, estúdio, rating, gêneros e episódios."
  ];

  /* ---------- 2.  ---------- */
// ===== BLOCO 5 de 60 · importância: importante =====
// TÍTULO: el(tag, classe, texto): cria elemento HTML
// O QUE FAZ: Fábrica de elementos: cria a tag, põe classe e texto de forma segura (textContent) e devolve pronta.
  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) {
      e.className = classe;
    }
    if (texto != null) {
      e.textContent = texto;
    }
    return e;
  }

// ===== BLOCO 6 de 60 · importância: importante =====
// TÍTULO: estado(valor, certo): compara palpite e resposta
// O QUE FAZ: Devolve 'ok', 'perto' ou 'erro'. Para listas, conta quantos itens os dois têm em comum.
  function estado(valor, certo) {
    if (Array.isArray(valor)) {
      // Conta quantos itens do palpite também estão na resposta
      var comuns = valor.filter(function (v) {
        return certo.indexOf(v) !== -1;
      }).length;

      var listasIguais = comuns === valor.length && comuns === certo.length;
      if (listasIguais) {
        return "ok";
      }
      if (comuns) {
        return "perto";
      }
      return "erro";
    }
    return valor === certo ? "ok" : "erro";
  }

// ===== BLOCO 7 de 60 · importância: importante =====
// TÍTULO: mostrar(): desenha o palpite atual
// O QUE FAZ: Monta o cartão com cada campo comparado, troca o conteúdo da tela e alterna os botões Próximo e Reiniciar.
  function mostrar() {
    var anime = animes[passo];
    var card = el("article", "exemplo-palpite");
    card.appendChild(el("p", "exemplo-etiqueta", "Palpite " + (passo + 1) + " de 3"));

    // Cabeçalho do cartão: capa e nome
    var cab = el("div", "exemplo-pessoa");
    var capa = el("div", "exemplo-pessoa-capa capa-wrapper");
    var inicial = el("span", "ini", anime.nome.charAt(0).toUpperCase());
    inicial.setAttribute("aria-hidden", "true");
    capa.appendChild(inicial);
    var foto = el("img");
    foto.alt = "";
    capa.appendChild(foto);
    cab.appendChild(capa);
    cab.appendChild(el("h3", null, anime.nome));
    card.appendChild(cab);

    // Lista de comparações: [texto na tela, nome da propriedade]
    var lista = el("dl", "exemplo-comparacoes");
    var campos = [
      ["Ano", "anoLancamento"],
      ["Estúdio", "studio"],
      ["Rating", "faixaRating"],
      ["Gêneros", "generos"],
      ["Episódios", "numeroEpisodios"]
    ];
    campos.forEach(function (campo, i) {
      var valor = anime[campo[1]];
      var certo = alvo[campo[1]];
      var resultado = estado(valor, certo);

      // Rótulo do resultado
      var rotulo;
      if (resultado === "ok") {
        rotulo = "✓ Correto";
      } else if (resultado === "perto") {
        rotulo = "≈ Parcial";
      } else {
        rotulo = "× Diferente";
      }

      // No ano, a seta mostra se o anime da resposta é mais novo ou mais antigo.
      if (i === 0 && resultado !== "ok") {
        if (certo > valor) {
          rotulo = "↑ O ano certo vem depois";
        } else {
          rotulo = "↓ O ano certo vem antes";
        }
      }

      var item = el("div", "exemplo-campo " + resultado);
      item.appendChild(el("dt", null, campo[0]));
      item.appendChild(el("dd", null, Array.isArray(valor) ? valor.join(", ") : String(valor)));
      item.appendChild(el("dd", "exemplo-estado", rotulo));
      lista.appendChild(item);
    });
    card.appendChild(lista);
    card.appendChild(el("p", "exemplo-explicacao", explicacoes[passo]));
    window.carregarImagem(anime.malId, foto);

    // Troca o conteúdo da área de resultado pelo cartão novo
    destino.replaceChildren(card);
    proximo.hidden = passo === 2;
    reiniciar.hidden = passo !== 2;
    // Mantém o foco no controle disponível ao concluir ou reiniciar o exemplo.
  }

  /* ---------- 3. EXECUÇÃO ---------- */
  proximo.addEventListener("click", function () {
    if (passo < 2) {
      passo++;
      mostrar();
      if (passo === 2) {
        reiniciar.focus({ preventScroll: true });
      }
    }
  });

  reiniciar.addEventListener("click", function () {
    passo = 0;
    mostrar();
    proximo.focus({ preventScroll: true });
  });

  // Desenha o primeiro palpite ao carregar
  mostrar();
})();
