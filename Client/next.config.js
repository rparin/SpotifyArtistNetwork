/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  //Needed for running on netlify and locally
  images: { unoptimized: true },
};

module.exports = nextConfig;
