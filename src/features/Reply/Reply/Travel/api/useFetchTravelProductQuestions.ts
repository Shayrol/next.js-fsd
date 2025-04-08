// 댓글 목록

import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

const TRAVEL_PRODUCT_QUESTIONS = gql`
  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {
    fetchTravelproductQuestions(
      page: $page
      travelproductId: $travelproductId
    ) {
      _id
      contents
      travelproduct {
        _id
        # name
        seller {
          _id
          name
        }
      }
      user {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchTravelProductQuestions = ({
  page,
  travelproductId,
}: {
  page: number;
  travelproductId: string;
}) => {
  const result = useQuery<Pick<Query, "fetchTravelproductQuestions">>(
    TRAVEL_PRODUCT_QUESTIONS,
    {
      variables: {
        page,
        travelproductId,
      },
    }
  );

  return result;
};
