"use client";

import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface IProps {
  latitude: number;
  longitude: number;
  title?: string;
}

const KakaoMap = ({ latitude, longitude, title }: IProps) => {
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
        // 해당 MapProvider를 통해 api key로 맵 로드를 할 수 있지만 2.x 부터 가능
        // 현재 1.22.22를 사용하고 있어 사용하지 못해 useEffect를 통해 스크립트로 인증해줘야 함
        // <MapProvider kakaoMapApiKey={process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}>
        <Map
          center={{ lat: latitude, lng: longitude }}
          style={{ width: "100%", height: "100%" }}
          level={3}
          isPanto={true}
        >
          <MapMarker
            position={{ lat: latitude, lng: longitude }}
            title={title ?? "입력된 상세 주소가 없습니다."}
          />
        </Map>
      ) : (
        // </MapProvider>
        <div></div>
      )}
    </>
  );
};

export default KakaoMap;
