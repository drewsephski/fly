/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shadcnstudio.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
