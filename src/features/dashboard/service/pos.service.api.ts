import { supabase } from "@/lib/supabase";

import { Product } from "../types/categoryId";

export const GetFoods = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("food")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return (data ?? []) as Product[];
};

export const GetFoodTypes = async () => {
  const { data, error } = await supabase
    .from("food_type")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return data ?? [];
};
