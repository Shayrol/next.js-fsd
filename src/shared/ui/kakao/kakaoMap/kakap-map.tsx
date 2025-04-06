"use client";

import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

interface IProps {
  latitude: string;
  longitude: string;
}

const KakaoMap = ({ latitude, longitude }: IProps) => {
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);

  useEffect(() => {
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      setScriptLoad(true);
    });
  }, []);

  return (
    <>
      {scriptLoad ? (
        <Map
          center={{ lat: Number(latitude), lng: Number(longitude) }}
          style={{ width: "100%", height: "100%" }}
          level={3}
        ></Map>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default KakaoMap;
