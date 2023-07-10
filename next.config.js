/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "axiecdn.axieinfinity.com",
        port: "",
        pathname: "/axies/**/axie/axie-full-transparent.png",
      },
    ],
  },
};
