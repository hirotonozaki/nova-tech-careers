[README.md](https://github.com/user-attachments/files/28122981/README.md)
<div align="center">

# NOVA TECH CAREERS — Recruitment LP

**テクノロジーで、次の時代をつくる。**

近未来系 IT 企業を想定した、架空企業の採用ランディングページ。
企画・情報設計・実装・公開までを一人で担当したポートフォリオ作品です。

<br />

![NOVA TECH CAREERS Preview](./assets/images/preview-mockup.webp)

<br />

[**🌐 Live Site**](https://hirotonozaki.github.io/nova-tech-careers/) ・ [**📄 Proposal**](https://hirotonozaki.github.io/nova-tech-careers-proposal/) ・ [**📁 Repository**](https://github.com/hirotonozaki/nova-tech-careers)

<br />

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Mobile_First-8b5cf6?style=flat-square)

</div>

<br />

## 📖 Overview ／ 概要

Web 制作・AI 開発支援・DX 推進を行う架空の IT 企業を想定した採用 LP です。近未来的な世界観の中で、求職者が「何の会社か」「自分が働けるか」「次に何をすればいいか」を迷わず理解し、エントリーまで到達できる構造を1枚に凝縮しました。

| Item | Detail |
| :--- | :--- |
| **Project Type** | 採用ランディングページ（架空企業） |
| **Structure** | シングルページ（縦スクロール完結型） |
| **Role** | 企画 / 情報設計 / UI デザイン / コーディング / 公開 |
| **Period** | 約4週間 |
| **Stack** | HTML5 / CSS3 / Vanilla JavaScript |
| **Hosting** | GitHub Pages |

<br />

## 🌐 Live Site ／ サイトURL

https://hirotonozaki.github.io/nova-tech-careers/

<br />

## 💻 GitHub ／ リポジトリ

https://github.com/hirotonozaki/nova-tech-careers

<br />

## 🛠 Tech Stack ／ 使用技術

| 領域 | 技術 |
| :--- | :--- |
| **Markup** | HTML5（セマンティック構造、JSON-LD Organization Schema） |
| **Styling** | CSS3 / CSS Variables（FLOCSS / BEM 風命名、Flexbox / Grid） |
| **Interaction** | Vanilla JavaScript（ES6+、IntersectionObserver） |
| **Typography** | Manrope / Noto Sans JP / JetBrains Mono（Google Fonts） |
| **Hosting** | GitHub Pages |
| **Version Control** | Git / GitHub |
| **Design** | Figma（ワイヤーフレーム） |

> フレームワークを使わずバニラ構成を選定。「将来 WordPress 化する前提」と「保守できる範囲に収める」のバランスを取った技術選定です。

<br />

## 💡 Concept ／ 制作意図

> **Apple × SaaS × Glass UI** — 情報密度を保ったまま、静かに先進性を伝えるビジュアル言語

採用 LP の離脱は、ファーストビューの数秒以内に集中して発生しやすいとされています。本サイトは「見栄えの良さ」だけを目的とせず、**ファーストビューでの価値訴求 → 不安解消 → エントリーまでの動線**を1枚で完結させることを設計の起点としました。

| 領域 | 方針 |
| :--- | :--- |
| **Color** | 背景 `#0a0b14` の漆黒に、青紫グラデーション（`#5b8def → #8b5cf6 → #c084fc`）をアクセント |
| **Typography** | 欧文に Manrope、本文に Noto Sans JP、UI に JetBrains Mono の和洋ペアリング |
| **Glassmorphism** | `backdrop-filter` をヘッダー・カード・ドロワーに限定適用 |
| **Motion** | ヒーローのオーブが長周期で漂い、セクションはフェード＋わずかな Y 軸移動 |

### 想定ターゲット
20代後半〜30代前半の **エンジニア／デザイナー**。「裁量のある環境・リモート・成長機会」を重視し、移動中にスマートフォンで複数社の採用情報を比較検討する層を想定しています。

<br />

## ✨ Highlights ／ 工夫した点

### 1. FLOCSS / BEM 風命名
`l-` `c-` `p-` `u-` プレフィックスで役割を分離し、複数人が触っても破綻しにくい設計に。

### 2. CSS 変数によるトークン管理
配色・余白・タイポを `:root` に集約し、デザイン調整を1箇所で完結できる構造にしました。

### 3. IntersectionObserver による軽量フェード
一度可視化したら監視解除し、CPU 負荷を抑制。

```javascript
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      io.unobserve(entry.target); // 監視解除でコストを最小化
    }
  });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
```

### 4. ハンバーガーメニュー
開閉／ESCキー／リンク選択／リサイズで閉じる動作と `aria-expanded` を同期。

### 5. Glassmorphism の限定使用
ドロワー背景は不透明にし、可読性を担保。「全面ガラス」にせず近未来感と視認性を両立しました。

### 6. SEO / OGP / JSON-LD
`title` / `description` 最適化、OGP 画像、Organization Schema を配置。

### 7. アクセシビリティ
スキップリンク、`aria-*`、`:focus-visible`、WCAG AA のコントラスト基準。

### 8. `prefers-reduced-motion` 対応
動き軽減を希望するユーザーには全アニメーションを停止。

<br />

## 📂 Directory ／ ディレクトリ構成

```
nova-tech-careers/
├── index.html              # トップページ（シングルページ構成）
├── README.md
├── css/
│   └── style.css           # スタイル（FLOCSS / CSS 変数によるトークン管理）
├── js/
│   └── script.js           # 挙動（Loader / Header / Drawer / Reveal ほか）
└── assets/
    └── images/
        ├── preview-mockup.webp  # README ヒーロー & OGP / SNS シェア用
        └── qr.png               # スマホアクセス用 QR
```

CSS / JS は将来の WordPress テーマ化を見据え、`./` 始まりの相対パスで統一しています。

<br />

## 🖼 Screenshot ／ スクリーンショット

![NOVA TECH CAREERS Preview](./assets/images/preview-mockup.webp)

<br />

## 📱 Responsive ／ レスポンシブ対応

4つのブレイクポイントで構築し、「PC の縮小」ではなく「モバイル再設計」の発想で組んでいます。

| Device | Width | 主な変化 |
| :--- | :--- | :--- |
| 📱 Mobile | ~ 480px | ハンバーガー / 1カラム / タッチ領域・親指リーチ基準 |
| 📱 Mobile (L) | ~ 768px | 1カラム / 見出しサイズ最適化 |
| 📱 Tablet | ~ 1024px | 2カラム / ナビ表示切替 |
| 💻 Desktop | 1340px ~ | フル表示 / グローバルナビ |

DevTools のデバイスモードで主要な端末幅（375 / 390 / 430 / 768 / 1024 / 1280px）を確認し、横スクロール・レイアウトずれが出ないよう調整しています。

<br />

## 📄 Proposal ／ 企画書

設計意図・戦略・UI/UX 設計・実装方針・WordPress 化想定・振り返りまでをまとめた制作企画書（A4 横・全13ページ）を公開しています。

🔗 https://hirotonozaki.github.io/nova-tech-careers-proposal/

<br />

## 👤 Author ／ 制作者情報

<div align="center">

### **Hiroto Nozaki**

Web Director / Front-end

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hirotonozaki)
[![Portfolio](https://img.shields.io/badge/Portfolio-8b5cf6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://hirotonozaki.github.io/hiroto-nozaki-portfolio/)

</div>

<br />

<div align="center">

> 本サイトはポートフォリオ用に制作した架空企業の採用 LP です。掲載している企業情報・社員・数値はすべてフィクションです。

<sub>© 2026 Hiroto Nozaki</sub>

</div>
