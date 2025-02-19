import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = ({ emoticon, text, link, handleSignOut }) => {
  const path = usePathname();
  if (text === "Sign Out") {
    return (
      <button
        onClick={() => handleSignOut("menu")}
        className={`transition-all duration-300 text-center flex gap-2 py-1 px-2 items-center justify-center border bg-main-background hover:bg-main-base hover:text-main-background`}
      >
        <div className="">{text}</div>
        <div className="">{emoticon}</div>
      </button>
    );
  }
  return (
    <Link
      href={`${link}`}
      className={`${
        path === link
          ? "pointer-events-none bg-main-base border-main-background text-black"
          : " border-white"
      } transition-all duration-300 text-center flex gap-2 py-1 px-2 items-center justify-center border bg-main-background hover:bg-main-base hover:text-main-background`}
    >
      <div className="">{text}</div>
      <div className="">{emoticon}</div>
    </Link>
  );
};
export default Menu;
