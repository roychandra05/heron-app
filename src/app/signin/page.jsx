import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/Navbar";

const Page = () => {
  return (
    <section className="w-full h-screen">
      <Navbar />
      <main className="w-full h-[90vh] flex flex-col justify-center items-center">
        <div className="border-2 w-3/4 sm:max-lg:w-1/2 lg:max-2xl:w-1/3 border-main-base rounded-lg p-9 flex flex-col items-center justify-center gap-7">
          <h2 className="self-center font-bold">Sign In</h2>
          <AuthForm type={"signin"} />
        </div>
      </main>
    </section>
  );
};
export default Page;
