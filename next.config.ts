import type { NextConfig } from 'next'

const config: NextConfig = {
  eslint: { ignoreDuringBuilds: true },

  turbopack: {
    root: __dirname
  }
}

export default config
