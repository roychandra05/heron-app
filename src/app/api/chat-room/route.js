import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  const { sender, receiver } = await req.json();
  const newRoom = { chatroom_name: "private" };
  const supabase = await createClient();
  const { data: senderRooms } = await supabase
    .from("room_members")
    .select("chatroom_id")
    .eq("user_id", sender);
  const { data: receiverRooms } = await supabase
    .from("room_members")
    .select("chatroom_id")
    .eq("user_id", receiver);

  const sameRoom = senderRooms.find((sRoom) =>
    receiverRooms.find((rRoom) => rRoom.chatroom_id === sRoom.chatroom_id)
  );

  if (sameRoom) {
    const { data, error } = await supabase
      .from("chat_rooms")
      .select("*")
      .eq("chatroom_id", sameRoom.chatroom_id)
      .single();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const { data: createRoom, error: errorCreateRoom } = await supabase
    .from("chat_rooms")
    .insert(newRoom)
    .select("*")
    .single();

  const { data: createMemberRoom, error: errorCreateMemberRoom } =
    await supabase
      .from("room_members")
      .insert([
        { user_id: sender, chatroom_id: createRoom.chatroom_id },
        { user_id: receiver, chatroom_id: createRoom.chatroom_id },
      ])
      .select();
  return new Response(JSON.stringify(createRoom), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
