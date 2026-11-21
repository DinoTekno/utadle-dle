// ===== BLOCO 44 de 60 · importância: importante =====
// TÍTULO: Painel de acessibilidade (programa)
// O QUE FAZ: Lê preferências salvas, cria o botão e o painel (dialog), liga tamanho do texto, contraste, animações e voz, e observa o jogo para ler resultados.
(function () {
  'use strict';

  /* ---------- 1. DADOS ---------- */

  // Preferências padrão e preferências em uso
  var padrao = { tamanho: '100', contraste: false, movimento: false, audio: false };
  var op = Object.assign({}, padrao);

  // A leitura em voz alta só existe em navegadores que oferecem esse recurso
  var suporta = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  var sessao = 0;

  /* ---------- 2.  ---------- */

// ===== BLOCO 45 de 60 · importância: importante =====
// TÍTULO: campo(id): atalho para os controles do painel
// O QUE FAZ: campo('tamanho') busca o elemento de id 'a11y-tamanho'.
  var campo = function (id) {
    return document.getElementById('a11y-' + id);
  };

// ===== BLOCO 46 de 60 · importância: importante =====
// TÍTULO: aplicar(): aplicar e salvar preferências
// O QUE FAZ: Muda o tamanho da fonte e as classes no <html>, atualiza os controles, avisa os outros scripts e salva no localStorage.
  function aplicar() {
    document.documentElement.style.fontSize = op.tamanho + '%';
    document.documentElement.classList.toggle('a11y-contraste', !!op.contraste);
    document.documentElement.classList.toggle('a11y-sem-animacao', !!op.movimento);

    // Atualiza os controles do painel para refletir as preferências
    campo('tamanho').value = op.tamanho;
    ['contraste', 'movimento', 'audio'].forEach(function (id) {
      campo(id).checked = !!op[id];
    });

    // Avisa os outros scripts (ex.: escrita.js) e salva no navegador
    document.dispatchEvent(new Event('acessibilidade-alterada'));
    try {
      localStorage.setItem('elas-acessibilidade', JSON.stringify(op));
    } catch (_) {}
  }

// ===== BLOCO 47 de 60 · importância: importante =====
// TÍTULO: parar(): parar a leitura em voz alta
// O QUE FAZ: Invalida a leitura atual e cancela a fala do navegador.
  function parar() {
    sessao++;
    if (suporta) {
      window.speechSynthesis.cancel();
    }
  }

// ===== BLOCO 48 de 60 · importância: importante =====
// TÍTULO: falar(texto): ler em voz alta
// O QUE FAZ: Divide o texto em frases curtas e fala uma por vez com voz pt-BR, avançando quando cada uma termina.
  function falar(texto) {
    if (!suporta) {
      return;
    }
    parar();
    var atual = sessao;

    // Quebra o texto em frases
    var partes = texto.match(/[^.!?\n]+[.!?\n]*/g) || [];

    // Frases curtas evitam que o navegador interrompa uma leitura longa.
    var fila = partes.flatMap(function (frase) {
      return frase.match(/.{1,220}(?:\s|$)|.{1,220}/g) || [];
    });

// ===== BLOCO 49 de 60 · importância: importante =====
// TÍTULO: proxima(): falar a próxima frase da fila
// O QUE FAZ: Tira a primeira frase da fila e a fala; ao terminar chama a si mesma, até acabar ou ser cancelada.
    function proxima() {
      // Se a pessoa mandou parar (ou começou outra leitura), abandona esta
      if (atual !== sessao) {
        return;
      }
      if (!fila.length) {
        campo('status').textContent = 'Leitura concluída.';
        return;
      }

      var voz = new SpeechSynthesisUtterance(fila.shift());
      voz.lang = 'pt-BR';
      voz.rate = 0.95;
      var brasileira = window.speechSynthesis.getVoices().find(function (v) {
        return v.lang === 'pt-BR';
      });
      if (brasileira) {
        voz.voice = brasileira;
      }
      voz.onend = proxima;
      voz.onerror = function () {
        if (atual === sessao) {
          campo('status').textContent = 'Não foi possível continuar a leitura. Tente novamente.';
        }
      };
      window.speechSynthesis.speak(voz);
    }

    campo('status').textContent = 'Lendo em voz alta…';
    proxima();
  }

// ===== BLOCO 50 de 60 · importância: importante =====
// TÍTULO: textoVisivel(elemento): extrair só o texto visível
// O QUE FAZ: Copia o elemento, remove o que está oculto, troca imagens pelo texto alternativo e junta tudo para a leitura.
  function textoVisivel(elemento) {
    if (!elemento) {
      return '';
    }

    // Trabalha numa cópia, para não mexer na página de verdade
    var clone = elemento.cloneNode(true);

    // Remove o que está oculto
    clone.querySelectorAll('[hidden], [aria-hidden="true"], script, style').forEach(function (el) {
      el.remove();
    });

    // Em abas fechadas (<details>), mantém só o título
    clone.querySelectorAll('details:not([open])').forEach(function (el) {
      Array.from(el.children).forEach(function (filho) {
        if (filho.tagName !== 'SUMMARY') {
          filho.remove();
        }
      });
    });

    // Troca imagens pelo texto alternativo
    clone.querySelectorAll('img[alt]').forEach(function (el) {
      el.replaceWith(el.alt + ' ');
    });

    // Põe uma quebra de linha depois de cada parágrafo, título ou item
    clone.querySelectorAll('p,h1,h2,h3,h4,li,dt,dd,summary').forEach(function (el) {
      el.append('\n');
    });

    return clone.textContent.replace(/[ \t]+/g, ' ').trim();
  }

  /* ---------- 3. EXECUÇÃO ---------- */

  // Lê as preferências salvas pela pessoa no navegador
  try {
    Object.assign(op, JSON.parse(localStorage.getItem('elas-acessibilidade') || '{}'));
  } catch (_) {}
  if (!['100', '115', '130', '150'].includes(String(op.tamanho))) {
    op.tamanho = '100';
  }

  // Botão que abre o painel
  var botao = document.createElement('button');
  botao.className = 'a11y-abrir';
  botao.type = 'button';
  botao.textContent = 'Acessibilidade';
  botao.setAttribute('aria-haspopup', 'dialog');
  botao.setAttribute('aria-controls', 'a11y-painel');

  // O painel em si (uma janela <dialog>) e o HTML que fica dentro dele
  var painel = document.createElement('dialog');
  painel.id = 'a11y-painel';
  painel.setAttribute('aria-labelledby', 'a11y-titulo');
  painel.innerHTML =
    '<div class="a11y-cabecalho">' +
      '<h2 id="a11y-titulo">Acessibilidade</h2>' +
      '<button type="button" id="a11y-fechar" aria-label="Fechar acessibilidade">Fechar</button>' +
    '</div>' +
    '<p>Ajuste a leitura do site. Suas preferências ficam salvas neste navegador.</p>' +
    '<label for="a11y-tamanho">Tamanho do texto</label>' +
    '<select id="a11y-tamanho">' +
      '<option value="100">Padrão</option>' +
      '<option value="115">Ampliado (115%)</option>' +
      '<option value="130">Grande (130%)</option>' +
      '<option value="150">Muito grande (150%)</option>' +
    '</select>' +
    '<label class="a11y-opcao"><input type="checkbox" id="a11y-contraste"> Alto contraste</label>' +
    '<label class="a11y-opcao"><input type="checkbox" id="a11y-movimento"> Desativar animações e escrita gradual</label>' +
    '<h3>Leitura em voz alta</h3>' +
    '<p>Ouça o conteúdo visível da página. Abra uma história ou aba antes de iniciar a leitura. A voz depende do navegador e do dispositivo.</p>' +
    '<label class="a11y-opcao"><input type="checkbox" id="a11y-audio"> Ouvir os resultados e as novas dicas do jogo</label>' +
    '<div class="a11y-acoes">' +
      '<button type="button" id="a11y-ler">Ouvir página</button>' +
      '<button type="button" id="a11y-parar">Parar leitura</button>' +
    '</div>' +
    '<p id="a11y-status" role="status"></p>' +
    '<button type="button" id="a11y-restaurar">Restaurar ajustes</button>';
  document.body.append(botao, painel);

  // ----- Ligações entre os controles do painel e as  acima -----
  botao.addEventListener('click', function () {
    painel.showModal();
    campo('fechar').focus();
  });

  campo('fechar').addEventListener('click', function () {
    painel.close();
  });

  painel.addEventListener('close', function () {
    botao.focus();
  });

  ['tamanho', 'contraste', 'movimento', 'audio'].forEach(function (id) {
    campo(id).addEventListener('change', function () {
      op[id] = id === 'tamanho' ? this.value : this.checked;
      if (id === 'audio' && !op.audio) {
        parar();
      }
      aplicar();
    });
  });

  campo('ler').addEventListener('click', function () {
    falar(textoVisivel(document.querySelector('main')));
  });

  campo('parar').addEventListener('click', function () {
    parar();
    campo('status').textContent = 'Leitura interrompida.';
  });

  campo('restaurar').addEventListener('click', function () {
    parar();
    op = Object.assign({}, padrao);
    aplicar();
    campo('status').textContent = 'Ajustes restaurados.';
  });

  if (!suporta) {
    ['ler', 'parar', 'audio'].forEach(function (id) {
      campo(id).disabled = true;
    });
    campo('status').textContent = 'Este navegador não oferece leitura em voz alta. Você pode usar o leitor de tela do dispositivo.';
  }

  // No jogo: quando o resultado muda, lê em voz alta (se a opção estiver ligada)
  var status = document.getElementById('status');
  if (status) {
    new MutationObserver(function () {
      if (!op.audio || !suporta) {
        return;
      }
      var extras = Array.from(document.querySelectorAll('.carta-dica.revelada')).map(textoVisivel).join('. ');
      var vitoria = document.getElementById('vitoria');
      var textoVitoria = '';
      if (vitoria && !vitoria.hidden) {
        textoVitoria = '. ' + textoVisivel(vitoria);
      }
      falar(status.textContent + '. ' + extras + textoVitoria);
    }).observe(status, { childList: true, characterData: true, subtree: true });
  }

  window.addEventListener('pagehide', parar);
  aplicar();

})();
