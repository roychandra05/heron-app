import { Building } from "@phosphor-icons/react/dist/ssr";

const Welcome = () => {
  return (
    <section className="w-full mb-14 box-border h-[60vh] p-5">
      <div className="flex flex-col items-center justify-center border rounded-xl w-full h-full p-5">
        <div>
          <Building color="#fff" weight="duotone" className="w-16 h-16" />
        </div>
        <div className="w-3/4 p-3">
          <blockquote className="text-center md:max-2xl:text-2xl">
            Welcome to Heron Fit, where your fitness journey begins. Whether
            you're here to build strength, improve endurance, or simply stay
            active, we provide the tools and support you need to achieve your
            goals.
          </blockquote>
        </div>
      </div>
    </section>
  );
};
export default Welcome;
