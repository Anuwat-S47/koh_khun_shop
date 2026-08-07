import { supabase } from "@/lib/supabase";
import { CreateShopPayload, UpdateShopPayload } from "../types/shop_type";
import { v4 as uuidv4 } from "uuid";

export const getStoragePathFromUrl = (publicUrl: string) => {
  if (!publicUrl) return null;

  // แยกข้อความเอาเฉพาะส่วนที่อยู่หลัง /Shop_img/
  const parts = publicUrl.split("/Shop_img/");
  if (parts.length > 1) {
    // ลบ query string สัญชาติ เช่น ?t=123456 ออกถ้ามี
    return parts[1].split("?")[0];
  }
  return null;
};

export const RemoveShopImg = async (logoUrl: string) => {
  const filePath = getStoragePathFromUrl(logoUrl);

  if (!filePath) {
    console.warn("⚠️ ไม่พบ Storage Path จาก URL ที่ระบุ");
    return;
  }

  const { data, error } = await supabase.storage
    .from("Shop_img")
    .remove([filePath]);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return data;
};

export const UploadShopImg = async (img: File) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const fileName = `${user.id}/${uuidv4()}-${img.name}`;

  const { error } = await supabase.storage
    .from("Shop_img")
    .upload(fileName, img);

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("Shop_img").getPublicUrl(fileName);

  return publicUrl;
};

export const CreateShop = async (data: CreateShopPayload) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("shop").insert({
    name: {
      th: data.name.th,
      lo: data.name.lo || data.name.th,
    },
    logo_url: data.logoUrl,
    address: {
      th: data.address.th,
      lo: data.name.lo || data.name.th,
    },
    phone: data.phone,
    create_by: user.id,
  });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return {
    message: "เพิ่มร้านสำเร็จ",
  };
};

export const UpdateShop = async (id: number, data: UpdateShopPayload) => {
  const { error } = await supabase
    .from("shop")
    .update({
    name: {
      th: data.name.th,
      lo: data.name.lo || data.name.th,
    },
    logo_url: data.logoUrl,
    address: {
      th: data.address.th,
      lo: data.name.lo || data.name.th,
    },
      phone: data.phone,
    })
    .eq("id", id);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return {
    message: "แก้ไขข้อมูลร้านสำเร็จ",
  };
};

export const GetShopById = async (id: number) => {
  const { data, error } = await supabase
    .from("shop")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    createdAt: data.created_at,
    name: data.name,
    logoUrl: data.logo_url,
    address: data.address,
    phone: data.phone,
    createBy: data.create_by,
  };
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

  return (data ?? []).map((shop) => ({
    id: shop.id,
    createdAt: shop.created_at,
    name: shop.name,
    logoUrl: shop.logo_url,
    address: shop.address,
    phone: shop.phone,
    createBy: shop.create_by,
  }));
};
