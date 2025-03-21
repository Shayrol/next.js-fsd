import Image from "next/image";

export default function TravelAd() {
  return (
    <section className="w-full">
      <Image
        src={"/travel/travelAd.svg"}
        alt="travel advert"
        width={1280}
        height={240}
      />
    </section>
  );
}
