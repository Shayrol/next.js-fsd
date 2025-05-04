// 기능, 동작이 일치하지만 스타일이 다른 버튼이 있을 때
// 베이스 컴포넌트 기준으로 스타일을 넘겨 주면 된다.

// 공통 컴포넌트 함수명 약속:
//    1. 버튼의 기능인 경우에 "버튼"이라는 공통적인 기능이므로 Button 을 먼저 입력을 하고 뒤에 스타일 형태가 붙는다.
//    2. 버튼의 형태 각진, 모서리 둥근, 원형 등 여러 모양의 버튼을 Soft, Thin, Circle 등 간략하게 표기한다.
//    3. 스타일은 10px 이런 형식으로 사용하지 않는다. (15px로 변경 시 사용한 모든 버튼 컴포넌트를 수정해줘야 함)
//    4. 따라서 디자이너와 협의를 통해 세로 S, 가로 L 이렇게 길이를 정해 ButtonSoftSL 정한다.
//    5. 반응형 버튼인 경우 가로 사이즈가 동적으로 변경이 되는데 그럴경우 ButtonMFull 이렇게 사용한다.

"use client";

import { useFormContext } from "react-hook-form";
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

// ButtonSoftMFull 사용한 버튼 내용을 props로 받아와 {...props}를 통해 ButtonBase로 넘겨 children으로 사용한다.

// 다른 컴포넌트에서 해당 버튼 사용 예제
// import { ButtonSoftMFull } from "";  // {}은 default 사용을 하고 있지 않아서
// <ButtonSoftMFull>로그아웃 하기</ButtonSoftMFull>;
