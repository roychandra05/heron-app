"use client";
import { useUserSession } from "@/context/UserContext";
import { usersSameRoom } from "@/lib/actions";
import { useEffect, useState } from "react";
import HistoryChatRoom from "./HistoryChatRoom";
import ChatBox from "./ChatBox";

const ChatRoom = ({ receiver, sender, chatRoomId, messageLists }) => {
  const [data, setData] = useState([]);
  const { user } = useUserSession();

  const sameRoom = async () => {
    const sameRoom = await usersSameRoom(user?.id);
    return setData((prev) => (prev = sameRoom));
  };

  useEffect(() => {
    sameRoom();
  }, [user]);

  return (
    <main className="flex w-full h-[83vh]">
      <section className="w-[20%] max-[640px]:w-[30%] h-full">
        <HistoryChatRoom chatRoomId={chatRoomId} data={data} />
      </section>
      <ChatBox
        receiver={receiver}
        sender={sender}
        chatRoomId={chatRoomId}
        messageLists={messageLists}
      />
    </main>
  );
};
export default ChatRoom;
