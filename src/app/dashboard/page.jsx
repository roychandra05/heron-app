import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import TableSales from "@/components/dashboard/TableSales";
import InputFormSales from "@/components/dashboard/InputFormSales";
import LineChartData from "@/components/dashboard/LineChartData";
import Navbar from "@/components/Navbar";

const Page = async () => {
  const cookie = await cookies();
  const session = cookie.get("accessToken")?.value;
  const user = await decrypt(session);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .eq("user_id", user?.userId);
  return (
    <section className="bg-main-black w-full h-auto relative">
      <Navbar/>
      <div className="grid max-[640px]:grid-cols-1 max-[640px]:grid-rows-3 gap-5 xl:max-2xl:grid-cols-2 h-full">
        <InputFormSales type={"insert"} />
        <TableSales datas={data} />
        <LineChartData datas={data} />
      </div>
    </section>
  );
};
export default Page;
