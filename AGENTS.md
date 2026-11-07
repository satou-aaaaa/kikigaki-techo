# AGENTS.md

ききがき手帳：村の人や古い書物の「手がかり」を1つずつ聞いて、妖怪・日本の神話・世界の神話の正体を4つから当てる1日5問の学習ゲーム。`index.html` と `data.js`（正体103と手がかり・出典・問題の作り方）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

## push する前の確認

```bash
node qa/run.mjs   # データの形・選び肢（全部の正体×300）・今日の5問と上級（3年分・過去の日が変わらない）・とことんと練習の並び（何百回）・通しで遊ぶ・続きから・上級・練習・とことん・ききがき帳・実績・カレンダー・あとから・古いタブ・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身（`data.js` の `D`）は出典（`src`）の書物・伝承で確かめたものだけ。手がかり `c` は3つ（1つ目はぼんやり、3つ目で決まる）・45字以内・答えの名前を書かない。説明 `why` は80字以内。出典が分かれる話は、よく知られた形にして `why` か `src` に一言書く。作り話で正体を足さない。
- 正体は最後に足すだけにし、並べかえ・途中の削除をしない。今日の5問・上級の組み方（`dailyTags`・`hardTags`）を変えない（過去の日の問題が変わる。QA が `qa/daily-snapshot.json` の120日分と比べる。足したら snapshot は変わらないはず。変わったら作り方を直す）。
- 同じ話の仲間（手がかりが両方に当てはまりうるもの。例：イザナギとイザナミ、メドゥーサとペルセウス）には同じ `g` を付ける。同じ `g` は選び肢に並べない（QA が見る）。
- 今日の5問は日本時間の日付の種で、だれでも同じ。きのうの5問と重ねない（`dailyIds` が始まりの日から順に作る）。上級は各分野のむずかしいを1つずつ・今日の5問と重ねない・手がかり2つから・聞き足しなし。`Math.random` は練習・とことんの並びと回の名札だけ（QA が数を見る）。乱数は sort の比較の中で引かない。
- ★はまちがい＋聞き足した手がかりの数（0で★3・1で★2・2以上で★1）。時間制限は付けない。今日の5問・上級は1日1回で、途中で閉じても続きから。途中経過はモードごとに `runs.d`・`runs.h`・`runs.p`・`runs.e`・`runs["a:日付"]`。答える前に保存した進み具合が画面と同じ問題か（`same`）確かめ、手がかり・まちがいの数は別のタブの分より減らさない（`keep`）。`load` は合わせる前に両側を `fresh()` で補い、`tidy` で形を直す（shared-workflows `incidents/2026-11-04-daily-game-save-gaps.md`）。
- 好きなだけ遊べる：チケット・残りの命・回数制限・🔒で開くモードを入れない（QA が見る）。上級・とことん・練習は、はじめての日から押せる。とことん（`runs.e`）は全部の正体をやさしい→ふつう→むずかしいの順に毎回ちがう並びで出し、使い切る前に新しい並びを足す（つなぎ目で同じ正体を続けない）。まちがえても終わらず「ここで降りる」まで。自己ベスト `ebest` はまちがえずに当てた数。練習はまだ当てていない正体から。
- ききがき帳（`dex`）：まだ当てていない正体は影と「？？？」で、名前を出さない。押すと手がかり・説明・出典を読み返せる。
- 実績（`ACH`、14個）はいまの記録から毎回数える。続けるは合計の日数（`playedDays`）、連続は1日以上のときだけ出す。取りこぼした日（過去7日・`EPOCH` から）はカレンダーからあとから遊べ、`adays` に入れて連続・今日の記録・Ko-fi・シェアには数えない。
- 共有は遊ぶ人が押したときに開くリンク（X・LINE・Web Share・コピー）だけ。シェアの文に正体の名前（答え）を出さない（QA が見る）。
- ほかの作品の名前・キャラ・見た目・設定を使わない（神話・伝承そのものは使ってよい）。お笑いの言葉は入れない。役割や性別を決めつけない（`qa/a11y.mjs` の WORDS。神話の原文の言い方も、手がかりではやさしく言いかえる）。
- 感想は「感想を送る」から GitHub の Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。名前・メールは聞かない。
- 応援は Ko-fi（https://ko-fi.com/satouaaaaa）へのただのリンクだけ。今日の5問・上級を初めて、全部ひと声（★3）で終えたときだけ、結果の画面の下に1行。遊ぶのは無料のまま。
- 外へ通信しない。外から読むのは Google Fonts の文字だけ（CSP の `connect-src 'self'` を広げない）。記録は遊ぶ人のブラウザ（localStorage `kikigaki-v1`）だけ。
- 見やすさ：`</head>` の前の見やすさの設定（`<!-- a11y:begin -->`〜`end`）は shared-workflows `template/a11y/a11y.html` の写し、`qa/a11y.mjs` も `template/qa/a11y.mjs` の写しで、ここでは直さない。色だけで分けない（まちがいは ✕ と破線、正体は ✓、まだの手がかりは点線、★は ☆ と並べる）。手がかりは `#clues`（aria-live）に「手がかり一：」から読ませる。
- 引き継ぎ：`transfer.js` と `qa/transfer-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。`data-keys` は `kikigaki-v1`。記録の形を変えたら QA の `sample` も合わせる。
- 一行に書いた処理の途中にコメント `//` を足さない。少し遅れて動く処理（setTimeout）は、画面が替わっていたら何もしない。
- 機能を足す・直すたびに `qa/run.mjs` に検査を足す。乱数で組む部分は何百回・何年分も作って確かめる（shared-workflows `incidents/2026-10-31-roppo-empty-village.md`）。
- PWA（`manifest.webmanifest`・`sw.js`・`icon-*.png`）：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、SNS 用の絵 `og.png` は `node tools/make-og.cjs`（今日の正体を入れない）。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを待ち、手でマージする直前に今の head へのレビューを読み直す（shared-workflows `incidents/2026-11-01-roppo-merged-before-review.md`）。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
