import { supabase } from "@/lib/supabase";
import { CreateShopPayload } from "../types/shop_type";
import { v4 as uuidv4 } from "uuid";

export const UploadShopImg = async (img: File) => {
  const uuidFileName = `${uuidv4()}-${img.name}`;
  const { error } = await supabase.storage
    .from("Shop_img")
    .upload(uuidFileName, img);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("Shop_img").getPublicUrl(uuidFileName);

  return publicUrl;
};

export const CreateShop = async (data: CreateShopPayload) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("shop").insert({
    name: data.name,
    logo_url: data.logoUrl,
    address: data.address,
    phone: data.phone,
    create_by: user?.id,
  });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return { message: "เพิ่มร้านสำเร็จ" };
};

export const GetShop = async () => {
  const { data, error } = await supabase
    .from("shop")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return data;
};
