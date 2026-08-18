import { supabase } from "@/lib/supabase";

export const GetFoodTypes = async (shopId: number) => {
  const { data, error } = await supabase
    .from("food_type")
    .select("*")
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Supabase Error:", error);
    throw new Error(error.message);
  }

  return data;
};
