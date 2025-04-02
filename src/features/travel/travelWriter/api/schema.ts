import * as yup from "yup";

export const travelWriterSchema = yup.object().shape({
  name: yup.string().required("상품명을 입력해 주세요."),
  remark: yup.string().required("상품을 한줄로 요약해 주세요."),
  contents: yup.string().required("내용을 입력해 주세요."),
  price: yup.number().required("판매 가격을 입력해 주세요."),
});
