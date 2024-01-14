/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    relay: {
      src: "./",
      language: "typescript",
    },
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
  transpilePackages: ["@wecommerce/ui"],
};
