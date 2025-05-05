// 기능, 동작이 일치하지만 스타일이 다른 버튼이 있을 때
// 베이스 컴포넌트 기준으로 스타일을 넘겨 주면 된다.

// 공통 컴포넌트 함수명 약속:
//    1. 버튼의 기능인 경우에 "버튼"이라는 공통적인 기능이므로 Button 을 먼저 입력을 하고 뒤에 스타일 형태가 붙는다.
//    2. 버튼의 형태 각진, 모서리 둥근, 원형 등 여러 모양의 버튼을 Soft, Thin, Circle 등 간략하게 표기한다.
//    3. 스타일은 10px 이런 형식으로 사용하지 않는다. (15px로 변경 시 사용한 모든 버튼 컴포넌트를 수정해줘야 함)
//    4. 따라서 디자이너와 협의를 통해 세로 S, 가로 L 이렇게 길이를 정해 ButtonSoftSL 정한다.
//    5. 반응형 버튼인 경우 가로 사이즈가 동적으로 변경이 되는데 그럴경우 ButtonMFull 이렇게 사용한다.

"use client";

import { FieldValues, Path, useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

import { ButtonHTMLAttributes, PropsWithChildren } from "react";

// 버튼에서 사용할 수 있는 모든 타입을 사용할 수 있어 className, children 속성을 사용할 수 있다.
type ButtonBaseProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

// 1. 버튼 뼈대
function ButtonBase(props: ButtonBaseProps) {
  const { formState } = useFormContext();

  return (
    <button className={props.className} disabled={!formState.isValid}>
      {props.children}
    </button>
  );
}

// 2. 스타일 다른 버튼 생성
// 부드러운 버튼
export function ButtonSoftMFull(props: ButtonBaseProps) {
  return <ButtonBase className={styles.button__soft__m__full} {...props} />;
}

// 얇은 버튼
export function ButtonThinFitM(props: ButtonBaseProps) {
  return <ButtonBase className={styles.button__soft__fit__m} {...props} />;
}

// 🎈 {...props}는 해당 태그의 모든 타입을 넘겨준다는 뜻이다. 그래서 사용 예시에서 넘긴 props의 값을 사용하며 "로그아웃 하기"의 내용도 children을 통해 가져올 수 있다.

// 다른 컴포넌트에서 해당 버튼 사용 예제
// import { ButtonSoftMFull } from ""; // {}은 default 사용을 하고 있지 않아서
<ButtonSoftMFull>로그아웃 하기</ButtonSoftMFull>;

//
//
//
//
// input (제네릭타입 적용)
// keyname을 단순히 string으로 선언하지 않는 이유는 다음과 같습니다:
// - 이 컴포넌트는 여러 form에서 재사용되는데, string 타입으로 선언하면 해당 schema에 없는 key를 입력해도 컴파일 에러 없이 통과됩니다.
// - keyname을 `"title" | "price" | "contents"`처럼 union으로 제한할 수도 있지만, 이 방식은 확장성이 떨어지고 사실상 any와 다를 바 없습니다.
// - 특히 동일한 InputSoftSFull 컴포넌트를 게시물 작성 form과 검색 form 등 서로 다른 schema에서 사용할 경우,
//   string 타입을 쓰면 각 form의 정확한 필드명을 보장할 수 없어 타입 안정성이 무너집니다.

// 따라서 제네릭 타입을 통해 사용하는 쪽에서 form의 schema 타입을 명시하게 하면,
// - 해당 schema에 정의된 필드만 keyname으로 사용할 수 있어 자동완성과 타입 검증이 가능하고,
// - 다양한 form에서도 하나의 컴포넌트를 타입 안전하게 재사용할 수 있습니다.

// 🎈 제네릭타입의 T 만 사용하는게 아닌 FieldValues를 추가하는 이유는 react-hook-form을 사용하는 경우 필요하다.
// 🎈 Path<T>는 중첩된 객체도 안전하게 처리할 수 있어서 user.name, user.email 같은 경우에도 매우 유용하다.

// input의 타입 (props로 넘겨준 input의 타입)
type InputBaseProps<T extends FieldValues> = {
  keyname: Path<T>;
} & React.InputHTMLAttributes<HTMLInputElement>; // type, className 등 기본 input 속성 포함

// 스키마 타입
interface ISchema {
  title: string;
  price: string;
}

// 1. 입력 뼈대
function InputBase<T extends FieldValues>({
  keyname,
  ...props
}: InputBaseProps<T>) {
  const { register } = useFormContext<T>();

  return (
    <input
      className={props.className}
      type={props.type}
      {...register(keyname)} // keyof T -> string으로 변환 필요
    />
  );
}

// 2. 스타일 다른 입력 생성
export function InputSoftSFull<T extends FieldValues>(
  props: InputBaseProps<T>
) {
  return <InputBase<T> className={styles.input__soft__s__full} {...props} />;
}

// 다른 컴포넌트에서 해당 버튼 사용 예제
// import { InputSoftSFull } from "";

{
  InputSoftSFull<ISchema>({ type: "text", keyname: "title" });
} // 함수 형식으로 사용
<InputSoftSFull<ISchema> type="text" keyname="price" />; // 컴포넌트 형식으로 사용
