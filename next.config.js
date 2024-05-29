/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        defaultApiEndpoint: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com'
            },
            {
                protocol: 'https',
                hostname: 'automiestas-web-storage.s3.amazonaws.com'
            },
        ]
    }
}

module.exports = nextConfig
