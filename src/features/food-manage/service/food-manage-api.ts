import { supabase } from "@/lib/supabase";

export const GetFoods = async (shopId: number) => {
  const { data, error } = await supabase
    .from("food")
    .select("*")
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Supabase Error:", error);
    throw new Error(error.message);
  }

  return data;
};
