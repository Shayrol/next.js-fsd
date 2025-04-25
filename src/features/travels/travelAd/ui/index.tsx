import Image from "next/image";

export default function TravelAd() {
  return (
    <section className="relative w-full px-5">
      <Image
        src="/travel/travelAd.svg"
        alt="travel advert"
        width={1280}
        height={240}
        sizes="(max-width: 640px) 0px, 100vw"
        className="hidden sm:block"
      />
      <Image
        src="/travel/travelAdMobile.svg"
        alt="travel advert"
        width={640}
        height={240}
        sizes="(max-width: 640px) 100vw"
        className="block sm:hidden"
      />
    </section>
  );
}
