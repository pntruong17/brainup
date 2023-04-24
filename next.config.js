/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["images.unsplash.com", "google.com", "res.cloudinary.com"],
  },

  // Removed the invalid remotePatterns property
  webpack(config, options) {
    return config;
  },
};

module.exports = nextConfig;
