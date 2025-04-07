import * as yup from "yup";

export const travelWriterSchema = yup.object().shape({
  name: yup.string().required("상품명을 입력해 주세요."),
  remark: yup.string().required("상품을 한줄로 요약해 주세요."),
  contents: yup.string().required("내용을 입력해 주세요."),
  price: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .typeError("숫자만 입력해 주세요.")
    .required("판매 가격을 입력해 주세요."),
  zonecode: yup.string().required("우편번호를 등록해 주세요"),
  addressDetail: yup.string().required("상세주소를 입력해 주세요."),
  lat: yup.number().required("위도를 입력해 주세요."),
  lng: yup.number().required("경도를 입력해 주세요."),
});
