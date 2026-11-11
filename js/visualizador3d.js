/* Visualizadores 3D (anel, Homem-Aranha, unicórnio) e tour em foto 360°.
   Usa three.js (carregado pela internet, veja o <importmap> no index.html).
   Você NÃO precisa mexer aqui — para usar um modelo 3D real, só informe o
   caminho do arquivo .glb em js/conteudo.js (campo "modelo"). */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const C = window.CONTEUDO;
const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────────── utilidades ───────────── */
function texturaBrilho(cor) {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.25, cor); g.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function brilhos(cor, n = 70, raio = 3.4) {
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = raio * (0.6 + Math.random() * 0.7), a = Math.random() * 6.283, b = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(b) * Math.cos(a); pos[i * 3 + 1] = r * Math.cos(b) * 0.8 + 1.3; pos[i * 3 + 2] = r * Math.sin(b) * Math.sin(a);
  }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ size: .22, map: texturaBrilho(cor), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .9 });
  return new THREE.Points(geo, mat);
}

function brilhoChao(cor) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(2.8, 48),
    new THREE.MeshBasicMaterial({ map: texturaBrilho(cor), transparent: true, opacity: .55, depthWrite: false, blending: THREE.AdditiveBlending }));
  m.rotation.x = -Math.PI / 2; m.position.y = -0.01; return m;
}

function felpudo(geo, forca = .045) {          // deixa a esfera "fofinha" (irregular)
  const p = geo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const d = 1 + forca * Math.sin(v.x * 11) * Math.sin(v.y * 9 + v.z * 7) + forca * .6 * Math.sin(v.z * 13 + v.x * 5);
    p.setXYZ(i, v.x * d, v.y * d, v.z * d);
  }
  geo.computeVertexNormals(); return geo;
}

/* ───────────── modelo: ANEL (caixinha + solitário + aliança) ───────────── */
function modeloAnel() {
  const g = new THREE.Group(), st = { aberto: true };
  const prata = new THREE.MeshStandardMaterial({ color: 0xeef1f6, metalness: 1, roughness: .16 });
  const veludo = new THREE.MeshStandardMaterial({ color: 0xb30f2b, roughness: 1 });
  const almofada = new THREE.MeshStandardMaterial({ color: 0x8e0a22, roughness: 1 });
  const cetim = new THREE.MeshStandardMaterial({ color: 0xf8f2f4, roughness: .45 });

  const base = new THREE.Mesh(new RoundedBoxGeometry(2.3, .9, 2.3, 4, .13), veludo); base.position.y = .45; g.add(base);
  const alm = new THREE.Mesh(new RoundedBoxGeometry(2.0, .12, 2.0, 3, .05), almofada); alm.position.y = .9; g.add(alm);

  const pivo = new THREE.Group(); pivo.position.set(0, .9, -1.15); g.add(pivo);
  const tampa = new THREE.Mesh(new RoundedBoxGeometry(2.3, .6, 2.3, 4, .13), veludo); tampa.position.set(0, .3, 1.15); pivo.add(tampa);
  const forro = new THREE.Mesh(new THREE.BoxGeometry(2.0, .03, 2.0), cetim); forro.position.set(0, -.005, 1.15); pivo.add(forro);

  // anel solitário com pedra azul
  const solit = new THREE.Group(), R = .36;
  solit.add(new THREE.Mesh(new THREE.TorusGeometry(R, .048, 20, 80), prata));
  const perfil = [[0, -.13], [.07, -.07], [.14, 0], [.14, .03], [.1, .1], [.06, .115], [0, .115]].map(p => new THREE.Vector2(p[0], p[1]));
  const pedra = new THREE.Mesh(new THREE.LatheGeometry(perfil, 8), new THREE.MeshPhysicalMaterial({
    color: 0x7aa6ff, metalness: 0, roughness: .02, flatShading: true, clearcoat: 1, envMapIntensity: 3, emissive: 0x1a3fa0, emissiveIntensity: .45 }));
  pedra.position.y = R + .11; solit.add(pedra);
  for (let k = 0; k < 4; k++) {
    const a = k * Math.PI / 2 + Math.PI / 4, p = new THREE.Mesh(new THREE.SphereGeometry(.024, 12, 12), prata);
    p.position.set(Math.cos(a) * .115, R + .1, Math.sin(a) * .115); solit.add(p);
  }
  solit.position.set(-.42, .9 + R - .02, .15); solit.rotation.y = .4; g.add(solit);

  // aliança lisa
  const alianca = new THREE.Mesh(new THREE.TorusGeometry(.4, .06, 20, 80), prata);
  alianca.position.set(.45, .9 + .4 - .02, .05); alianca.rotation.y = -.55; g.add(alianca);

  g.scale.setScalar(1.25);
  const alvo = () => st.aberto ? -1.95 : 0;
  pivo.rotation.x = 0;
  return {
    objeto: g, cam: [3.4, 3.2, 5.4], alvo: [0, 1.3, 0], cor: 'rgba(255,170,200,.9)',
    clique() { st.aberto = !st.aberto; },
    atualizar(t, dt) {
      pivo.rotation.x += (alvo() - pivo.rotation.x) * (1 - Math.exp(-2.6 * dt));
      g.position.y = Math.sin(t * 1.2) * .04;
      pedra.rotation.y = t * .6;
    }
  };
}

/* ───────────── modelo: UNICÓRNIO (pelúcia fofa, desenho original) ───────────── */
function modeloUnicornio() {
  const g = new THREE.Group();
  const branco = new THREE.MeshStandardMaterial({ color: 0xfffaf7, roughness: 1 });
  const rosa = new THREE.MeshStandardMaterial({ color: 0xff9fc6, roughness: .95 });
  const ouro = new THREE.MeshStandardMaterial({ color: 0xf5c04a, metalness: .85, roughness: .28 });
  const preto = new THREE.MeshStandardMaterial({ color: 0x1b1217, roughness: .15, metalness: .2 });
  const bola = (r, mat, x, y, z, sx = 1, sy = 1, sz = 1, fofo = true) => {
    const m = new THREE.Mesh(fofo ? felpudo(new THREE.IcosahedronGeometry(r, 4)) : new THREE.SphereGeometry(r, 24, 24), mat);
    m.position.set(x, y, z); m.scale.set(sx, sy, sz); g.add(m); return m;
  };
  bola(1, branco, 0, 1.0, 0, 1, 1.05, .95);                 // corpo
  const cabeca = new THREE.Group(); cabeca.position.set(0, 2.3, .1); g.add(cabeca);
  const add = (m) => { cabeca.add(m); return m; };
  const cab = new THREE.Mesh(felpudo(new THREE.IcosahedronGeometry(.85, 4)), branco); cab.scale.set(1.08, .95, 1); add(cab);
  const foc = new THREE.Mesh(new THREE.SphereGeometry(.3, 24, 24), new THREE.MeshStandardMaterial({ color: 0xfff0ec, roughness: 1 })); foc.position.set(0, -.22, .72); foc.scale.set(1.2, .85, .8); add(foc);
  const nariz = new THREE.Mesh(new THREE.SphereGeometry(.07, 16, 16), rosa); nariz.position.set(0, -.12, 1.0); nariz.scale.set(1.4, .9, .8); add(nariz);
  [-1, 1].forEach(s => {
    const olho = new THREE.Mesh(new THREE.SphereGeometry(.115, 24, 24), preto); olho.position.set(s * .36, .08, .78); olho.scale.z = .6; add(olho);
    const br = new THREE.Mesh(new THREE.SphereGeometry(.035, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff })); br.position.set(s * .33, .13, .84); add(br);
    const bochecha = new THREE.Mesh(new THREE.SphereGeometry(.17, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffb3cf, roughness: 1, transparent: true, opacity: .85 }));
    bochecha.position.set(s * .58, -.17, .62); bochecha.scale.set(1, .6, .35); add(bochecha);
    const orelha = new THREE.Mesh(new THREE.ConeGeometry(.2, .5, 16), branco); orelha.position.set(s * .55, .85, -.05); orelha.rotation.z = -s * .35; add(orelha);
    const int = new THREE.Mesh(new THREE.ConeGeometry(.11, .34, 16), rosa); int.position.set(s * .55, .83, .04); int.rotation.z = -s * .35; add(int);
  });
  const sorriso = new THREE.Mesh(new THREE.TorusGeometry(.1, .018, 8, 24, Math.PI), preto); sorriso.position.set(0, -.3, .98); sorriso.rotation.z = Math.PI; add(sorriso);
  const chifre = new THREE.Group(); chifre.position.set(0, .8, .35); chifre.rotation.x = .3; add(chifre);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(.17, .85, 24), ouro); cone.position.y = .32; chifre.add(cone);
  for (let i = 0; i < 4; i++) {
    const r = .15 - i * .033, an = new THREE.Mesh(new THREE.TorusGeometry(r, .02, 8, 24), ouro);
    an.rotation.x = Math.PI / 2; an.position.y = .08 + i * .16; chifre.add(an);
  }
  for (let i = 0; i < 5; i++) {                              // crina cor-de-rosa
    const m = new THREE.Mesh(felpudo(new THREE.IcosahedronGeometry(.24 - i * .015, 3)), rosa);
    m.position.set((i - 2) * .17, .72 - Math.abs(i - 2) * .08, -.35 - (i % 2) * .08); add(m);
  }
  [-1, 1].forEach(s => {
    bola(.3, branco, s * 1.0, 1.15, .25, 1, 1.25, 1);       // braços
    bola(.2, rosa, s * 1.08, .8, .42);
    bola(.36, rosa, s * .5, .3, .55, 1, .75, 1.2);           // pezinhos
  });
  bola(.34, rosa, 0, .6, -.95);                              // rabinho
  bola(.22, rosa, .25, .85, -1.05); bola(.2, rosa, -.22, .4, -1.05);
  g.scale.setScalar(.95);
  return {
    objeto: g, cam: [0, 2.6, 7.2], alvo: [0, 1.7, 0], cor: 'rgba(255,184,214,.9)',
    atualizar(t) { g.position.y = Math.abs(Math.sin(t * 1.6)) * .06; cabeca.rotation.z = Math.sin(t * 1.1) * .05; }
  };
}

/* ───────────── modelo: cartão de foto 3D (enquanto não há .glb) ───────────── */
function modeloFoto(url) {
  const g = new THREE.Group(), L = 1.5, A = 2.67;
  const ouro = new THREE.MeshStandardMaterial({ color: 0xf0c36a, metalness: .9, roughness: .3 });
  g.add(new THREE.Mesh(new RoundedBoxGeometry(L + .2, A + .2, .1, 3, .05), ouro));
  const tex = new THREE.TextureLoader().load(url); tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({ map: tex });
  const frente = new THREE.Mesh(new THREE.PlaneGeometry(L, A), mat); frente.position.z = .056; g.add(frente);
  const tras = new THREE.Mesh(new THREE.PlaneGeometry(L, A), mat); tras.position.z = -.056; tras.rotation.y = Math.PI; g.add(tras);
  g.position.y = 1.6;
  return {
    objeto: g, cam: [0, 1.9, 5.2], alvo: [0, 1.6, 0], cor: 'rgba(255,140,170,.9)',
    atualizar(t) { g.position.y = 1.6 + Math.sin(t * 1.3) * .08; }
  };
}

/* ───────────── carregar .glb real (se informado) ───────────── */
function carregarGLB(url, pronto, falha) {
  new GLTFLoader().load(url, (gltf) => {
    const o = gltf.scene, caixa = new THREE.Box3().setFromObject(o), tam = caixa.getSize(new THREE.Vector3()), c = caixa.getCenter(new THREE.Vector3());
    const e = 2.8 / Math.max(tam.x, tam.y, tam.z); o.scale.setScalar(e);
    o.position.set(-c.x * e, -c.y * e + 1.6, -c.z * e);
    const wrap = new THREE.Group(); wrap.add(o); pronto(wrap);
  }, undefined, () => { console.warn('Não achei o modelo 3D:', url); if (falha) falha(); });
}

/* ───────────── cena genérica com órbita ───────────── */
function criarViewer(container, modelo, glbUrl) {
  container.querySelector('.carregando')?.remove();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), .04).texture;
  const sol = new THREE.DirectionalLight(0xffffff, 2.2); sol.position.set(3, 6, 4); scene.add(sol);
  const rosa = new THREE.PointLight(0xff6b98, 35, 14); rosa.position.set(-3.5, 2.5, 3); scene.add(rosa);
  const ouro = new THREE.PointLight(0xffd28a, 20, 14); ouro.position.set(3.5, 3, -3); scene.add(ouro);

  const ctl = new OrbitControls(camera, renderer.domElement);
  ctl.enableDamping = true; ctl.enablePan = false; ctl.minDistance = 3; ctl.maxDistance = 13;
  ctl.maxPolarAngle = Math.PI * .92; ctl.autoRotate = !reduzir; ctl.autoRotateSpeed = 1.6;
  renderer.domElement.style.touchAction = 'pan-y';          // no celular: rolar a página com o dedo na vertical
  let retoma; ctl.addEventListener('start', () => { ctl.autoRotate = false; clearTimeout(retoma); dica.style.opacity = 0; });
  ctl.addEventListener('end', () => { if (!reduzir) retoma = setTimeout(() => ctl.autoRotate = true, 3500); });

  const dica = document.createElement('div'); dica.className = 'dica3d'; dica.textContent = 'arraste para girar'; container.appendChild(dica);

  let m = null, raiz = new THREE.Group(); scene.add(raiz);
  scene.add(brilhoChao('rgba(255,107,152,.8)'));
  const faiscas = brilhos('rgba(255,200,220,.9)'); scene.add(faiscas);

  function usar(mod) {
    raiz.clear(); m = mod; raiz.add(mod.objeto);
    camera.position.set(...mod.cam); ctl.target.set(...mod.alvo); ctl.update();
  }
  usar(modelo);
  if (glbUrl) carregarGLB(glbUrl, (wrap) => usar({ objeto: wrap, cam: [0, 2.2, 6], alvo: [0, 1.6, 0], atualizar(t) { wrap.position.y = Math.sin(t * 1.2) * .05; } }));

  // clique simples (sem arrastar) → ação do modelo (ex.: abrir/fechar a caixinha)
  let ini = null;
  renderer.domElement.addEventListener('pointerdown', e => ini = [e.clientX, e.clientY]);
  renderer.domElement.addEventListener('pointerup', e => { if (ini && Math.hypot(e.clientX - ini[0], e.clientY - ini[1]) < 5 && m && m.clique) m.clique(); ini = null; });

  const ajustar = () => {
    const w = container.clientWidth, h = container.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  new ResizeObserver(ajustar).observe(container); ajustar();

  let visivel = false, raf = 0, ult = performance.now();
  function quadro(agora) {
    raf = visivel ? requestAnimationFrame(quadro) : 0;
    const dt = Math.min((agora - ult) / 1000, .1); ult = agora;
    if (m && m.atualizar) m.atualizar(agora / 1000, dt);
    faiscas.rotation.y += dt * .08; faiscas.material.opacity = .65 + Math.sin(agora / 400) * .25;
    ctl.update(); renderer.render(scene, camera);
  }
  new IntersectionObserver(es => {
    visivel = es[0].isIntersecting;
    if (visivel && !raf) { ult = performance.now(); raf = requestAnimationFrame(quadro); }
  }, { threshold: .05 }).observe(container);
}

/* ───────────── montar os 3 tesouros ───────────── */
const fabricas = {
  anel: () => modeloAnel(),
  unicornio: () => modeloUnicornio(),
  aranha: (t) => modeloFoto(t.foto || 'fotos/homem-aranha.jpg'),
};
C.tesouros.forEach(t => {
  const cont = document.querySelector('.viewer[data-id="' + t.id + '"]'); if (!cont) return;
  try {
    const f = fabricas[t.id] || (() => modeloFoto(t.foto || ''));
    criarViewer(cont, f(t), t.modelo);
  } catch (e) {
    console.error(e); cont.innerHTML = '<div class="carregando">Seu navegador não conseguiu abrir o 3D 😢</div>';
  }
});

/* ───────────── tour: foto 360° própria ───────────── */
let pano = null;
function montar360(info) {
  if (!info) return;
  if (pano) { pano.parar(); pano = null; }
  const { el, url } = info;
  const renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  el.appendChild(renderer.domElement);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(75, 1, .1, 200);
  const tex = new THREE.TextureLoader().load(url); tex.colorSpace = THREE.SRGBColorSpace;
  const esfera = new THREE.Mesh(new THREE.SphereGeometry(50, 64, 40), new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide }));
  scene.add(esfera);
  let lon = 0, lat = 0, arrasta = false, px = 0, py = 0, auto = !reduzir, vivo = true;
  const ajustar = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
  new ResizeObserver(ajustar).observe(el); ajustar();
  const cv = renderer.domElement;
  cv.addEventListener('pointerdown', e => { arrasta = true; auto = false; px = e.clientX; py = e.clientY; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointerup', () => arrasta = false);
  cv.addEventListener('pointermove', e => { if (!arrasta) return; lon -= (e.clientX - px) * .12; lat = Math.max(-85, Math.min(85, lat + (e.clientY - py) * .12)); px = e.clientX; py = e.clientY; });
  cv.addEventListener('wheel', e => { e.preventDefault(); cam.fov = Math.max(30, Math.min(95, cam.fov + e.deltaY * .04)); cam.updateProjectionMatrix(); }, { passive: false });
  (function loop() {
    if (!vivo || !el.isConnected) { renderer.dispose(); return; }
    requestAnimationFrame(loop);
    if (auto) lon += .06;
    const phi = THREE.MathUtils.degToRad(90 - lat), th = THREE.MathUtils.degToRad(lon);
    cam.lookAt(Math.sin(phi) * Math.cos(th), Math.cos(phi), Math.sin(phi) * Math.sin(th));
    renderer.render(scene, cam);
  })();
  pano = { parar() { vivo = false; } };
}
addEventListener('tour360', () => montar360(window.__tour360));
if (window.__tour360) montar360(window.__tour360);
