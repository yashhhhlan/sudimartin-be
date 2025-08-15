/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'vislog360.id',
      },
    ],
  },
  poweredByHeader: false,
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Forwarded-Proto',
            value: 'http',
          },
        ],
      },
    ];
  },
  serverRuntimeConfig: {
    timeout: 1200000,
  },
};

module.exports = nextConfig;
