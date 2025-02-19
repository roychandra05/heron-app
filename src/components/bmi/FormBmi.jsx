"use client";
import { useActionState, useState } from "react";
import InputBmi from "./Input";
import { calculateBmi } from "@/lib/actions";

const FormBmi = () => {
  const [state, formAction, isPending] = useActionState(calculateBmi, {});
  const [input, setInput] = useState({
    height: "",
    weight: "",
  });

  const handleInput = (e) => {
    const value = e.target.value;
    if (value.includes(".") || value.includes(",")) {
      return;
    }
    setInput((prev) => {
      if (e.target.name === "height") {
        return (prev.height = { ...prev, height: value });
      }
      return (prev.weight = { ...prev, weight: value });
    });
  };
  return (
    <div className="w-[70%] max-[460px]:w-[80%] max-[460px]:text-xs h-auto grid grid-cols-2 gap-5 p-2">
      <form action={formAction} className="flex w-full h-auto flex-col gap-3">
        <h2 className="text-center font-bold">Calculate BMI</h2>
        <InputBmi
          label={"height (cm)"}
          name={"height"}
          placeholder={"e.g. 175"}
          onChange={handleInput}
          value={input?.height}
          isError={state.error?.height}
        />
        <InputBmi
          label={"weight (kg)"}
          name={"weight"}
          placeholder={"e.g. 65"}
          onChange={handleInput}
          value={input?.weight}
          isError={state.error?.weight}
        />
        <button className="border-2 border-main-background rounded-md bg-main-base text-black hover:border-main-base hover:bg-main-background hover:text-main-base p-1 transition-all duration-200 font-semibold">
          submit
        </button>
      </form>
      <div className="flex w-full h-auto flex-col gap-3">
        <h2 className="text-center font-bold">Result</h2>
        <div
          className={`flex flex-col gap-3 h-full border p-2 rounded-md ${
            state.bmi
              ? "border-black shadow-[0px_0px_10px_2px_white]"
              : "border-black"
          } transition-all duration-200`}
        >
          <p className="w-full flex">
            <span className="font-bold w-1/3">BMI</span>
            <span> : {state?.bmi}</span>
          </p>
          <p className="w-full flex">
            <span className="font-bold w-1/3">Category</span>
            <span> : {state?.category}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default FormBmi;
