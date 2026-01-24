import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com",'lh3.googleusercontent.com',"randomuser.me"],
  },
   experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // increase as needed
    },
  },
};

export default nextConfig;
