import { decrypt } from "@/lib/session";
import timeFormatter from "@/lib/timeFormatter";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("accessToken")?.value;
    const user = await decrypt(session);
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("messages")
      .select("*, users!messages_sender_id_fkey(username)")
      .eq("receiver_id", user.userId)
      .neq("isRead", true)
      .order("send_at", { ascending: false });
    //
    const newData = data.map(
      (val) => (val.send_at = timeFormatter(val.send_at))
    );
    //

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify(data), {
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
