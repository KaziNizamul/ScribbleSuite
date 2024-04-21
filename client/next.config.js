/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_SOCKET_SERVER_URL: 'http://localhost:8080'
  },
}

module.exports = nextConfig
