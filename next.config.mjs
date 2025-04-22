/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    domains: [
      'as2.ftcdn.net',
      'images.unsplash.com',
      'www.katodool.com',
      'upload.wikimedia.org',
      'res.cloudinary.com', // Optional if you add remotePatterns
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
