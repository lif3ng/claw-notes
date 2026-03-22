import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/web/nextjs',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
