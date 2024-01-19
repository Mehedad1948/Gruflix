/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.ytimg.com',
      'yt3.ggpht.com',
      'https://i.ytimg.com'
    ]
  }
}

module.exports = nextConfig
