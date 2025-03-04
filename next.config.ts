import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 개발환경 옵션으로 true로 되어있으면 렌더링 2번 일어남 false로 끄기 가능
  reactStrictMode: false,
  images: {
    domains: ["storage.googleapis.com"], // 외부 이미지 도메인 추가
  },
};

export default nextConfig;
