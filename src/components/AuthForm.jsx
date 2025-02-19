"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import InputForm from "./form/InputForm";
import { signin, signup } from "@/lib/actions";
import { zodSchema } from "@/lib/zodSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/useLoading";
import ButtonForm from "./form/ButtonForm";
import { useUserSession } from "@/context/UserContext";
import { useState } from "react";

const AuthForm = ({ type }) => {
  const router = useRouter();
  const { user, setUser } = useUserSession();
  const [isLoading, setIsLoading] = useLoading("3000");
  const [isError, setIsError] = useState(null);
  const schema = zodSchema(type);

  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(schema),
  });
  const { formState } = form;

  const onSubmit = async (data) => {
    if (type === "signup") {
      const response = await signup(data);
      if (!response.ok) {
        setIsError(response);
        return setIsLoading(true);
      }
      return router.push("/signin");
    }
    if (type === "signin") {
      const response = await signin(data);
      setUser(response?.result);
      if (!response.response.ok) {
        setIsError(response.result);
        return setIsLoading(true);
      }
      router.push("/");
    }
  };
  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="animate-bounceSlow absolute border-main-secondStrip -top-16 -left-18 -translate-x-1/2 -translate-y-1/2 right-0 border-2 w-full p-4 flex flex-col justify-center items-center bg-main-background rounded-xl gap-5">
          <p className="text-lg uppercase">
            {isError.fieldError ? isError.errorMessage : ""}
          </p>
          <p className="text-lg ">
            {isError.errorMessage ? isError.errorMessage : isError}
          </p>
          <button
            className="hover:border-main-base  hover:bg-main-background bg-main-base text-main-background hover:text-main-base font-semibold transition-all duration-200 border-2 rounded-lg px-4 py-1"
            onClick={() => setIsLoading(false)}
          >
            OK
          </button>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {type === "signup" && (
            <InputForm
              form={form}
              name={"email"}
              label={"Email"}
              isError={!!formState.errors.email}
              errorMessage={formState.errors.email?.message}
              placeHolder={"e.g. elnora@gmail.com"}
            />
          )}
          <InputForm
            form={form}
            name={"username"}
            label={"Username"}
            isError={!!formState.errors.username}
            errorMessage={formState.errors.username?.message}
            placeHolder={"username..."}
          />
          <InputForm
            form={form}
            name={"password"}
            label={"Password"}
            type={"password"}
            isError={!!formState.errors.password}
            errorMessage={formState.errors.password?.message}
            placeHolder={"password..."}
          />
          {type === "signup" && (
            <InputForm
              form={form}
              name={"confirm"}
              label={"Confirm Password"}
              type={"password"}
              isError={!!formState.errors.confirm}
              errorMessage={formState.errors.confirm?.message}
              placeHolder={"password..."}
            />
          )}
          <ButtonForm />
        </form>
      </Form>
      <div className="py-4 flex flex-col gap-5 mt-2">
        <div className="border relative flex justify-center items-center w-full">
          <div className="absolute -top-3.5 bg-black text-center w-8 ">
            <span>Or</span>
          </div>
        </div>
        <div className="text-center">
          <Link
            href={`/${type === "signin" ? "signup" : "signin"}`}
            className="w-full h-full flex justify-center items-center group/auth text-lg"
          >
            <div className="flex flex-col items-center justify-center">
              {type === "signin" ? "Sign up" : "Sign in"}
              <div className="w-0 bg-white h-[1px] group-hover/auth:w-full transition-all duration-300" />
            </div>
          </Link>
          <span> / </span>
          <br />
          <Link
            href={`/forgot-password`}
            className="w-full h-full flex justify-center items-center group/auth text-lg"
          >
            <div className="flex flex-col items-center justify-center">
              Forgot Password
              <div className="w-0 bg-white h-[1px] group-hover/auth:w-full transition-all duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
