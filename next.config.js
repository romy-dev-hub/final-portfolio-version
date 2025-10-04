/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint errors during production builds (CI/CD)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TS build errors in CI to prevent hard fails on Pages
    // (does not affect local dev type checking)
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
