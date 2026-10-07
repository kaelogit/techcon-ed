import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'edwinmega.com' }],
        destination: 'https://www.edwinmega.com/:path*',
        permanent: true,
      },
      {
        source: '/security',
        destination: '/verify',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
