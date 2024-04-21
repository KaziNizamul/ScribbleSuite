/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_SOCKET_SERVER_URL: 'https://scribblesuite-backend.onrender.com'
  },
}

module.exports = nextConfig
