"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserSession } from "./UserContext";
import createClient from "@/utils/supabase/client";

const NotifContext = createContext([]);

const NotifProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV;
  const supabase = createClient();
  const [notif, setNotif] = useState([]);
  const { user } = useUserSession();

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/unread-messages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result);
      }
      return setNotif((prev) => (prev = result));
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    const channel = supabase
      .channel(`messages:chatroom_id=eq.${user}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        (payload) => {
          fetchData();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
        },
        (payload) => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const contextValue = {
    notif,
    setNotif,
  };
  return (
    <NotifContext.Provider value={contextValue}>
      {children}
    </NotifContext.Provider>
  );
};

export const useNotifContext = () => useContext(NotifContext);

export default NotifProvider;
