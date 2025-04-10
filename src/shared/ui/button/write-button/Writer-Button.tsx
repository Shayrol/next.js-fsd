import Image from "next/image";
import Link from "next/link";

export default function WriterButton({
  name,
  link,
}: {
  name: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="flex justify-center items-center w-full max-w-[162px] h-[48px] rounded-[8px] px-4 py-3 gap-2 bg-[#2974E5] hover:bg-[#2974E5]/90"
    >
      <Image
        src={"/vote/main-write.svg"}
        alt="write-button"
        width={24}
        height={24}
        className=""
      />
      <p className="text-white text-nowrap font-semibold">{name}</p>
    </Link>
  );
}
