// ============================================================
//  心理学人体模型 · 真实解剖大脑（Z-Anatomy 导出的 brain.glb）
//  点击结构 -> 高亮 -> 弹信息卡；可剥开皮层看深部；信息可编辑。
// ============================================================
import * as THREE from 'three';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { STRUCTURES, SYSTEMS, STRUCTURE_TREE, FUNCTION_TREE, FUNCTIONS } from './data.js?v=3';
import { ATLAS } from './atlas.js';
import { QUESTIONS } from './questions.js?v=3';
import { MECHS } from './mechanisms.js';
import { DISORDER_GROUPS, DISORDERS } from './disorders.js';

window.__PSYCH_APP_VERSION = 3;   // 与 index.html 的自检对应：版本对不上说明浏览器用了旧缓存

// ---------- 场景 ----------
const canvasWrap = document.getElementById('scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1017);
const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
canvasWrap.appendChild(renderer.domElement);
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(4, 8, 6); scene.add(key);
const fill = new THREE.DirectionalLight(0x88aaff, 0.45); fill.position.set(-6, -3, -5); scene.add(fill);
const rim = new THREE.DirectionalLight(0xffffff, 0.3); rim.position.set(0, 2, -8); scene.add(rim);

// 与 Blender 导出脚本一致的清洗：把结构名转成 glb 里真实的 ASCII 网格名
function cleanName(s) {
  return String(s).trim()
    .replace(/[*(),]/g, '')
    .replace(/[/.]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// ---------- 结构映射：清洗后的网格名 -> 结构对象 ----------
const activeStructs = STRUCTURES.filter(s => !s.bodyOnly);
const nameToStruct = new Map();
for (const s of activeStructs) {
  s._meshes = [];
  for (const nm of s.meshNames) nameToStruct.set(cleanName(nm), s);
}
// 查结构：精确 -> 去掉重名后缀 _2/_3
function structOf(meshName) {
  return nameToStruct.get(meshName) || nameToStruct.get(meshName.replace(/_\d+$/, '')) || null;
}

// 三层分类（在清洗后的下划线名字上匹配；不用裸 "lobule" 以免误伤顶叶 parietal lobule）
const LIMBIC_RE = /Amygdal|Hippocamp|Cingulate|Fornix|Hypothalam|Mamillary|Septal|Habenula|Stria_terminalis|Parahippocampal/i;
const DEEP_RE = /Caudate|Putamen|Globus_pallidus|Lentiform|Thalamus|geniculate|Red_nucleus|colliculus|Midbrain|Pons|Medulla|Olive|peduncle|Aqueduct|ventricle|Interpeduncular|Nucleus_of|salivatory|cochlear|Vestibular|Adenohypophysis|Neurohypophysis|Optic|Corpus_callosum|commissure|cerebell|vermis|Culmen|Declive|Uvula|Pyramis|Folium|Nodule|Lingula|Flocculus|Tonsil|quadrangular|semilunar|Gracile_lobule|Biventral|Wing_of_central|Central_lobule|Stria_medullaris|Base_of_peduncle|Septum_pellucidum/i;
function layerOf(name) {
  if (LIMBIC_RE.test(name)) return 'limbic';
  if (DEEP_RE.test(name)) return 'deep';
  return 'cortex';                       // 其余（脑回/脑沟/白质/顶叶等）归皮层
}
const BASE_COLOR = { cortex: 0xd9c2b6, limbic: 0xd6b8bc, deep: 0xc3c8d2 };

// 每层当前透明度（0~1），受滑杆控制
const layerOpacity = { cortex: 1.0, limbic: 1.0, deep: 1.0 };

const allMeshes = [];
let modelReady = false;
// 细分网格：去掉左右(_l/_r)与重名(_2)后缀的基名 → 网格列表，供金色细分高亮使用
const meshesByBase = new Map();
function meshBase(name) { return name.replace(/_\d+$/, '').replace(/_(l|r)$/i, ''); }

// ---------- 加载 glb ----------
const loader = new GLTFLoader();
const status = document.getElementById('status');
status.textContent = '正在加载真实大脑模型…';

loader.load('./models/brain.glb', (gltf) => {
  const wrapper = new THREE.Group();
  scene.add(wrapper);
  wrapper.add(gltf.scene);
  wrapper.updateMatrixWorld(true);

  // 收集网格、算每块几何中心（对离群顶点稳健）
  const centers = [];
  gltf.scene.traverse(o => {
    if (!o.isMesh) return;
    o.geometry.computeBoundingSphere();
    const c = o.localToWorld(o.geometry.boundingSphere.center.clone());
    centers.push(c);
    allMeshes.push(o);
    o.frustumCulled = false;   // 关闭视锥剔除：部分网格(胼胝体/脑室)包围球异常被误剔除、导致选中却不渲染
    const layer = layerOf(o.name);
    o.userData.layer = layer;

    const st = structOf(o.name);
    o.userData.struct = st || null;
    o.userData.center = c.clone();

    const base = st ? st.color : BASE_COLOR[layer];
    o.material = new THREE.MeshStandardMaterial({
      color: base, roughness: 0.65, metalness: 0.02,
      emissive: new THREE.Color(st ? st.color : 0x000000),
      emissiveIntensity: st ? 0.12 : 0,
      transparent: false, opacity: 1.0, depthWrite: true,
      side: THREE.DoubleSide            // 双面：空心壳结构(胼胝体/脑室)的内壁也能命中点击
    });
    o.userData.baseColor = base;
    o.userData.baseEmissive = st ? 0.12 : 0;
    if (st) st._meshes.push(o);
  });

  // 以几何中心的质心为原点居中，再放大到舒适尺寸
  const centroid = centers.reduce((a, c) => a.add(c), new THREE.Vector3()).multiplyScalar(1 / centers.length);
  gltf.scene.position.sub(centroid);
  wrapper.scale.setScalar(10);
  wrapper.updateMatrixWorld(true);

  // 记录每块最终世界中心（供标签/相机/高亮）
  for (const o of allMeshes) {
    o.geometry.computeBoundingSphere();
    o.userData.center = o.localToWorld(o.geometry.boundingSphere.center.clone());
  }
  // 每个结构的世界质心（用于标签与镜头对准）
  for (const s of activeStructs) {
    if (!s._meshes.length) continue;
    s._center = s._meshes.reduce((a, m) => a.add(m.userData.center.clone()), new THREE.Vector3())
      .multiplyScalar(1 / s._meshes.length);
  }
  for (const o of allMeshes) {
    const b = meshBase(o.name);
    if (!meshesByBase.has(b)) meshesByBase.set(b, []);
    meshesByBase.get(b).push(o);
  }

  buildLabels();
  fitCameraToScene();
  applyLayers();
  modelReady = true;

  status.textContent = '';   // 加载完成后隐藏顶部状态行（#status:empty 不显示）
  // 加载期间已经在看真题：只补上高亮，不打断；否则默认选第一个结构
  if (pendingView) { const v = pendingView; pendingView = null; v(); }
  else selectStructure(activeStructs[0]);
},
(xhr) => { if (xhr.total) status.textContent = `加载中… ${Math.round(xhr.loaded / xhr.total * 100)}%`; },
(err) => { status.textContent = '模型加载失败：' + err.message; console.error(err); });

// ---------- 轨道控制 ----------
let theta = 0.6, phi = 1.35, radius = 8, minRadius = 1, maxRadius = 40;
let dragging = false, lastX = 0, lastY = 0, moved = 0;
const target = new THREE.Vector3(0, 0, 0);
function updateCamera() {
  camera.position.set(
    target.x + radius * Math.sin(phi) * Math.sin(theta),
    target.y + radius * Math.cos(phi),
    target.z + radius * Math.sin(phi) * Math.cos(theta));
  camera.lookAt(target);
}
const _box = new THREE.Box3(), _sph = new THREE.Sphere();
function fitCameraToScene() {
  _box.makeEmpty();
  for (const o of allMeshes) _box.expandByPoint(o.userData.center);
  if (_box.isEmpty()) return;
  _box.getCenter(target);
  _box.getBoundingSphere(_sph);
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
  radius = (_sph.radius + 0.5) / Math.sin(Math.min(vFov, hFov) / 2) * 1.15;
  minRadius = _sph.radius * 0.15;
  maxRadius = radius * 3;
}
const el = renderer.domElement;
el.addEventListener('pointerdown', e => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; });
window.addEventListener('pointerup', () => { dragging = false; });
let lastPx = 0, lastPy = 0;
window.addEventListener('pointermove', e => {
  setMouse(e);
  lastPx = e.clientX; lastPy = e.clientY;
  if (!dragging) return;
  const dx = e.clientX - lastX, dy = e.clientY - lastY;
  moved += Math.abs(dx) + Math.abs(dy);
  theta -= dx * 0.006;
  phi = Math.max(0.12, Math.min(Math.PI - 0.12, phi - dy * 0.006));
  lastX = e.clientX; lastY = e.clientY;
});
el.addEventListener('wheel', e => {
  e.preventDefault();
  radius = Math.max(minRadius, Math.min(maxRadius, radius * (1 + Math.sign(e.deltaY) * 0.08)));
}, { passive: false });

// ---------- 拾取 ----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;
function setMouse(e) {
  const r = el.getBoundingClientRect();
  mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
}
function pick() {
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(allMeshes, false);
  // 半透明以下的层视为"可穿透"，方便直接点到里层结构
  for (const h of hits) { if (h.object.visible && h.object.material.opacity >= 0.5) return h.object; }
  return null;
}
el.addEventListener('click', () => {
  if (moved > 6) return;              // 拖拽不算点击
  const obj = pick();
  if (!obj) { deselect(); return; }  // 点空白处 → 取消选中
  const st = obj.userData.struct;
  if (st) {
    // 再点一次同一个结构（且正在看它的卡片）→ 取消
    if (selectedStructs.length === 1 && selectedStructs[0] === st && currentStruct === st && !backContext) deselect();
    else selectStructure(st);
  } else {
    if (selectedRaw === obj) deselect();
    else selectRawMesh(obj);
  }
});

// ---------- 高亮（支持多结构；选中永远画在最前，深部也看得见） ----------
const structById = new Map(activeStructs.map(s => [s.id, s]));
let selectedStructs = [], selectedRaw = null;
const highlightSet = new Set();
function restore(m) {
  m.material.color.set(m.userData.baseColor);
  m.material.emissive.set(m.userData.struct ? m.userData.struct.color : 0x000000);
  m.material.emissiveIntensity = m.userData.baseEmissive;
  m.material.depthTest = true;
  m.renderOrder = 0;
}
function clearHighlight() {
  for (const m of highlightSet) restore(m);
  highlightSet.clear(); selectedStructs = []; selectedRaw = null; fadeLayers.clear();
  for (const t of fineTargets) t.el.remove();
  fineTargets = [];
}
// 金色细分高亮：中脑VTA、尾状核、眶额等没有单独结构卡的部位，带标签
const FINE_COLOR = 0xffc94a;
let fineTargets = [];   // [{ meshes, center, el }]
// 高亮一组结构（整块、结构色）+ 细分网格（"网格基名=显示名"，金色）
function showTargets(structIds = [], fine = []) {
  clearHighlight();
  selectedStructs = structIds.map(id => structById.get(id)).filter(Boolean);
  for (const st of selectedStructs) for (const m of (st._meshes || [])) highlightMesh(m, st.color);
  for (const spec of fine) {
    const [base, label] = spec.split('=');
    const meshes = meshesByBase.get(base) || [];
    if (!meshes.length) continue;
    for (const m of meshes) highlightMesh(m, FINE_COLOR);
    const center = meshes.reduce((a, m) => a.add(m.userData.center.clone()), new THREE.Vector3())
      .multiplyScalar(1 / meshes.length);
    const el = document.createElement('div');
    el.className = 'label fine'; el.textContent = (label || base).split('（')[0];   // 三维标签只放短名，括号说明留在右栏
    labelLayer.appendChild(el);
    fineTargets.push({ meshes, center, el });
  }
  computeFade(); applyLayers();
}
const _hi = new THREE.Color();
function highlightMesh(m, color) {
  _hi.set(color).lerp(new THREE.Color(0xffffff), 0.35); // 提亮，明显扎眼
  m.material.color.copy(_hi);
  m.material.emissive.set(color);
  m.material.emissiveIntensity = 1.1;    // 强发光（保留深度测试，画成实心亮块）
  highlightSet.add(m);
}
function setNavActive(id) {
  document.querySelectorAll('.nav-item').forEach(n =>
    n.classList.toggle('active', id != null && n.dataset.id === id));
}
// 遮挡关系：cortex(最外) 盖住 limbic，limbic 盖住 deep。
// 只淡化"挡在被选结构前面的外层"，不改滑杆数值；取消选中即恢复。
const fadeLayers = new Set();
function computeFade() {
  fadeLayers.clear();
  const layers = new Set();
  for (const st of selectedStructs) for (const m of (st._meshes || [])) layers.add(m.userData.layer);
  if (selectedRaw) layers.add(selectedRaw.userData.layer);
  for (const t of fineTargets) for (const m of t.meshes) layers.add(m.userData.layer);
  if (!layers.size) return;
  if (layers.has('deep') || layers.has('limbic')) fadeLayers.add('cortex');
  if (layers.has('deep')) fadeLayers.add('limbic');
}
let backContext = null;   // 从功能/集合卡点进单个结构时记住来源，便于返回
let pendingView = null;   // 模型没加载完时打开的视图，加载后重放以补上高亮
function selectStructure(s, back = null) {
  backContext = back;
  clearHighlight();
  selectedStructs = [s];
  for (const m of (s._meshes || [])) highlightMesh(m, s.color);
  computeFade(); applyLayers(); renderInfo(s); setNavActive(back ? back.navId : s.id);
  if (!modelReady) pendingView = () => selectStructure(s, back);
}
function selectFunction(f) {
  backContext = null;
  clearHighlight();
  selectedStructs = (f.members || []).map(id => structById.get(id)).filter(Boolean);
  for (const st of selectedStructs) for (const m of (st._meshes || [])) highlightMesh(m, st.color);
  computeFade(); applyLayers(); renderFunctionInfo(f); setNavActive('fn:' + f.id);
}
// 点集合区域（额叶/边缘系统等），把该区所有结构一起亮
function selectGroup(name, ids, navId = null) {
  backContext = null;
  clearHighlight();
  selectedStructs = ids.map(id => structById.get(id)).filter(Boolean);
  for (const st of selectedStructs) for (const m of (st._meshes || [])) highlightMesh(m, st.color);
  computeFade(); applyLayers(); renderGroupInfo(name, ids, navId); setNavActive(navId);
}
function selectRawMesh(o) {
  backContext = null;
  clearHighlight();
  selectedRaw = o;
  highlightMesh(o, 0xd8c58a);
  computeFade(); applyLayers(); renderRawInfo(o); setNavActive(null);
}
function deselect() {
  backContext = null;
  clearHighlight();
  applyLayers();
  setNavActive(null);
  panel.innerHTML = '<div class="empty-hint">已取消选中。<br>点左侧列表、或模型上任意结构查看详情。</div>';
}

// ---------- 分层透明度 ----------
function isSelected(m) { return highlightSet.has(m); }
function applyLayers() {
  for (const m of allMeshes) {
    if (isSelected(m)) {                 // 选中的结构：无论所在层亮度多少，一律实心可见
      m.visible = true;
      m.material.transparent = false; m.material.opacity = 1; m.material.depthWrite = true;
      m.material.needsUpdate = true; continue;
    }
    let op = layerOpacity[m.userData.layer];
    if (fadeLayers.has(m.userData.layer)) op = Math.min(op, 0.10); // 临时压低遮挡层
    m.material.transparent = op < 1;
    m.material.opacity = op;
    m.material.depthWrite = op >= 1;
    m.visible = op > 0.001;
    m.material.needsUpdate = true;
  }
}
function bindSlider(id, layer) {
  const sl = document.getElementById('op-' + id), lab = document.getElementById('v-' + id);
  sl.addEventListener('input', () => {
    // 保留当前选中；手动调该层则以你的数值为准（取消对它的自动淡化）
    fadeLayers.delete(layer);
    layerOpacity[layer] = sl.value / 100;
    lab.textContent = sl.value + '%';
    if (modelReady) applyLayers();
  });
}
bindSlider('cortex', 'cortex');
bindSlider('limbic', 'limbic');
bindSlider('deep', 'deep');

// ---------- 用户编辑（localStorage） ----------
const EDIT_KEY = 'psychModelEdits_v2';
let userEdits = (() => { try { return JSON.parse(localStorage.getItem(EDIT_KEY)) || {}; } catch { return {}; } })();
function persistEdits() { localStorage.setItem(EDIT_KEY, JSON.stringify(userEdits)); }
function withEdits(s) { return userEdits[s.id] ? { ...s, ...userEdits[s.id] } : s; }

// ---------- 功能分组的编辑与自建（localStorage） ----------
const FUNC_KEY = 'psychFuncData_v1';
let funcStore = (() => { try { return JSON.parse(localStorage.getItem(FUNC_KEY)) || { edits: {}, custom: [] }; } catch { return { edits: {}, custom: [] }; } })();
function persistFunc() { localStorage.setItem(FUNC_KEY, JSON.stringify(funcStore)); }
// 合并：内置功能(叠加编辑) + 自建功能
function getFunctions() {
  const base = FUNCTIONS.map(f => funcStore.edits[f.id] ? { ...f, ...funcStore.edits[f.id] } : f);
  return base.concat(funcStore.custom || []);
}
function funcById(id) { return getFunctions().find(f => f.id === id) || null; }
const FIELDS = [
  { key: 'subtitle', label: '一句话简介', icon: '📝', type: 'text' },
  { key: 'location', label: '位置', icon: '📍', type: 'text' },
  { key: 'functions', label: '主要功能', icon: '⚙️', type: 'list' },
  { key: 'memory', label: '与记忆/情绪的关联', icon: '🧠', type: 'text' },
  { key: 'disorders', label: '相关精神病变', icon: '🩺', type: 'list' },
  { key: 'experiments', label: '相关实验与理论', icon: '🔬', type: 'list' },
  { key: 'treatment', label: '治疗原理', icon: '💊', type: 'list' },
];

// ---------- 真题 · 脑机制 · 疾病（questions.js / mechanisms.js / disorders.js）----------
const mechById = new Map(MECHS.map(m => [m.id, m]));
const disById = new Map(DISORDERS.map(d => [d.id, d]));
const qById = new Map(QUESTIONS.map(q => [q.id, q]));
const YEARS = [...new Set(QUESTIONS.map(q => q.year))].sort((a, b) => b - a);
// 一道题对应的脑机制：mech 直接取；dis 用该疾病的病变机理
function brainOf(q) {
  if (q.mech) return mechById.get(q.mech) || null;
  const d = q.dis && disById.get(q.dis);
  return d ? { title: d.name + '的病变机理', structs: d.structs, fine: d.fine || [], steps: d.mech, dis: d } : null;
}
function pushTo(map, k, v) { if (!map.has(k)) map.set(k, []); map.get(k).push(v); }
const brainQs = QUESTIONS.filter(brainOf);
const qsByStruct = new Map(), qsByFn = new Map(), qsByDis = new Map(), disByStruct = new Map();
for (const q of brainQs) {
  const b = brainOf(q);
  for (const sid of b.structs) pushTo(qsByStruct, sid, q);
  for (const fid of (b.fn || [])) pushTo(qsByFn, fid, q);
  if (q.dis) pushTo(qsByDis, q.dis, q);
}
for (const d of DISORDERS) for (const sid of d.structs) pushTo(disByStruct, sid, d);

function esc(t) { return String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function listHtml(items) { return '<ul>' + (items || []).map(t => `<li>${esc(t)}</li>`).join('') + '</ul>'; }

// ---------- 信息卡 ----------
const panel = document.getElementById('panel');
let currentStruct = null;
function renderInfo(sRaw) {
  currentStruct = sRaw;
  const s = withEdits(sRaw);
  const sys = s.region || SYSTEMS[s.system]?.label || '';
  const body = FIELDS.filter(f => f.key !== 'subtitle').map(f => {
    const inner = f.type === 'list' ? listHtml(s[f.key]) : `<p>${esc(s[f.key])}</p>`;
    return `<section><h3>${f.icon} ${f.label}</h3>${inner}</section>`;
  }).join('');
  panel.innerHTML = `
    <div class="p-head" style="border-color:#${s.color.toString(16).padStart(6, '0')}">
      <div class="p-tag">${sys}</div>
      <h2>${esc(s.name)}<span class="en">（${esc(s.en)}）</span></h2>
      <div class="p-sub">${esc(s.subtitle)}</div>
    </div>
    <div class="p-body">
      ${backContext ? `<button class="back-btn" id="backBtn">← 返回「${esc(backContext.label)}」</button>` : ''}
      <div class="edit-bar"><button id="editBtn">✏️ 编辑 / 增加内容</button></div>
      ${body}
      ${structRelated(sRaw.id)}
    </div>`;
  if (backContext) document.getElementById('backBtn').onclick = backContext.fn;
  document.getElementById('editBtn').onclick = () => renderEdit(sRaw);
  bindRelated({ label: s.name, fn: () => selectStructure(sRaw), navId: sRaw.id });
  panel.scrollTop = 0;
}
// 真题短链接：点开跳到「真题」里展开该题的脑机制
function qLinks(qs) {
  return qs.map(q => `<button class="chip sm" data-q="${q.id}">${q.year}·${esc(q.short)}</button>`).join('');
}
function structRelated(sid) {
  const ds = disByStruct.get(sid) || [], qs = qsByStruct.get(sid) || [];
  let html = '';
  if (ds.length) html += `<section><h3>🧬 相关疾病（${ds.length}，点开看病变机理）</h3><div class="chips">` +
    ds.map(d => `<button class="chip" data-dis="${d.id}">${esc(d.name)}</button>`).join('') + '</div></section>';
  if (qs.length) html += `<section><details><summary>📝 涉及这个脑区的真题（${qs.length}）</summary>` +
    `<div class="chips">${qLinks(qs)}</div></details></section>`;
  return html;
}
function bindRelated(back) {
  panel.querySelectorAll('[data-q]').forEach(c => c.onclick = () => openQuestion(c.dataset.q, back));
  panel.querySelectorAll('[data-dis]').forEach(c => c.onclick = () => openDisorder(disById.get(c.dataset.dis), back));
}
function renderFunctionInfo(f) {
  currentStruct = null;
  const members = (f.members || []).map(id => structById.get(id)).filter(Boolean);
  const chips = members.map(s =>
    `<button class="chip" data-id="${s.id}"><span class="dot" style="background:${hex(s.color)}"></span>${esc(s.name)}</button>`).join('');
  panel.innerHTML = `
    <div class="p-head" style="border-color:#c7b48a">
      <div class="p-tag">功能系统</div>
      <h2>${esc(f.name)}<span class="en">（${esc(f.en || '')}）</span></h2>
      <div class="p-sub">${esc(f.brief || '')}</div>
    </div>
    <div class="p-body">
      <div class="edit-bar"><button id="funcEditBtn">✏️ 编辑此功能</button></div>
      <section><h3>🧩 参与的脑区（点开看单个，可返回）</h3><div class="chips">${chips || '<span style="color:var(--muted)">未选脑区</span>'}</div></section>
      ${f.detail ? `<section><h3>📖 说明</h3><p>${esc(f.detail)}</p></section>` : ''}
      ${f.points && f.points.length ? `<section><h3>📚 心理学知识点</h3>${listHtml(f.points)}</section>` : ''}
      ${(qsByFn.get(f.id) || []).length ? `<section><h3>📝 相关真题（点开看脑机制）</h3><div class="chips">${qLinks(qsByFn.get(f.id))}</div></section>` : ''}
    </div>`;
  document.getElementById('funcEditBtn').onclick = () => renderFuncEdit(f);
  const back = { label: f.name, fn: () => selectFunction(f), navId: 'fn:' + f.id };
  panel.querySelectorAll('.chip[data-id]').forEach(c =>
    c.onclick = () => selectStructure(structById.get(c.dataset.id), back));
  bindRelated(back);
  panel.scrollTop = 0;
}
// 集合区域信息卡（额叶/边缘系统等）
function renderGroupInfo(name, ids, navId) {
  currentStruct = null;
  const members = ids.map(id => structById.get(id)).filter(Boolean);
  const chips = members.map(s =>
    `<button class="chip" data-id="${s.id}"><span class="dot" style="background:${hex(s.color)}"></span>${esc(s.name)}</button>`).join('');
  panel.innerHTML = `
    <div class="p-head" style="border-color:#8ea3b0">
      <div class="p-tag">结构分区</div>
      <h2>${esc(name)}</h2>
      <div class="p-sub">该分区包含 ${members.length} 个结构，已一起高亮。点下面任意一个看详情。</div>
    </div>
    <div class="p-body">
      <section><h3>🧩 包含的结构</h3><div class="chips">${chips || '<span style="color:var(--muted)">（空）</span>'}</div></section>
    </div>`;
  const back = { label: name, fn: () => selectGroup(name, ids, navId), navId };
  panel.querySelectorAll('.chip').forEach(c =>
    c.onclick = () => selectStructure(structById.get(c.dataset.id), back));
  panel.scrollTop = 0;
}
// 编辑 / 新建功能
function renderFuncEdit(f) {
  const isNew = !f;
  const cur = f || { id: 'custom_' + Date.now(), name: '', en: '', brief: '', detail: '', points: [], members: [], custom: true };
  const memberBoxes = activeStructs.map(s =>
    `<label class="mbox"><input type="checkbox" value="${s.id}" ${(cur.members || []).includes(s.id) ? 'checked' : ''}>${esc(s.name)}</label>`).join('');
  const isCustom = cur.custom || (funcStore.custom || []).some(c => c.id === cur.id);
  panel.innerHTML = `
    <div class="p-head" style="border-color:#c7b48a"><div class="p-tag">${isNew ? '新建功能' : '编辑功能'}</div>
      <h2>${isNew ? '＋ 新建功能分组' : esc(cur.name)}</h2>
      <div class="p-sub">改完点保存，存在本浏览器。</div></div>
    <div class="p-body">
      <div class="fld"><label>功能名称</label><textarea id="f-name" rows="1">${esc(cur.name)}</textarea></div>
      <div class="fld"><label>英文(可空)</label><textarea id="f-en" rows="1">${esc(cur.en || '')}</textarea></div>
      <div class="fld"><label>一句话简介</label><textarea id="f-brief" rows="2">${esc(cur.brief || '')}</textarea></div>
      <div class="fld"><label>说明</label><textarea id="f-detail" rows="3">${esc(cur.detail || '')}</textarea></div>
      <div class="fld"><label>心理学知识点 <span class="fhint">每行一条</span></label><textarea id="f-points" rows="6">${esc((cur.points || []).join('\n'))}</textarea></div>
      <div class="fld"><label>参与的脑区（勾选）</label><div class="mboxes">${memberBoxes}</div></div>
      <div class="edit-actions">
        <button id="fSave" class="primary">💾 保存</button>
        <button id="fCancel">取消</button>
        ${isCustom ? '<button id="fDel" class="ghost">删除此功能</button>' : (funcStore.edits[cur.id] ? '<button id="fReset" class="ghost">恢复默认</button>' : '')}
      </div></div>`;
  document.getElementById('fSave').onclick = () => {
    const obj = {
      id: cur.id, custom: isCustom || isNew,
      name: document.getElementById('f-name').value.trim() || '未命名功能',
      en: document.getElementById('f-en').value.trim(),
      brief: document.getElementById('f-brief').value.trim(),
      detail: document.getElementById('f-detail').value.trim(),
      points: document.getElementById('f-points').value.split('\n').map(x => x.trim()).filter(Boolean),
      members: [...panel.querySelectorAll('.mbox input:checked')].map(i => i.value)
    };
    if (obj.custom) {
      const arr = funcStore.custom || (funcStore.custom = []);
      const i = arr.findIndex(c => c.id === obj.id);
      if (i >= 0) arr[i] = obj; else arr.push(obj);
    } else {
      funcStore.edits[obj.id] = { name: obj.name, en: obj.en, brief: obj.brief, detail: obj.detail, points: obj.points, members: obj.members };
    }
    persistFunc(); buildFunctionTab(); selectFunction(funcById(obj.id));
  };
  document.getElementById('fCancel').onclick = () => f ? selectFunction(f) : (buildFunctionTab(), panel.innerHTML = '');
  const del = document.getElementById('fDel');
  if (del) del.onclick = () => { funcStore.custom = (funcStore.custom || []).filter(c => c.id !== cur.id); persistFunc(); buildFunctionTab(); panel.innerHTML = ''; };
  const rst = document.getElementById('fReset');
  if (rst) rst.onclick = () => { delete funcStore.edits[cur.id]; persistFunc(); buildFunctionTab(); selectFunction(funcById(cur.id)); };
  panel.scrollTop = 0;
}
function renderRawInfo(o) {
  currentStruct = null;
  const key = 'mesh:' + o.name;
  const saved = userEdits[key];
  const base = o.name.replace(/_\d+$/, '').replace(/_(l|r)$/i, '');
  const sideM = o.name.match(/_(l|r)(?:_\d+)?$/i);
  const side = sideM ? (sideM[1].toLowerCase() === 'l' ? '（左）' : '（右）') : '';
  const rawLabel = (o.userData.label || o.name).replace(/[._](l|r)$/i, '').replace(/\s+/g, ' ').trim();
  const entry = ATLAS[base];
  const zh = entry ? entry.zh : rawLabel;
  const title = entry ? `${esc(zh)}${side}<span class="en">（${esc(rawLabel)}）</span>` : `${esc(rawLabel)}${side}`;
  panel.innerHTML = `
    <div class="p-head" style="border-color:#8ab4ff">
      <div class="p-tag">解剖结构</div>
      <h2>${title}</h2>
      <div class="p-sub">${entry ? '科普简介如下，可自行补充更多资料。' : '这是真实解剖结构，可自行补充资料。'}</div>
    </div>
    <div class="p-body">
      ${entry ? `<section><h3>📖 简介</h3><p>${esc(entry.brief)}</p></section>` : ''}
      <div class="edit-bar"><button id="rawEditBtn">✏️ 补充 / 编辑资料</button></div>
      ${saved && saved.notes && saved.notes.length ? `<section><h3>📝 我的补充</h3>${listHtml(saved.notes)}</section>` : ''}
    </div>`;
  document.getElementById('rawEditBtn').onclick = () => renderRawEdit(o, key, saved);
  panel.scrollTop = 0;
}
function renderRawEdit(o, key, saved) {
  panel.innerHTML = `
    <div class="p-head" style="border-color:#8ab4ff"><div class="p-tag">编辑中</div><h2>${esc(o.name)}</h2>
      <div class="p-sub">每行一条，随便写。保存后存在本浏览器。</div></div>
    <div class="p-body">
      <div class="fld"><label>📝 资料（每行一条）</label>
        <textarea id="rawArea" rows="10">${esc((saved?.notes || []).join('\n'))}</textarea></div>
      <div class="edit-actions">
        <button id="rawSave" class="primary">💾 保存</button>
        <button id="rawCancel">取消</button>
      </div></div>`;
  document.getElementById('rawSave').onclick = () => {
    const notes = document.getElementById('rawArea').value.split('\n').map(x => x.trim()).filter(Boolean);
    userEdits[key] = { notes }; persistEdits(); renderRawInfo(o);
  };
  document.getElementById('rawCancel').onclick = () => renderRawInfo(o);
}
function renderEdit(sRaw) {
  const s = withEdits(sRaw);
  const form = FIELDS.map(f => {
    const val = f.type === 'list' ? (s[f.key] || []).join('\n') : (s[f.key] || '');
    const hint = f.type === 'list' ? '<span class="fhint">每行一条，增删行即可</span>' : '';
    const rows = f.type === 'list' ? Math.max(3, (s[f.key] || []).length + 1) : 2;
    return `<div class="fld"><label>${f.icon} ${f.label} ${hint}</label>
      <textarea data-key="${f.key}" data-type="${f.type}" rows="${rows}">${esc(val)}</textarea></div>`;
  }).join('');
  panel.innerHTML = `
    <div class="p-head" style="border-color:#${s.color.toString(16).padStart(6, '0')}">
      <div class="p-tag">编辑中</div><h2>${esc(s.name)}</h2>
      <div class="p-sub">改完点"保存"，存在本浏览器，下次打开还在。</div></div>
    <div class="p-body">${form}
      <div class="edit-actions">
        <button id="saveBtn" class="primary">💾 保存</button>
        <button id="cancelBtn">取消</button>
        <button id="resetBtn" class="ghost">恢复默认</button>
      </div></div>`;
  document.getElementById('saveBtn').onclick = () => {
    const edit = {};
    panel.querySelectorAll('textarea').forEach(t => {
      edit[t.dataset.key] = t.dataset.type === 'list'
        ? t.value.split('\n').map(x => x.trim()).filter(Boolean) : t.value.trim();
    });
    userEdits[sRaw.id] = edit; persistEdits(); renderInfo(sRaw);
  };
  document.getElementById('cancelBtn').onclick = () => renderInfo(sRaw);
  document.getElementById('resetBtn').onclick = () => { delete userEdits[sRaw.id]; persistEdits(); renderInfo(sRaw); };
  panel.scrollTop = 0;
}

// ---------- 导出/导入 ----------
// 导出两类修改：结构卡/网格补充、功能分组。旧版只导出了结构卡。
document.getElementById('exportBtn').onclick = () => {
  const data = { app: 'psych-model', version: 3, structEdits: userEdits, funcStore };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = '我的修改.json'; a.click(); URL.revokeObjectURL(a.href);
};
document.getElementById('importBtn').onclick = () => document.getElementById('importFile').click();
document.getElementById('importFile').onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = JSON.parse(r.result);
      if (data && data.app === 'psych-model') {
        userEdits = data.structEdits || {};
        funcStore = data.funcStore || { edits: {}, custom: [] };
        persistFunc();
      } else {
        userEdits = data;                 // 旧版导出文件：只有结构卡修改
      }
      persistEdits();
      rebuildNav();
      if (currentStruct) renderInfo(currentStruct);
      alert('导入成功！');
    } catch { alert('文件格式不对'); }
    e.target.value = '';
  };
  r.readAsText(f);
};

// ---------- 侧栏目录：四个选项卡（结构 / 功能 / 真题 / 变态） ----------
const nav = document.getElementById('nav');
function hex(c) { return '#' + c.toString(16).padStart(6, '0'); }
function structItem(s) {
  const item = document.createElement('div');
  item.className = 'nav-item'; item.dataset.id = s.id;
  item.innerHTML = `<span class="dot" style="background:${hex(s.color)}"></span>${s.name}`;
  item.onclick = () => modelReady && selectStructure(s);
  return item;
}
function buildStructureTab() {
  nav.innerHTML = '';
  for (const branch of STRUCTURE_TREE) {
    const allIds = branch.groups.flatMap(g => g.ids).filter(id => structById.get(id));
    const cat = document.createElement('div'); cat.className = 'nav-cat clickable';
    cat.innerHTML = `${branch.cat}<span class="cat-hint">点击整片高亮</span>`;
    cat.onclick = () => modelReady && selectGroup(branch.cat, allIds);
    nav.appendChild(cat);
    for (const g of branch.groups) {
      const items = g.ids.map(id => structById.get(id)).filter(Boolean);
      if (!items.length) continue;
      if (items.length === 1) { nav.appendChild(structItem(items[0])); continue; } // 单结构不再多套一级
      const h = document.createElement('div'); h.className = 'nav-head clickable'; h.textContent = g.name;
      h.onclick = () => modelReady && selectGroup(g.name, g.ids);
      nav.appendChild(h);
      items.forEach(s => nav.appendChild(structItem(s)));
    }
  }
}
function funcItem(f) {
  const item = document.createElement('div');
  item.className = 'nav-item'; item.dataset.id = 'fn:' + f.id;
  item.innerHTML = `${esc(f.name)}<div class="nav-sub">${(f.members || []).map(id => structById.get(id)?.name).filter(Boolean).join(' · ') || '（未选脑区）'}</div>`;
  item.onclick = () => modelReady && selectFunction(f);
  return item;
}
function buildFunctionTab() {
  nav.innerHTML = '';
  for (const branch of FUNCTION_TREE) {
    const cat = document.createElement('div'); cat.className = 'nav-cat'; cat.textContent = branch.cat;
    nav.appendChild(cat);
    for (const id of branch.ids) {
      const f = funcById(id);
      if (f) nav.appendChild(funcItem(f));
    }
  }
  const custom = funcStore.custom || [];
  const cat = document.createElement('div'); cat.className = 'nav-cat'; cat.textContent = '我的自定义功能';
  nav.appendChild(cat);
  custom.forEach(f => nav.appendChild(funcItem(f)));
  const add = document.createElement('div');
  add.className = 'nav-item add-item';
  add.textContent = '＋ 新建功能分组';
  add.onclick = () => renderFuncEdit(null);
  nav.appendChild(add);
}
let currentTab = 'struct';
function rebuildNav() {
  if (currentTab === 'struct') buildStructureTab();
  else if (currentTab === 'func') buildFunctionTab();
  else if (currentTab === 'exam') buildExamTab();
  else buildDisTab();
}
document.getElementById('tab-struct').onclick = () => { setTab('struct'); buildStructureTab(); };
document.getElementById('tab-func').onclick = () => { setTab('func'); buildFunctionTab(); };
document.getElementById('tab-exam').onclick = () => { setTab('exam'); buildExamTab(); showExamOverview(); };
document.getElementById('tab-dis').onclick = () => { setTab('dis'); buildDisTab(); selectDisorder(DISORDERS[0]); };
function setTab(which) {
  currentTab = which;
  for (const t of ['struct', 'func', 'exam', 'dis'])
    document.getElementById('tab-' + t).classList.toggle('active', which === t);
}
setTab('struct'); buildStructureTab();

function navItem(id, nameHtml, badge, onclick) {
  const item = document.createElement('div');
  item.className = 'nav-item'; item.dataset.id = id;
  item.innerHTML = `<span class="nm">${nameHtml}</span>${badge ? `<span class="badge">${badge}</span>` : ''}`;
  item.onclick = onclick;
  return item;
}
function backBtnHtml() {
  return backContext ? `<button class="back-btn" id="backBtn">← 返回「${esc(backContext.label)}」</button>` : '';
}
function bindBackBtn() {
  if (backContext) document.getElementById('backBtn').onclick = backContext.fn;
}
function structChips(ids, fine = []) {
  return ids.map(id => structById.get(id)).filter(Boolean).map(s =>
    `<button class="chip" data-id="${s.id}"><span class="dot" style="background:${hex(s.color)}"></span>${esc(s.name)}</button>`).join('') +
    fine.map(f => `<span class="chip fine-chip"><span class="dot"></span>${esc(f.split('=')[1] || f)}</span>`).join('');
}

// ---------- 真题选项卡：按年份浏览，点开题目看脑机制 ----------
let examQuery = '', onlyBrain = false, openQid = null;
let rerenderExamView = () => {};
function buildExamTab() {
  nav.innerHTML = '';
  const tools = document.createElement('div');
  tools.className = 'exam-tools';
  tools.innerHTML = `
    <input class="search" id="examSearch" type="search" placeholder="🔍 搜题目或机制，如：强化、多巴胺">
    <label class="toggle"><input type="checkbox" id="onlyBrain"> 只看涉及大脑的题</label>`;
  nav.appendChild(tools);
  const inp = tools.querySelector('#examSearch'), cb = tools.querySelector('#onlyBrain');
  inp.value = examQuery; cb.checked = onlyBrain;
  let timer = 0;
  inp.oninput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      examQuery = inp.value.trim();
      if (examQuery) showSearch(examQuery); else showExamOverview();
    }, 200);
  };
  cb.onchange = () => { onlyBrain = cb.checked; rerenderExamView(); };
  nav.appendChild(navItem('exam:overview', '📊 真题里的大脑', null, showExamOverview));
  const cat = document.createElement('div');
  cat.className = 'nav-cat'; cat.textContent = '按年份';
  nav.appendChild(cat);
  for (const y of YEARS) {
    const qs = QUESTIONS.filter(q => q.year === y);
    nav.appendChild(navItem('yr:' + y, `${y} 年`, `🧠 ${qs.filter(brainOf).length}/${qs.length}`, () => showYear(y)));
  }
}
function hl(text, kw) {
  const s = esc(text);
  if (!kw) return s;
  const k = esc(kw).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return s.replace(new RegExp(k, 'gi'), m => `<mark>${m}</mark>`);
}
// 一道题：带 🧠 的可点开，展开后是脑机制（步骤 + 脑区），模型同步高亮
function qRow(q, kw = '') {
  const b = brainOf(q);
  if (!b && onlyBrain) return '';
  const open = b && q.id === openQid;
  return `<li class="q ${b ? 'has-brain' : 'no-brain'}${open ? ' open' : ''}" data-qrow="${q.id}">
    <div class="qmeta"><b>${q.year}年 第${esc(q.no)}题</b><span>${q.score}分</span><span class="qsub">${esc(q.subject)}</span>
      ${b ? `<span class="qbrain">${open ? '▾ 收起' : '🧠 点开看脑机制'}</span>` : '<span class="qnone">不涉及脑机制</span>'}</div>
    <p>${hl(q.text, kw)}</p>
    ${open ? mechBox(q, b) : ''}
  </li>`;
}
function mechBox(q, b) {
  return `<div class="mech-box">
    <div class="mech-title">🧠 ${esc(b.title)}</div>
    <div class="chips">${structChips(b.structs, b.fine || [])}</div>
    <ol class="mech-steps">${b.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
    ${q.extra ? `<p class="mech-extra">👉 ${esc(q.extra)}</p>` : ''}
    ${b.dis ? `<button class="link" data-dis="${b.dis.id}">在「变态」专栏看${esc(b.dis.name)}的治疗与相关脑区 ›</button>` : ''}
  </div>`;
}
function highlightQuestion(qid) {
  const b = qid && brainOf(qById.get(qid));
  if (b) showTargets(b.structs, b.fine || []);
  else { clearHighlight(); applyLayers(); }
  if (!modelReady) pendingView = () => highlightQuestion(qid);
}
function bindQuestionList(rerender) {
  panel.querySelectorAll('.q.has-brain').forEach(li => {
    li.onclick = e => {
      if (e.target.closest('button')) return;      // 点脑区芯片/链接时不折叠
      openQid = openQid === li.dataset.qrow ? null : li.dataset.qrow;
      rerender();
      highlightQuestion(openQid);
      const row = openQid && panel.querySelector(`[data-qrow="${openQid}"]`);
      if (row) row.scrollIntoView({ block: 'nearest' });
    };
  });
  panel.querySelectorAll('.mech-box').forEach(box => {
    const q = qById.get(box.closest('[data-qrow]').dataset.qrow);
    const back = { label: q.short, fn: () => openQuestion(q.id), navId: 'yr:' + q.year };
    box.querySelectorAll('.chip[data-id]').forEach(c => c.onclick = () => selectStructure(structById.get(c.dataset.id), back));
    box.querySelectorAll('[data-dis]').forEach(c => c.onclick = () => openDisorder(disById.get(c.dataset.dis), back));
  });
}
// 进入一个真题视图：先清掉高亮（展开某题时再亮），记住怎么重画
function examView(navId, render, back = null) {
  backContext = back; currentStruct = null; openQid = null;
  clearHighlight(); applyLayers(); setNavActive(navId);
  rerenderExamView = render;
  render();
  panel.scrollTop = 0;
  if (!modelReady) pendingView = () => {};
}
function showYear(y, expand = null, back = null) {
  const render = () => {
    const qs = QUESTIONS.filter(q => q.year === y);
    panel.innerHTML = `
      <div class="p-head" style="border-color:#8ea3b0">
        <div class="p-tag">北大347真题</div><h2>${y} 年</h2>
        <div class="p-sub">共 ${qs.length} 题，${qs.filter(brainOf).length} 题可以在大脑上看机制——点题目展开</div>
      </div>
      <div class="p-body">${backBtnHtml()}<ul class="qlist">${qs.map(q => qRow(q)).join('')}</ul></div>`;
    bindBackBtn();
    bindQuestionList(render);
  };
  examView('yr:' + y, render, back);
  if (expand) {
    openQid = expand;
    render();
    highlightQuestion(expand);
    panel.querySelector(`[data-qrow="${expand}"]`)?.scrollIntoView({ block: 'start' });
  }
}
// 从结构卡/功能卡/疾病卡跳到某道题：切到「真题」并展开它
function openQuestion(qid, back = null) {
  const q = qById.get(qid);
  if (!q) return;
  if (currentTab !== 'exam') { setTab('exam'); buildExamTab(); }
  showYear(q.year, qid, back);
}
function showSearch(kw) {
  const render = () => {
    const k = kw.toLowerCase();
    const qs = QUESTIONS.filter(q => {
      const b = brainOf(q);
      return [q.text, q.short, b ? b.title : '', ...(b ? b.steps : [])].join(' ').toLowerCase().includes(k);
    });
    panel.innerHTML = `
      <div class="p-head" style="border-color:#8ab4ff">
        <div class="p-tag">搜索（题目和脑机制）</div><h2>“${esc(kw)}”</h2>
        <div class="p-sub">找到 ${qs.length} 道题</div>
      </div>
      <div class="p-body"><ul class="qlist">${qs.map(q => qRow(q, kw)).join('') || '<li>没有找到相关的题。</li>'}</ul></div>`;
    bindQuestionList(render);
  };
  examView(null, render);
}
function showExamOverview() {
  const render = () => {
    const rows = activeStructs.map(s => [s, (qsByStruct.get(s.id) || []).length])
      .filter(r => r[1]).sort((a, b) => b[1] - a[1]);
    const max = rows.length ? rows[0][1] : 1;
    const bars = rows.map(([s, n]) => `<div class="bar-row" data-id="${s.id}" title="点开看${esc(s.name)}">
      <span class="bar-name">${esc(s.name)}</span><div class="bar"><i style="width:${(n / max * 100).toFixed(1)}%;background:${hex(s.color)}"></i></div><b>${n}</b></div>`).join('');
    panel.innerHTML = `
      <div class="p-head" style="border-color:#c7b48a">
        <div class="p-tag">北大347 · 2012–2026</div>
        <h2>真题里的大脑</h2>
        <div class="p-sub">${QUESTIONS.length} 道题中有 ${brainQs.length} 道可以在大脑上看机制</div>
      </div>
      <div class="p-body">
        <section><h3>📊 真题中涉及最多的脑区（点名字看该脑区）</h3>${bars}</section>
        <section><h3>💡 用法</h3><ul>
          <li>左边选年份，右边点带 🧠 的题目，展开它的脑机制，模型同时高亮相关脑区。</li>
          <li>金色高亮是更精细的部位（如中脑VTA、尾状核、眶额），带标签。</li>
          <li>统计、测量、管理等题不涉及脑机制，显示为灰色；勾选“只看涉及大脑的题”可隐藏。</li>
          <li>问到疾病的题，展开的是该病的病变机理；完整内容在「变态」选项卡。</li>
        </ul></section>
      </div>`;
    const back = { label: '真题里的大脑', fn: showExamOverview, navId: 'exam:overview' };
    panel.querySelectorAll('.bar-row[data-id]').forEach(r => r.onclick = () => selectStructure(structById.get(r.dataset.id), back));
  };
  examView('exam:overview', render);
}

// ---------- 变态选项卡：各类心理障碍的病变机理 ----------
function buildDisTab() {
  nav.innerHTML = '';
  for (const g of DISORDER_GROUPS) {
    const cat = document.createElement('div');
    cat.className = 'nav-cat'; cat.textContent = g.name;
    nav.appendChild(cat);
    for (const id of g.ids) {
      const d = disById.get(id);
      if (!d) continue;
      const n = (qsByDis.get(id) || []).length;
      nav.appendChild(navItem('dis:' + id, esc(d.name), n ? `${n}题` : null, () => selectDisorder(d)));
    }
  }
}
function openDisorder(d, back = null) {
  if (!d) return;
  if (currentTab !== 'dis') { setTab('dis'); buildDisTab(); }
  selectDisorder(d, back);
}
function selectDisorder(d, back = null) {
  backContext = back; currentStruct = null;
  showTargets(d.structs, d.fine || []);
  renderDisorderInfo(d);
  setNavActive('dis:' + d.id);
  if (!modelReady) pendingView = () => showTargets(d.structs, d.fine || []);
}
function renderDisorderInfo(d) {
  const group = DISORDER_GROUPS.find(g => g.ids.includes(d.id));
  const qs = qsByDis.get(d.id) || [];
  panel.innerHTML = `
    <div class="p-head" style="border-color:#c08a82">
      <div class="p-tag">变态专栏 · ${esc(group ? group.name : '')}</div>
      <h2>${esc(d.name)}<span class="en">（${esc(d.en)}）</span></h2>
      <div class="p-sub">${esc(d.core)}</div>
    </div>
    <div class="p-body">
      ${backBtnHtml()}
      <section><h3>🧠 相关脑区（已高亮）</h3><div class="chips">${structChips(d.structs, d.fine || [])}</div></section>
      <section><h3>🧬 病变机理</h3><ol class="mech-steps">${d.mech.map(t => `<li>${esc(t)}</li>`).join('')}</ol></section>
      <section><h3>💊 治疗如何作用于大脑</h3>${listHtml(d.treat)}</section>
      ${qs.length ? `<section><h3>📝 考过的真题（点开看）</h3><div class="chips">${qLinks(qs)}</div></section>` : ''}
    </div>`;
  bindBackBtn();
  const back = { label: d.name, fn: () => openDisorder(d), navId: 'dis:' + d.id };
  panel.querySelectorAll('.chip[data-id]').forEach(c => c.onclick = () => selectStructure(structById.get(c.dataset.id), back));
  bindRelated(back);
  panel.scrollTop = 0;
}

// ---------- 左右栏：可拖动调宽 + 一键收起/展开 ----------
const LW_DEFAULT = 210, RW_DEFAULT = 380;
const widths = { left: LW_DEFAULT, right: RW_DEFAULT };
const prevW = { left: LW_DEFAULT, right: RW_DEFAULT };
function setWidth(side, px) {
  px = Math.max(0, Math.min(side === 'right' ? 680 : 460, px));
  widths[side] = px;
  document.body.style.setProperty(side === 'left' ? '--lw' : '--rw', px + 'px');
  const btn = document.getElementById(side === 'left' ? 'toggleLeft' : 'toggleRight');
  const collapsed = px < 8;
  if (side === 'left') btn.textContent = collapsed ? '❯' : '❮';
  else btn.textContent = collapsed ? '❮' : '❯';
  requestAnimationFrame(resize);
}
function makeResizer(handleId, side) {
  const h = document.getElementById(handleId);
  let on = false;
  h.addEventListener('pointerdown', e => { on = true; h.classList.add('active'); h.setPointerCapture(e.pointerId); e.preventDefault(); });
  h.addEventListener('pointermove', e => {
    if (!on) return;
    setWidth(side, side === 'left' ? e.clientX : window.innerWidth - e.clientX);
  });
  const end = e => { if (on) { on = false; h.classList.remove('active'); try { h.releasePointerCapture(e.pointerId); } catch {} } };
  h.addEventListener('pointerup', end);
  h.addEventListener('pointercancel', end);
}
makeResizer('dragLeft', 'left');
makeResizer('dragRight', 'right');
function toggleSide(side) {
  if (widths[side] < 8) { setWidth(side, prevW[side] || (side === 'right' ? RW_DEFAULT : LW_DEFAULT)); }
  else { prevW[side] = widths[side]; setWidth(side, 0); }
}
document.getElementById('toggleLeft').onclick = () => toggleSide('left');
document.getElementById('toggleRight').onclick = () => toggleSide('right');

// ---------- 标签 ----------
const labelLayer = document.getElementById('labels');
let labelItems = [];
function buildLabels() {
  labelItems = activeStructs.filter(s => s._center).map(s => {
    const e = document.createElement('div');
    e.className = 'label'; e.textContent = s.name;
    e.onclick = () => selectStructure(s);
    labelLayer.appendChild(e);
    return { el: e, s };
  });
}
// 结构/网格的中文显示名（供悬停提示）
function meshLabel(o) {
  if (o.userData.struct) return o.userData.struct.name;
  const b = o.name.replace(/_\d+$/, '').replace(/_(l|r)$/i, '');
  return (ATLAS[b] && ATLAS[b].zh) || o.userData.label || o.name;
}
const hovtip = document.getElementById('hovtip');

const _v = new THREE.Vector3();
function projectLabels() {
  const r = el.getBoundingClientRect();
  const placed = [];
  // 把标签钉到三维位置；和已放好的标签重叠就往下挪，避免互相遮住
  const place = (le, center) => {
    _v.copy(center).project(camera);
    if (_v.z >= 1) { le.style.opacity = 0; return; }
    const x = (_v.x * .5 + .5) * r.width, w = le.offsetWidth || 60, h = 22;
    let y = (-_v.y * .5 + .5) * r.height;
    for (let k = 0; k < 12; k++) {
      const hit = placed.find(p => x < p.x + p.w && p.x < x + w && Math.abs(y - p.y) < h);
      if (!hit) break;
      y = hit.y + h;
    }
    placed.push({ x, y, w });
    le.style.transform = `translate(${x}px, ${y}px)`;
    le.style.opacity = 1;
  };
  // 只钉住"当前选中结构"的标签，其余不显示，避免密密麻麻
  for (const { el: le, s } of labelItems) {
    if (!selectedStructs.includes(s)) { le.style.opacity = 0; continue; }
    place(le, s._center);
  }
  for (const t of fineTargets) place(t.el, t.center);
}

// ---------- 循环 ----------
function resize() {
  const w = canvasWrap.clientWidth, h = canvasWrap.clientHeight;
  renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  if (modelReady) fitCameraToScene();
}
window.addEventListener('resize', resize); resize();
function loop() {
  updateCamera();
  if (modelReady) {
    const obj = dragging ? null : pick();
    if (obj !== hovered) {
      hovered = obj;
      el.style.cursor = obj ? 'pointer' : 'grab';
      if (obj) hovtip.textContent = meshLabel(obj);
    }
    if (hovered && !dragging) {
      hovtip.style.transform = `translate(${lastPx + 14}px, ${lastPy + 14}px)`;
      hovtip.style.opacity = 1;
    } else {
      hovtip.style.opacity = 0;
    }
    projectLabels();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
loop();
