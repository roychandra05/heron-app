import timeFormatter from "@/lib/timeFormatter";
import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  try {
    const { chatroom_id, receiver } = await req.json();
    const supabase = await createClient();

    const { data: updateData, error: errorUpdate } = await supabase
      .from("messages")
      .update({ isRead: true })
      .eq("isRead", "false")
      .eq("chatroom_id", chatroom_id)
      .eq("sender_id", receiver);
    if (errorUpdate) {
      throw new Error(error.message);
    }

    const { data, error } = await supabase
      .from("messages")
      .select("message, send_at, sender_id, isRead, messages_id")
      .eq("chatroom_id", chatroom_id);

    if (error) {
      throw new Error(error.message);
    }
    const result = data.map(
      ({ message, send_at, sender_id, isRead, messages_id }) => {
        return {
          message,
          send_at: timeFormatter(send_at),
          sender_id,
          isRead,
          messages_id,
        };
      }
    );
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(error.message, {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
