/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
})

module.exports = withPWA({
  env: {
    SERVER: process.env.SERVER,
  },
  images:{
    domains: ["localhost"],
  },
  swcMinify: true,
})

