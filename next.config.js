/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  env: {
    PUBLIC_URL:
      process.env.NODE_ENV === 'production'
        ? process.env.VIELRA_APP_BASE_URL
        : '/',
    API_BASE_URL: process.env.VIELRA_API_BASE_URL,
    API_STORAGE_BASE_URL: process.env.VIELRA_API_STORAGE_BASE_URL,
  },
  i18n,
}

module.exports = nextConfig
