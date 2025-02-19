// import { createAccessToken, decrypt, encrypt } from "@/lib/session";
// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";

import { decrypt } from "@/lib/session";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const supabase = await createClient();
    if (!accessToken) {
      throw new Error("doesn't existed");
    }
    const user = await decrypt(accessToken);

    const { data, error } = await supabase
      .from("users")
      .select("id, username, email")
      .eq("id", user.userId).single()
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

// export async function GET(req) {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;
//   const refreshToken = cookieStore.get("refreshToken")?.value;
//   const supabase = await createClient();
//   if (!refreshToken && !accessToken) {
//     return new Response(JSON.stringify({ isAuthenticated: false }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
//   if (refreshToken && !accessToken) {
//     const { data, error } = await supabase
//       .from("session")
//       .select("session_token")
//       .eq("session_token", refreshToken)
//       .single();

//     if (data?.session_token) {
//       const userId = await decrypt(refreshToken);
//       await createAccessToken(userId.userId);
//       return new Response(JSON.stringify({ isAuthenticated: true }), {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     } else {
//       return new Response(JSON.stringify({ isAuthenticated: false }), {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     }
//   }
//   if (refreshToken && accessToken) {
//     const { data, error } = await supabase
//       .from("session")
//       .select("session_token")
//       .eq("session_token", refreshToken)
//       .single();
//     if (!data) {
//       return new Response(JSON.stringify({ isAuthenticated: false }), {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     }
//     return new Response(JSON.stringify({ isAuthenticated: true }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
// // export async function POST(req) {
// //   try {
// //     const { userId } = await req.json();
// //     const cookieStore = await cookies();
// //     const accessTokenExp = new Date(Date.now() + 10 * 60 * 1000);
// //     const accessToken = await encrypt({ userId, accessTokenExp }, "10m");

// //     cookieStore.set("accessToken", accessToken, {
// //       httpOnly: true,
// //       secure: true,
// //       expires: accessTokenExp,
// //       sameSite: "strict",
// //       path: "/",
// //     });
// //     return new Response("yeah", {
// //       status: 200,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //   } catch (error) {
// //     return new Response(error.message, {
// //       status: 400,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //   }
// // }
