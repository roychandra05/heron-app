import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import heronLogo from "../../public/images/heron-logo.jpg";

const Footer = () => {
  const { INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_NUMBER_FORMAT } =
    process.env;
  return (
    <section className="max-[640px]:text-xs text-lg w-full h-[30vh] p-2 relative grid grid-cols-4 max-[640px]:grid-cols-2 gap-4 border-t-4 justify-between items-center box-border">
      <div className="absolute min-w-full h-full -z-10 opacity-20">
        <Image
          src={heronLogo}
          alt="Gym Area"
          quality={90}
          fill
          sizes="100vw"
          className="object-contain object-center"
          loading="lazy"
          placeholder="blur"
        />{" "}
      </div>

      <div className="text-center flex flex-col items-center justify-center h-full">
        <h1>Visit Us</h1>
        <a target="_blank" href={`https://www.instagram.com/${INSTAGRAM_URL}`} className="w-1/3 h-1/3 flex flex-col justify-center items-center">
          <InstagramLogo
            color="#ed0707"
            weight="light"
            className="cursor-pointer w-full h-full"
          />
        </a>
      </div>
      <div className="text-center flex flex-col items-center justify-center h-full">
        <h1>Sales Contacts</h1>
        <a target="_blank" href={`https://wa.me/${WHATSAPP_NUMBER}`} className="group/contact flex flex-col items-center justify-center">
          {WHATSAPP_NUMBER_FORMAT}
          <div className="w-0 h-[1px] bg-white group-hover/contact:w-full transition-all duration-300"/>
        </a>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Address</h1>
        <div>
          Jl. Ahmad Yani, Dauh Puri Kaja, Kec. Denpasar Utara, Kota Denpasar,
          Bali
        </div>
      </div>
      <div className="text-center flex flex-col items-center justify-center h-full text-sm max-[640px]:text-[.7em]">
        <p className="">
          &copy;{new Date().getFullYear()} ROY CHANDRA TELAUMBANUA
        </p>
      </div>
    </section>
  );
};
export default Footer;
