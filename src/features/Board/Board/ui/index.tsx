import { BOARD } from "@/features/Board/Board/api/useFetchBoard";
import { client } from "@/shared/api/apollo-client";
import { Query } from "@/entities/api/graphql";
import BoardContents from "./BoardContents";

export default async function Board({ boardId }: { boardId: string }) {
  const { data } = await client.query<Pick<Query, "fetchBoard">>({
    query: BOARD,
    variables: { boardId },
    fetchPolicy: "network-only",
  });

  return (
    <section className="flex flex-col justify-center items-center w-full gap-6">
      <BoardContents data={data} />
    </section>
  );
}

// 클라이언트 컴포넌트 경우 useParams()를 통해 동적 라우팅의 boardId 값을 가져올 수 있다.
// 하지만 app router의 서버 컴포넌트인 경우 props로 params를 가져와야 한다. 여기서는
// 자동으로 가져와 준다.

// ({ params }: {params: Promise<{ boardId: string }>})
// 이렇게 가져오는데 비동기로 가져와야 콘솔에 에러 없이 가져올 수 있다.
// 그리고 사용할 때에는 const boardId = (await params).boardId; 으로 가져온다.
// Promise로 비동기 타입을 선언해주고 사용을 위해 await을 선언하고 가져온다.
