# StatueMarket Demo Site

Static, interactive marketplace demo with Tailwind + vanilla JS + `<model-viewer>`.
- Single-page navigation (Home, Browse, Product, Sell, About)
- Product details with emoji placeholders
- **3D/AR preview uploader** (GLB/GLTF/USDZ) on the product page via `<model-viewer>`

## Deploy
1. Create a GitHub repo (public).
2. Add `index.html`, `styles.css`, `script.js` to the repo root.
3. Enable GitHub Pages (Settings → Pages → Deploy from branch).
4. Visit: https://<username>.github.io/<repo>/

## Notes
- Tailwind via CDN, no build step required.
- For AR: iOS uses USDZ (Quick Look), Android uses GLB (Scene Viewer). Desktop uses web viewer.
