import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    images: {
        domains: ["www.premierinn.com"],
    },
    poweredByHeader: false,
    compress: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ["@heroicons/react"],
    },
};

export default withNextIntl(config); 