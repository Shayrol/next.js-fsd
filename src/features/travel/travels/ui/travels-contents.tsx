import Image from "next/image";

export default function TravelsContents() {
  return (
    <ul className="grid grid-cols-4 gap-8 w-full min-w-[680px]">
      <li className="flex flex-col gap-3 min-w-[296px]">
        <div className="relative flex justify-center items-center min-w-[296px] min-h-[296px]">
          <Image
            src={"/not-images/not-image.svg"}
            alt="travel-image"
            fill
            className="object-cover rounded-[16px]"
          />
          <div className="absolute top-4 right-4 flex justify-center items-center gap-1 px-2 py-1 rounded-[8px] bg-black/40">
            <Image
              src={"/travel/travels/bookmark.svg"}
              alt="bookmark"
              width={16}
              height={20}
              className=""
            />
            <div className="w-[17px] h-[20px] flex justify-center items-center text-white shadow-md text-[14px] font-medium leading-[20px] tracking-[0%] rounded">
              5
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <title>
            <h1>메인제목</h1>
            <h2>부제목</h2>
          </title>
          {/* tag, profile */}
          <div className="flex flex-col w-full gap-3">
            <p className="flex gap-2 w-full">#6인 이하 #건식</p>
            <div className="flex justify-between items-center">
              <div>
                <div>profile image</div>
                <div>name</div>
              </div>
              <div>price</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}
