// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ["res.cloudinary.com",'lh3.googleusercontent.com',"randomuser.me"],
//   },
//    experimental: {
//     serverActions: {
//       bodySizeLimit: '10mb', // increase as needed
//     },
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com", "randomuser.me"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // increase as needed
    },
  },
  reactStrictMode: true, // optional but recommended
};

module.exports = nextConfig;