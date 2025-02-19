import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload, exp) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(encodeKey);
}
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.info("Failed to verify token");
  }
}
export async function verifySession() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  let isAuthenticated = false;

  if (!refreshToken && !accessToken) {
    return (isAuthenticated = false);
  }
  if (!refreshToken && accessToken) {
    cookieStore.delete("accessToken")
    return (isAuthenticated = false);
  }
  if (refreshToken && !accessToken) {
    const { data, error } = await supabase
      .from("session")
      .select("session_token")
      .eq("session_token", refreshToken)
      .single();
    if (!data?.session_token) {
      await deleteSession();
      return (isAuthenticated = false);
    }
    if (data?.session_token) {
      const userId = await decrypt(refreshToken);
      await createAccessToken(userId.userId);
      return (isAuthenticated = true);
    } else {
      return (isAuthenticated = false);
    }
  }
  if (refreshToken && accessToken) {
    const { data, error } = await supabase
      .from("session")
      .select("session_token")
      .eq("session_token", refreshToken)
      .single();

    if (!data?.session_token) {
      return (isAuthenticated = false);
    }
    return (isAuthenticated = true);
  }
  return { isAuthenticated };
}
export async function createAccessToken(userId) {
  const cookieStore = await cookies();
  const accessTokenExp = new Date(Date.now() + 30 * 60 * 1000);
  const accessToken = await encrypt({ userId, accessTokenExp }, "30m");

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessTokenExp,
    sameSite: "strict",
    path: "/",
  });
}
export async function createRefreshToken(userId) {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const refreshTokenExp = new Date(Date.now() + 12* 60 * 60 * 1000);
  const refreshToken = await encrypt({ userId, refreshTokenExp }, "12h");

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshTokenExp,
    sameSite: "strict",
    path: "/",
  });

  const { data, error } = await supabase
    .from("session")
    .insert({
      user_id: userId,
      session_token: refreshToken,
      expires_at: refreshTokenExp,
    })
    .select();

  if (error) {
    return error.message;
  }
}
export async function createSession(userId) {
  const access = await createAccessToken(userId);
  const refresh = await createRefreshToken(userId);
}
export async function deleteSession() {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!accessToken && !refreshToken) {
      throw new Error("you not user");
    }
    const { data, error } = await supabase
      .from("session")
      .delete()
      .eq("session_token", refreshToken);
    accessToken && cookieStore.delete("accessToken");
    refreshToken && cookieStore.delete("refreshToken");

    // cookieStore.set("session", userSession, {
    //   httpOnly: true,
    //   expires: new Date(1),
    //   path: "/",
    //   sameSite: "lax",
    // });
    // const session = await decrypt(userSession);
    // const supabase = await createClient();
    // const { data, error } = await supabase
    //   .from("session")
    //   .delete()
    //   .eq("user_id", session.userId);
    // cookieStore.delete("session");
    // if (error) {
    //   throw new Error(error.message);
    // }
  } catch (error) {
    return error.message;
  }
}
