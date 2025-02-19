import Image from "next/image";

const ImageItems = ({ imgs }) => {
  return (
    <>
      {imgs.map((img, i) => {
        return (
          <div
            key={i}
            className={`hover:translate-y-3 hover:shadow-none transition-all duration-300 rounded-full xl:max-2xl:w-48 xl:max-2xl:h-48 lg:max-xl:w-40 lg:max-xl:h-40 max-[640px]:w-16 max-[640px]:h-16 w-24 h-24 box-border overflow-hidden shadow-lg shadow-main-background`}
          >
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt="galleri"
                fill
                quality={80}
                sizes="100vw, 100vh"
                className="object-cover object-center"
                loading="lazy"
                placeholder="blur"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ImageItems;
