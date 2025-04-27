import * as yup from "yup";

export const SignUpSchema = yup.object({
  email: yup.string().required("이메일을 입력해 주세요."),
  name: yup.string().required("이름을 입력해 주세요."),
  password: yup.string().required("비밀번호를 입력해 주세요."),
  confirmPassword: yup
    .string()
    .required("비밀번호 확인을 입력해 주세요.")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
});
