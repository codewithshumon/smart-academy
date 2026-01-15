/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": ["./src", "."],
            "@/components": ["./src/components"],
            "@/hooks": ["./src/hooks"],
            "@/lib": ["./src/lib"],
            "@/types": ["./src/types"],
            "@/services": ["./src/services"],
            "@/store": ["./src/store"],
        };
        return config;
    },
    turbopack: {
        resolveAlias: {
            "@": ["./src", "."],
            "@/components": ["./src/components"],
            "@/hooks": ["./src/hooks"],
            "@/lib": ["./src/lib"],
            "@/types": ["./src/types"],
            "@/services": ["./src/services"],
            "@/store": ["./src/store"],
        },
    },
};

export default nextConfig;
