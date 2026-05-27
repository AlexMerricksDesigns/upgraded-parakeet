/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/work/photography/projects/brighton-by-bench",
        destination: "/work/photography/series/brighton-by-bench",
        permanent: true,
      },
      {
        source: "/work/photography/projects/lightworms",
        destination: "/work/photography/series/lightworms",
        permanent: true,
      },
      {
        source: "/work/photography/projects/india-2016",
        destination: "/work/photography/series/india-2016",
        permanent: true,
      },
      {
        source: "/work/crypto",
        destination: "/work/photography",
        permanent: true,
      },
      {
        source: "/work/crypto/:path*",
        destination: "/work/photography/:path*",
        permanent: true,
      },
      {
        source: "/work/photography/gallery",
        destination: "/work/photography/captured",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
