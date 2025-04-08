"use client";

import DOMPurify from "dompurify";

const sanitize = DOMPurify.sanitize;

export default function TravelContents({ contents }: { contents: string }) {
  const contents_ = sanitize(String(contents));

  return (
    <article
      dangerouslySetInnerHTML={{
        __html: contents_,
      }}
      className="font-normal text-[16px] text-gray-800"
    />
  );
}
