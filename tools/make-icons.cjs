// アプリのアイコン（icon-192.png・icon-512.png）を作る。藍の夜空に月と、生成りの手帳に朱の印「聞」。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#1e2340"/>
      <circle cx="74" cy="22" r="10" fill="#f3e9cc"/><circle cx="70" cy="19" r="9" fill="#1e2340"/>
      <rect x="22" y="30" width="56" height="58" rx="4" fill="#fbf6ea"/><rect x="22" y="30" width="8" height="58" fill="#2d3f6b"/>
      <line x1="38" y1="46" x2="70" y2="46" stroke="#2a211830" stroke-width="2"/><line x1="38" y1="58" x2="70" y2="58" stroke="#2a211830" stroke-width="2"/>
      <circle cx="56" cy="70" r="13" fill="none" stroke="#a8321e" stroke-width="3"/>
      <text x="56" y="76" font-size="16" text-anchor="middle" fill="#a8321e" font-family="'Noto Serif CJK JP','Noto Sans CJK JP',serif" font-weight="900">聞</text></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
