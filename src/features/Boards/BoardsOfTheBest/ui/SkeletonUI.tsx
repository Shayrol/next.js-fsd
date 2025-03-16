export default function SkeletonUI() {
  return (
    <div className="flex flex-col gap-6 w-full h-fit max-xl:max-w-full overflow-hidden">
      <h1 className="font-bold text-[28px]">오늘 핫한 트립토크</h1>
      <section
        className="grid grid-cols-4 max-xl:grid-cols-2 w-full gap-9 
        max-md:flex max-md:overflow-x-scroll max-md:pr-[10vw] max-md:mr-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {Array(4)
          .fill(1)
          .map((_, index) => (
            <section
              key={index}
              className="flex flex-row gap-2 w-full h-[152px] max-md:w-[280px]"
            >
              {/* 게시물 이미지 */}

              <div className="h-[152px] min-w-[112px] bg-gray-200 rounded-[8px] animate-pulse"></div>

              {/* 게시물 정보 */}
              <article className="flex flex-col justify-between w-full">
                {/* 제목, 작성자 */}
                <header className="flex flex-col gap-2 w-full h-fit">
                  {/* 제목 */}
                  <div className="h-[24px] w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-[24px] w-full bg-gray-200 rounded animate-pulse"></div>
                  {/* <h2 className="font-bold  leading-6 tracking-normal h-[48px] line-clamp-2 overflow-hidden">
                    {"null"}
                  </h2> */}

                  {/* 작성자 */}
                  <section className="flex items-center gap-1 w-fit">
                    <div className="h-[24px] w-[100px] bg-gray-200 rounded animate-pulse"></div>
                  </section>
                </header>

                {/* 좋아요, 등록일 */}
                <section className="flex justify-between w-full h-fit">
                  {/* 좋아요 */}
                  <section className="flex gap-1 w-fit h-fit">
                    <div className="h-[24px] w-[45px] bg-gray-200 rounded animate-pulse"></div>
                  </section>

                  {/* 등록일 */}
                  <div className="h-[24px] w-[62px] bg-gray-200 rounded animate-pulse"></div>
                </section>
              </article>
            </section>
          ))}
      </section>
    </div>
  );
}
