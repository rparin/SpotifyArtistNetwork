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
    ],
  },
  output: "standalone",
};

export default nextConfig;
