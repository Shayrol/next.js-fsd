import { User } from "@/entities/api/graphql";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidV4 } from "uuid";

export const requestPayment = async (amount: number, user: User | null) => {
  const result = await PortOne.requestPayment({
    storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
    channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33", // 카카오페이
    paymentId: uuidV4(),
    orderName: "TripTrip 포인트 충전",
    totalAmount: amount,
    currency: "CURRENCY_KRW",
    payMethod: "EASY_PAY",
    customer: {
      fullName: user?.name,
      email: user?.email,
    },
    redirectUrl: "http://localhost:3000/travel",
  });

  console.log("result: ", result);
  return result?.paymentId;
};
