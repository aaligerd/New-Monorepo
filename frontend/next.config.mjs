/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '72.61.224.143', // Your WordPress/S3 IP
      },
      {
        protocol: 'http',
        hostname: 'dev-bucket-subhro.s3.ap-south-1.amazonaws.com', // Your WordPress/S3 IP
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net', // If you've moved to CDN
      },
    ],
  },
};

export default nextConfig;
