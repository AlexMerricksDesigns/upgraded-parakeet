import { buildWorkLegacyRedirects } from "./lib/work-redirects.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return buildWorkLegacyRedirects();
  },
};

export default nextConfig;
