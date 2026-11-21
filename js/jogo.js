// ===== BLOCO 24 de 60 · importância: essencial =====
// TÍTULO: Lógica do jogo (programa inteiro)
// O QUE FAZ: Todo o jogo fica dentro desta função que roda sozinha. Declara as variáveis de estado (base, alvo, tentativas, venceu...) e, no fim, chama iniciar().
/* Lógica do jogo. Não contém nenhum dado de anime: tudo vem de ANIMES. */
(function () {
  "use strict";

  /* ---------- 1. DADOS ---------- */

  var base = [];
  var alvo = null;
  var tentativas = [];
  var venceu = false;
  var rodadaFinalizada = false;
  var pontuacao = { acertos: 0, tentativas: 0, desistencias: 0 };
  var CHAVE_PLACAR = "dle-placar-jogo-v1";
  var ativo = -1;
  var opcoes = [];
  var animacaoErro = null;
  var numeroPartida = 0;
  var fatosRevelados = [];
  var dicasReveladas = { ano: null, studio: null };
  var revelando = false;
  var INTERVALO_QUADRADO = 350;
  var DURACAO_QUADRADO = 500;
  var busca = $("busca");
  var lista = $("sugestoes");
  var status = $("status");

 

  // Textos e símbolos de cada resultado (a cor nunca é o único indicador)
  var TEXTO = {
    ok: "Correto",
    erro: "Diferente",
    perto: "Parcial",
    antes: "Diferente, o ano certo veio antes",
    depois: "Diferente, o ano certo veio depois",
    indisp: "Informação indisponível"
  };
  var SIMBOLO = { ok: "✓", erro: "×", perto: "≈", antes: "↓", depois: "↑", indisp: "–" };
  var CLASSE = {
    ok: "ok",
    erro: "erro",
    perto: "perto",
    antes: "erro antes",
    depois: "erro depois",
    indisp: "indisp"
  };
  var CABECALHOS = [
    ["", "Anime"],
    ["🕓", "Ano"],
    ["🎬", "Estúdio"],
    ["⭐", "Rating"],
    ["🎭", "Gêneros"],
    ["📺", "Episódios"]
  ];

  /* ---------- 2.  ---------- */

  // ----- 2.1 Utilitários -----

// ===== BLOCO 12 de 60 · importância: essencial =====
// TÍTULO: normalizar(t): limpar texto para comparar
// O QUE FAZ: Remove acentos, passa para minúsculas e tira espaços das pontas: 'Ângela' vira 'angela'. Aceita null.
  // Remove acentos e maiúsculas: "Ângela" -> "angela"
  function normalizar(t) {
    var texto = String(t == null ? "" : t);
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

// ===== BLOCO 13 de 60 · importância: essencial =====
// TÍTULO: temValor(v): o campo tem conteúdo de verdade?
// O QUE FAZ: true para lista não vazia, número válido ou texto não vazio; false para null, vazio ou NaN.
  // Diz se um campo tem conteúdo de verdade
  function temValor(v) {
    if (Array.isArray(v)) {
      return v.length > 0;
    }
    if (typeof v === "number") {
      return isFinite(v);
    }
    return typeof v === "string" && v.trim() !== "";
  }

// ===== BLOCO 14 de 60 · importância: essencial =====
// TÍTULO: comoLista(v): transformar qualquer valor em lista
// O QUE FAZ: Lista continua lista (sem itens vazios); valor único vira lista de 1 item; vazio vira lista vazia.
  function comoLista(v) {
    if (Array.isArray(v)) {
      return v.filter(temValor);
    }
    return temValor(v) ? [v] : [];
  }

// ===== BLOCO 15 de 60 · importância: essencial =====
// TÍTULO: el(tag, classe, texto): criar elemento HTML
// O QUE FAZ: Mesma ideia do bloco 5: cria a tag com classe e texto de forma segura.
  // Cria um elemento HTML com segurança (usa textContent, nunca innerHTML)
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

// ===== BLOCO 16 de 60 · importância: essencial =====
// TÍTULO: $(id): atalho para buscar por id
// O QUE FAZ: $('busca') é o mesmo que document.getElementById('busca'), só mais curto.
  function $(id) {
    return document.getElementById(id);
  }

// ===== BLOCO 29 de 60 · importância: importante =====
// TÍTULO: reduzirMovimento(): animações desligadas?
// O QUE FAZ: Mesma verificação do bloco 9.
  function reduzirMovimento() {
    var usuarioDesativou = document.documentElement.classList.contains("a11y-sem-animacao");
    var sistemaPede = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return usuarioDesativou || sistemaPede;
  }

  // ----- 2.2 Validação da base -----

// ===== BLOCO 23 de 60 · importância: importante =====
// TÍTULO: validarBase(lista): validar a base de dados
// O QUE FAZ: Separa registros válidos dos problemáticos (sem id, sem nome, id repetido, ano que não é número) e devolve também a lista de avisos.
  // Separa registros válidos dos problemáticos e devolve avisos
  function validarBase(lista) {
    var ids = {};
    var validas = [];
    var avisos = [];

    if (!Array.isArray(lista)) {
      return { validas: [], avisos: ["A base não é uma lista."] };
    }

    lista.forEach(function (m, i) {
      // "rot" é o nome do registro nas mensagens de aviso: "Registro 3 (Ada Lovelace)"
      var nomeEntreParenteses = m && m.nome ? " (" + m.nome + ")" : "";
      var rot = "Registro " + (i + 1) + nomeEntreParenteses;

      if (!m || typeof m !== "object") {
        avisos.push(rot + ": não é um objeto.");
        return;
      }
      if (!temValor(m.id) || typeof m.id !== "string") {
        avisos.push(rot + ": falta o campo obrigatório 'id'.");
        return;
      }
      if (!temValor(m.nome)) {
        avisos.push(rot + ": falta o campo obrigatório 'nome'.");
        return;
      }
      if (ids[m.id]) {
        avisos.push(rot + ": 'id' duplicado (" + m.id + ").");
        return;
      }
      if (m.anoLancamento != null && typeof m.anoLancamento !== "number") {
        avisos.push(rot + ": 'anoLancamento' deve ser número; o campo foi ignorado.");
        m = Object.assign({}, m, { anoLancamento: null });
      }

      ids[m.id] = true;
      validas.push(m);
    });

    return { validas: validas, avisos: avisos };
  }

  // ----- 2.3 Comparação -----

// ===== BLOCO 17 de 60 · importância: essencial =====
// TÍTULO: compararAno(t, a): comparar anos
// O QUE FAZ: Devolve 'ok', 'depois' (o ano certo é maior), 'antes' (é menor) ou 'indisp' se faltar dado.
  function compararAno(t, a) {
    if (!temValor(t) || !temValor(a)) {
      return "indisp";
    }
    if (t === a) {
      return "ok";
    }
    return a > t ? "depois" : "antes";
  }

// ===== BLOCO 18 de 60 · importância: essencial =====
// TÍTULO: compararTexto(t, a): comparar textos
// O QUE FAZ: 'ok' se iguais ignorando acento e maiúscula, 'erro' se diferentes, 'indisp' se faltar dado.
  function compararTexto(t, a) {
    if (!temValor(t) || !temValor(a)) {
      return "indisp";
    }
    return normalizar(t) === normalizar(a) ? "ok" : "erro";
  }

// ===== BLOCO 19 de 60 · importância: essencial =====
// TÍTULO: compararLista(t, a): comparar listas
// O QUE FAZ: 'ok' se idênticas, 'perto' se há ao menos 1 item em comum, 'erro' se nenhum, 'indisp' se faltar dado.
  // Listas: ✓ se idênticas, ≈ se houver ao menos um item em comum, × se nenhum
  function compararLista(t, a) {
    var T = comoLista(t).map(normalizar);
    var A = comoLista(a).map(normalizar);
    if (!T.length || !A.length) {
      return "indisp";
    }

    var comum = T.filter(function (x) {
      return A.indexOf(x) !== -1;
    }).length;
    if (comum === 0) {
      return "erro";
    }

    var identicas = comum === T.length && comum === A.length;
    return identicas ? "ok" : "perto";
  }

// ===== BLOCO 20 de 60 · importância: essencial =====
// TÍTULO: compararTentativa(t, a): comparar um palpite com a resposta
// O QUE FAZ: Compara os 5 campos (ano, país, região, área, tipo) e devolve uma lista com o valor e o resultado de cada um.
  function compararTentativa(t, a) {
    return [
      {
        icone: "🕓",
        rotulo: "Ano",
        valor: t.anoLancamento,
        estado: compararAno(t.anoLancamento, a.anoLancamento)
      },
      {
        icone: "🎬",
        rotulo: "Estúdio",
        valor: t.studio,
        estado: compararTexto(t.studio, a.studio)
      },
      {
        icone: "⭐",
        rotulo: "Rating",
        valor: t.faixaRating,
        estado: compararTexto(t.faixaRating, a.faixaRating)
      },
      {
        icone: "🎭",
        rotulo: "Gêneros",
        valor: comoLista(t.generos).join(", "),
        itens: comoLista(t.generos),
        estado: compararLista(t.generos, a.generos)
      },
      {
        icone: "📺",
        rotulo: "Episódios",
        valor: t.numeroEpisodios,
        estado: compararTexto(t.numeroEpisodios, a.numeroEpisodios)
      }
    ];
  }

  // ----- 2.4 Sugestões (combobox acessível) -----

// ===== BLOCO 21 de 60 · importância: importante =====
// TÍTULO: iniciais(nome): iniciais do nome
// O QUE FAZ: 'Ada Lovelace' vira 'AL'. Usada quando a foto não existe ou falha.
  function iniciais(nome) {
    return nome
      .split(/\s+/)
      .slice(0, 2)
      .map(function (p) {
        return p.charAt(0);
      })
      .join("")
      .toUpperCase();
  }

// ===== BLOCO 26 de 60 · importância: importante =====
// TÍTULO: fecharLista(): fechar a lista de sugestões
// O QUE FAZ: Esconde a lista e atualiza os atributos de acessibilidade (aria-expanded).
  function fecharLista() {
    lista.hidden = true;
    busca.setAttribute("aria-expanded", "false");
    busca.removeAttribute("aria-activedescendant");
    ativo = -1;
  }

// ===== BLOCO 27 de 60 · importância: importante =====
// TÍTULO: marcarAtivo(i): destacar a opção escolhida com as setas
// O QUE FAZ: Marca a opção i como ativa, avisa o leitor de tela e rola a lista até ela.
  function marcarAtivo(i) {
    ativo = i;
    Array.prototype.forEach.call(lista.children, function (li, k) {
      li.setAttribute("aria-selected", k === i ? "true" : "false");
      li.classList.toggle("ativa", k === i);
    });
    if (i >= 0) {
      busca.setAttribute("aria-activedescendant", lista.children[i].id);
      lista.children[i].scrollIntoView({ block: "nearest" });
    } else {
      busca.removeAttribute("aria-activedescendant");
    }
  }

// ===== BLOCO 28 de 60 · importância: essencial =====
// TÍTULO: abrirLista(): abrir a lista de sugestões
// O QUE FAZ: Filtra os nomes que contêm o que foi digitado, tira os já tentados, ordena, limita a 8 e monta a lista com foto ou iniciais. Clicar escolhe.
  function abrirLista() {
    if (revelando || rodadaFinalizada) {
      return;
    }

    // Filtra os nomes: que contêm o digitado e que ainda não foram tentados
    var q = normalizar(busca.value);
    var jaFeitas = tentativas.map(function (t) {
      return t.id;
    });
    opcoes = base
      .filter(function (m) {
        var naoTentada = jaFeitas.indexOf(m.id) === -1;
        var combinaComBusca = normalizar(m.nome).indexOf(q) !== -1;
        return naoTentada && combinaComBusca;
      })
      .sort(function (a, b) {
        return a.nome.localeCompare(b.nome, "pt-BR");
      })
      .slice(0, 8);

    // Monta a lista na tela
    lista.textContent = "";
    if (!opcoes.length) {
      var vazio = el("li", "sem-resultado", "Nenhum nome encontrado.");
      vazio.setAttribute("role", "presentation");
      lista.appendChild(vazio);
    }
    opcoes.forEach(function (m, i) {
      var li = el("li", "opcao");
      li.id = "opt-" + i;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", "false");

      var capa = el("span", "foto-wrapper capa-wrapper");
      var inicial = el("span", "ini", iniciais(m.nome));
      inicial.setAttribute("aria-hidden", "true");
      capa.appendChild(inicial);
      var foto = el("img", "foto");
      foto.alt = "";
      capa.appendChild(foto);
      li.appendChild(capa);
      window.carregarImagem(m.malId, foto);
      li.appendChild(el("span", null, m.nome));

      li.addEventListener("mousedown", function (e) {
        e.preventDefault();
        escolher(m);
      });
      lista.appendChild(li);
    });

    lista.hidden = false;
    busca.setAttribute("aria-expanded", "true");
    ativo = -1;
  }

  // ----- 2.5 Desenho da tela -----

// ===== BLOCO 22 de 60 · importância: importante =====
// TÍTULO: anunciar(t): avisar leitores de tela
// O QUE FAZ: Limpa e reescreve o texto de #status para o leitor de tela anunciar a mudança.
  function anunciar(t) {
    status.textContent = "";
    setTimeout(function () {
      status.textContent = t;
    }, 30);
  }

  function atualizarPlacar() {
    $("placar-acertos").textContent = String(pontuacao.acertos);
    $("placar-tentativas").textContent = String(pontuacao.tentativas);
    $("placar-desistencias").textContent = String(pontuacao.desistencias);
  }

  function avisarFalhaPlacar(mensagem, erro) {
    console.error("[Placar] " + mensagem, erro);
    var aviso = $("aviso-dados");
    aviso.textContent = aviso.textContent ? aviso.textContent + " " + mensagem : mensagem;
    aviso.hidden = false;
  }

  function carregarPlacar() {
    var salvo;
    try {
      salvo = window.localStorage.getItem(CHAVE_PLACAR);
    } catch (erro) {
      avisarFalhaPlacar("Não foi possível ler as estatísticas salvas neste navegador.", erro);
      return;
    }
    if (salvo == null) {
      return;
    }

    var dados;
    try {
      dados = JSON.parse(salvo);
    } catch (erro) {
      avisarFalhaPlacar("As estatísticas salvas estão inválidas; o placar começará do zero.", erro);
      return;
    }
    var contadorValido = function (valor) {
      return typeof valor === "number" && Number.isSafeInteger(valor) && valor >= 0;
    };
    if (!dados || !contadorValido(dados.acertos) ||
        !contadorValido(dados.tentativas) || !contadorValido(dados.desistencias)) {
      avisarFalhaPlacar("As estatísticas salvas estão inválidas; o placar começará do zero.", dados);
      return;
    }

    pontuacao = {
      acertos: dados.acertos,
      tentativas: dados.tentativas,
      desistencias: dados.desistencias
    };
  }

  function salvarPlacar() {
    try {
      window.localStorage.setItem(CHAVE_PLACAR, JSON.stringify(pontuacao));
    } catch (erro) {
      avisarFalhaPlacar("Não foi possível salvar as estatísticas neste navegador.", erro);
    }
  }

// ===== BLOCO 25 de 60 · importância: importante =====
// TÍTULO: atualizarCartasDicas(reiniciar): cartas de dicas
// O QUE FAZ: Desenha dicas de ano (2 erros), estúdio (3 erros) e primeira letra (5 erros).
  function atualizarCartasDicas(reiniciar) {
    var caixa = $("cartas-dicas");
    if (!caixa || !alvo) {
      return;
    }
    if (reiniciar) {
      caixa.textContent = "";
    }

    // Quantos palpites errados já foram dados
    var erros = tentativas.filter(function (t) {
      return t.id !== alvo.id;
    }).length;
    dicasReveladas.ano = erros >= 2 ? alvo.anoLancamento : null;
    dicasReveladas.studio = erros >= 3 ? alvo.studio : null;

    // Cada dica: [erros necessários, título, valor revelado]
    var dicas = [
      [2, "Ano de lançamento", String(alvo.anoLancamento)],
      [3, "Estúdio", alvo.studio],
      [5, "Primeira letra", Array.from(alvo.nome)[0]]
    ];

    dicas.forEach(function (d, i) {
      var aberta = erros >= d[0];
      var anterior = caixa.children[i];

      // Se a carta já está no estado certo, não precisa redesenhar
      if (anterior && anterior.getAttribute("data-aberta") === String(aberta)) {
        return;
      }

      var carta = el("div", "carta-dica" + (aberta ? " revelada" : ""));
      carta.setAttribute("data-aberta", String(aberta));

      // Verso da carta (fechada): "?", título e quantos erros faltam
      var verso = el("div", "dica-verso");
      verso.appendChild(el("b", null, "?"));
      verso.appendChild(el("strong", null, d[1]));
      verso.appendChild(el("span", null, "Após " + d[0] + " erros"));
      verso.setAttribute("aria-hidden", aberta ? "true" : "false");
      carta.appendChild(verso);

      // Frente da carta (aberta): título e valor da dica
      var frente = el("div", "dica-frente");
      frente.setAttribute("aria-hidden", aberta ? "false" : "true");
      if (aberta) {
        frente.appendChild(el("span", null, d[1]));
        frente.appendChild(el("strong", null, d[2]));
        frente.appendChild(el("small", null, "Dica revelada"));
      }
      carta.appendChild(frente);

      if (anterior) {
        caixa.replaceChild(carta, anterior);
      } else {
        caixa.appendChild(carta);
      }
    });
    if (!reiniciar) {
      desenharResumo(fatosRevelados);
    }
  }

// ===== BLOCO 33 de 60 · importância: importante =====
// TÍTULO: fotoDe(m): capa do anime ou iniciais
// O QUE FAZ: Devolve a capa do anime; mantém as iniciais visíveis enquanto ela carrega ou se falhar.
  function fotoDe(m) {
    var capa = el("span", "foto-wrapper capa-wrapper");
    var inicial = el("span", "ini", iniciais(m.nome));
    inicial.setAttribute("aria-hidden", "true");
    capa.appendChild(inicial);
    var img = el("img", "foto");
    img.alt = "";
    capa.appendChild(img);
    if (typeof window.carregarImagem === "function" && m.malId) {
      window.carregarImagem(m.malId, img);
    }
    return capa;
  }

// ===== BLOCO 34 de 60 · importância: importante =====
// TÍTULO: resumirFatos(comparacoes): resumo do que já se descobriu
// O QUE FAZ: Deduz por campo e inclui apenas valores de dicas extras já reveladas.
  // Usa comparações e dicas reveladas; nunca consulta diretamente os dados ocultos do alvo.
  function resumirFatos(comparacoes) {
    var rotulos = ["Ano", "Estúdio", "Rating", "Gêneros", "Episódios"];
    var fatos = rotulos.map(function (rotulo) {
      return {
        rotulo: rotulo,
        confirmado: null,
        descartados: [],
        parciais: [],
        minimo: null,
        maximo: null
      };
    });

// ===== BLOCO 35 de 60 · importância: importante =====
// TÍTULO: adicionarUnico(lista, valor): adicionar sem repetir
// O QUE FAZ: Põe o valor na lista só se (ignorando acento e maiúscula) ainda não estiver nela.
    function adicionarUnico(lista, valor) {
      var jaExiste = lista.some(function (item) {
        return normalizar(item) === normalizar(valor);
      });
      if (!jaExiste) {
        lista.push(valor);
      }
    }

    comparacoes.forEach(function (linha) {
      linha.forEach(function (c, i) {
        var fato = fatos[i];

        if (c.estado === "indisp") {
          return;
        }
        if (c.estado === "ok") {
          fato.confirmado = i === 3 ? c.itens.slice() : c.valor;
          return;
        }

        if (i === 0) {
          // Ano: as setas formam um intervalo (mínimo e máximo)
          if (c.estado === "depois") {
            var minimo = Math.floor(c.valor) + 1;
            fato.minimo = fato.minimo == null ? minimo : Math.max(fato.minimo, minimo);
          } else if (c.estado === "antes") {
            var maximo = Math.ceil(c.valor) - 1;
            fato.maximo = fato.maximo == null ? maximo : Math.min(fato.maximo, maximo);
          }
        } else if (i === 3 && c.estado === "perto") {
          c.itens.forEach(function (valor) {
            adicionarUnico(fato.parciais, valor);
          });
        } else if (c.estado === "erro") {
          // Outros campos: guarda o que foi descartado
          (i === 3 ? c.itens : (c.itens || [c.valor])).forEach(function (valor) {
            adicionarUnico(fato.descartados, valor);
          });
        } else if (c.estado === "perto") {
          // ...ou o que bateu só em parte
          adicionarUnico(fato.parciais, c.valor);
        }
      });
    });

    if (dicasReveladas.ano != null) {
      fatos[0].confirmado = dicasReveladas.ano;
    }
    if (dicasReveladas.studio) {
      fatos[1].confirmado = dicasReveladas.studio;
    }

    return fatos;
  }

// ===== BLOCO 36 de 60 · importância: importante =====
// TÍTULO: desenharResumo(comparacoes, indice): cartões de fatos
// O QUE FAZ: Cria os 5 cartões (Ano, País, Região, Área, Tipo) com o que se sabe; pode atualizar só um cartão e animá-lo.
  function desenharResumo(comparacoes, indice) {
    var resumo = $("resumo-fatos");
    if (indice == null) {
      resumo.textContent = "";
    }

    resumirFatos(comparacoes).forEach(function (fato, i) {
      // Quando "indice" é informado, atualiza só o cartão desse campo
      if (indice != null && i !== indice) {
        return;
      }

      var texto = "Ainda não descoberto";
      var detalhe = [];
      var classe = "fato";

      if (fato.confirmado != null) {
        // Campo confirmado
        texto = Array.isArray(fato.confirmado) ? fato.confirmado.join(", ") : String(fato.confirmado);
        detalhe.push("✓ Confirmado");
        classe += " fato-confirmado";
      } else if (i === 3) {
        var generosProvaveis = fato.parciais.filter(function (genero) {
          return !fato.descartados.some(function (descartado) {
            return normalizar(descartado) === normalizar(genero);
          });
        });
        if (generosProvaveis.length) {
          texto = generosProvaveis.join(", ");
          detalhe.push("Gêneros possíveis; sem repetir nem incluir os já descartados.");
          classe += " fato-parcial";
        } else if (fato.parciais.length) {
          detalhe.push("Nenhum gênero provável restante.");
        } else if (fato.descartados.length) {
          detalhe.push("As tentativas eliminadas não confirmam gêneros em comum.");
        } else {
          detalhe.push(tentativas.length ? "Sem pistas suficientes" : "Aguardando palpites");
        }
      } else if (i === 0 && (fato.minimo != null || fato.maximo != null)) {
        // Ano: intervalo deduzido das setas
        classe += " fato-parcial";
        if (fato.minimo != null && fato.maximo != null) {
          if (fato.minimo === fato.maximo) {
            texto = String(fato.minimo);
          } else {
            texto = fato.minimo + "–" + fato.maximo;
          }
        } else if (fato.minimo != null) {
          texto = "A partir de " + fato.minimo;
        } else {
          texto = "Até " + fato.maximo;
        }
        detalhe.push("Intervalo deduzido das setas");
      } else {
        // Outros campos: correspondências parciais e itens descartados
        if (fato.parciais.length) {
          texto = "Correspondência parcial";
          classe += " fato-parcial";
          fato.parciais.forEach(function (grupo) {
            detalhe.push("Pelo menos uma destas: " + grupo + ".");
          });
        }
        if (fato.descartados.length) {
          var prefixo = i < 3 ? "Descartado: " : "Não inclui: ";
          detalhe.push(prefixo + fato.descartados.join("; ") + ".");
        }
        if (!detalhe.length) {
          detalhe.push(tentativas.length ? "Sem pistas suficientes" : "Aguardando palpites");
        }
      }

      // Monta o cartão do fato
      var card = el("div", classe + " motivo-" + ["ano", "studio", "rating", "generos", "episodios"][i]);
      card.appendChild(el("dt", "fato-rotulo", fato.rotulo));
      card.appendChild(el("dd", "fato-valor", texto));
      detalhe.forEach(function (linha) {
        card.appendChild(el("dd", "fato-detalhe", linha));
      });
      card.setAttribute("data-resumo", card.textContent);

      if (indice == null) {
        resumo.appendChild(card);
      } else if (resumo.children[i].getAttribute("data-resumo") !== card.textContent) {
        // Só troca (e anima) o cartão se o conteúdo mudou
        if (!reduzirMovimento()) {
          card.className += " fato-atualizado";
        }
        resumo.replaceChild(card, resumo.children[i]);
      }
    });
  }

// ===== BLOCO 37 de 60 · importância: essencial =====
// TÍTULO: desenharHistorico(concluir): tabela de tentativas
// O QUE FAZ: Monta a tabela com uma linha por palpite (a mais recente em cima), anima os quadrados em sequência e avisa quando os 5 foram revelados.
  // Desenha a tabela de quadrados: uma linha por tentativa, a mais recente em cima
  function desenharHistorico(concluir) {
    var comparacoes = tentativas.map(function (t) {
      return compararTentativa(t, alvo);
    });
    var h = $("historico");
    h.textContent = "";

    // Sem tentativas: mostra só a mensagem de vazio
    if (!tentativas.length) {
      desenharResumo([]);
      h.appendChild(el("p", "vazio", "Nenhuma tentativa ainda."));
      return;
    }

    var partida = numeroPartida;
    var linhaAtual = tentativas.length - 1;
    var revelados = 0;

// ===== BLOCO 38 de 60 · importância: essencial =====
// TÍTULO: acompanhar(td, c, i): esperar a revelação de um quadrado
// O QUE FAZ: Quando a animação do quadrado termina (ou passa um tempo de reserva), chama revelar().
    function acompanhar(td, c, i) {
      var pronto = false;

// ===== BLOCO 39 de 60 · importância: essencial =====
// TÍTULO: revelar(): revelar um quadrado
// O QUE FAZ: Roda uma vez por quadrado: grava a comparação, atualiza o cartão correspondente e conta; ao chegar a 5, chama 'concluir'.
      function revelar() {
        if (pronto || partida !== numeroPartida) {
          return;
        }
        pronto = true;
        fatosRevelados[linhaAtual][i] = c;
        desenharResumo(fatosRevelados, i);
        revelados++;
        if (revelados === 5 && concluir) {
          concluir();
        }
      }

      td.addEventListener("animationend", function (evento) {
        if (evento.target === td && evento.animationName === "virar") {
          revelar();
        }
      });

      // Reserva para animações desativadas/interrompidas ou abas em segundo plano.
      var espera = reduzirMovimento() ? 0 : (i + 1) * INTERVALO_QUADRADO + DURACAO_QUADRADO + 80;
      setTimeout(revelar, espera);
    }

    // Cabeçalho da tabela
    var tabela = el("table", "grade");
    var cab = el("thead");
    var trc = el("tr");
    tabela.appendChild(el("caption", "sr", "Tentativas e comparações com a resposta"));
    CABECALHOS.forEach(function (c) {
      var th = el("th");
      th.scope = "col";
      if (c[0]) {
        var icone = el("span", null, c[0]);
        th.appendChild(icone);
        icone.setAttribute("aria-hidden", "true");
      }
      th.appendChild(document.createTextNode(" " + c[1]));
      trc.appendChild(th);
    });
    cab.appendChild(trc);
    tabela.appendChild(cab);

    // Corpo da tabela: uma linha por tentativa (a mais recente primeiro)
    var corpo = el("tbody");
    tentativas.slice().reverse().forEach(function (t, linhaIdx) {
      var nova = linhaIdx === 0; // só a tentativa mais recente é animada

      // Primeira coluna: foto e nome da pessoa
      var tr = el("tr");
      var nome = el("th", "quad nome" + (nova ? " nova" : ""));
      nome.scope = "row";
      nome.style.setProperty("--i", 0);
      nome.style.animationDuration = DURACAO_QUADRADO + "ms";
      nome.appendChild(fotoDe(t));
      nome.appendChild(el("span", "sr", t.nome));
      nome.title = t.nome;
      tr.appendChild(nome);

      // Demais colunas: um quadrado por campo (ano, país, região, área, tipo)
      comparacoes[tentativas.length - 1 - linhaIdx].forEach(function (c, i) {
        var classes = "quad motivo-" + ["ano", "studio", "rating", "generos", "episodios"][i] + " " + CLASSE[c.estado] + (nova ? " nova" : "");
        var td = el("td", classes);
        td.style.setProperty("--i", i + 1); // ordem de aparição: define o atraso no CSS
        if (nova) {
          td.style.animationDelay = (i + 1) * INTERVALO_QUADRADO + "ms";
          td.style.animationDuration = DURACAO_QUADRADO + "ms";
          acompanhar(td, c, i);
        }
        td.appendChild(el("span", "valor", temValor(c.valor) ? c.valor : "?"));

        var sinal = el("span", "sinal", SIMBOLO[c.estado]);
        td.appendChild(sinal);
        sinal.setAttribute("aria-hidden", "true");

        td.appendChild(el("span", "sr", ". " + TEXTO[c.estado]));
        tr.appendChild(td);
      });

      corpo.appendChild(tr);
    });
    tabela.appendChild(corpo);

    var rolagem = el("div", "grade-rolagem");
    rolagem.appendChild(tabela);
    h.appendChild(rolagem);
  }

// ===== BLOCO 40 de 60 · importância: essencial =====
// TÍTULO: mostrarResultado(m, desistiu): resultado da rodada
// O QUE FAZ: Revela o anime, mostra os dados, esconde a desistência e libera uma nova partida.
  function mostrarResultado(m, desistiu) {
    var v = $("vitoria");
    v.textContent = "";
    v.hidden = false;
    v.classList.toggle("desistencia", Boolean(desistiu));

    // Selo, título, nome e textos sobre a pessoa
    var selo = el("span", "vitoria-selo", desistiu ? "↩" : "✓");
    selo.setAttribute("aria-hidden", "true");
    v.appendChild(selo);
    v.appendChild(el("h4", null, desistiu ? "Você desistiu. A resposta era:" : "Você acertou!"));

    // Capa + info lado a lado
    var capaWrap = el("div", "vitoria-capa-wrap");

    // Capa do anime
    var capaCont = el("div", "vitoria-capa capa-wrapper");
    var capaImg  = el("img");
    capaImg.alt  = m.nome;
    capaCont.appendChild(capaImg);
    capaWrap.appendChild(capaCont);
    if (typeof window.carregarImagem === "function" && m.malId) {
      window.carregarImagem(m.malId, capaImg);
    }

    // Info textual
    var capaInfo = el("div", "vitoria-info");
    var linkMal = el("a", "nome-resposta", m.nome);
    linkMal.href = "https://myanimelist.net/anime/" + m.malId;
    linkMal.target = "_blank";
    linkMal.rel = "noopener noreferrer";
    linkMal.title = "Ver " + m.nome + " no MyAnimeList";
    capaInfo.appendChild(linkMal);
    if (temValor(m.studio)) {
      capaInfo.appendChild(el("p", "vitoria-detalhe", "🎬 " + m.studio + "  ·  🕓 " + m.anoLancamento + "  ·  ⭐ " + m.faixaRating + "  ·  📺 " + m.numeroEpisodios));
    }
    if (temValor(m.pista)) {
      capaInfo.appendChild(el("p", null, m.pista));
    }
    capaWrap.appendChild(capaInfo);
    v.appendChild(capaWrap);

// ===== BLOCO 41 de 60 · importância: importante =====
// TÍTULO: links(titulo, itens, vazioMsg): lista de links
// O QUE FAZ: Cria título e lista de links seguros (só http/https, abrindo em nova aba) para fontes e anexos.
    function links(titulo, itens, vazioMsg) {
      // Aceita texto puro ou objeto { titulo, url }; só mantém links http/https
      var ok = (itens || [])
        .map(function (f) {
          return typeof f === "string" ? { titulo: f, url: f } : f;
        })
        .filter(function (f) {
          return f && /^https?:\/\//.test(f.url || "");
        });

      if (!ok.length) {
        if (vazioMsg) {
          v.appendChild(el("p", "nota", vazioMsg));
        }
        return;
      }

      v.appendChild(el("h5", null, titulo));
      var ul = el("ul");
      ok.forEach(function (f) {
        var li = el("li");
        var a = el("a", null, f.titulo || f.url);
        a.href = f.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        li.appendChild(a);
        ul.appendChild(li);
      });
      v.appendChild(ul);
    }

    // fontes e anexos não são campos de animes.js

    // Confete (20 pedacinhos), a não ser que as animações estejam desativadas
    if (!desistiu && !reduzirMovimento()) {
      var festa = el("div", "celebracao");
      festa.setAttribute("aria-hidden", "true");
      for (var i = 0; i < 20; i++) {
        var confete = el("span", "confete");
        confete.style.setProperty("--x", ((i * 37) % 100) + "%");
        confete.style.setProperty("--desvio", ((i % 5 - 2) * 24) + "px");
        confete.style.setProperty("--atraso", (i % 5 * .08) + "s");
        confete.style.setProperty("--giro", (i % 2 ? 260 : -220) + "deg");
        festa.appendChild(confete);
      }
      v.appendChild(festa);
    }

    // Libera o botão de nova partida e leva o foco e a rolagem até a vitória
    $("nova-partida").hidden = false;
    $("desistir").hidden = true;
    v.focus({ preventScroll: true });
    v.scrollIntoView({ behavior: reduzirMovimento() ? "instant" : "smooth", block: "start" });
  }

  // ----- 2.6 Jogada e nova partida -----

// ===== BLOCO 30 de 60 · importância: complementar =====
// TÍTULO: pararAnimacaoErro(): cancelar a tremida do campo
// O QUE FAZ: Se a animação de erro está rodando, cancela.
  function pararAnimacaoErro() {
    if (animacaoErro) {
      animacaoErro.cancel();
      animacaoErro = null;
    }
  }

// ===== BLOCO 31 de 60 · importância: complementar =====
// TÍTULO: animarErro(): tremida do campo ao errar
// O QUE FAZ: Balança a caixa de busca de um lado a outro (340 ms), a não ser que as animações estejam desativadas.
  function animarErro() {
    if (reduzirMovimento() || typeof busca.animate !== "function") {
      return;
    }
    var animacao = busca.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-4px)", offset: .2 },
        { transform: "translateX(4px)", offset: .4 },
        { transform: "translateX(-2px)", offset: .65 },
        { transform: "translateX(0)" }
      ],
      { duration: 340, easing: "ease-out" }
    );
    animacaoErro = animacao;
    animacao.onfinish = function () {
      if (animacaoErro === animacao) {
        animacaoErro = null;
      }
    };
  }

// ===== BLOCO 32 de 60 · importância: essencial =====
// TÍTULO: escolher(m): registrar um palpite
// O QUE FAZ: Guarda a tentativa, vê se é a resposta, trava o campo durante a revelação, desenha a tabela e depois mostra a vitória ou as dicas.
  function escolher(m) {
    var jaTentada = tentativas.some(function (t) {
      return t.id === m.id;
    });
    if (rodadaFinalizada || revelando || jaTentada) {
      return;
    }
    pararAnimacaoErro();

    // Registra o palpite e vê se acertou
    tentativas.push(m);
    fatosRevelados.push([]);
    busca.value = "";
    fecharLista();
    venceu = m.id === alvo.id;
    pontuacao.tentativas++;
    if (venceu) {
      pontuacao.acertos++;
      rodadaFinalizada = true;
    }
    atualizarPlacar();
    salvarPlacar();

    // Trava o campo enquanto os quadrados são revelados
    revelando = true;
    busca.readOnly = true;
    busca.disabled = venceu;
    $("desistir").disabled = true;
    $("historico").setAttribute("aria-busy", "true");
    if (!venceu) {
      animarErro();
    }

    // Desenha a tabela; quando terminar de revelar, mostra vitória ou dicas
    desenharHistorico(function () {
      revelando = false;
      busca.readOnly = false;
      $("historico").setAttribute("aria-busy", "false");
      if (venceu) {
        mostrarResultado(alvo, false);
        anunciar("Você acertou! A resposta é " + m.nome + ".");
      } else {
        $("desistir").disabled = false;
        atualizarCartasDicas(false);
        anunciar("Ainda não é " + m.nome + ". Confira os fatos descobertos e as cartas de dicas.");
      }
    });
  }

  function desistir() {
    if (rodadaFinalizada || revelando) {
      return;
    }
    pararAnimacaoErro();
    rodadaFinalizada = true;
    pontuacao.desistencias++;
    atualizarPlacar();
    salvarPlacar();

    busca.value = "";
    busca.readOnly = true;
    busca.disabled = true;
    fecharLista();
    $("historico").setAttribute("aria-busy", "false");
    mostrarResultado(alvo, true);
    anunciar("Você desistiu. A resposta era " + alvo.nome + ".");
  }

// ===== BLOCO 42 de 60 · importância: essencial =====
// TÍTULO: novaPartida(): começar nova partida
// O QUE FAZ: Sorteia outra resposta, zera tentativas e estado, mostra a pista e reinicia as cartas e a tabela.
  function novaPartida() {
    numeroPartida++;
    $("nova-partida").hidden = true;
    pararAnimacaoErro();

    // Sorteia a resposta (sem repetir a anterior, se houver mais de uma mulher)
    var candidatas = base.filter(function (m) {
      return !alvo || base.length === 1 || m.id !== alvo.id;
    });
    alvo = candidatas[Math.floor(Math.random() * candidatas.length)];

    // Zera o estado da partida
    tentativas = [];
    venceu = false;
    rodadaFinalizada = false;
    fatosRevelados = [];
    dicasReveladas = { ano: null, studio: null };
    revelando = false;
    busca.readOnly = false;
    $("historico").setAttribute("aria-busy", "false");
    busca.disabled = false;
    busca.value = "";
    $("desistir").hidden = false;
    $("desistir").disabled = false;
    fecharLista();
    $("vitoria").hidden = true;
    $("vitoria").textContent = "";

    // Mostra a pista
    if (temValor(alvo.pista)) {
      $("pista").textContent = alvo.pista;
    } else {
      $("pista").textContent = "Este anime ainda não tem pista cadastrada. Use as comparações!";
    }

    atualizarCartasDicas(true);
    desenharHistorico();
    anunciar("Nova partida iniciada.");
  }

  /* ---------- 3. EXECUÇÃO ---------- */

// ===== BLOCO 43 de 60 · importância: essencial =====
// TÍTULO: iniciar(): ligar o jogo
// O QUE FAZ: Valida a base, avisa se houver problemas, liga os eventos da busca (digitar, setas, Enter, Esc) e do botão de nova partida, e começa a primeira partida.
  function iniciar() {
    // Valida os dados e avisa se algum registro foi ignorado
    var oficial = validarBase(window.ANIMES);
    var avisos = oficial.avisos.slice();
    base = oficial.validas;
    avisos.forEach(function (a) {
      console.warn("[Base de dados] " + a);
    });
    var aviso = $("aviso-dados");
    if (avisos.length) {
      aviso.textContent = avisos.length + " registro(s) com problema foram ignorados. Veja o console (F12).";
      aviso.hidden = false;
    }
    carregarPlacar();
    atualizarPlacar();

    // Sem nenhum anime cadastrado, o jogo não começa
    if (!base.length) {
      desenharHistorico();
      $("pista").textContent = "Nenhum anime cadastrado ainda. Adicione registros em js/animes.js.";
      busca.disabled = true;
      $("nova-partida").disabled = true;
      $("desistir").disabled = true;
      return;
    }

    // Eventos da caixa de busca
    busca.addEventListener("input", abrirLista);
    busca.addEventListener("focus", abrirLista);
    busca.addEventListener("click", abrirLista);
    busca.addEventListener("blur", fecharLista);
    busca.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        fecharLista();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (lista.hidden) {
          abrirLista();
        }
        if (!opcoes.length) {
          return;
        }
        var d = e.key === "ArrowDown" ? 1 : -1;
        marcarAtivo((ativo + d + opcoes.length) % opcoes.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        // Escolhe a opção destacada; se só há uma opção na lista, escolhe ela
        var i;
        if (ativo >= 0) {
          i = ativo;
        } else if (opcoes.length === 1) {
          i = 0;
        } else {
          i = -1;
        }
        if (i >= 0) {
          escolher(opcoes[i]);
        }
      }
    });

    $("desistir").addEventListener("click", desistir);
    $("nova-partida").addEventListener("click", novaPartida);
    novaPartida();
  }

  iniciar();
})();
