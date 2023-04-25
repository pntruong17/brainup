/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "images.unsplash.com",
      "google.com",
      "res.cloudinary.com",
      "img.freepik.com",
      "s.luyengame.net",
      "play-lh.googleusercontent.com",
    ],
  },

  // Removed the invalid remotePatterns property
  webpack(config, options) {
    return config;
  },
};

module.exports = nextConfig;
