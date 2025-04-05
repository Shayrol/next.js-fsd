export const getCoordsByAddress = async (address: string) => {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
      address
    )}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_LOCAL_KEY}`,
      },
    }
  );

  const data = await res.json();
  if (data.documents && data.documents.length > 0) {
    const { x: longitude, y: latitude } = data.documents[0];
    return { latitude, longitude };
  } else {
    throw new Error("좌표를 찾을 수 없습니다.");
  }
};
