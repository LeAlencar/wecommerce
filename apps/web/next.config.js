/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    relay: {
      src: "./",
      language: "typescript",
    },
  },
  reactStrictMode: true,
  transpilePackages: ["@wecommerce/ui"],
};
