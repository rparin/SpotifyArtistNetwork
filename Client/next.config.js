/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // reactStrictMode: false,

  //Needed for running on netlify and locally
  images: { unoptimized: true },
};

module.exports = nextConfig;
