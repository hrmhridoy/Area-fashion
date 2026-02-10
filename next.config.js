/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    turbopack: {
      resolveAlias: {
        '@/*': './src/*',
      },
    },
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
