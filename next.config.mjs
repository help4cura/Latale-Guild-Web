// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // 이미지 최적화 기능 비활성화
    },
}

export default nextConfig;
