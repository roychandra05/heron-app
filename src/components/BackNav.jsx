"use client";
import { ArrowFatLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const BackNav = () => {
  const router = useRouter();

  const previousPage = () => {
    router.back();
  };
  return (
    <button onClick={previousPage} className="">
      <ArrowFatLeft size={32} />
    </button>
  );
}
export default BackNav;
