import * as yup from "yup";

export const boardWriterSchema = yup.object().shape({
  writer: yup.string().required("작성자 명을 입력해 주세요."),
  password: yup.string().required("비밀번호를 입력해 주세요."),
  title: yup.string().required("제목을 입력해 주세요."),
  contents: yup.string().required("내용을 입력해 주세요."),
  zipcode: yup.string(),
  address: yup.string(),
  addressDetail: yup.string(),
  youtubeUrl: yup.string().url("올바른 URL을 입력해주세요."), // URL 유효성 검사
  // image: yup.array().of(yup.mixed().nullable()).optional(),
});
