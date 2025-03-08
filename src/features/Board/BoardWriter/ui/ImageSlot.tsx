"use client";

import { useState, useEffect, ChangeEvent } from "react";

// 단일 이미지 슬롯 컴포넌트
function ImageSlot({ id }: { id: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // 파일 선택 시 미리보기 생성
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  // 이미지 제거
  const handleRemove = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl); // 메모리 누수 방지
    }
    setImageUrl(null);
  };

  // 컴포넌트 언마운트 시 URL 정리
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="image-slot">
      {imageUrl ? (
        <div className="preview">
          <img src={imageUrl} alt="미리보기" />
          <button onClick={handleRemove} className="remove">
            X
          </button>
        </div>
      ) : (
        <label htmlFor={id} className="placeholder">
          <span>+</span>
          <p>클릭해서 사진 업로드</p>
        </label>
      )}
      <input
        type="file"
        id={id}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*" // 이미지 파일만 선택 가능
      />
    </div>
  );
}

// 상위 컴포넌트에서 세 개의 슬롯 사용
export default function ImageUploader() {
  return (
    <div>
      <h3>사진 첨부</h3>
      <div className="flex justify-between">
        <ImageSlot id="file-input-1" />
        <ImageSlot id="file-input-2" />
        <ImageSlot id="file-input-3" />
      </div>
    </div>
  );
}
