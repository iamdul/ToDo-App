/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
            source: '/api/:path*', // Proxy all requests starting with /api/
            destination: 'http://127.0.0.1:8000/api/:path*', // Target API endpoint
            },
        ];
    },
    async headers() {
        return [
            {
            source: '/api/:path*', // Apply headers only for API routes
            headers: [
                {
                key: 'Accept',
                value: 'application/json',
                },
                {
                key: 'Content-Type',
                value: 'application/json',
                },
            ],
            },
        ];
    },
};

export default nextConfig;
