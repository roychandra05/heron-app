"use client";
import { useNotifContext } from "@/context/NotifContext";
import Link from "next/link";

const NotifDisplay = ({ showNotif }) => {
  const { notif } = useNotifContext();
  return (
    <div
      className={`${
        showNotif ? "right-0" : " -right-96"
      } w-1/4 max-[640px]:w-1/2 h-[90vh]  overflow-y-auto p-2 transition-all duration-500 flex flex-col gap-2 fixed bg-main-background text-white top-[10%] backdrop-blur-sm`}
    >
      {notif.length ? (
        notif?.map((val, i) => {
          return (
            <Link
              href={`/users/chat-room/${val.chatroom_id}`}
              className="max-[640px]:text-[.8em] border p-2 shadow-[2px_2px_8px_.4px_black] group hover:bg-main-base transition-all duration-300 flex flex-col gap-1 "
              key={i}
            >
              <div className="underline underline-offset-2 decoration-2 group-hover:text-main-background duration-300">
                {val.users.username}
              </div>
              <div className=" group-hover:text-main-background duration-300 truncate">
                {val.message}
              </div>
              <div className="font-extralight max-[640px]:text-[.7em] max-lg:text-[.7em] text-xs group-hover:text-main-background duration-300 w-fit text-center ">
                {val.send_at.split("").slice(0, -3)}
              </div>
            </Link>
          );
        })
      ) : (
        <div
          className={`text-white h-full flex flex-col items-center justify-center`}
        >
          No Messages
        </div>
      )}
    </div>
  );
};
export default NotifDisplay;
