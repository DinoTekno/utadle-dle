// ===== Ultimate Anime DLE · img-loader.js =====
// AniList GraphQL: carrega miniaturas em lotes para reduzir o tempo de espera.
(function () {
  "use strict";

  var CACHE_VER = "dle-imgs-v5";
  var ANILIST   = "https://graphql.anilist.co";
  var LOTE_MAX  = 20;
  var MAX_LOTES = 4;

  /* ── Cache localStorage ──────────────────── */
  var cache = {};
  try { cache = JSON.parse(localStorage.getItem(CACHE_VER) || "{}"); } catch (_) {}
  function salvar() { try { localStorage.setItem(CACHE_VER, JSON.stringify(cache)); } catch (_) {} }

  /* ── Fila com slots paralelos ────────────── */
  var fila        = [];
  var pendentes   = Object.create(null);
  var lotesAtivos = 0;
  var agendamento = null;

  function tick() {
    agendamento = null;
    while (fila.length && lotesAtivos < MAX_LOTES) {
      var ids = fila.splice(0, LOTE_MAX);
      lotesAtivos++;
      buscar(ids);
    }
  }

  async function buscar(ids) {
    var urlPorId = Object.create(null);
    var consulta = "query{" + ids.map(function (id, i) {
      return "m" + i + ":Media(idMal:" + id + ",type:ANIME){coverImage{medium}}";
    }).join("") + "}";

    try {
      var r = await fetch(ANILIST, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ query: consulta })
      });
      if (!r.ok) {
        throw new Error("HTTP " + r.status);
      }

      var d = await r.json();
      if (d.errors && d.errors.length) {
        console.warn("[img-loader] Resposta AniList com erros:", d.errors);
      }
      ids.forEach(function (id, i) {
        var media = d.data && d.data["m" + i];
        var url = media && media.coverImage && media.coverImage.medium || null;
        if (url) {
          urlPorId[id] = url;
          cache[id] = url;
        }
      });
      salvar();
    } catch (e) {
      console.warn("[img-loader] Falha ao carregar capas em lote:", e.message);
    }

    ids.forEach(function (id) {
      var cbs = pendentes[id] || [];
      delete pendentes[id];
      cbs.forEach(function (cb) { cb(urlPorId[id] || null); });
    });
    lotesAtivos--;
    if (fila.length && !agendamento) {
      agendamento = setTimeout(tick, 0);
    }
  }

  function enfileirar(malId, cb) {
    if (!pendentes[malId]) {
      pendentes[malId] = [];
      fila.push(malId);
    }
    pendentes[malId].push(cb);
    if (!agendamento) {
      agendamento = setTimeout(tick, 0);
    }
  }

  /* ── Aplica URL na <img> ─────────────────── */
  function aplicar(imgEl, url) {
    if (!url) {
      var w = imgEl.closest && imgEl.closest(".capa-wrapper");
      if (w) w.classList.add("capa-erro");
      return;
    }
    imgEl.onload  = function () { imgEl.classList.add("capa-pronta"); imgEl.onload  = null; };
    imgEl.onerror = function () {
      var w = imgEl.closest && imgEl.closest(".capa-wrapper");
      if (w) w.classList.add("capa-erro");
      imgEl.onerror = null;
    };
    imgEl.src = url;
  }

  /* ── API pública ─────────────────────────── */
  window.carregarImagem = function (malId, imgEl) {
    if (!malId || !imgEl) return;
    if (cache[malId]) { aplicar(imgEl, cache[malId]); return; }
    enfileirar(malId, function (url) { aplicar(imgEl, url); });
  };

  window.preAquecer = function (lista) {
    lista.forEach(function (id) { if (!cache[id]) enfileirar(id, function () {}); });
  };
})();
