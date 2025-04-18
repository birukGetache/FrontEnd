/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: [
        'as2.ftcdn.net',
        'images.unsplash.com',
        "www.katodool.com",
        "upload.wikimedia.org"
      ],
    },
  };
  
export default nextConfig;
