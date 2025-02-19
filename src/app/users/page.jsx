import { createClient } from "@/utils/supabase/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import StartChatButton from "@/components/chat/StartChatButton";
import Navbar from "@/components/Navbar";

const Page = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("accessToken")?.value;
  const user = await decrypt(session);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .neq("id", user?.userId);
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-full bg-main-base text-black p-4">
        <div className="grid max-[640px]:grid-cols-2 grid-cols-4 gap-5 justify-center items-center">
          {data?.map((val, i) => {
            return (
              <div
                className="max-[640px]:text-xs border-2 border-main-background shadow-[2px_3px_5px_2px_#000000] rounded-lg p-2 flex flex-col justify-center items-center gap-2 w-full text-xs"
                key={i}
              >
                <h3 className="font-semibold">{val.username}</h3>
                <h5 className="overflow-hidden w-full text-center text-ellipsis">
                  {val.email}
                </h5>
                <StartChatButton user={user.userId} receiver={val.id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Page;
