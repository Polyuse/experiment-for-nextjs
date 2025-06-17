import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false, // ← これで型エラーがあると `next build` が失敗します
  },
};

export default nextConfig;
