"use client";

import { Query } from "@/entities/api/graphql";
import DOMPurify from "dompurify";

const sanitize = DOMPurify.sanitize;

export default function ProductContents({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  const dataContents = data?.fetchTravelproduct.contents;
  const contents = sanitize(String(dataContents));

  return (
    <section className="flex flex-col gap-4 w-full min-h-[500px]">
      <p className="font-bold text-[20px] text-gray-800">상세 설명</p>
      <article
        dangerouslySetInnerHTML={{
          __html: contents,
        }}
        className="font-normal text-[16px] text-gray-800"
      />
    </section>
  );
}
