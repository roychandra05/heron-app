import FormBmi from "@/components/bmi/FormBmi";
import Navbar from "@/components/Navbar";
const Page = () => {
  return (
    <section className="relative w-full h-screen items-center justify-evenly">
      <Navbar />
      <div className="w-full h-3/4 flex flex-col items-center justify-center gap-5">
        <h1 className="font-bold text-xl underline underline-offset-2">
          BODY MASS INDEX
        </h1>
        <FormBmi />
      </div>
    </section>
  );
};
export default Page;
