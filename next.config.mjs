/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];
    
    // Prevent Three.js from being bundled on server side
    if (isServer) {
      config.externals.push({
        'three': 'three',
        '@react-three/fiber': '@react-three/fiber',
        '@react-three/drei': '@react-three/drei'
      });
    }
    
    return config;
  },
};

export default nextConfig;
