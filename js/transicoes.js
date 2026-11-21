// ===== BLOCO 8 de 60 · importância: complementar =====
// TÍTULO: Transições entre páginas
// O QUE FAZ: Roda ao carregar: anima a entrada da página e, ao clicar num link interno, anima a saída (160 ms) antes de navegar. Respeita 'reduzir movimento'.
/* Transições curtas entre os documentos, mantendo os links nativos. */
(function () {
  "use strict";

  /* ---------- 1. DADOS ---------- */
  var raiz = document.documentElement;
  var saindo = false;
  var navegacao = null;
  var recuperacao = null;

  /* ---------- 2.  ---------- */
// ===== BLOCO 9 de 60 · importância: importante =====
// TÍTULO: reduzirMovimento(): animações desligadas?
// O QUE FAZ: Devolve true se o usuário desativou animações no painel de acessibilidade ou no sistema.
  function reduzirMovimento() {
    var usuarioDesativou = document.documentElement.classList.contains("a11y-sem-animacao");
    var sistemaPede = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return usuarioDesativou || sistemaPede;
  }

// ===== BLOCO 10 de 60 · importância: complementar =====
// TÍTULO: restaurar(): limpa o estado da transição
// O QUE FAZ: Cancela os timers e remove as classes de entrada e saída, deixando a página normal.
  function restaurar() {
    clearTimeout(navegacao);
    clearTimeout(recuperacao);
    saindo = false;
    raiz.classList.remove("pagina-saindo", "pagina-entrando");
  }

// ===== BLOCO 11 de 60 · importância: complementar =====
// TÍTULO: entrar(): inicia a animação de entrada
// O QUE FAZ: Restaura o estado e, se permitido, adiciona a classe que anima a página aparecendo.
  function entrar() {
    restaurar();
    if (!reduzirMovimento()) {
      raiz.classList.add("pagina-entrando");
    }
  }

  /* ---------- 3. EXECUÇÃO ---------- */
  // Ao abrir a página, toca a animação de entrada
  entrar();

  // Ao voltar pelo botão "voltar" do navegador, toca a entrada de novo
  window.addEventListener("pageshow", function (evento) {
    if (evento.persisted) {
      entrar();
    }
  });

  // Quando a animação de entrada termina, tira a classe
  document.addEventListener("animationend", function (evento) {
    if (evento.animationName === "pagina-entrar") {
      raiz.classList.remove("pagina-entrando");
    }
  });

  // Ao clicar num link interno, toca a animação de saída e só depois navega
  document.addEventListener("click", function (evento) {
    // 1) Ignora cliques que não devem virar transição
    if (evento.defaultPrevented || evento.button !== 0) {
      return;
    }
    if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) {
      return;
    }

    // 2) Só interessa clique em link (<a href>) que abre na mesma aba%
    var link = evento.target.closest && evento.target.closest("a[href]");
    if (!link || link.hasAttribute("download")) {
      return;
    }
    if (link.target && link.target !== "_self") {
      return;
    }

    // 3) Só links para as 4 páginas do próprio site, e que não sejam a página atual
    var destino = new URL(link.href, window.location.href);
    var mesmoSite = destino.origin === window.location.origin;
    var paginaDoSite = /\/(?:index|jogo|como-funciona|historias)\.html$/.test(destino.pathname);
    if (!mesmoSite || !paginaDoSite) {
      return;
    }
    if (destino.pathname === window.location.pathname && destino.search === window.location.search) {
      return;
    }
    if (reduzirMovimento()) {
      return;
    }

    // 4) Toca a saída e navega depois de 160 ms
    evento.preventDefault();
    if (saindo) {
      return;
    }
    saindo = true;
    raiz.classList.remove("pagina-entrando");
    raiz.classList.add("pagina-saindo");
    navegacao = setTimeout(function () {
      // Se o destino demorar ou falhar, a página atual volta a ficar visível.
      recuperacao = setTimeout(restaurar, 1000);
      window.location.assign(destino.href);
    }, 160);
  });
})();
