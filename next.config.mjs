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
            value: "default-src 'self' frame-src https://competitor-hub-frontend.vercel.app;", // adjust as needed
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' frame-ancestors https://competitor-hub-frontend.vercel.app;", // adjust as needed
          },
        ],
      },
    ];
  },
}

export default nextConfig;