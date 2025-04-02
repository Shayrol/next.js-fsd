import TravelWriterForm from "./TravelWriterForm";

export default function TravelWriter() {
  return (
    <article className="flex flex-col gap-10 w-full">
      <h3 className="font-bold text-[20px] w-full">숙박권 판매하기</h3>
      <TravelWriterForm edit={false} />
    </article>
  );
}
