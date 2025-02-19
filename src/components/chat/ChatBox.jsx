"use client";
import { useEffect, useRef, useState } from "react";
import TextChatComponent from "./TextChatComponent";
import { sendMessages } from "@/lib/actions";
import MessageBox from "./MessageBox";
import createClient from "@/utils/supabase/client";
import timeFormatter from "@/lib/timeFormatter";

const ChatBox = ({ receiver, sender, chatRoomId, messageLists }) => {
  const supabase = createClient();
  const [messages, setMessages] = useState(messageLists);
  const [inputMessages, setInputMessages] = useState("");
  const latestMessage = useRef();

  const onChange = (e) => {
    setInputMessages((prev) => {
      if (e.key === "Enter" && !e.shiftKey) {
        return prev + "\n";
      }
      return e.target.value;
    });
  };

  const handleMessage = async () => {
    const msgResult = inputMessages.trim();
    const roomId = Number.parseInt(chatRoomId?.id);
    setInputMessages("");
    const sendMessage = await sendMessages(
      msgResult,
      sender?.id,
      receiver?.id,
      roomId
    );
  };

  useEffect(() => {
    latestMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  useEffect(() => {
    const channel = supabase
      .channel(`messages:chatroom_id=eq.${chatRoomId.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        (payload) => {
          const {
            message,
            messages_id,
            send_at,
            sender_id,
            receiver_id,
            isRead,
            chatroom_id,
          } = payload.new;

          const localTime = timeFormatter(send_at);
          let isReadByReciver = false;
          const newDataMessage = {
            message,
            messages_id,
            send_at: localTime,
            receiver_id,
            sender_id,
            isRead: isReadByReciver,
            chatRoomId,
          };

          if (chatroom_id !== Number(chatRoomId.id)) {
            return;
          }

          if (
            sender_id === sender?.id &&
            Number(chatRoomId.id) === chatroom_id
          ) {
            return setMessages((prev) => [...prev, newDataMessage]);
          }

          if (sender?.id !== payload.new.sender_id) {
            const updatingRead = async () => {
              const { data, error } = await supabase
                .from("messages")
                .update({ isRead: true })
                .eq("messages_id", payload.new.messages_id)
                .select("*");
            };
            isReadByReciver = true;
            updatingRead();
            return setMessages((prev) => [...prev, newDataMessage]);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
        },
        (payload) => {
          const {
            message,
            messages_id,
            isRead,
            send_at,
            sender_id,
            receiver_id,
            chatroom_id,
          } = payload.new;

          const localTime = timeFormatter(send_at);
          const newDataMessage = {
            message,
            messages_id,
            send_at: localTime,
            sender_id,
            isRead,
            receiver_id,
            chatroom_id,
          };
          return setMessages((prev) => {
            return prev.map((val) =>
              val.messages_id === messages_id
                ? { ...val, isRead: true }
                : { ...val }
            );
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <section className="w-[80%] max-[640px]:w-[70%] h-full relative flex flex-col">
      <div className="overflow-auto h-full relative">
        <div className="w-full h-auto px-2" ref={latestMessage}>
          <MessageBox messages={messages} sender={sender} />
        </div>
      </div>
      <div className="w-full h-[10%]">
        <TextChatComponent
          inputMessages={inputMessages}
          onSubmit={handleMessage}
          onChange={onChange}
        />
      </div>
    </section>
  );
};
export default ChatBox;
