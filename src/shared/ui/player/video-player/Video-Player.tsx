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
      playing={false}
      loop={false}
      volume={1}
      width="100%"
      height="100%"
    />
  );
}
