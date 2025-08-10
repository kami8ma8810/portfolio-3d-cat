# Cat-Quest Portfolio

3D猫が案内するインタラクティブなポートフォリオサイト。Vite + React + React Three Fiberで構築。

## セットアップ

### 必要環境
- Node.js 18以上
- npm または pnpm

### インストール
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## スクリプト一覧

### 開発
- `npm run dev` - 開発サーバーを起動 (http://localhost:5173)
- `npm run build` - プロダクションビルド
- `npm run preview` - ビルド済みアプリのプレビュー

### テスト
- `npm run test` - Vitestでユニットテストを実行
- `npm run test:ui` - VitestのUIモードでテストを実行
- `npm run test:coverage` - カバレッジレポート付きでテストを実行
- `npm run e2e` - Playwrightでe2eテストを実行
- `npm run e2e:ui` - PlaywrightのUIモードでe2eテストを実行

### 品質管理
- `npm run lint` - ESLintでコードをチェック

### コンテンツ管理
- `npm run fetch-notion` - NotionからMDXファイルを生成

## 技術スタック

### フレームワーク
- **Vite** - ビルドツール
- **React** + **TypeScript** - UIフレームワーク
- **TanStack Router** - ルーティング
- **Zustand** - 状態管理

### スタイリング
- **Tailwind CSS** - ユーティリティファーストCSS
- **CSS Variables** - カスタムカラートークン (yellow/black/white)

### テスト
- **Vitest** - ユニットテスト
- **React Testing Library** - コンポーネントテスト
- **Playwright** - E2Eテスト

### アナリティクス
- **Plausible** - プライバシーファーストな解析ツール

## アクセシビリティ機能
- スキップリンク対応
- 明瞭なフォーカスインジケーター
- prefers-reduced-motion対応

## プロジェクト構造
```
src/
├── components/      # 共通コンポーネント
├── pages/          # ページコンポーネント
├── hooks/          # カスタムフック
├── lib/            # ユーティリティ
├── styles/         # グローバルスタイル
│   ├── globals.css # Tailwind + グローバルスタイル
│   └── tokens.css  # CSS変数定義
└── test/           # テスト設定
```

## 開発者向け

### スタイルガイド
開発サーバー起動後、デフォルトページにアクセスすると、カラーパレットやタイポグラフィのガイドが表示されます。

### CSS変数
プロジェクト全体で使用可能なカラートークン:
- `var(--color-yellow)` - #FBBF24
- `var(--color-black)` - #000000
- `var(--color-white)` - #FFFFFF

### Notion連携セットアップ

1. `.env`ファイルを作成（`.env.example`を参考）
2. Notion Integration Tokenを取得
3. データベースIDを取得
4. 以下のプロパティを持つNotionデータベースを作成:
   - title (タイトル)
   - slug (テキスト)
   - date (日付)
   - tags (マルチセレクト)
   - summary (テキスト)
   - cover (テキスト/URL)
   - published (チェックボックス)

5. `npm run fetch-notion`でMDXファイルを生成
