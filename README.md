# 🌐 README（日本語 / English）
**[🇯🇵 日本語](#日本語版)** ・ [🇬🇧 English](#english-version)

---

# 日本語版

# 卒研シューター  
中部大学 人文学部 メディア情報社会学科  
**柊和佑研究室・卒業研究生向け 非公式ミニゲーム**

本コンテンツは、研究室メンバー向けの**完全ジョーク作品**として制作された、ブラウザ上で動作する横スクロール型シューティングゲームです。  
卒論提出シーズンの気分転換を目的としており、学術的価値はまったくありません。  
ただし、JavaScript・Canvas を使った軽量ゲームの教材サンプルとしては利用できます。

---

## 🔸 ゲーム概要

プレイヤー（**教員**）を操作し、迫りくる **「卒論」** を添削ショットで撃退しながらスコアを稼ぎます。  
スコアが 200 点に到達すると、強敵 **「優秀論文」** が出現。  
撃破すると **優秀論文 採択！** となりゲームクリア。

ゲームロジックや描画処理はすべて JavaScript（Canvas API）で実装されています。

---

## 🔸 操作方法

- **矢印キー** … 移動  
- **スペースキー** … 添削ショット  
- **200 点でボス出現**

---

## 🔸 GitHub Pages での公開について

本リポジトリは **そのまま GitHub Pages で公開可能** な構造になっています。  
特別なビルド工程は不要で、次の手順だけで公開できます。

1. リポジトリの **Settings** を開く  
2. 左メニューの **Pages** を選択  
3. *Build and deployment* → **Source：Deploy from a branch**  
4. **Branch：`main`（または公開したいブランチ） / root** を指定  
5. 保存すると数十秒後に公開 URL が発行されます

学生にも URL を配布すれば、PC／スマホどちらからでも即プレイできます。

---

## 🔸 ローカルでの動作方法

1. リポジトリを clone またはダウンロード  
2. `index.html` をブラウザで開く  
3. 即プレイ可能（追加作業なし）

---

## 🔸 ファイル構成

- **index.html** — ゲーム本体の HTML  
- **style.css** — 背景・UI レイアウト  
- **game.js** — ゲームロジック（プレイヤー／敵／ボス／弾／エフェクトなど）

---

## 🔸 ライセンス・注意事項

- 本ゲームは **柊研究室内のジョークコンテンツ** であり、  
  研究指導・評価とは無関係です。  
- 卒論作業の息抜きを主目的としています。  
- 改変・二次利用は自由ですが、研究室文化に配慮してください。

---

## 🔸 謝辞

卒研生のみなさんへ。  
このゲームがあなたの「心の休憩」になれば幸いです。  
本当のラスボスは **提出締切** なので、そちらも討伐を忘れずに。

---

# English Version

# Sotsuken Shooter  
Unofficial Mini-Game for  
**Hiiragi Laboratory, Department of Media Information and Sociology,  
College of Humanities, Chubu University**

This browser-based shooter is a **humorous joke project** created exclusively for the graduating students of Hiiragi Laboratory.  
Its purpose is simply to provide a brief escape from the stress of writing a thesis.  
Nevertheless, it can serve as a simple example of JavaScript + Canvas game programming.

---

## 🔸 Game Overview

Control the **Professor** and fire *correction shots* at approaching enemies labeled **“Thesis”**.  
When your score reaches **200**, the powerful **“Excellent Thesis”** boss appears.  
Defeat it to receive the congratulatory message:

**Excellent Thesis Accepted!**

The game is implemented fully in JavaScript using the HTML Canvas API.

---

## 🔸 Controls

- **Arrow Keys** — Move  
- **Space Key** — Shoot ("Correction")  
- **Boss appears at 200 points**

---

## 🔸 Publishing with GitHub Pages

This repository is **ready for GitHub Pages** without any build step.

1. Open the repository **Settings**  
2. Go to **Pages**  
3. Under *Build and deployment*, choose  
   **Source: Deploy from a branch**  
4. Select your branch (e.g., `main`) and **/ (root)**  
5. Save and wait a few seconds

A public URL will be generated, making the game instantly playable on any browser.

---

## 🔸 Local Usage

1. Clone or download the repository  
2. Open `index.html` in a browser  
3. Play immediately — no build step required

---

## 🔸 File Structure

- **index.html** — Main HTML file  
- **style.css** — Basic styling and layout  
- **game.js** — All gameplay logic (player, enemies, boss, effects, etc.)

---

## 🔸 Disclaimer

- This is a **humorous, non-academic project** intended only for entertainment inside Hiiragi Laboratory.  
- It does not reflect actual supervision, evaluation, or institutional policy.  
- Feel free to modify or reuse, but please respect the original context.

---

## 🔸 Acknowledgment

To all graduating students:  
May this game give you a brief moment of relief.  
Your *real* final boss is the thesis deadline — good luck defeating it.