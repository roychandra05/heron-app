import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";
import { createSession, decrypt } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const { username, password } = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .select("username,password, id")
      .match({ username: username })
      .single();

    if (error) {
      return new Response(JSON.stringify("Username not found"), {
        status: 400,
      });
    }

    if (!data) {
      throw new Error("User doesn't exists");
    }

    const userPasswordDb = await bcrypt.compare(password, data.password);

    if (!userPasswordDb) {
      throw new Error("Password is wrong");
    }

    await createSession(data.id);
    revalidatePath("/", "layout");

    const accessToken = cookieStore.get("accessToken")?.value;
    const user = await decrypt(accessToken);
    const { data: userData, error: errorData } = await supabase
      .from("users")
      .select("id, username, email")
      .eq("id", user.userId)
      .single();
    return new Response(JSON.stringify(userData), {
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
