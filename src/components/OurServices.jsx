const OurServices = ({ services, children }) => {
  return (
    <div className="box-border py-5 h-full lg:h-[120%]">
      <div className="max-[640px]:text-xs text-sm text-justify border-2 flex flex-col justify-center items-center rounded-lg w-full p-3 animate-bounceSlow h-[100%] sm:max-lg:h-[100%] lg:max-2xl:h-[70%] relative">
        <div className="absolute -top-8 bg-main-background w-20 flex flex-col items-center justify-center">
          {children}
        </div>
        <div>{services}</div>
      </div>
    </div>
  );
};
export default OurServices;
