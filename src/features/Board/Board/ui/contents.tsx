"use client";

import { Query } from "@/entities/api/graphql";
import DOMPurify from "dompurify";

const sanitize = DOMPurify.sanitize; // 여기서 sanitize를 직접 할당

// interface IProps {
//   data: Board | undefined;
// }

export default function FetchBoardContents({
  data,
}: {
  data: Pick<Query, "fetchBoard"> | undefined;
}) {
  const contentsData = data?.fetchBoard.contents;
  // const contents = sanitize(props.data.fetchBoard.contents); // 직접 사용
  const contents = sanitize(String(contentsData)); // 직접 사용

  return (
    <article
      dangerouslySetInnerHTML={{
        __html: contents,
      }}
    />
  );
}
