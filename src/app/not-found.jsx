"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const back = () => {
    router.back();
  };
  return (
    <section className="flex flex-col w-full h-screen items-center justify-between p-4">
      <div className="">
        <h1 className="font-light text-xl underline underline-offset-4">
          Page not found
        </h1>
      </div>
      <div className="flex flex-col items-center text-lg gap-5">
        <blockquote className="font-light text-xl text-center">
          Sorry, the page you are looking for does not exist.
        </blockquote>
        <div className="flex items-center justify-center gap-5 w-1/2">
          <button onClick={back} className="underline font-bold">
            Back
          </button>
          <div className="h-3/4 border"></div>
          <Link href={"/"} className="underline font-bold">
            Home
          </Link>
        </div>
      </div>
      <div></div>
    </section>
  );
};
export default NotFound;
