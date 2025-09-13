# 🌟 栄養素チャレンジ！ - Kids Nutrition Game

子供が楽しく栄養について学べるインタラクティブなWebゲームです。食べ物をクリックして、8つの必須栄養素をMAXにしましょう！

## 🎮 デモ

[ここでプレイ！](https://Mr-akami.github.io/nutrients-diagram/)

## ✨ 特徴

- 🎯 **ダーツ式の栄養素チャート** - 扇形に塗りつぶされていくビジュアル
- 🍎 **8種類の食材** - それぞれ異なる栄養素を持つ食材たち
- 🎨 **カラフルなアニメーション** - クリック時の楽しい演出
- 🎊 **豪華な完了演出** - 全栄養素MAX時の花火と紙吹雪
- 🔊 **効果音** - クリック時のサウンドエフェクト
- 📱 **レスポンシブデザイン** - スマホ・タブレット対応

## 🥗 栄養素

- タンパク質 🥩
- ビタミンA 🥕
- ビタミンC 🍊
- ビタミンD 🐟
- カルシウム 🥛
- 鉄分 🥬
- 食物繊維 🌾
- 炭水化物 🍚

## 🍽️ 食材と含まれる栄養素

| 食材 | 含まれる栄養素 |
|------|--------------|
| 🥦 ブロッコリー | ビタミンC、食物繊維、ビタミンA |
| 🥩 豚肉 | タンパク質、鉄分、ビタミンD |
| 🐟 さかな | タンパク質、ビタミンD、カルシウム |
| 🥕 にんじん | ビタミンA、食物繊維、炭水化物 |
| 🥛 牛乳 | カルシウム、タンパク質、ビタミンD |
| 🍚 ごはん | 炭水化物、食物繊維、鉄分 |
| 🍊 オレンジ | ビタミンC、食物繊維、炭水化物 |
| 🥬 ほうれん草 | 鉄分、ビタミンA、カルシウム |

## 🚀 GitHub Pagesで公開する方法

1. **リポジトリを作成**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: 栄養素チャレンジゲーム"
   ```

2. **GitHubにプッシュ**
   ```bash
   git remote add origin https://github.com/yourusername/nutrients-diagram.git
   git branch -M main
   git push -u origin main
   ```

3. **GitHub Pagesを有効化**
   - GitHubのリポジトリページを開く
   - Settings → Pages へ移動
   - Source: Deploy from a branch を選択
   - Branch: main を選択
   - Folder: / (root) を選択
   - Save をクリック

4. **公開URLを確認**
   - 数分待つと `https://yourusername.github.io/nutrients-diagram/` でアクセス可能に

## 🛠️ ローカルで実行

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/nutrients-diagram.git

# ディレクトリに移動
cd nutrients-diagram

# ブラウザで開く（Python 3）
python -m http.server 8000

# または（Python 2）
python -m SimpleHTTPServer 8000

# ブラウザで http://localhost:8000 にアクセス
```

## 📁 プロジェクト構造

```
nutrients-diagram/
├── index.html          # メインHTML
├── css/
│   └── style.css      # スタイルシート
├── js/
│   ├── main.js        # メインロジック
│   ├── dartschart.js  # ダーツチャート描画
│   └── animation.js   # アニメーション効果
└── README.md          # このファイル
```

## 🎯 遊び方

1. 右側の食材ボタンをクリック
2. その食材に含まれる栄養素が+1される
3. 各栄養素は3段階（レベル1〜3）
4. すでにMAXの栄養素をクリックすると色が変化
5. 全ての栄養素をMAXにすると盛大にお祝い！
6. 「もう一度チャレンジ！」でリセット

## 📝 ライセンス

MIT License

## 🙏 クレジット

- Chart rendering: Canvas API
- Confetti animation: [canvas-confetti](https://github.com/catdad/canvas-confetti)
- Icons: Emoji

---

Made with ❤️ for kids to learn about nutrition while having fun!