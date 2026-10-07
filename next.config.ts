import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/security',
        destination: '/verify',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
