/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/web/nextjs',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
