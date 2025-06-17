# 1. ビルド環境
FROM node:18 AS builder

# 作業ディレクトリを作成
WORKDIR /app

# 依存関係をインストール（package.json, lock ファイルだけ先にコピー）
COPY package*.json ./
RUN npm install

# アプリコードをコピー
COPY . .

# Next.js をビルド
RUN npm run build

# 2. 実行環境（軽量な本番用）
FROM node:22.14-slim AS runner

# 環境変数：production
ENV NODE_ENV=production

# 作業ディレクトリ
WORKDIR /app

# 必要ファイルのみコピー（軽量化）
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Cloud Run は 8080 ポートで受ける
EXPOSE 3010

# ポート設定（Next.js に必要）
ENV PORT 3010

# Next.js を起動（start モード）
CMD ["npx", "next", "start"]