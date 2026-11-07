// SNS で貼られたときの絵（og.png 1200×630）を作る。今日の問題（答え）は入れず、遊び方の例（手がかりの札）だけ。
// 使い方: node tools/make-og.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const clue = (n, t) => `<div style="display:flex;gap:18px;align-items:center;background:#fff;border:3px solid #2a211826;border-radius:16px;padding:16px 22px;font-size:34px;color:#2a2118"><span style="width:52px;height:52px;border-radius:50%;background:#a8321e;color:#fff;display:grid;place-items:center;font-weight:900">${n}</span>${t}</div>`;
  await p.setContent(`<body style="margin:0;font-family:'Noto Serif CJK JP','Noto Sans CJK JP',serif">
  <div style="width:1200px;height:630px;box-sizing:border-box;padding:56px 72px;background:linear-gradient(180deg,#141830,#1e2340);color:#f3e9cc;position:relative">
    <div style="position:absolute;right:90px;top:60px;width:110px;height:110px;border-radius:50%;background:#f3e9cc;box-shadow:-26px 10px 0 0 #141830 inset"></div>
    <div style="font-size:32px;letter-spacing:.1em;color:#e6dcc0">妖怪と神話の正体を当てる</div>
    <div style="font-size:112px;font-weight:900;letter-spacing:.14em;margin-top:4px">ききがき手帳</div>
    <div style="display:flex;flex-direction:column;gap:16px;margin-top:30px;width:860px">${clue("一", "深い山に住み、空を飛ぶといわれる。")}${clue("二", "？ まだ聞いていない")}</div>
  </div></body>`);
  await p.screenshot({ path: path.join(__dirname, "..", "og.png") });
  await b.close();
})();
