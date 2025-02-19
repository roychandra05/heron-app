"use client";
import { resetPassword } from "@/lib/actions";
import InputResetPassword from "../InputResetPassword";
import { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.info(token);

  const [state, formAction, isPending] = useActionState(resetPassword, {
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state?.invalid) {
      const redirectToHomePage = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => clearTimeout(redirectToHomePage);
    }
  }, [state?.invalid]);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
    return () => {
      null;
    };
  }, []);

  return (
    <div
      className={`border w-1/2 max-[640px]:w-[90vw] sm:max-lg:w-3/4 h-auto grid grid-cols-2 max-[640px]:grid-cols-1 items-center justify-center p-10 max-[640px]:p-4 box-border relative overflow-hidden gap-8`}
    >
      <div
        className={`absolute inset-0 bg-main-background z-10 transition-all duration-1000 flex flex-col justify-center items-center gap-5 ${
          state?.success || state?.invalid ? "" : "-translate-x-full"
        } `}
      >
        <div
          className={`max-[640px]:text-[1em] ${montserrat.className}leading-relaxed p-2 bg-green-600 text-xl text-center`}
        >
          {state?.success || state?.invalid}
        </div>
        {state?.success && (
          <div className="w-1/2 flex items-center justify-between">
            <Link
              href={"/signin"}
              className="hover:border-main-base hover:text-main-background hover:bg-main-base border px-3 py-1 text-lg font-bold transition-all duration-300 border-main-base bg-main-background text-main-base rounded-md"
            >
              Signin
            </Link>
            <Link
              href={"/"}
              className="hover:border-main-base hover:text-main-background hover:bg-main-base border px-3 py-1 text-lg font-bold transition-all duration-300 border-main-base bg-main-background text-main-base rounded-md"
            >
              Home
            </Link>
          </div>
        )}
        {state?.invalid && (
          <Link
            href={"/"}
            className="hover:border-main-base hover:text-main-background hover:bg-main-base border px-3 py-1 text-lg font-bold transition-all duration-300 border-main-base bg-main-background text-main-base rounded-md"
          >
            OK
          </Link>
        )}
      </div>
      <div className="self-start flex flex-col gap-3">
        <h2 className="font-bold text-xl max-[640px]:text-[1.2em] underline underline-offset-2 decoration-gray-300">
          RESET PASSWORD
        </h2>
        <div className="text-lg leading-snug text-gray-300 max-[640px]:text-[1em]">
          <span className="text-xl max-[640px]:text-[1.1em] font-semibold text-white ">
            Hello,{" "}
          </span>{" "}
          please input your password and confirm password. Make sure its a
          strong password.
        </div>
      </div>
      <form action={formAction} className="flex flex-col gap-8">
        <InputResetPassword
          text={"Password"}
          name={"password"}
          type={"password"}
          defaultValue={state?.data?.password}
          isError={state?.error?.password}
          errorMsg={state?.error?.password?._errors}
          isPending={isPending}
        />
        <InputResetPassword
          text={"Confirm Password"}
          name={"confirmPassword"}
          type={"password"}
          defaultValue={state?.data?.confirmPassword}
          isError={state?.error?.confirmPassword}
          errorMsg={state?.error?.confirmPassword?._errors}
          isPending={isPending}
        />
        <input type="hidden" value={token || ""} name="token" />
        <div className="flex justify-end gap-3 items-center">
          <button className="px-2 py-1 rounded-lg font-semibold border-2 hover:border-main-base hover:bg-main-background bg-main-base text-main-background hover:text-main-base transition-all duration-200">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;
