import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  try {
    const { message, sender_id, receiver_id, chatroom_id } = await req.json();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("messages")
      .insert({
        chatroom_id: chatroom_id,
        message: message,
        sender_id: sender_id,
        receiver_id: receiver_id,
      })
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return new Response(JSON.stringify("has been sent"), {
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
