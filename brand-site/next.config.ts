import type { NextConfig } from "next";
const nextConfig: NextConfig = {
 output: "export",
 trailingSlash: true,
 images: { unoptimized: true },
 experimental: {
   turbopack: {
     root: __dirname,
   },
 },
};
export default nextConfig;
