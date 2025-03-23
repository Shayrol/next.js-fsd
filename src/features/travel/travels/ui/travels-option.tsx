"use client";

import Image from "next/image";
import { travels_option } from "../model/travelsOptions";

// 여행지 목록 선택

export default function TravelsOption() {
  return (
    <ul className="flex justify-between items-center py-4 w-full">
      {travels_option.map((el) => (
        <li
          key={el.name}
          className="flex flex-col justify-center items-center gap-2 min-w-[100px] cursor-pointer"
        >
          <div className="flex justify-center items-start min-w-[40px] min-h-[40px]">
            <Image
              src={el.image}
              alt="travels-option"
              width={34}
              height={34}
              className=""
            />
          </div>
          <p className="flex justify-center items-center w-full h-[24px] font-medium text-gray-800 text-[14px]">
            {el.name}
          </p>
        </li>
      ))}
    </ul>
  );
}
