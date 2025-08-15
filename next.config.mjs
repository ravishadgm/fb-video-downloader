/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,

    sassOptions: {
        additionalData: `
      @use "src/styles/variables" as *;
    `,
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.cdninstagram.com",
            },
            {
                protocol: "https",
                hostname: "*.fbcdn.net",
            },
        ],
    },

    experimental: {
        turbo: false,
        appDir: true,
    },
};

export default nextConfig;
