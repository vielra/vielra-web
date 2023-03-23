/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  env: {
    // prettier-ignore
    PUBLIC_URL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000',
  },
  i18n,
}

module.exports = nextConfig
