import { deleteSession } from "@/lib/session";

export async function POST(request) {
  try {
    const session = await deleteSession();
    return new Response("Session has deleted", {
      status: 200
    });
  } catch (error) {
    return new Response(error.message, {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
