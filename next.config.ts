import type { NextConfig } from "next";

// "export" builds a fully static site into the /out folder,
// so it can be hosted anywhere (Vercel, Netlify, GitHub Pages).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
