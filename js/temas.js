// ===== BLOCO 2 de 60 · importância: complementar =====
// TÍTULO: Programa do tema do site
// O QUE FAZ: Roda sozinho ao carregar: lê o tema salvo (localStorage), escolhe um padrão se não houver e liga o botão que troca claro, escuro e tijolos.
(function () {
  "use strict";

  /* ---------- 1. DADOS ---------- */
  var seletor = document.getElementById("tema-site");
  var temas = ["claro", "escuro", "tijolos", "sakura"];
  var nomes = { claro: "claro", escuro: "escuro", tijolos: "tijolos", sakura: "sakura" };
  var tema; // o tema em uso agora

  /* ---------- 2.  ---------- */
// ===== BLOCO 3 de 60 · importância: complementar =====
// TÍTULO: aplicar(valor): muda o tema na página
// O QUE FAZ: Coloca data-tema no <html> (o CSS troca as cores), atualiza o texto do botão e a cor da barra do navegador.
  function aplicar(valor) {
    tema = valor;
    document.documentElement.dataset.tema = valor;

    // Descobre qual é o próximo tema da lista (volta ao primeiro depois do último)
    var posicaoProximo = (temas.indexOf(valor) + 1) % temas.length;
    var proximo = temas[posicaoProximo];

    // Texto do botão (leitores de tela e dica ao passar o mouse)
    var descricao = "Tema atual: " + nomes[valor] + ". Mudar para " + nomes[proximo];
    seletor.setAttribute("aria-label", descricao);
    seletor.title = descricao;

    // Cor da barra do navegador no celular
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      if (valor === "escuro") {
        meta.content = "#3a2754";
      } else if (valor === "tijolos") {
        meta.content = "#f2dfb8";
      } else if (valor === "sakura") {
        meta.content = "#ffe7f1";
      } else {
        meta.content = "#e6dcf5";
      }
    }
  }

  /* ---------- 3. EXECUÇÃO ---------- */
  // Lê o tema salvo no navegador (pode falhar se o armazenamento estiver bloqueado)
  try {
    tema = localStorage.getItem("elas-tema");
  } catch (_) {}

  // Se não há tema salvo (ou ele é inválido), segue o modo claro/escuro do sistema
  if (["claro", "escuro", "tijolos", "sakura"].indexOf(tema) === -1) {
    var sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    tema = sistemaEscuro ? "escuro" : "claro";
  }

  aplicar(tema);

  // A cada clique, passa para o próximo tema e salva a escolha
  seletor.addEventListener("click", function () {
    var posicaoProximo = (temas.indexOf(tema) + 1) % temas.length;
    aplicar(temas[posicaoProximo]);
    try {
      localStorage.setItem("elas-tema", tema);
    } catch (_) {}
  });
})();
