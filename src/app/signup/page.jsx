import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/Navbar";

const Page = () => {
  return (
    <section className="w-full h-screen">
      <Navbar />
      <main className="w-full h-auto py-5 flex flex-col justify-center items-center">
        <div className="border-2 w-3/4 sm:max-lg:w-1/2 lg:max-2xl:w-1/3 border-main-base items-center justify-center rounded-lg p-9 flex flex-col gap-7">
          <h2 className="self-center font-bold">SIGN UP</h2>
          <AuthForm type={"signup"} />
        </div>
      </main>
    </section>
  );
};
export default Page;
