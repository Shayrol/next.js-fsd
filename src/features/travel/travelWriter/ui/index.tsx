import TravelWriterForm from "./TravelWriterForm";

export default function TravelWriter() {
  return (
    <article className="flex flex-col justify-center items-center gap-10 w-full px-5">
      <h3 className="font-bold text-[20px] w-full">숙박권 판매하기</h3>
      <TravelWriterForm edit={false} />
    </article>
  );
}
