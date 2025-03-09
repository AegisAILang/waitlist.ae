/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: [
            "@radix-ui/react-label",
            "@radix-ui/react-slot",
            "@react-email/components",
            "@react-email/render",
            "@vercel/analytics"
        ],
        turbo: {
            resolveAlias: {
                underscore: "lodash",
            },
            resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".mjs", ".cjs", ".d.ts", ".d.cts", ".d.mts"],
        },
    },
    images: {
        remotePatterns: [
            {
                hostname: "**",
            },
        ],
    },
}

export default nextConfig