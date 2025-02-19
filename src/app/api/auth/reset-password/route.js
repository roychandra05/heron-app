import { decrypt } from "@/lib/session";
import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const data = await req.json();
  const { password, token } = data;
  const supabase = await createClient();

  try {
    const decryptToken = await decrypt(token);

    if (!decryptToken) {
      return new Response(
        JSON.stringify({
          invalid:
            "sorry your time is up, please go to forgot password page again to get an verify email",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { data: checkToken, error: errorCheckToken } = await supabase
      .from("reset_password")
      .select("reset_token")
      .eq("reset_token", token)
      .single();

    if (errorCheckToken) {
      throw new Error(errorCheckToken.message);
    }

    if (!checkToken) {
      return new Response(
        JSON.stringify({
          invalid:
            "sorry your time is up, please go to forgot password page again to get an verify email",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { email, username, user_id, iat, exp } = decryptToken;
    const expToken = exp * 1000;
    const now = Date.now();
    const isExpToken = expToken < now;

    if (isExpToken || !email || !username || !user_id) {
      return new Response(
        JSON.stringify({
          invalid:
            "sorry your time is up, please go to forgot password page again to get an verify email",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const { data: getUser, error: errorGetUser } = await supabase
      .from("users")
      .select("username, id, email")
      .eq("id", user_id)
      .single();

    if (errorGetUser) {
      throw new Error(errorGetUser.message);
    }
    if (!getUser) {
      return new Response(
        JSON.stringify({
          invalid: "user not found ",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    if (getUser.username !== username) {
      return new Response(
        JSON.stringify({
          invalid: "user not found ",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .update({ password: hashPassword })
      .eq("id", user_id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    const { data: deleteToken, error: errorDeleteToken } = await supabase
      .from("reset_password")
      .delete()
      .eq("user_id", user_id)
      .select();

    if (errorDeleteToken) {
      throw new Error(errorDeleteToken.message);
    }

    return new Response(
      JSON.stringify({ success: "Password has been updated" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
