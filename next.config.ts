import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify 适配器配置
  experimental: {
    esmExternals: false,
  },
  // 确保静态资源路径正确
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // 图片优化配置
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
