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
                hostname: 'www.digitaltrends.com'
            },
            {
                protocol: 'https',
                hostname: 'www.motortrend.com'
            },
            {
                protocol: 'https',
                hostname: 'www.amzs.si'
            },
            {
                protocol: 'https',
                hostname: 'images.cars.com'
            },
            {
                protocol: 'https',
                hostname: 'hips.hearstapps.com'
            },
            {
                protocol: 'https',
                hostname: 'media.ed.edmunds-media.com'
            },
        ]
    }
}

module.exports = nextConfig
