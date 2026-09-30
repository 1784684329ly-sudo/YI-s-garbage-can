// ============================================================
//  心理学人体模型 · 真实解剖大脑（Z-Anatomy 导出的 brain.glb）
//  点击结构 -> 高亮 -> 弹信息卡；可剥开皮层看深部；信息可编辑。
// ============================================================
import * as THREE from 'three';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { STRUCTURES, SYSTEMS, STRUCTURE_TREE, FUNCTION_TREE, FUNCTIONS } from './data.js';
import { ATLAS } from './atlas.js';
import { SUBJECTS, TOPICS } from './exam.js';
import { QUESTIONS } from './questions.js';

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
  if (!layers.size) return;
  if (layers.has('deep') || layers.has('limbic')) fadeLayers.add('cortex');
  if (layers.has('deep')) fadeLayers.add('limbic');
}
let backContext = null;   // 从功能/集合卡点进单个结构时记住来源，便于返回
let pendingView = null;   // 模型没加载完时打开的真题视图，加载后重放以补上高亮
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
  { key: 'exam', label: '考研考点关联', icon: '🎯', type: 'list' },
];

// ---------- 真题考点（exam.js + questions.js）----------
const topicById = new Map(TOPICS.map(t => [t.id, t]));
const subjectById = new Map(SUBJECTS.map(s => [s.id, s]));
const qsByTopic = new Map(TOPICS.map(t => [t.id, []]));
for (const q of QUESTIONS) for (const id of q.topics) qsByTopic.get(id)?.push(q);
const topicsByStruct = new Map();
for (const t of TOPICS) for (const sid of t.structs) {
  if (!topicsByStruct.has(sid)) topicsByStruct.set(sid, []);
  topicsByStruct.get(sid).push(t);
}
const YEARS = [...new Set(QUESTIONS.map(q => q.year))].sort((a, b) => b - a);
const qsOf = t => qsByTopic.get(t.id) || [];
const yearsOf = t => [...new Set(qsOf(t).map(q => q.year))].sort((a, b) => b - a);

const EXAM_KEY = 'psychExamEdits_v1';
let examEdits = (() => { try { return JSON.parse(localStorage.getItem(EXAM_KEY)) || {}; } catch { return {}; } })();
function persistExam() { try { localStorage.setItem(EXAM_KEY, JSON.stringify(examEdits)); } catch {} }
function withTopicEdits(t) { return examEdits[t.id] ? { ...t, ...examEdits[t.id] } : t; }

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
      ${topicChipsSection(topicsByStruct.get(sRaw.id))}
    </div>`;
  if (backContext) document.getElementById('backBtn').onclick = backContext.fn;
  document.getElementById('editBtn').onclick = () => renderEdit(sRaw);
  bindTopicChips({ label: s.name, fn: () => selectStructure(sRaw), navId: sRaw.id });
  panel.scrollTop = 0;
}
// 「📝 真题考点」小节：考点 chip，点开进考点卡（可返回）
function topicChipsSection(topics) {
  if (!topics || !topics.length) return '';
  const n = new Set(topics.flatMap(t => qsOf(t).map(q => q.id))).size;
  const chips = topics.map(t =>
    `<button class="chip" data-topic="${t.id}">${esc(t.name)}<span class="cnt">${qsOf(t).length}题</span></button>`).join('');
  return `<section><h3>📝 北大347真题考点（${topics.length}个考点 · ${n}道题）</h3><div class="chips">${chips}</div></section>`;
}
function bindTopicChips(back) {
  panel.querySelectorAll('[data-topic]').forEach(c =>
    c.onclick = () => selectTopic(topicById.get(c.dataset.topic), back));
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
      ${topicChipsSection((f.topics || []).map(id => topicById.get(id)).filter(Boolean))}
    </div>`;
  document.getElementById('funcEditBtn').onclick = () => renderFuncEdit(f);
  const back = { label: f.name, fn: () => selectFunction(f), navId: 'fn:' + f.id };
  panel.querySelectorAll('.chip[data-id]').forEach(c =>
    c.onclick = () => selectStructure(structById.get(c.dataset.id), back));
  bindTopicChips(back);
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
// 导出三类修改：结构卡/网格补充、功能分组、真题考点笔记。旧版只导出了结构卡。
document.getElementById('exportBtn').onclick = () => {
  const data = { app: 'psych-model', version: 2, structEdits: userEdits, funcStore, examEdits };
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
        examEdits = data.examEdits || {};
        persistFunc(); persistExam();
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

// ---------- 侧栏目录：两个选项卡（按结构 / 按功能） ----------
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
  else buildExamTab();
}
document.getElementById('tab-struct').onclick = () => { setTab('struct'); buildStructureTab(); };
document.getElementById('tab-func').onclick = () => { setTab('func'); buildFunctionTab(); };
document.getElementById('tab-exam').onclick = () => { setTab('exam'); buildExamTab(); showExamOverview(); };
function setTab(which) {
  currentTab = which;
  for (const t of ['struct', 'func', 'exam'])
    document.getElementById('tab-' + t).classList.toggle('active', which === t);
}
setTab('struct'); buildStructureTab();

// ---------- 真题选项卡：按考点 / 按年份 + 搜索 ----------
let examMode = 'topic', examQuery = '';
function buildExamTab() {
  nav.innerHTML = '';
  const tools = document.createElement('div');
  tools.className = 'exam-tools';
  tools.innerHTML = `
    <div class="subtabs">
      <button class="subtab" data-m="topic">按考点</button>
      <button class="subtab" data-m="year">按年份</button>
    </div>
    <input class="search" id="examSearch" type="search" placeholder="🔍 搜题目或考点，如：强化、效度">`;
  nav.appendChild(tools);
  tools.querySelectorAll('.subtab').forEach(b => {
    b.classList.toggle('active', b.dataset.m === examMode);
    b.onclick = () => { examMode = b.dataset.m; examQuery = ''; buildExamTab(); };
  });
  const inp = tools.querySelector('#examSearch');
  inp.value = examQuery;
  let timer = 0;
  inp.oninput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      examQuery = inp.value.trim();
      fillExamList();
      if (examQuery) showSearch(examQuery); else showExamOverview();
    }, 200);
  };
  const list = document.createElement('div');
  list.id = 'examList';
  nav.appendChild(list);
  fillExamList();
}
function topicMatches(t, kw) {
  const tt = withTopicEdits(t);
  return [tt.name, ...(tt.points || []), ...(tt.notes || []), ...qsOf(t).map(q => q.text)]
    .some(s => String(s).toLowerCase().includes(kw));
}
function fillExamList() {
  const list = document.getElementById('examList');
  if (!list) return;
  list.innerHTML = '';
  const kw = examQuery.toLowerCase();
  if (!kw) {
    const ov = document.createElement('div');
    ov.className = 'nav-item'; ov.dataset.id = 'exam:overview';
    ov.textContent = '📊 考情总览';
    ov.onclick = showExamOverview;
    list.appendChild(ov);
  }
  if (examMode === 'year' && !kw) {
    for (const y of YEARS) {
      const item = document.createElement('div');
      item.className = 'nav-item'; item.dataset.id = 'yr:' + y;
      item.innerHTML = `<span class="nm">${y} 年</span><span class="badge">${QUESTIONS.filter(q => q.year === y).length}题</span>`;
      item.onclick = () => showYear(y);
      list.appendChild(item);
    }
    return;
  }
  let shown = 0;
  for (const sub of SUBJECTS) {
    const tps = TOPICS.filter(t => t.subject === sub.id && (!kw || topicMatches(t, kw)));
    if (!tps.length) continue;
    const n = new Set(tps.flatMap(t => qsOf(t).map(q => q.id))).size;
    const cat = document.createElement('div');
    cat.className = 'nav-cat clickable';
    cat.innerHTML = `${sub.name}<span class="cat-hint">${n}题 · 点击看全部</span>`;
    cat.onclick = () => showSubject(sub, tps);
    list.appendChild(cat);
    let ch = null;
    for (const t of tps) {
      if (t.ch && t.ch !== ch) {
        ch = t.ch;
        const h = document.createElement('div'); h.className = 'nav-head'; h.textContent = ch;
        list.appendChild(h);
      }
      list.appendChild(topicItem(t));
      shown++;
    }
  }
  if (kw && !shown) list.insertAdjacentHTML('beforeend', '<div class="empty-hint">没有匹配的考点</div>');
}
function topicItem(t) {
  const item = document.createElement('div');
  item.className = 'nav-item'; item.dataset.id = 'tp:' + t.id;
  item.innerHTML = `<span class="nm">${t.structs.length ? '<span title="关联脑区，点开会高亮">🧠 </span>' : ''}${esc(t.name)}</span>` +
    `<span class="badge">${qsOf(t).length}题</span><div class="nav-sub">${yearsOf(t).join(' · ')}</div>`;
  item.onclick = () => selectTopic(t);
  return item;
}

// 选中考点：关联脑区一起高亮 + 考点卡
function selectTopic(t, back = null) {
  if (!t) return;
  backContext = back;
  clearHighlight();
  selectedStructs = t.structs.map(id => structById.get(id)).filter(Boolean);
  for (const st of selectedStructs) for (const m of (st._meshes || [])) highlightMesh(m, st.color);
  computeFade(); applyLayers(); renderTopicInfo(t);
  setNavActive(back ? back.navId : 'tp:' + t.id);
  if (!modelReady) pendingView = () => selectTopic(t, back);
}
// 不涉及脑区的真题视图（总览/年份/科目/搜索）：清空高亮，只换右栏
function showExamView(navId, render) {
  backContext = null;
  clearHighlight(); applyLayers(); setNavActive(navId);
  currentStruct = null;
  render();
  panel.scrollTop = 0;
  if (!modelReady) pendingView = () => {};
}
function hl(text, kw) {
  const s = esc(text);
  if (!kw) return s;
  const k = esc(kw).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return s.replace(new RegExp(k, 'gi'), m => `<mark>${m}</mark>`);
}
// 一道题：年份题号分值科目 + 题干 + 涉及的（其他）考点
function qHtml(q, exceptId = null, kw = '') {
  const others = q.topics.filter(id => id !== exceptId).map(id => topicById.get(id)).filter(Boolean);
  const chips = others.map(t => `<button class="chip sm" data-topic="${t.id}">${esc(t.name)}</button>`).join('');
  return `<li>
    <div class="qmeta"><b>${q.year}年 第${esc(q.no)}题</b><span>${q.score}分</span><span class="qsub">${esc(q.subject)}</span></div>
    <p>${hl(q.text, kw)}</p>
    ${chips ? `<div class="chips qtopics"><span class="qlabel">${exceptId ? '也涉及' : '考点'}</span>${chips}</div>` : ''}
  </li>`;
}
function renderTopicInfo(tRaw) {
  currentStruct = null;
  const t = withTopicEdits(tRaw);
  const sub = subjectById.get(t.subject);
  const qs = qsOf(tRaw);
  const structs = tRaw.structs.map(id => structById.get(id)).filter(Boolean);
  const chips = structs.map(s =>
    `<button class="chip" data-id="${s.id}"><span class="dot" style="background:${hex(s.color)}"></span>${esc(s.name)}</button>`).join('');
  panel.innerHTML = `
    <div class="p-head" style="border-color:#c7b48a">
      <div class="p-tag">真题考点 · ${esc(sub ? sub.name : '')}${t.ch ? ' · ' + esc(t.ch) : ''}</div>
      <h2>${esc(t.name)}</h2>
      <div class="p-sub">考过 ${qs.length} 题：${yearsOf(tRaw).join('、')}</div>
    </div>
    <div class="p-body">
      ${backContext ? `<button class="back-btn" id="backBtn">← 返回「${esc(backContext.label)}」</button>` : ''}
      <div class="edit-bar"><button id="topicEditBtn">✏️ 修改要点 / 写笔记</button></div>
      ${structs.length ? `<section><h3>🧠 相关脑区（已高亮，点开看单个）</h3><div class="chips">${chips}</div></section>` : ''}
      <section><h3>📚 核心要点</h3>${listHtml(t.points)}</section>
      ${t.notes && t.notes.length ? `<section><h3>📝 我的笔记</h3>${listHtml(t.notes)}</section>` : ''}
      <section><h3>🗂 历年真题（${qs.length}）</h3><ul class="qlist">${qs.map(q => qHtml(q, tRaw.id)).join('')}</ul></section>
    </div>`;
  if (backContext) document.getElementById('backBtn').onclick = backContext.fn;
  document.getElementById('topicEditBtn').onclick = () => renderTopicEdit(tRaw);
  const back = { label: t.name, fn: () => selectTopic(tRaw), navId: 'tp:' + tRaw.id };
  panel.querySelectorAll('.chip[data-id]').forEach(c =>
    c.onclick = () => selectStructure(structById.get(c.dataset.id), back));
  bindTopicChips(back);
  panel.scrollTop = 0;
}
function renderTopicEdit(t) {
  const cur = withTopicEdits(t);
  panel.innerHTML = `
    <div class="p-head" style="border-color:#c7b48a"><div class="p-tag">编辑考点</div><h2>${esc(t.name)}</h2>
      <div class="p-sub">改完点保存，存在本浏览器；可用右上角“导出”备份。</div></div>
    <div class="p-body">
      <div class="fld"><label>📚 核心要点 <span class="fhint">每行一条</span></label>
        <textarea id="tp-points" rows="${Math.min(24, Math.max(6, cur.points.length * 3))}">${esc(cur.points.join('\n'))}</textarea></div>
      <div class="fld"><label>📝 我的笔记 <span class="fhint">每行一条，如答题框架、易错点</span></label>
        <textarea id="tp-notes" rows="5">${esc((cur.notes || []).join('\n'))}</textarea></div>
      <div class="edit-actions">
        <button id="tpSave" class="primary">💾 保存</button>
        <button id="tpCancel">取消</button>
        ${examEdits[t.id] ? '<button id="tpReset" class="ghost">恢复默认</button>' : ''}
      </div></div>`;
  const lines = id => document.getElementById(id).value.split('\n').map(x => x.trim()).filter(Boolean);
  document.getElementById('tpSave').onclick = () => {
    const points = lines('tp-points'), edit = { notes: lines('tp-notes') };
    if (points.join('\n') !== t.points.join('\n')) edit.points = points;   // 没改要点就不存，默认内容更新时能跟上
    examEdits[t.id] = edit; persistExam(); renderTopicInfo(t);
  };
  document.getElementById('tpCancel').onclick = () => renderTopicInfo(t);
  const rst = document.getElementById('tpReset');
  if (rst) rst.onclick = () => { delete examEdits[t.id]; persistExam(); renderTopicInfo(t); };
  panel.scrollTop = 0;
}
function showYear(y) {
  showExamView('yr:' + y, () => {
    const qs = QUESTIONS.filter(q => q.year === y);
    const total = qs.reduce((a, q) => a + q.score, 0);
    panel.innerHTML = `
      <div class="p-head" style="border-color:#8ea3b0">
        <div class="p-tag">历年真题</div>
        <h2>${y} 年</h2>
        <div class="p-sub">共 ${qs.length} 题 · 合计 ${total} 分${total > 300 ? '（含选做题）' : ''}</div>
      </div>
      <div class="p-body"><section><ul class="qlist">${qs.map(q => qHtml(q)).join('')}</ul></section></div>`;
    bindTopicChips({ label: `${y} 年真题`, fn: () => showYear(y), navId: 'yr:' + y });
  });
}
function showSubject(sub, tps) {
  showExamView(null, () => {
    const n = new Set(tps.flatMap(t => qsOf(t).map(q => q.id))).size;
    const secs = tps.map(t => `<section><h3><button class="link" data-topic="${t.id}">${esc(t.name)} ›</button></h3>
      <ul class="qlist">${qsOf(t).map(q => qHtml(q, t.id, examQuery)).join('')}</ul></section>`).join('');
    panel.innerHTML = `
      <div class="p-head" style="border-color:#8ea3b0">
        <div class="p-tag">科目</div><h2>${esc(sub.name)}</h2>
        <div class="p-sub">${tps.length} 个考点 · ${n} 道题（一题可能涉及多个考点）</div>
      </div>
      <div class="p-body">${secs}</div>`;
    bindTopicChips({ label: sub.name, fn: () => showSubject(sub, tps), navId: null });
  });
}
function showSearch(kw) {
  showExamView(null, () => {
    const k = kw.toLowerCase();
    const tps = TOPICS.filter(t => topicMatches(t, k));
    const qs = QUESTIONS.filter(q => q.text.toLowerCase().includes(k) ||
      q.topics.some(id => topicById.get(id)?.name.toLowerCase().includes(k)));
    const chips = tps.map(t => `<button class="chip" data-topic="${t.id}">${esc(t.name)}<span class="cnt">${qsOf(t).length}题</span></button>`).join('');
    panel.innerHTML = `
      <div class="p-head" style="border-color:#8ab4ff">
        <div class="p-tag">搜索</div><h2>“${esc(kw)}”</h2>
        <div class="p-sub">${tps.length} 个考点 · ${qs.length} 道题</div>
      </div>
      <div class="p-body">
        <section><h3>🧩 相关考点</h3><div class="chips">${chips || '<span style="color:var(--muted)">无</span>'}</div></section>
        <section><h3>🗂 题目</h3><ul class="qlist">${qs.map(q => qHtml(q, null, kw)).join('') || '<li>没有题目直接包含这个词，可以看上面的相关考点。</li>'}</ul></section>
      </div>`;
    bindTopicChips({ label: `搜索“${kw}”`, fn: () => showSearch(kw), navId: null });
  });
}
function showExamOverview() {
  showExamView('exam:overview', () => {
    const cnt = {};
    for (const q of QUESTIONS) cnt[q.subject] = (cnt[q.subject] || 0) + 1;
    const max = Math.max(...Object.values(cnt));
    const bars = Object.entries(cnt).sort((a, b) => b[1] - a[1]).map(([k, v]) =>
      `<div class="bar-row"><span>${esc(k)}</span><div class="bar"><i style="width:${(v / max * 100).toFixed(1)}%"></i></div><b>${v}</b></div>`).join('');
    const top = [...TOPICS].sort((a, b) => qsOf(b).length - qsOf(a).length || yearsOf(b)[0] - yearsOf(a)[0]).slice(0, 12);
    const chips = top.map(t => `<button class="chip" data-topic="${t.id}">${esc(t.name)}<span class="cnt">${qsOf(t).length}题</span></button>`).join('');
    const brainN = TOPICS.filter(t => t.structs.length).length;
    panel.innerHTML = `
      <div class="p-head" style="border-color:#c7b48a">
        <div class="p-tag">北大347 · 心理学专业综合</div>
        <h2>考情总览</h2>
        <div class="p-sub">${YEARS[YEARS.length - 1]}–${YEARS[0]} 年 · ${QUESTIONS.length} 道题 · ${TOPICS.length} 个考点</div>
      </div>
      <div class="p-body">
        <section><h3>📊 各科题量（按真题表里的科目标签）</h3>${bars}</section>
        <section><h3>🔥 考得最多的考点</h3><div class="chips">${chips}</div></section>
        <section><h3>🧠 能在大脑上看的考点（${brainN} 个）</h3>
          <p>左栏带 🧠 的考点关联了脑区，点开后这些脑区会在模型上高亮；统计、测量、实验设计、管理等考点不涉及脑区，只显示要点和真题。</p></section>
        <section><h3>💡 用法</h3><ul>
          <li>按考点：科目 → 考点，每个考点有核心要点和它考过的全部真题。</li>
          <li>按年份：一年一年刷整套题，每题下面能跳到对应考点。</li>
          <li>搜索：输入关键词（如“强化”“效度”）同时找题目和考点。</li>
          <li>结构卡和功能卡底部也列出了相关的真题考点。</li>
        </ul></section>
      </div>`;
    bindTopicChips({ label: '考情总览', fn: showExamOverview, navId: 'exam:overview' });
  });
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
  // 只钉住"当前选中结构"的标签，其余不显示，避免密密麻麻
  for (const { el: le, s } of labelItems) {
    if (!selectedStructs.includes(s)) { le.style.opacity = 0; continue; }
    _v.copy(s._center).project(camera);
    le.style.transform = `translate(${(_v.x * .5 + .5) * r.width}px, ${(-_v.y * .5 + .5) * r.height}px)`;
    le.style.opacity = _v.z < 1 ? 1 : 0;
  }
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
