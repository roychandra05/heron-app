import Link from "next/link";

const HistoryChatRoom = ({ chatRoomId, data }) => {
  return (
    <div className="w-full h-full flex flex-col gap-2 bg-zinc-300 font-semibold text-main-background box-border p-2">
      {data?.map((list, i) => {
        return (
          <Link
            href={`/users/chat-room/${list.chatroom_id}`}
            key={i}
            className={`border-2 border-main-background rounded-md py-1 px-2 transition-all duration-200 ${
              list.chatroom_id === Number.parseInt(chatRoomId.id)
                ? "pointer-events-none"
                : "shadow-[1px_2px_3px_1px_black] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            }`}
          >
            <h5>{list.users.username}</h5>
          </Link>
        );
      })}
    </div>
  );
};
export default HistoryChatRoom;
