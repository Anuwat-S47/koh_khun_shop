import { supabase } from "@/lib/supabase";
import {
  CreateShopTablePayload,
  UpdateShopTablePayload,
} from "../types/shop_table_manage_type";

export const GetShopTable = async (shopId: number) => {
  const { data, error } = await supabase
    .from("shop_table")
    .select("*")
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Supabase Error:", error);
    throw new Error(error.message);
  }

  return data;
};

export const CreateShopTable = async (data: CreateShopTablePayload) => {
  const { error } = await supabase.from("shop_table").insert({
    name: data.name,
    shop_id: data.shopId,
  });

  if (error) {
    console.log("Supabase Error:", error);
    throw new Error(error.message);
  }
  return {
    message: "สร้างโต๊ะสำเร็จ",
  };
};

export const UpdateShopTable = async (
  id: number,
  data: UpdateShopTablePayload,
) => {
  const { error } = await supabase
    .from("shop_table")
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
    message: "แก้ไขข้อมูลโต๊ะสำเร็จ",
  };
};

export const DeleteShopTable = async (id: number, shopId: number) => {
  const { error } = await supabase
    .from("shop_table")
    .delete()
    .eq("id", id)
    .eq("shop_id", shopId);

  if (error) {
    throw new Error(error.message);
  }

  return {
    message: "ลบโต๊ะสำเร็จ",
  };
};
