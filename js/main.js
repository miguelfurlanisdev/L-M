/* Lógica do site (animações, linha do tempo, galeria, tour, pedido).
   Você NÃO precisa mexer aqui — os textos ficam em js/conteudo.js */
(function () {
  'use strict';
  var C = window.CONTEUDO;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile = window.matchMedia('(max-width: 760px)').matches;

  /* ---------- Textos básicos ---------- */
  document.title = C.casal.nome1 + ' & ' + C.casal.nome2 + ' 💖';
  $('#env-texto').textContent = C.abertura.envelope;
  $('#nome1').textContent = C.casal.nome1;
  $('#nome2').textContent = C.casal.nome2;
  $('#hero-local').textContent = C.casal.dataPedido + ' · ' + C.casal.local;
  $('#tour-intro').textContent = C.tour.intro;
  $('#pedido-data').textContent = C.casal.dataPedido;
  $('#pedido-titulo').textContent = C.pedido.titulo;
  $('#pedido-texto').innerHTML = C.pedido.texto;
  $('#pergunta').textContent = C.pedido.pergunta;
  $('#resposta-texto').innerHTML = C.pedido.resposta;
  $('#rodape').textContent = C.rodape + ' ♥';
  if (C.pedido.como) { $('#como').hidden = false; $('#como-texto').innerHTML = C.pedido.como; }

  /* ---------- Linha do tempo ---------- */
  var linha = $('#linha-tempo');
  C.historia.forEach(function (m) {
    var d = el('article', 'marco');
    var foto = el('div', 'marco-foto reveal reveal-esq');
    if (m.foto) {
      var f = el('div', 'moldura');
      var img = el('img'); img.src = m.foto; img.alt = m.titulo; img.loading = 'lazy';
      f.appendChild(img); foto.appendChild(f);
      img.addEventListener('click', function () { abrirLightbox(m.foto, m.titulo); });
      inclinar(f);
    }
    var tx = el('div', 'marco-texto reveal reveal-dir',
      '<div class="data">' + (m.data || '') + '</div><h3>' + m.titulo + '</h3><p>' + m.texto + '</p>');
    d.appendChild(foto); d.appendChild(tx); linha.appendChild(d);
  });

  /* ---------- Galeria ---------- */
  var gal = $('#galeria');
  C.galeria.forEach(function (g, i) {
    var p = el('figure', 'polaroid reveal');
    p.style.setProperty('--r', ((i % 5) - 2) * 0.9 + 'deg');
    p.style.transitionDelay = (i % 3) * 0.08 + 's';
    var img = el('img'); img.src = g.foto; img.alt = g.legenda || ''; img.loading = 'lazy';
    p.appendChild(img);
    if (g.legenda) p.appendChild(el('span', '', g.legenda));
    p.addEventListener('click', function () { abrirLightbox(g.foto, g.legenda); });
    gal.appendChild(p);
  });
  var vs = $('#videos');
  (C.videos || []).forEach(function (v) {
    var w = el('div', 'video reveal');
    var vid = el('video'); vid.src = v.arquivo; vid.controls = true; vid.playsInline = true; vid.preload = 'metadata';
    if (v.capa) vid.poster = v.capa;
    w.appendChild(vid); if (v.legenda) w.appendChild(el('p', '', v.legenda));
    vs.appendChild(w);
  });

  /* ---------- Tesouros 3D (o JS 3D preenche os .viewer) ---------- */
  var ts = $('#tesouros');
  C.tesouros.forEach(function (t, i) {
    var w = el('article', 'tesouro');
    var v = el('div', 'viewer reveal'); v.dataset.id = t.id;
    v.innerHTML = '<div class="carregando">Carregando o 3D…<br>(precisa de internet)</div>';
    var info = el('div', 'tesouro-info reveal ' + (i % 2 ? 'reveal-esq' : 'reveal-dir'),
      '<span class="eyebrow">tesouro ' + (i + 1) + '</span><h3>' + t.titulo + '</h3><span class="script">' + (t.subtitulo || '') + '</span><p>' + t.descricao + '</p>');
    w.appendChild(v); w.appendChild(info); ts.appendChild(w);
  });

  /* ---------- Tour ---------- */
  var pontos = C.tour.pontos, atual = 0;
  var tela = $('#tour-tela'), pbox = $('#tour-pontos'), info = $('#tour-info');
  var iniciouTour = false;
  pontos.forEach(function (p, i) {
    var b = el('button', '', (i + 1) + '. ' + p.nome); b.type = 'button';
    b.addEventListener('click', function () { irPara(i); });
    pbox.appendChild(b);
  });
  function irPara(i) {
    atual = (i + pontos.length) % pontos.length;
    var p = pontos[atual];
    Array.prototype.forEach.call(pbox.children, function (b, k) { b.classList.toggle('ativo', k === atual); });
    tela.innerHTML = '';
    var linkMaps;
    if (p.foto360) {
      var pano = el('div', 'pano'); tela.appendChild(pano);
      window.__tour360 = { el: pano, url: p.foto360 };
      window.dispatchEvent(new Event('tour360'));
      linkMaps = '';
    } else if (p.lat != null && p.lng != null) {
      var f = el('iframe'); f.loading = 'lazy'; f.allowFullscreen = true; f.title = 'Street View: ' + p.nome;
      f.src = 'https://www.google.com/maps?q=&layer=c&cbll=' + p.lat + ',' + p.lng + '&cbp=12,' + (p.heading || 0) + ',,0,0&source=embed&output=svembed';
      tela.appendChild(f);
      linkMaps = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + p.lat + ',' + p.lng + '&heading=' + (p.heading || 0);
    } else {
      var f2 = el('iframe'); f2.loading = 'lazy'; f2.allowFullscreen = true; f2.title = 'Mapa do lugar';
      f2.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(C.tour.enderecoBusca) + '&t=k&z=17&output=embed';
      tela.appendChild(f2);
      linkMaps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(C.tour.enderecoBusca);
    }
    info.innerHTML = '<h4>' + p.nome + '</h4><p>' + (p.descricao || '') + '</p>' +
      (linkMaps ? '<p><a href="' + linkMaps + '" target="_blank" rel="noopener">Abrir no Google Maps ↗</a></p>' : '');
  }
  $('#tour-ant').onclick = function () { irPara(atual - 1); };
  $('#tour-prox').onclick = function () { irPara(atual + 1); };
  // só carrega o tour quando chegar perto (economiza internet)
  new IntersectionObserver(function (es, ob) {
    if (es[0].isIntersecting && !iniciouTour) { iniciouTour = true; irPara(0); ob.disconnect(); }
  }, { rootMargin: '300px' }).observe($('#tour-sec'));

  /* ---------- Revelar ao rolar + barra de progresso ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (n) { io.observe(n); });
  var prog = $('#progresso');
  addEventListener('scroll', function () {
    var h = document.documentElement; prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });

  /* ---------- Inclinação 3D das fotos ---------- */
  function inclinar(n) {
    if (reduzir || mobile) return;
    n.addEventListener('mousemove', function (e) {
      var r = n.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      n.style.transform = 'rotateY(' + x * 12 + 'deg) rotateX(' + -y * 12 + 'deg) scale(1.03)';
    });
    n.addEventListener('mouseleave', function () { n.style.transform = ''; });
  }

  /* ---------- Lightbox ---------- */
  var lb = $('#lightbox');
  function abrirLightbox(src, leg) { $('img', lb).src = src; $('figcaption', lb).textContent = (leg && leg.indexOf('✍️') < 0) ? leg : ''; lb.hidden = false; }
  lb.addEventListener('click', function () { lb.hidden = true; });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.hidden = true; });

  /* ---------- Digitação da frase ---------- */
  function digitar() {
    var alvo = $('#frase'), txt = C.abertura.frase, i = 0;
    if (reduzir) { alvo.textContent = txt; return; }
    (function passo() { alvo.textContent = txt.slice(0, ++i); if (i < txt.length) setTimeout(passo, 55); })();
  }

  /* ---------- Música ---------- */
  var audio = $('#audio'), mbtn = $('#musica-btn');
  if (C.abertura.musica) {
    audio.src = C.abertura.musica; mbtn.hidden = false;
    mbtn.onclick = function () {
      if (audio.paused) { audio.play(); mbtn.classList.add('tocando'); mbtn.classList.remove('mudo'); }
      else { audio.pause(); mbtn.classList.remove('tocando'); mbtn.classList.add('mudo'); }
    };
  }

  /* ---------- Envelope ---------- */
  var env = $('#envelope');
  function abrir() {
    if (env.classList.contains('abrindo')) return;
    env.classList.add('abrindo');
    if (C.abertura.musica) { audio.play().then(function () { mbtn.classList.add('tocando'); }).catch(function () {}); }
    setTimeout(function () {
      env.classList.add('aberto'); document.body.classList.remove('travado');
      document.querySelectorAll('.hero .reveal').forEach(function (n) { n.classList.add('in'); });
      digitar();
    }, 1500);
  }
  $('#env-btn').addEventListener('click', abrir);

  /* ---------- Pétalas e corações ---------- */
  var cv = $('#petalas'), cx = cv.getContext('2d'), W, H, itens = [];
  function medir() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  medir(); addEventListener('resize', medir);
  var N = reduzir ? 0 : (mobile ? 22 : 45);
  function novo(topo) {
    return { x: Math.random() * W, y: topo ? -20 : Math.random() * H, s: 6 + Math.random() * 12, v: .4 + Math.random() * 1.0,
      a: Math.random() * 6.28, va: (Math.random() - .5) * .03, w: Math.random() * 6.28, cor: Math.random() < .25 ? 'h' : 'p',
      al: .25 + Math.random() * .45, tom: Math.random() < .5 ? '255,107,152' : '255,170,196' };
  }
  for (var k = 0; k < N; k++) itens.push(novo(false));
  function coracao(x, y, s) {
    cx.beginPath(); cx.moveTo(x, y + s * .3);
    cx.bezierCurveTo(x, y - s * .3, x - s, y - s * .3, x - s, y + s * .3);
    cx.bezierCurveTo(x - s, y + s * .8, x, y + s * 1.1, x, y + s * 1.4);
    cx.bezierCurveTo(x, y + s * 1.1, x + s, y + s * .8, x + s, y + s * .3);
    cx.bezierCurveTo(x + s, y - s * .3, x, y - s * .3, x, y + s * .3); cx.fill();
  }
  (function loop() {
    cx.clearRect(0, 0, W, H);
    itens.forEach(function (p, i) {
      p.y += p.v; p.w += .02; p.x += Math.sin(p.w) * .7; p.a += p.va;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.a); cx.fillStyle = 'rgba(' + p.tom + ',' + p.al + ')';
      if (p.cor === 'h') coracao(0, -p.s / 2, p.s * .6);
      else { cx.beginPath(); cx.ellipse(0, 0, p.s * .55, p.s * .95, 0, 0, 6.28); cx.fill(); }
      cx.restore();
      if (p.y > H + 30) itens[i] = novo(true);
    });
    if (N) requestAnimationFrame(loop);
  })();

  /* ---------- O PEDIDO: botão "Não" fujão + confete ---------- */
  var nao = $('#btn-nao'), sim = $('#btn-sim'), esq = 0, tent = 0;
  var frases = ['Não', 'Tem certeza? 🥺', 'Pensa bem…', 'Olha o anel!', 'Última chance 😅', 'Clica no Sim 💖'];
  function fugir(e) {
    if (e && e.preventDefault) e.preventDefault();
    tent++; nao.textContent = frases[Math.min(tent, frases.length - 1)];
    var r = nao.getBoundingClientRect(), pad = 12;
    var dx = (Math.random() - .5) * 320, dy = (Math.random() - .5) * 200;
    var nx = Math.min(Math.max(r.left + dx, pad), innerWidth - r.width - pad);
    var ny = Math.min(Math.max(r.top + dy, pad), innerHeight - r.height - pad);
    nao.style.position = 'fixed'; nao.style.left = nx + 'px'; nao.style.top = ny + 'px'; nao.style.zIndex = 60;
    sim.style.transform = 'scale(' + Math.min(1 + tent * .1, 1.6) + ')';
  }
  nao.addEventListener('mouseenter', fugir);
  nao.addEventListener('touchstart', fugir, { passive: false });
  nao.addEventListener('click', fugir);

  sim.addEventListener('click', function () {
    $('#botoes').hidden = true; $('#resposta').hidden = false;
    $('#pergunta').textContent = C.casal.nome1 + ' & ' + C.casal.nome2 + ' ♥';
    explodir(); setTimeout(explodir, 1200); setTimeout(explodir, 2600);
    $('#resposta').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  var cc = $('#confete'), c2 = cc.getContext('2d'), parts = [], rodando = false;
  function explodir() {
    cc.width = innerWidth; cc.height = innerHeight;
    var cores = ['#ff6b98', '#ffc4d6', '#f6cf85', '#ffffff', '#e0356f'];
    for (var i = 0; i < 160; i++) {
      var ang = Math.random() * 6.28, v = 6 + Math.random() * 14;
      parts.push({ x: innerWidth / 2, y: innerHeight * .55, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - 8, g: .28, r: Math.random() * 6.28, vr: (Math.random() - .5) * .4,
        s: 6 + Math.random() * 9, c: cores[i % cores.length], h: Math.random() < .4, life: 1 });
    }
    if (!rodando) { rodando = true; tick(); }
  }
  function tick() {
    c2.clearRect(0, 0, cc.width, cc.height);
    parts = parts.filter(function (p) { return p.life > 0 && p.y < cc.height + 40; });
    parts.forEach(function (p) {
      p.vy += p.g; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= .004;
      c2.save(); c2.translate(p.x, p.y); c2.rotate(p.r); c2.globalAlpha = Math.max(p.life, 0); c2.fillStyle = p.c;
      if (p.h) { var t = cx; cx = c2; coracao(0, -p.s / 2, p.s * .5); cx = t; } else c2.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      c2.restore();
    });
    if (parts.length) requestAnimationFrame(tick); else { rodando = false; c2.clearRect(0, 0, cc.width, cc.height); }
  }
})();
