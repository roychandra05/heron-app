import Image from "next/image";

const Galleries = ({ imgs, galleriesData }) => {
  return (
    <section className="w-full h-[70vh] flex flex-col gap-8 items-center justify-center py-5 box-border">
      <div className="flex items-center justify-center">
        <h1 className="max-[640px]:text-lg text-2xl font-bold">GYM AREA</h1>
      </div>
      <div
        className="grid grid-cols-2
      sm:max-lg:h-[130%]
      xl:max-2xl:grid-cols-4 2xl:grid-cols-4 w-full h-full gap-3 lg:gap-5 lg:h-[80%] box-border p-4"
      >
        {imgs.map((img, i) => {
          return (
            <div
              key={i}
              className="group border rounded-lg relative flex overflow-hidden"
            >
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt="galleri"
                  fill
                  loading="lazy"
                  quality={80}
                  className="object-cover object-center"
                  placeholder="blur"
                  // sizes="100vw, 100vh"
                />
              </div>
              <div className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 transition-all duration-300" />
              <div className="p-2 absolute opacity-0 transition-all duration-300 group-hover:opacity-100 bottom-0">
                <p className="max-[640px]:text-[.6em] text-sm font-semibold">
                  {galleriesData[i]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Galleries;
