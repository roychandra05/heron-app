import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { username, password, email } = await request.json();
    const hashPassword = await bcrypt.hash(password, 10);
    const supabase = await createClient();
    const newUser = { username, password: hashPassword, email };
    const { data, error } = await supabase
      .from("users")
      .insert(newUser)
      .select();
    if (error) {
      let fieldError = null;
      let errorMessage = "Something went wrong";
      if (error.code === "23505") {
        if (error.details.includes("email")) {
          (fieldError = "email"), (errorMessage = "Email already exists");
        } else if (error.details.includes("username")) {
          (fieldError = "Username"), (errorMessage = "Username already exists");
        } else {
          errorMessage = error.message;
        }
      }
      return new Response(JSON.stringify({ fieldError, errorMessage }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Respon(JSON.stringify(error.message), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
