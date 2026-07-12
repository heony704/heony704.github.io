const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const basePath = rawBasePath && rawBasePath !== '/' ? `/${rawBasePath.replace(/^\/|\/$/g, '')}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  pageExtensions: ['ts', 'tsx'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
