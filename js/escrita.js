// ===== BLOCO 51 de 60 · importância: complementar =====
// TÍTULO: Efeito de escrita gradual (programa)
// O QUE FAZ: Cria a fila de tarefas e liga o efeito às abas de texto, aos cartões de fatos e à vitória; encerra tudo ao sair da página, trocar de aba ou ativar acessibilidade.
/* Escrita sequencial, com cancelamento por conteúdo e restauração do HTML original. */
(function () {
  "use strict";

  /* ---------- 1. DADOS ---------- */

  var movimento = window.matchMedia("(prefers-reduced-motion: reduce)");
  var filas = new Map();
  var quadro = 0;
  var segmentador = null;
  if (typeof Intl.Segmenter === "function") {
    segmentador = new Intl.Segmenter("pt", { granularity: "grapheme" });
  }

  // Elementos do jogo que a escrita acompanha
  var resumo = document.getElementById("resumo-fatos");
  var vitoria = document.getElementById("vitoria");

  /* ---------- 2.  ---------- */

// ===== BLOCO 52 de 60 · importância: complementar =====
// TÍTULO: letras(texto): dividir texto em letras
// O QUE FAZ: Separa em caracteres reais (grafemas), para não quebrar acentos nem emojis.
  function letras(texto) {
    if (segmentador) {
      return Array.from(segmentador.segment(texto), function (s) {
        return s.segment;
      });
    }
    return Array.from(texto);
  }

// ===== BLOCO 53 de 60 · importância: complementar =====
// TÍTULO: preparar(bloco): preparar um bloco para ser digitado
// O QUE FAZ: Troca cada texto por uma parte visível (vazia), uma parte restante escondida e uma cópia para leitor de tela.
  function preparar(bloco) {
    // 1) Acha todos os textos dentro do bloco (menos os já escondidos)
    var textos = [];
    var walker = document.createTreeWalker(bloco, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      var noTexto = walker.currentNode;
      if (noTexto.textContent.trim() && !noTexto.parentElement.closest(".sr, [aria-hidden='true']")) {
        textos.push(noTexto);
      }
    }

    // 2) Troca cada texto por 3 peças: parte já escrita, parte restante e cópia para leitor de tela
    var total = 0;
    var partes = textos.map(function (original) {
      var caracteres = letras(original.data);
      var inicio = total;
      total += caracteres.length;

      var visual = document.createElement("span");
      var visivel = document.createTextNode("");
      var restante = document.createElement("span");
      var acessivel = document.createElement("span");

      visual.setAttribute("aria-hidden", "true");
      restante.className = "escrita-restante";
      restante.textContent = original.data;
      acessivel.className = "sr";
      acessivel.textContent = original.data;

      visual.append(visivel, restante);
      original.replaceWith(visual, acessivel);

      return {
        original: original,
        visual: visual,
        visivel: visivel,
        restante: restante,
        acessivel: acessivel,
        caracteres: caracteres,
        inicio: inicio,
        ultimo: -1
      };
    });

    bloco.classList.add("escrita-pendente");
    return { bloco: bloco, partes: partes, total: total, concluido: false };
  }

// ===== BLOCO 54 de 60 · importância: complementar =====
// TÍTULO: restaurar(item): voltar ao HTML original
// O QUE FAZ: Devolve os textos originais e remove os elementos temporários.
  function restaurar(item) {
    if (item.concluido) {
      return;
    }
    item.concluido = true;
    item.partes.forEach(function (p) {
      p.visual.replaceWith(p.original);
      p.acessivel.remove();
    });
    item.bloco.classList.remove("escrita-pendente", "escrita-ativa");
  }

// ===== BLOCO 55 de 60 · importância: complementar =====
// TÍTULO: terminar(tarefa): concluir uma escrita
// O QUE FAZ: Restaura todos os blocos da tarefa e tira a marca de 'em curso'.
  function terminar(tarefa) {
    tarefa.itens.forEach(restaurar);
    tarefa.dono.classList.remove("escrita-em-curso");
  }

// ===== BLOCO 56 de 60 · importância: complementar =====
// TÍTULO: cancelar(dono): cancelar escritas de um elemento
// O QUE FAZ: Remove das filas as tarefas desse elemento e restaura o texto.
  function cancelar(dono) {
    filas.forEach(function (fila, chave) {
      var manter = fila.filter(function (t) {
        if (t.dono !== dono) {
          return true;
        }
        terminar(t);
        return false;
      });
      if (manter.length) {
        filas.set(chave, manter);
      } else {
        filas.delete(chave);
      }
    });
  }

// ===== BLOCO 57 de 60 · importância: complementar =====
// TÍTULO: agendar(...): colocar uma escrita na fila
// O QUE FAZ: Prepara os blocos e os coloca na fila do canal. Não agenda se as animações estão desativadas.
  function agendar(dono, blocos, canal, limite, espera) {
    cancelar(dono);

    // Não escreve aos poucos se a pessoa prefere menos movimento ou a aba está escondida
    var semAnimacao = movimento.matches || document.documentElement.classList.contains("a11y-sem-animacao") || document.hidden;
    if (semAnimacao) {
      return;
    }

    var itens = Array.from(blocos).map(preparar);
    if (!itens.length) {
      return;
    }

    var fila = filas.get(canal) || [];
    fila.push({
      dono: dono,
      itens: itens,
      indice: 0,
      inicio: null,
      limite: limite,
      espera: espera || 0
    });
    filas.set(canal, fila);

    if (!quadro) {
      quadro = requestAnimationFrame(avancar);
    }
  }

// ===== BLOCO 58 de 60 · importância: complementar =====
// TÍTULO: avancar(agora): motor da animação
// O QUE FAZ: A cada quadro (requestAnimationFrame) calcula quantas letras mostrar, atualiza o texto e passa ao próximo bloco quando termina.
  function avancar(agora) {
    quadro = 0;
    filas.forEach(function (fila, chave) {
      // Descarta tarefas cujo elemento saiu da página, ficou oculto ou (se for <details>) foi fechado
      fila = fila.filter(function (t) {
        var ativa = t.dono.isConnected && !t.dono.hidden && (t.dono.tagName !== "DETAILS" || t.dono.open);
        if (ativa) {
          return true;
        }
        terminar(t);
        return false;
      });
      if (!fila.length) {
        filas.delete(chave);
        return;
      }
      filas.set(chave, fila);

      // Só a primeira tarefa da fila escreve; as outras esperam a vez
      var tarefa = fila[0];
      var item = tarefa.itens[tarefa.indice];
      if (tarefa.inicio === null) {
        tarefa.inicio = agora + tarefa.espera;
      }
      if (agora < tarefa.inicio) {
        return;
      }
      tarefa.dono.classList.add("escrita-em-curso");
      item.bloco.classList.add("escrita-ativa");

      // Quantas letras já devem aparecer, conforme o tempo que passou
      var duracao = Math.min(tarefa.limite, item.total * 19);
      var progresso = (agora - tarefa.inicio) / Math.max(1, duracao);
      var quantidade = Math.min(item.total, Math.floor(progresso * item.total));

      // Atualiza o texto de cada peça do bloco
      item.partes.forEach(function (p) {
        var n = Math.max(0, Math.min(p.caracteres.length, quantidade - p.inicio));
        if (n === p.ultimo) {
          return;
        }
        p.ultimo = n;
        p.visivel.data = p.caracteres.slice(0, n).join("");
        p.restante.textContent = p.caracteres.slice(n).join("");
      });

      // Terminou este bloco: restaura o HTML e passa para o próximo (ou encerra a tarefa)
      if (quantidade === item.total) {
        restaurar(item);
        tarefa.indice++;
        if (tarefa.indice === tarefa.itens.length) {
          tarefa.dono.classList.remove("escrita-em-curso");
          fila.shift();
          if (!fila.length) {
            filas.delete(chave);
          }
        } else {
          tarefa.inicio = agora + 120;
        }
      }
    });

    // Se ainda há trabalho, pede o próximo quadro
    if (filas.size) {
      quadro = requestAnimationFrame(avancar);
    }
  }

// ===== BLOCO 59 de 60 · importância: complementar =====
// TÍTULO: concluirTudo(): terminar tudo de uma vez
// O QUE FAZ: Cancela o quadro de animação e conclui todas as tarefas da fila.
  function concluirTudo() {
    cancelAnimationFrame(quadro);
    quadro = 0;
    filas.forEach(function (fila) {
      fila.forEach(terminar);
    });
    filas.clear();
  }

  /* ---------- 3. EXECUÇÃO ---------- */

  // ----- Abas de texto (<details class="texto-projeto">) -----
  document.querySelectorAll(".texto-projeto").forEach(function (aba) {
// ===== BLOCO 60 de 60 · importância: complementar =====
// TÍTULO: alternar(): abrir ou fechar uma aba de texto
// O QUE FAZ: Ao abrir a aba, escreve seus parágrafos aos poucos; ao fechar, cancela a escrita.
    function alternar() {
      cancelar(aba);
      if (aba.open) {
        agendar(aba, aba.querySelectorAll(".texto-projeto-conteudo > p"), aba, 2600, 120);
      }
    }

    aba.addEventListener("toggle", alternar);
    if (aba.open) {
      alternar();
    }
  });

  // ----- Jogo: cartões de fatos e tela de vitória -----

  if (resumo) {
    new MutationObserver(function (registros) {
      registros.forEach(function (registro) {
        registro.removedNodes.forEach(cancelar);
        registro.addedNodes.forEach(function (card) {
          if (card.nodeType === 1 && card.classList.contains("fato-atualizado")) {
            agendar(card, card.querySelectorAll(".fato-valor, .fato-detalhe"), "jogo", 400);
          }
        });
      });
    }).observe(resumo, { childList: true });
  }

  if (vitoria) {
    new MutationObserver(function () {
      cancelar(vitoria);
      if (!vitoria.hidden) {
        agendar(vitoria, vitoria.querySelectorAll(":scope > h4, :scope > p, :scope > h5, :scope > ul > li"), "jogo", 2400, 250);
      }
    }).observe(vitoria, { attributes: true, attributeFilter: ["hidden"] });
  }

  // ----- Eventos que interrompem ou terminam a escrita -----
  document.addEventListener("focusin", function (evento) {
    if (!evento.target.closest("a")) {
      return;
    }
    filas.forEach(function (fila) {
      fila.slice().forEach(function (t) {
        if (t.dono.contains(evento.target)) {
          cancelar(t.dono);
        }
      });
    });
  });

  movimento.addEventListener("change", function () {
    if (movimento.matches) {
      concluirTudo();
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      concluirTudo();
    }
  });

  window.addEventListener("pagehide", concluirTudo);
  document.addEventListener("acessibilidade-alterada", concluirTudo);

})();
