import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.experiments = { 
      asyncWebAssembly: true,
      layers: true
    }
    return config
  },
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "zthaitpgrl.ufs.sh"
      }
    ]
  }

}

export default nextConfig
