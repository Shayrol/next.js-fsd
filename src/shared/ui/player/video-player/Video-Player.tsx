"use client";

import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer({ url }: { url: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // 서버에서 렌더링 방지

  return (
    <ReactPlayer
      url={url}
      controls
      width="822px"
      height="464px"
      playing={false} // 자동 재생
      loop={false} // 반복 재생
      volume={1} // 볼륨 100%
    />
  );
}
