import ResetPassword from "@/components/form/reset-password-form/ResetPassword";
import Navbar from "@/components/Navbar";

const Page = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ResetPassword />
      </div>
    </section>
  );
};
export default Page;
