import * as yup from "yup";

export const travelQuestionSchema = yup.object().shape({
  contents: yup.string().required("내용을 입력해 주세요."),
});
