/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        // Remove the pathname field to allow any path from loremflickr.com
      },
    ],
  },
}

export default nextConfig
