// @ts-check
import { NextConfig } from 'next';
import { env } from '@/env';

/**
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
export default {
  reactStrictMode: true,
  /**
   * Dynamic configuration available for the browser and server.
   * Note: requires `ssr: true` or a `getInitialProps` in `_app.tsx`
   * @see https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
   */
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
  /** We run eslint as a separate task in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  /** We run typechecking as a separate task in CI */
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-label', '@radix-ui/react-slot'],
    turbo: {
      resolveAlias: {
        underscore: 'lodash',
      },
      resolveExtensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
        '.mjs',
        '.cjs',
        '.d.ts',
        '.d.cts',
        '.d.mts',
      ],
    },
  },
} satisfies NextConfig;
