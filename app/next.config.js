/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.juwelo.fr',
        port: "",
        pathname: '/**'
      },
    ],
  },
}

module.exports = nextConfig
