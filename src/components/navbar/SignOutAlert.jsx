import { useUserSession } from "@/context/UserContext";
import { signout } from "@/lib/actions";
import { useRouter } from "next/navigation";

const SignOutAlert = ({ isSignOut, handleSignOut }) => {
  const { user, setUser } = useUserSession();
  const router = useRouter();

  const logout = async () => {
    await signout();
    setUser((prev) => (prev = {}));
    router.push("/signin");
  };

  return (
    <div
      className={`${
        isSignOut ? "right-1/2 translate-x-1/2" : "-right-full translate-x-1/2"
      } translate-y-1/2 bottom-1/2 transition-all duration-500 z-30 border-2 p-4 border-white fixed bg-main-background w-1/3 h-1/3`}
    >
      <div className="flex flex-col justify-center gap-5 w-full h-full items-center text-lg">
        <div className="text-center w-1/2">Are you sure to signout?</div>
        <div className="flex justify-around items-center w-1/2">
          <button
            onClick={handleSignOut}
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
  );
};
export default SignOutAlert;
