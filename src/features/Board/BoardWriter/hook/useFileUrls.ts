// "use client";

// import { ChangeEvent, useState } from "react";

// interface IFileUrls {
//   imageUrl: string[];
//   // setImageUrl: Dispatch<SetStateAction<string[]>>;
//   imageFile: File[];
//   onChangeFileUrls: (
//     index: number
//   ) => (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
//   removeImage: (index: number) => void;
// }

// export default function useFileUrls(): IFileUrls {
//   const [imageUrl, setImageUrl] = useState<string[]>(["", "", ""]);
//   const [imageFile, setImageFile] = useState<File[]>([]);

//   // 이미지 삭제 함수
//   const removeImage = (index: number) => {
//     if (imageUrl[index]) URL.revokeObjectURL(imageUrl[index]); // URL 해제

//     const tempUrl = [...imageUrl];
//     tempUrl[index] = ""; // 이미지 URL 제거
//     setImageUrl(tempUrl);

//     const tempFile = [...imageFile];
//     tempFile[index] = undefined as unknown as File; // 타입 일치시키기 위해 undefined를 File로 변환
//     setImageFile(tempFile);
//   };

//   // 이미지 등록 함수
//   const onChangeFileUrls =
//     (index: number) =>
//     async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
//       const file = event.target.files?.[0];
//       if (file === undefined) return;

//       if (file) {
//         const url = URL.createObjectURL(file);
//         // console.log("url: ", url);
//         const tempUrl = [...imageUrl];
//         tempUrl[index] = url;
//         setImageUrl(tempUrl);

//         const tempFile = [...imageFile];
//         tempFile[index] = file;
//         setImageFile(tempFile);
//       }
//     };

//   return { imageUrl, imageFile, onChangeFileUrls, removeImage };
// }

// // const fileReader = new FileReader();
// // fileReader.readAsDataURL(file);
// // fileReader.onload = (event) => {
// //   if (typeof event.target?.result === "string") {
// //     const tempFile = [...imageUrl];
// //     tempFile[index] = event.target?.result;
// //     setImageUrl(tempFile);

// //     const tempUpload = [...imageFile];
// //     tempUpload[index] = file;
// //     setImageFile(tempUpload);
// //   }
// // };

// filepath: c:\Users\chan\Desktop\codecamp\test_next_cna\class\src\features\Board\BoardWriter\hook\useFileUrls.ts
import { ChangeEvent, useState } from "react";

interface IFileUrls {
  imageUrl: string[];
  imageFile: File[];
  onChangeFileUrls: (
    index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  removeImage: (index: number) => void;
}

export default function useFileUrls(): IFileUrls {
  const [imageUrl, setImageUrl] = useState<string[]>(["", "", ""]);
  const [imageFile, setImageFile] = useState<File[]>([]);

  // 이미지 삭제 함수
  const removeImage = (index: number) => {
    if (imageUrl[index]) URL.revokeObjectURL(imageUrl[index]); // URL 해제

    const tempUrl = [...imageUrl];
    tempUrl[index] = ""; // 이미지 URL 제거
    setImageUrl(tempUrl);

    const tempFile = [...imageFile];
    tempFile[index] = undefined as unknown as File; // 타입 일치시키기 위해 undefined를 File로 변환
    setImageFile(tempFile);
  };

  // 이미지 등록 함수
  const onChangeFileUrls =
    (index: number) =>
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const file = event.target.files?.[0];
      if (file === undefined) return;

      if (file) {
        const url = URL.createObjectURL(file);
        const tempUrl = [...imageUrl];
        tempUrl[index] = url;
        setImageUrl(tempUrl);

        const tempFile = [...imageFile];
        tempFile[index] = file;
        setImageFile(tempFile);
      }
    };

  return { imageUrl, imageFile, onChangeFileUrls, removeImage };
}
