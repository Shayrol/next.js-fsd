import Pagination from "@/shared/ui/pagination/pagination";

export default function SkeletonUI() {
  return (
    <article className="flex flex-col justify-center items-center gap-6 px-2 py-6 w-full shadow-lg shadow-[#1c1c1c1c] rounded-2xl">
      <ul className="flex flex-col justify-center items-center gap-2 w-full">
        <div className="flex w-full justify-center items-center max-w-[1280px] gap-3 px-6 py-4">
          <span className="flex justify-center items-center w-[64px] gap-[10px] font-medium text-nowrap text-[#1c1c1c]">
            번호
          </span>
          <span className="flex w-full max-w-[800px] gap-[10px] font-medium text-nowrap text-[#1c1c1c]">
            제목
          </span>
          <span className="flex justify-center w-[140px] max-w-[120px] gap-[10px] font-medium text-nowrap text-[#1c1c1c]">
            작성자
          </span>
          <span className="flex justify-center items-center  w-full max-w-[100px] gap-[10px] font-medium text-nowrap text-[#1c1c1c]">
            날짜
          </span>
        </div>
        <section className="flex flex-col justify-center items-center gap-3 w-full max-w-[1280px] h-fit">
          {new Array(10).fill(1).map((el, index) => (
            <li
              key={index}
              className="flex justify-center items-center gap-2 w-full  h-[44px] px-6 py-3 border border-gray-300 rounded-xl"
            >
              <div className="flex justify-center items-center w-[64px] gap-[10px] font-medium text-[#1c1c1c] opacity-60">
                <div className="h-[24px] w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex w-full max-w-[800px] overflow-hidden">
                <div className="h-[24px] w-full bg-gray-200 rounded animate-pulse"></div>
              </div>

              <span className="flex justify-center w-[160px] max-w-[120px] overflow-hidden">
                <div className="h-[24px] w-full bg-gray-200 rounded animate-pulse"></div>
              </span>

              <time className="flex justify-center items-center w-full max-w-[100px] gap-[10px] font-medium text-[#1c1c1c]">
                <div className="h-[24px] w-full bg-gray-200 rounded animate-pulse"></div>
              </time>
            </li>
          ))}
        </section>
      </ul>
      <Pagination />
    </article>
  );
}
