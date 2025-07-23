/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-src 'self' https://competitor-hub-frontend.vercel.app`,
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://competitor-hub-frontend.vercel.app',
          }
        ],
      },
    ];
  }
}

export default nextConfig;