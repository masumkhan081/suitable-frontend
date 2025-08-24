import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'images.unsplash.com',
      'randomuser.me',
      'localhost',
      '127.0.0.1',
      'https://randomuser.me',
      'http://localhost:3001',
      'http://localhost:3000',
      'https://res.cloudinary.com/dz42l80wa/image/upload',
      'https://res.cloudinary.com/dz42l80wa/image/upload/v1724565557',
      'https://res.cloudinary.com'

    ]
  }
}

export default nextConfig
