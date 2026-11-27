import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Control panel image uploads
  experimental: { serverActions: { bodySizeLimit: "10mb" } },
  partialPrefetching: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.woodtowater.co.uk", pathname: "/cdn/shop/**" },
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/s/files/**" },
    ],
  },
};

export default nextConfig;
