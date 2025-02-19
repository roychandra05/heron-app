"use client";
import { forgotPassword } from "@/lib/actions";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import InputResetPassword from "../InputResetPassword";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: "400"
})

const ForgotPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(forgotPassword, {
    email: "",
    username: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      const redirectToHomePage = setTimeout(() => {
        router.push("/");
      }, 6000);

      return () => clearTimeout(redirectToHomePage);
    }
  }, [state?.success]);

  return (
    <div
      className={`border w-1/2 max-[640px]:w-[90vw] sm:max-lg:w-3/4 h-auto grid grid-cols-2 max-[640px]:grid-cols-1 items-center justify-center max-[640px]:p-4 p-10 box-border relative overflow-hidden gap-8`}
    >
      <div
        className={`absolute inset-0 bg-main-background z-10 transition-all duration-1000 flex flex-col justify-center items-center gap-5 ${
          state?.success ? "" : "-translate-x-full"
        } `}
      >
        <div className={`max-[640px]:text-[1em] ${montserrat.className}leading-relaxed p-2 bg-green-600 text-xl text-center`}>{state?.success}</div>
        <Link
          href={"/"}
          className="hover:border-main-base hover:text-main-background hover:bg-main-base border px-3 py-1 text-lg font-bold transition-all duration-300 border-main-base bg-main-background text-main-base rounded-md"
        >
          OK
        </Link>
      </div>
      <div className="text-xl self-start flex flex-col gap-3">
        <h2 className="font-bold text-xl max-[640px]:text-[1.2em] underline underline-offset-2 decoration-gray-300">
          FORGOT PASSWORD
        </h2>
        <div className="text-lg leading-snug text-gray-300 max-[640px]:text-[1em]">
          <span className="text-xl max-[640px]:text-[1.1em] font-semibold text-white ">Hello, </span>{" "}
          please enter your email address and username to receive an email.
        </div>
      </div>
      <form action={formAction} className="flex flex-col gap-8">
        <InputResetPassword
          isPending={isPending}
          text={"Email"}
          name={"email"}
          type={"email"}
          defaultValue={state.data?.email}
          isError={state.error?.email}
          errorMsg={state.error?.email?._errors}
        />
        <InputResetPassword
          isPending={isPending}
          text={"Username"}
          name={"username"}
          type={"text"}
          defaultValue={state.data?.username}
          isError={state.error?.username}
          errorMsg={state.error?.username?._errors}
        />
        <div className="flex justify-end gap-3 items-center">
          <Link
            href={"/signin"}
            className="px-2 py-1 rounded-lg font-semibold border-2 hover:border-main-base hover:bg-main-background bg-main-base text-main-background hover:text-main-base transition-all duration-200"
          >
            Cancel
          </Link>
          <button className="px-2 py-1 rounded-lg font-semibold border-2 hover:border-main-base hover:bg-main-background bg-main-base text-main-background hover:text-main-base transition-all duration-200">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default ForgotPasswordForm;
