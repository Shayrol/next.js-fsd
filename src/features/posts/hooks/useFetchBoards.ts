// features/posts/api 에서 gql을 불러온다.

export const useBoards = () => {
  const { data, loading, error } = useQuery(GET_POSTS, {
    onCompleted: (data) => {
      setPosts(data?.posts || []);
    },
  });

  return { posts, loading, error };
};
