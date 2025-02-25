import Link from "next/link";
import { signout } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/context/UserContext";
import {
  ChartBar,
  House,
  Person,
  SignIn,
  SignOut,
  User,
  Users,
} from "@phosphor-icons/react";
import { useNotifContext } from "@/context/NotifContext";

const MenuList = () => {
  const { user, setUser } = useUserSession();
  const { notif, setNotif } = useNotifContext();
  const [alertStatus, setAlertStatus] = useState(false);
  const router = useRouter();

  const alert = () => {
    setAlertStatus((prev) => !prev);
  };

  const logout = async () => {
    await signout();
    setUser((prev) => (prev = {}));
    return router.push("/signin");
  };

  useEffect(() => {
    if (alertStatus) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [alertStatus]);

  return (
    <div className="flex flex-col justify-center items-center">
      {alertStatus && (
        <>
          <div
            className="bg-main-background w-screen h-screen fixed opacity-40 z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={alert}
          />
          <div className="fixed z-20 border-2 border-white bg-main-background rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-lg:w-3/4 lg:w-1/2 xl:w-1/3 h-1/3 flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center gap-5 w-full h-full items-center text-lg">
              <div className="text-center w-1/2 max-[640px]:w-full">
                Are you sure to signout?
              </div>
              <div className="flex justify-around items-center w-3/4">
                <button
                  onClick={alert}
                  className="border rounded-md px-4 py-1 hover:bg-main-base hover:text-main-background transition-all duration-300"
                >
                  No
                </button>
                <button
                  onClick={logout}
                  className="border rounded-md px-4 py-1 hover:bg-main-base hover:text-main-background transition-all duration-300"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <section className="flex flex-col gap-5 items-start font-semibold max-[640px]:text-[.8em]">
        {user?.id && (
          <div className="underline underline-offset-4 text-center flex justify-center items-center gap-2">
            <div className="">{user?.username}</div>
            <User size={20} color="#f2f2f2" weight="fill" />
          </div>
        )}
        <Link
          href={"/"}
          className="text-center flex flex-col py-1 items-center justify-center group/home"
        >
          <div className="flex gap-2 items-center justify-center">
            <div>Home</div>
            <House size={20} color="#f2f2f2" weight="fill" />
          </div>
          <div className="w-0 bg-white h-[1px] group-hover/home:w-full transition-all duration-300" />
        </Link>
        {user?.id && (
          <>
            <Link
              href={"/dashboard"}
              className="flex flex-col items-center justify-center group/dashboard"
            >
              <div className="flex gap-2 items-center justify-center">
                <div>Dashboard</div>
                <ChartBar size={20} color="#f2f2f2" weight="fill" />
              </div>
              <div className="w-0 bg-white h-[1px] group-hover/dashboard:w-full transition-all duration-300" />
            </Link>

            <Link
              href={"/users"}
              className="text-center flex flex-col py-1 items-center justify-center relative group/users"
            >
              <div className="flex gap-2 items-center justify-center">
                <div>Users</div>
                <div className="absolute -bottom-1 -right-2 bg-red-600 rounded-full text-center flex items-center justify-center w-1/4 h-1/2 text-xs">
                  {notif.length}
                </div>
                <Users size={20} color="#f2f2f2" weight="fill" />
              </div>
              <div className="w-0 bg-white h-[1px] group-hover/users:w-full transition-all duration-300" />
            </Link>
          </>
        )}
        <Link
          href={"/bmi"}
          className="flex flex-col items-center justify-center group/bmi"
        >
          <div className="flex gap-2 items-center justify-center">
            <div>BMI</div>
            <Person size={20} color="#f2f2f2" weight="fill" />
          </div>
          <div className="w-0 bg-white h-[1px] group-hover/bmi:w-full transition-all duration-300" />
        </Link>
        {user?.id ? (
          <button
            className="flex flex-col items-center justify-center group/signout"
            onClick={alert}
          >
            <div className="flex gap-2 items-center justify-center">
              <div>SIGN OUT</div>
              <SignOut size={20} color="#f2f2f2" weight="fill" />
            </div>
            <div className="w-0 bg-white h-[1px] group-hover/signout:w-full transition-all duration-300" />
          </button>
        ) : (
          <Link
            href={"/signin"}
            className="flex flex-col items-center justify-center group/signin"
          >
            <div className="flex gap-2 items-center justify-center">
              <div>SIGN IN</div>
              <SignIn size={20} />
            </div>
            <div className="w-0 bg-white h-[1px] group-hover/signin:w-full transition-all duration-300" />
          </Link>
        )}
      </section>
    </div>
  );
};
export default MenuList;
