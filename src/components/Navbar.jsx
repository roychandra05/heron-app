"use client";
import { useUserSession } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import heronLogo from "../../public/images/heron-logo.jpg";
import BackNav from "./BackNav";
import {
  Bell,
  CaretUp,
  House,
  Person,
  SignIn,
  SignOut,
  User,
  Users,
} from "@phosphor-icons/react";
import { useNotifContext } from "@/context/NotifContext";
import NotifDisplay from "./notif/NotifDisplay";
import Menu from "./navbar/Menu";
import SignOutAlert from "./navbar/SignOutAlert";

const Navbar = ({ rightSide }) => {
  const { user } = useUserSession();
  const { notif } = useNotifContext();
  const [showNotif, setShowNotif] = useState(false);
  const [showMenuList, setShowMenuList] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);

  const handleButton = (key) => {
    if (key === "notif") {
      if (showMenuList) {
        setShowMenuList(false);
        setShowNotif(!showNotif);
      }
      setShowNotif(!showNotif);
    }
    if (key === "menu") {
      if (showNotif) {
        setShowNotif(false);
        setShowMenuList(!showMenuList);
      }
      setShowMenuList(!showMenuList);
    }
  };

  const handleSignOut = () => {
    if ((showMenuList && showNotif) || showMenuList || showNotif) {
      setShowMenuList(false);
      setShowNotif(false);
      setIsSignOut(!isSignOut);
    }
    setIsSignOut(!isSignOut);
  };

  useEffect(() => {
    if (isSignOut) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSignOut]);

  return (
    <nav className="max-[640px]:text-[.8em] border-b-2 h-[10vh] grid grid-cols-[2fr_1fr_2fr]  justify-between p-2 items-center sticky top-0 z-50 bg-main-background w-full max-[640px]:gap-2 gap-5 overflow-hidden">
      <NotifDisplay showNotif={showNotif} />
      <SignOutAlert isSignOut={isSignOut} handleSignOut={handleSignOut} />
      {isSignOut && (
        <div
          onClick={handleSignOut}
          className="fixed inset-0 z-20 bg-opacity-40 bg-main-background"
        />
      )}
      <div className="w-full h-full flex flex-col items-start justify-center">
        <BackNav />
      </div>
      <div className="flex items-center justify-center h-full w-auto ">
        <Link
          href={"/"}
          className="max-[640px]:w-[3.9em] sm:max-lg:w-[4.5em] max-2xl:w-[4.5em] h-full relative "
        >
          <Image
            src={heronLogo}
            fill
            loading="eager"
            alt="Heron Fit"
            className="object-cover object-center opacity-90"
            placeholder="blur"
            quality={80}
          />
        </Link>
      </div>
      <div className="text-main-base w-full h-full flex justify-end items-center max-[640px]:gap-2 gap-10 px-2 box-border">
        {/* Start Menu Button */}
        <div className="relative flex justify-center">
          <button
            onClick={() => {
              handleButton("menu");
            }}
            className="flex justify-center items-center w-full gap-1 border px-2 py-1 rounded-md"
          >
            <div>Menu</div>
            <div>
              <CaretUp
                weight="fill"
                className={`${
                  showMenuList ? "rotate-180" : ""
                } transition-all duration-500`}
              />
            </div>
          </button>
          {/* End Menu Button */}
          <section
            className={`fixed z-20 top-[10%] transition-all duration-500 flex flex-col gap-1 ${
              showMenuList
                ? "opacity-100 scale-100"
                : "-translate-y-52 opacity-0 scale-0"
            } `}
          >
            <Menu emoticon={<House />} link={"/"} text={"Home"} />
            <Menu emoticon={<Person />} link={"/bmi"} text={"BMI"} />
            {/* Start isUsers */}
            {user?.id ? (
              <div className="flex flex-col gap-1.5">
                <Menu link={"/dashboard"} text={"Dashboard"} />
                <Menu
                  handleSignOut={handleSignOut}
                  emoticon={<SignOut />}
                  text={"Sign Out"}
                />
                <Menu emoticon={<Users />} link={"/users"} text={"users"} />
              </div>
            ) : (
              <Menu emoticon={<SignIn />} link={"/signin"} text={"Sign In"} />
            )}
            {/* End isUsers */}
          </section>
        </div>
        {/* Start Auth Button */}
        {user.username && (
          <div className="flex items-center justify-end max-[640px]:gap-2 gap-8">
            <div className="flex justify-center items-center  border px-2 py-1 rounded-md">
              {user ? user.username : ""}
              <User />
            </div>
            <button
              onClick={() => {
                handleButton("notif");
              }}
              className="relative"
            >
              <Bell className="w-[25px] h-[25px]" />
              <div className="absolute -bottom-2 -right-2 bg-red-600 rounded-full text-center flex items-center justify-center w-3/4 h-3/4 text-xs">
                {notif.length}
              </div>
            </button>
          </div>
        )}
        {/* End Auth Button */}
      </div>
    </nav>
  );
};
export default Navbar;
