"use client";

import { Query } from "@/entities/api/graphql";
import DOMPurify from "dompurify";

const sanitize = DOMPurify.sanitize; // 여기서 sanitize를 직접 할당

interface IProps {
  data: Pick<Query, "fetchBoard">;
}

export default function FetchBoardContents(props: IProps) {
  const contents = sanitize(props.data.fetchBoard.contents); // 직접 사용

  return (
    <article
      dangerouslySetInnerHTML={{
        __html: contents,
      }}
    />
  );
}
