import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  cacheComponents: !githubPages,
  partialPrefetching: !githubPages,
  ...(githubPages && {
    output: "export",
    basePath: process.env.PAGES_BASE_PATH || "/dala-next",
    images: { unoptimized: true },
  }),
};

export default nextConfig;
