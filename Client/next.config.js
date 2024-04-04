/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
      {
        protocol: "http",
        hostname: "localhost:3000",
      },
      {
        protocol: "https",
        hostname: "REDACTED",
        pathname: "/api/spotify/**",
      },
      {
        protocol: "https",
        hostname: "spotify-artist-network.vercel.app",
      },
    ],
  },
};

module.exports = nextConfig;
