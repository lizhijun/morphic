/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lbjul6u8q2iirgvq.public.blob.vercel-storage.com',
            port: '',
          },
        ],
        domains: ['image-storge.jiehuo.ai'], // 为了允许 Next.js 的 Image 组件从这些域名加载图片
        minimumCacheTTL: 60,
      },
};

export default nextConfig;
