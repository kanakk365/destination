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
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://competitor-hub-frontend.vercel.app;", // adjust as needed
          },
        ],
      },
    ];
  },
}

export default nextConfig;