// features/Board/BoardWriter/ui/BoardWriterForm.tsx

"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Trash2, Upload } from "lucide-react";
import Image from "next/image";

export interface ImageType {
  id: string;
  url: string;
  file?: File;
  isNew?: boolean;
  isDeleted?: boolean;
}

interface ImageUploaderProps {
  initialImages?: string[];
  maxImages?: number;
  onChange?: (images: ImageType[]) => void;
  disabled?: boolean;
}

export function ImageUploader({
  initialImages = [],
  maxImages = 3,
  onChange,
  disabled = false,
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 초기 이미지 설정 (문자열 배열을 ImageType 배열로 변환)
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const formattedImages = initialImages
        .filter((url) => url !== "") // 빈 문자열 필터링
        .map((url, index) => ({
          id: `db-${index}`,
          url: `http://storage.googleapis.com/${url}`,
          isNew: false,
          isDeleted: false,
        }));
      setImages(formattedImages);
    }
  }, [initialImages]);

  // 이미지 변경 시 부모 컴포넌트에 알림
  useEffect(() => {
    if (onChange) {
      onChange(images);
    }
  }, [images, onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: ImageType[] = [];
    const visibleImagesCount = images.filter((img) => !img.isDeleted).length;
    const totalImages = visibleImagesCount + files.length;

    if (totalImages > maxImages) {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    Array.from(files).forEach((file) => {
      const id = `local-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;
      const url = URL.createObjectURL(file);
      newImages.push({ id, url, file, isNew: true });
    });

    setImages([...images, ...newImages]);

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(
      (prevImages) =>
        prevImages
          .map((image) => {
            if (image.id === id) {
              // 새 이미지는 완전히 제거하기 위해 표시
              if (image.isNew) {
                // 객체 URL 해제
                if (image.url.startsWith("blob:")) {
                  URL.revokeObjectURL(image.url);
                }
                return { ...image, isDeleted: true };
              }

              // 기존 이미지는 삭제 표시만 함
              return { ...image, isDeleted: true };
            }
            return image;
          })
          .filter((image) => !(image.isNew && image.isDeleted)) // 삭제된 새 이미지는 배열에서 제거
    );
  };

  // 화면에 표시할 이미지 (삭제되지 않은 것만)
  const visibleImages = images.filter((image) => !image.isDeleted);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {visibleImages.map((image) => (
          <div
            key={image.id}
            className="relative group border rounded-md overflow-hidden"
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt="업로드된 이미지"
              width={32}
              height={32}
              className="w-32 h-32 object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={() => handleDeleteImage(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="이미지 삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {!disabled && visibleImages.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
          >
            <Upload className="w-6 h-6" />
            <span>이미지 추가</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}

// 사용법
// 이미지 상태관리를 위해 다음과 같이 한다.
// -- 화면에 보이는 이미지로 삭제, 추가된 이미지와 초기 데이터 이미지를 불러온다.
// const [images, setImages] = useState<ImageType[]>([]);
// -- 버튼 연속 클릭 방지를 위함
// const [isSubmitting, setIsSubmitting] = useState(false);

// props로 onChange이며 해당 images의 추가하는데 사용된다.
// const handleImagesChange = (updatedImages: ImageType[]) => {
//   setImages(updatedImages);
// };

// 이미지 스토리지 서버에 저장 후 최종적으로 저장할 이미지 반환하기
// const processImages = async () => {
//   // 1. 새로 추가된 이미지 파일 수집
//   const newImageFiles = images
//     .filter((img) => img.isNew && !img.isDeleted && img.file)
//     .map((img) => img.file as File);

//   // 2. 유지할 기존 이미지 URL 수집
//   const keptImageUrls = images
//     .filter((img) => !img.isNew && !img.isDeleted)
//     .map((img) =>
//       img.url.startsWith("http://storage.googleapis.com/")
//         ? img.url.replace("http://storage.googleapis.com/", "")
//         : img.url
//     );

//   // 3. 새 이미지 업로드 및 URL 가져오기
//   const uploadResults = await Promise.all(
//     newImageFiles.map(async (file) => {
//       const result = await uploadFile({ variables: { file } });
//       return result.data?.uploadFile.url ?? "";
//     })
//   );

//   // 4. 기존 이미지와 새 이미지 URL 합치기
//   const allImageUrls = [...keptImageUrls, ...uploadResults];

//   console.log("allImageUrls: ", allImageUrls);
//   return allImageUrls;
// };
// 1. newImageFiles: 화면에 보이는 이미지만 가져오는데 isNew가 true이면서 삭제하지 않은
//    이미지만 불러온다. - file 타입
// 2. kepImageUrls: 기존 이미지를 불러오는데 url에 스토리지 주소가 있으면 지우고 불러온다.
// 3. uploadResults: 새이미지가 있는 newImageFiles를 불러와 uploadFile API를 통해 스토리지에
//    저장을 하고 반환된 이미지 url을 기존 이미지에 덮어씌워 업데이트 한다.
// 4. 이후 최종적으로 업데이트할 이미지에 해당 값을 넣어 요청한다.
