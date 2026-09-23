import { supabase } from "@/lib/supabase";
import { CreateFoodTypePayload, UpdateFoodTypePayload } from "../types/food_type_manage_type";

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

export const CreateFoodType = async (data: CreateFoodTypePayload) => {
  const { error } = await supabase.from("food_type").insert([
    {
      name: data.name,
      shop_id: data.shopId,
    },
  ]);

  if (error) {
    console.log("Supabase Error:", error);
    throw new Error(error.message);
  }

  return {
    message: "สร้างประเภทอาหารสำเร็จ",
  };
};

export const UpdateFoodType = async (id: number, data: UpdateFoodTypePayload) => {
  const { error } = await supabase
    .from("food_type")
    .update({
      name: data.name,
    })
    .eq("id", id)
    .eq("shop_id", data.shopId);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return {
    message: "แก้ไขข้อมูลประเภทอาหารสำเร็จ",
  };
}

export const DeleteFoodType = async (id: number, shopId: number) => {
  const { error } = await supabase
    .from("food_type")
    .delete()
    .eq("id", id)
    .eq("shop_id", shopId);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return {
    message: "ลบประเภทอาหารสำเร็จ",
  };
}