import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  try {
    const dataBody = await request.json();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sales")
      .insert({
        user_id: dataBody.userId,
        package: dataBody.package,
        price: dataBody.price,
        quantity: dataBody.quantity,
      })
      .select("*");
    if (error) {
      throw new Error(error.message);
    }
    return new Response(
      JSON.stringify({ message: "Data has been inserted", data }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export async function DELETE(request) {
  try {
    const { idSales } = await request.json();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sales")
      .delete()
      .in("id", idSales)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return new Response(JSON.stringify({ message: "Data has been deleted" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export async function PATCH(request) {
  try {
    const newData = await request.json();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sales")
      .update({
        package: newData.package,
        price: newData.price,
        quantity: newData.quantity,
      })
      .eq("id", newData.id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify({ message: "Data has been updated" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
