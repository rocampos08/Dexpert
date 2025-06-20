// next.config.js
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zthaitpgrl.ufs.sh", 
      },
      {
        protocol: "https",
        hostname: "th.bing.com", 
      },
    ],
  },
};

export default nextConfig;