"use client";

// import { useAccessTokenStore } from "@/stores/tokenStore";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import { getAccessToken } from "../lib/getAccessToken";
import { useAccessTokenStore } from "@/stores/tokenStore";
import { useEffect } from "react";

const GLOBAL_STATE = new InMemoryCache();

export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const date = new Date();
  date.setTime(date.getTime() + 2 * 60 * 60 * 1000); // 2시간
  // const cookieAccessToken = Cookies.get("accessToken");

  // 새로고침시 refreshToken
  // middleware가 아닌 상태관리를 통해 토큰 받으며 true를 통해 HOF로 로그인 체크 사용해도 된다.
  useEffect(() => {
    let isMounted = true;

    getAccessToken().then((newAccessToken) => {
      if (isMounted && newAccessToken) {
        setAccessToken(newAccessToken);
        Cookies.set("accessToken", newAccessToken ?? "", {
          secure: false,
          sameSite: "Strict",
          expires: date,
        });
      }
    });

    return () => {
      isMounted = false; // 언마운트 시 실행 방지
    };
  }, []);

  // 업로드링크
  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  }) as unknown as ApolloLink;

  // 에러링크
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 26-02 리프레시토큰 참고
          // promise로 기다림이 필요한 경우
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");
              Cookies.set("accessToken", newAccessToken ?? "", {
                secure: false,
                sameSite: "Strict",
                expires: 1,
              });

              // 다른것을 유지한채로 accessToken만 변경 - headers의 accessToken만 변경
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 만료된 토큰이 있음
                  Authorization: `Bearer ${newAccessToken}`, // 기존 토큰을 덮어 씌움
                },
              });
            })
          ).flatMap(
            () => forward(operation) // 변경된 토큰으로 재전송
          );
        }
      }
    }
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
