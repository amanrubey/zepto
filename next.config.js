/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media1.popsugar-assets.com',
            
          },
        ],
      },
}

module.exports = nextConfig
