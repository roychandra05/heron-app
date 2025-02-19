import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  const { user_id } = await req.json();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("room_members")
      .select("chatroom_id")
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message);
    }
    const { data: sameRoom, error: errorSameRoom } = await supabase
      .from("room_members")
      .select("chatroom_id,user_id, users(username)")
      .neq("user_id", user_id)
      .in(
        "chatroom_id",
        data.map((room) => room.chatroom_id)
      );

    if (errorSameRoom) {
      throw new Error(errorSameRoom.message);
    }
    return new Response(JSON.stringify(sameRoom), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
