import ChatNavbar from "@/components/chat/ChatNavbar";
import ChatRoom from "@/components/chat/ChatRoom";
import Navbar from "@/components/Navbar";
import { getChatRoomUsers, getRoomMessages } from "@/lib/actions";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async ({ params }) => {
  const chatRoomId = await params;

  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;
  const refreshToken = cookie.get("refreshToken")?.value;
  const accessTokenId = await decrypt(accessToken);
  const refreshTokenId = await decrypt(refreshToken);
  const userId = accessTokenId?.userId;

  if (!refreshToken || !refreshTokenId) {
    redirect("/signin");
  }

  const usersInRoom = await getChatRoomUsers(Number.parseInt(chatRoomId?.id));
  const sender = usersInRoom.find((user) => user.id === userId),
    receiver = usersInRoom.find((user) => user.id !== userId);

  const messageLists = await getRoomMessages(
    Number.parseInt(chatRoomId?.id),
    receiver.id
  );
  return (
    <div className="relative w-full h-screen box-border max-[640px]:text-xs md:text-lg text-base">
      <Navbar />
      <ChatNavbar username={receiver?.username} />
      <ChatRoom
        chatRoomId={chatRoomId}
        messageLists={messageLists}
        receiver={receiver}
        sender={sender}
      />
    </div>
  );
};
export default Page;
