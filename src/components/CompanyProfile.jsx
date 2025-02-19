import Image from "next/image";
import img from '../../public/images/img.jpg'

const CompanyProfile = () => {
  return (
    <section className="w-full max-[640px]:h-[70vh] h-[100vh]">
      <div className="w-full h-full relative">
        <Image
          src={img}
          alt="Gym Area"
          quality={90}
          loading="eager"
          placeholder="blur"
          fill
          className="object-cover object-center"
        />
        <div className="absolute w-full h-full bg-black opacity-45" />
        <div className="gap-2 font-semibold absolute left-1/2 top-1/2 w-3/4 h-1/2 sm:max-2xl:w-3/6 sm:max-2xl:h-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col justify-center text-sm sm:max-2xl:text-lg p-4">
          <div className="text-5xl max-[640px]:text-2xl text-center">
            HERON FIT
          </div>
          <div className="w-full h-[2px] bg-white " />
          <p className="text-center ">
            "Push your limits. Achieve your potential. Transform your life."
          </p>
        </div>
      </div>
    </section>
  );
};
export default CompanyProfile;
