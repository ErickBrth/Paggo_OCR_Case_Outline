/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    css: {
      // força usar PostCSS ao invés do lightningcss
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      implementation: require('postcss'),
    },
  },
}

module.exports = nextConfig
