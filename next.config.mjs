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
            value: "default-src 'self'; frame-ancestors 'self' https://competitor-hub-frontend.vercel.app https://competitor-hub-frontend.vercel.app/; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
          },
          // Optional: Remove X-Frame-Options to rely on CSP frame-ancestors
          // {
          //   key: "X-Frame-Options",
          //   value: "ALLOW-FROM https://competitor-hub-frontend.vercel.app"
          // },
        ],
      },
    ];
  },
}

export default nextConfig;