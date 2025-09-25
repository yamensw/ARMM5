// Simple SPA navigation + product rendering + AR preview using <model-viewer>

// Product data
const products = {
  1:{name:"Classical Venus",price:"$2,450",material:"Marble",description:"A stunning reproduction of the famous Venus de Milo, crafted from premium Carrara marble. This piece captures the timeless beauty and grace of the original masterpiece, making it perfect for collectors and art enthusiasts.",dimensions:"Height: 24 in · Width: 12 in · Depth: 8 in",weight:"45 lbs",seller:"Renaissance Reproductions",emoji:"🗿",gradient:"from-amber-100 to-amber-200"},
  2:{name:"Majestic Eagle",price:"$1,850",material:"Bronze",description:"A powerful bronze sculpture depicting an eagle in full flight. Cast using traditional lost-wax techniques, this piece showcases incredible detail.",dimensions:"Height: 18 in · Wingspan: 22 in · Depth: 10 in",weight:"28 lbs",seller:"Wildlife Bronze Studio",emoji:"🦅",gradient:"from-gray-100 to-gray-200"},
  3:{name:"Garden Nymph",price:"$890",material:"Stone",description:"An elegant stone figure perfect for garden decoration. Hand-carved from durable limestone.",dimensions:"Height: 36 in · Width: 14 in · Depth: 12 in",weight:"85 lbs",seller:"Garden Art Collective",emoji:"🌿",gradient:"from-green-100 to-green-200"},
  4:{name:"Royal Lion",price:"$3,200",material:"Marble",description:"A majestic marble lion sculpture symbolizing strength and nobility.",dimensions:"Height: 20 in · Length: 28 in · Width: 16 in",weight:"65 lbs",seller:"Majestic Sculptures",emoji:"👑",gradient:"from-purple-100 to-purple-200"},
  5:{name:"Racing Horse",price:"$2,750",material:"Bronze",description:"A dynamic bronze sculpture capturing a horse in full gallop.",dimensions:"Height: 22 in · Length: 26 in · Width: 8 in",weight:"42 lbs",seller:"Equestrian Arts",emoji:"🐎",gradient:"from-blue-100 to-blue-200"},
  6:{name:"Ancient Vase",price:"$650",material:"Ceramic",description:"A beautiful ceramic replica of ancient Greek pottery.",dimensions:"Height: 16 in · Diameter: 10 in",weight:"8 lbs",seller:"Classical Ceramics",emoji:"🏺",gradient:"from-red-100 to-red-200"}
};

// Page navigation
export function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const page = document.getElementById(`${pageName}-page`);
  if (page) { page.classList.remove('hidden'); page.classList.add('fade-in'); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.showPage = showPage;

// Product detail render
export function showProduct(id) {
  const p = products[id];
  if (!p) return;
  const left = (id === 4)
    ? `
      <div>
        <div class="rounded-xl overflow-hidden shadow mb-6">
          <iframe src="https://poly.cam/capture/E3F7D015-70D7-4AE0-83CA-18DDAE402668/embed" title="Polycam capture viewer" style="height:100%;width:100%;max-height:720px;max-width:1280px;min-height:280px;min-width:280px" frameborder="0"></iframe>
        </div>
      </div>`
    : `
      <div>
        <div class="h-96 bg-gradient-to-br ${p.gradient} rounded-xl flex items-center justify-center mb-6">
          <div class="text-8xl">${p.emoji}</div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="h-24 bg-gradient-to-br ${p.gradient} rounded-lg flex items-center justify-center"><div class="text-2xl">${p.emoji}</div></div>
          <div class="h-24 bg-gradient-to-br ${p.gradient} rounded-lg flex items-center justify-center"><div class="text-2xl">${p.emoji}</div></div>
          <div class="h-24 bg-gradient-to-br ${p.gradient} rounded-lg flex items-center justify-center"><div class="text-2xl">${p.emoji}</div></div>
        </div>
      </div>`;
  const html = `
    ${left}
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-4">${p.name}</h1>
      <div class="text-3xl font-bold text-blue-600 mb-6">${p.price}</div>
      <div class="space-y-4 mb-8">
        <div class="flex justify-between py-2 border-b border-gray-200"><span class="font-medium">Material:</span><span>${p.material}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-200"><span class="font-medium">Dimensions:</span><span class="text-right">${p.dimensions}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-200"><span class="font-medium">Weight:</span><span>${p.weight}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-200"><span class="font-medium">Seller:</span><span>${p.seller}</span></div>
      </div>
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-3">Description</h3>
        <p class="text-gray-700 leading-relaxed">${p.description}</p>
      </div>
      <div class="space-y-4">
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">Add to Cart</button>
        <button class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors">Contact Seller</button>
        <div class="flex space-x-4">
          <button class="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 rounded-lg font-medium transition-colors">❤️ Save</button>
          <button class="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 rounded-lg font-medium transition-colors">📤 Share</button>
        </div>
      </div>
    </div>`;
  document.getElementById('product-content').innerHTML = html;
  showPage('product');
  // Ensure AR widget is bound
  bindARUpload();
}
window.showProduct = showProduct;

// Sell form
export function handleSellForm(e) {
  e.preventDefault();
  alert('Thank you for your submission! Your statue listing will be reviewed and published within 24 hours.');
}
window.handleSellForm = handleSellForm;

// AR upload binding
function bindARUpload() {
  const file = document.getElementById('arFile');
  const preview = document.getElementById('arPreview');
  if (!file || !preview) return;
  file.onchange = () => {
    const f = file.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    preview.innerHTML = `<model-viewer src="${url}" camera-controls ar ar-modes="webxr scene-viewer quick-look" shadow-intensity="0.9" exposure="1.0"></model-viewer>`;
  };
}

// Init
showPage('home');


// ---- Robust AR uploader binding & status ----
function ensureARBinder() {
  bindARUpload();
  // Re-bind when the user navigates around (simple heuristic)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(bindARUpload, 50));
  });
}
window.addEventListener('DOMContentLoaded', ensureARBinder);

function bindARUpload() {
  const file = document.getElementById('arFile');
  const preview = document.getElementById('arPreview');
  if (!file || !preview) return;

  if (file.__bound) return; // prevent multiple bindings
  file.__bound = true;

  file.onchange = () => {
    const f = file.files?.[0];
    if (!f) return;

    // Basic size hint
    if (f.size > 80 * 1024 * 1024) {
      preview.innerHTML = '<div class="p-6 text-center text-amber-600">This file is large (' + (f.size/1048576).toFixed(1) + ' MB). It may take a while to load.</div>';
    } else {
      preview.innerHTML = '<div class="p-6 text-center text-gray-500 animate-pulse">Loading model…</div>';
    }

    const url = URL.createObjectURL(f);
    const mv = document.createElement('model-viewer');
    mv.setAttribute('src', url);
    mv.setAttribute('camera-controls', '');
    mv.setAttribute('ar', '');
    mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
    mv.setAttribute('shadow-intensity', '0.9');
    mv.setAttribute('exposure', '1.0');
    mv.addEventListener('load', () => {
      preview.innerHTML = '';
      preview.appendChild(mv);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    });
    mv.addEventListener('error', (e) => {
      console.error('model-viewer error:', e);
      preview.innerHTML = '<div class="p-6 text-center text-red-600">Could not load this model. Try a smaller GLB/GLTF/USDZ, or ensure GLTF is self-contained (GLB).</div>';
    });

    try {
      setTimeout(() => {
        if (!mv.model) {
          console.warn('Model not yet loaded; still waiting…');
        }
      }, 1500);
    } catch (err) {
      console.error('Viewer init error:', err);
      preview.innerHTML = '<div class="p-6 text-center text-red-600">Viewer init error. Check console for details.</div>';
    }
  };
}


// Ensure the Home hero button always works, even if inline handlers are blocked.
window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnStartBrowsing');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      try { showPage('browse'); } catch (err) { console.error('showPage error', err); }
    });
  }
});
