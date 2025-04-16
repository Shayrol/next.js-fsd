import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidV4 } from "uuid";

export const onClickPayment = async () => {
  const result = await PortOne.requestPayment({
    storeId: "store-072a8ec4-eb71-4dfd-82e5-2cacb7edac6f",
    channelKey: "channel-key-cd3519ba-19cc-4232-80b6-be54e607e63b",
    paymentId: uuidV4(),
    orderName: "마우스",
    totalAmount: 3000,
    currency: "CURRENCY_KRW",
    payMethod: "EASY_PAY",
    customer: {
      fullName: "홍길동",
      phoneNumber: "010-3131-3131",
      email: "test1@naver.com",
    },
    redirectUrl: "http://localhost:3000/travel",
  });

  console.log(result);
};
