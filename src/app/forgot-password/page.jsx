import ForgotPasswordForm from "@/components/form/forgot-password-form/ForgotPasswordForm";
import Navbar from "@/components/Navbar";

const Page = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ForgotPasswordForm />
      </div>
    </section>
  );
};
export default Page;
