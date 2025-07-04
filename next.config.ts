import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'res.cloudinary.com',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'images.unsplash.com',
      'randomuser.me',
      'localhost',
      '127.0.0.1',
      'https://randomuser.me'
    ]
  }
}

export default nextConfig
