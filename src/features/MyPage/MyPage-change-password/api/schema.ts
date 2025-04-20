import * as yup from "yup";

export const PasswordChangeSchema = yup.object().shape({
  password: yup.string().required("새 비밀번호를 입력해 주세요."),
  confirmPassword: yup.string().when("password", {
    is: (val: string) => val?.length > 0,
    then: (schema) =>
      schema
        .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
        .required("새 비밀번호 확인을 입력해 주세요."),
    otherwise: (schema) => schema.notRequired(), // password가 없으면 검증 안 함
  }),
});
