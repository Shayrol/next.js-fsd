// A 페이지에서만 사용되는 ui 컴포넌트인 경우 app/A/ui에서 사용하고
// 그게 아닌 다른 곳에서도 사용이 된다면 features/ACard/ui 이런식으로 features에 사용해야 한다.
"use client";

export default function ACard() {
  console.log("ACard rendering");

  return (
    <div className="border border-gray-500 rounded-lg p-4">
      A 전용 페이지 Card
    </div>
  );
}
