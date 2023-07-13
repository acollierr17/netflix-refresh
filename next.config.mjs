/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  images: {
    domains: ["via.placeholder.com", "m.media-amazon.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.nflxso.net',
      },
      {
        protocol: 'http',
        hostname: '**.nflxso.net',
      },
      {
        protocol: 'https',
        hostname: '**.ssl-images-amazon.com'
      },
      {
        protocol: 'http',
        hostname: '**.nflximg.net',
      },
      {
        protocol: 'https',
        hostname: '**.nflximg.net'
      }
    ]
  },
};
export default config;