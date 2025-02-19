"use client";
import { useState } from "react";
import MenuList from "../Menu/MenuList";
import { useUserSession } from "@/context/UserContext";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  style: "normal"
})

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserSession();
  return (
    <section
      data-testid="region"
      className={` ${isOpen ? "" : "-translate-x-full"}
            right-2/3 
          fixed bg-black z-50 left-0 top-0 bottom-0 border-r-2 rounded-lg p-2 transition-all duration-300`}
    >
      <button
        className="absolute -right-8 top-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 border rounded-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>
      {!isOpen && user && (
        <div className={`${montserrat.className} font-semibold leading-loose absolute -right-3.5 top-10 w-0 h-screen break-all`}>
          {user.username}
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-4">
        <MenuList/>
      </div>
    </section>
  );
};

export default Navigation;
