"use client";
import { startChat } from "@/lib/actions";
import { useRouter } from "next/navigation";

const StartChatButton = ({ user, receiver }) => {
  const router = useRouter();
  const handleChatButton = async () => {
    const response = await startChat(user, receiver);
    router.push(`users/chat-room/${response.chatroom_id}`);
  };

  return (
    <button
      onClick={handleChatButton}
      className="font-bold border-2 hover:border-main-background border-main-base rounded-lg hover:bg-main-base hover:text-main-background bg-main-background px-2 py-1 text-main-base hover:translate-y-1 hover:translate-x-1 transition-all duration-300 hover:shadow-none shadow-[2px_3px_5px_2px_#000000]"
    >
      Start chat
    </button>
  );
};
export default StartChatButton;
