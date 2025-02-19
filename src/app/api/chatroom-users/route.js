import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  try {
    const { chatroom_id } = await req.json();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("room_members")
      .select("users(username,id)")
      .eq("chatroom_id", chatroom_id);
    if (error) {
      throw new Error(error.message);
    }
    const usernameUsers = data.map((user) => user.users);
    return new Response(JSON.stringify(usernameUsers), {
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
