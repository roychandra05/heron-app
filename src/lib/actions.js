import createClient from "@/utils/supabase/client";
import bodyMassIndex from "./bmi";
import { forgotPasswordSchema, resetPasswordSchema } from "./zodSchema";


export const signup = async (data) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      return result;
    }
    return response;
  } catch (error) {
    return error.message;
  }
};
export const signin = async (data) => {
  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      return { response, result };
    }
    return { response, result };
  } catch (error) {
    return error.message;
  }
};
export const signout = async () => {
  try {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
export const getSalesData = async (userID) => {
  const response = await fetch("/api/sales/");
};
export const insertSalesData = async (data, user) => {
  try {
    const response = await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        package: data.package,
        price: data.price,
        quantity: data.quantity,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return result;
    }
    return result;
  } catch (error) {
    return error.message;
  }
};
export const deleteSalesData = async (idSales) => {
  try {
    const response = await fetch("api/sales", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSales,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { result, response };
    }
    return { result, response };
  } catch (error) {
    return error.message;
  }
};
export const editSalesData = async (data) => {
  try {
    const response = await fetch("/api/sales", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        package: data.package,
        price: data.price,
        quantity: data.quantity,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      return result;
    }
    return result;
  } catch (error) {
    return error.message;
  }
};
export const calculateBmi = (prev, formData) => {
  const { weight, height } = Object.fromEntries(formData);
  if (!weight && !height) {
    return {
      error: { weight: "weight must be fill", height: "height must be fill" },
    };
  }
  if (!weight) {
    return { error: { weight: "weight must be fill" } };
  }
  if (!height) {
    return { error: { height: "height must be fill" } };
  }
  const { bmi, category } = bodyMassIndex(weight, height);
  return { bmi, category };
};
export const startChat = async (sender, receiver) => {
  const response = await fetch("/api/chat-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender,
      receiver,
    }),
  });
  const result = await response.json();
  return result;
};
export const sendMessages = async (messages, sender, receiver, chatroom_id) => {
  try {
    const response = await fetch("/api/chat-room/send-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        sender_id: sender,
        receiver_id: receiver,
        chatroom_id,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result);
    }
    return result;
  } catch (error) {
    return error.message;
  }
};
export const getRoomMessages = async (chatroom_id, receiver) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV;
  try {
    const response = await fetch(`${baseUrl}/api/chat-room/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatroom_id: chatroom_id,
        receiver: receiver,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result);
    }
    return result;
  } catch (error) {
    return error.message;
  }
};
export const getChatRoomUsers = async (chatroom_id) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV;
  const response = await fetch(`${baseUrl}/api/chatroom-users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatroom_id: chatroom_id,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    return result;
  }
  return result;
};
export const usersSameRoom = async (user_id) => {
  const response = await fetch(`/api/users-same-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    return result;
  }
  return result;
};
export const forgotPassword = async (prevData, formData) => {
  const supabase = createClient();
  const data = Object.fromEntries(formData);
  const { email, username } = data;
  const zodCheck = forgotPasswordSchema.safeParse(data);
  if (!zodCheck.success) {
    return { error: zodCheck.error.format(), data };
  }
  const { data: dataDb, error } = await supabase
    .from("users")
    .select("username, email, id")
    .match({ username: username, email: email })
    .single();

  if (!dataDb) {
    return { alert: "user not found", data };
  }
  const user_id = dataDb.id;
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      user_id,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    return { alert: "there is something wrong, come back next time", data };
  }
  return { success: result };
};
export const resetPassword = async (prevData, formData) => {
  const data = Object.fromEntries(formData);
  const { password, confirmPassword, token } = data;

  if (!token || token === "") {
    return { invalid: "Sorry, you do not have permission" };
  }
  const zodCheck = resetPasswordSchema.safeParse({ password, confirmPassword });
  if (!zodCheck.success) {
    return { error: zodCheck.error.format(), data };
  }
  const response = await fetch("api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  });
  const result = await response.json();
  return result;
};
