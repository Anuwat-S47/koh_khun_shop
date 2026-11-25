import { supabase } from "@/lib/supabase";
import {
  CreateShopPayload,
  UpdateShopPayload,
} from "../types/shop_manage_type";

// เพิ่มร้านค้า
export const CreateShop = async (data: CreateShopPayload) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("shop").insert({
    name: data.name,
    logo_url: data.logoUrl,
    address: data.address,
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

// แก้ไขร้านค้า
export const UpdateShop = async (id: number, data: UpdateShopPayload) => {
  await VerifyShop(id);

  const { error } = await supabase
    .from("shop")
    .update({
      name: data.name,
      logo_url: data.logoUrl,
      address: data.address,
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

// ดึงข้อมูลร้านค้าตาม ID
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

// ดึงร้านค้าทั้งหมดของผู้ใช้ที่เข้าสู่ระบบ
export const GetShop = async () => {
  // ตรวจสอบผู้ใช้ปัจจุบัน
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("กรุณาเข้าสู่ระบบ");
  }

  // ดึงร้านค้าทั้งหมดของผู้ใช้
  const { data, error } = await supabase
    .from("shop")
    .select("*")
    .eq("create_by", user.id)
    .order("id", {
      ascending: true,
    });

  if (error) {
    console.error("GET SHOP ERROR:", error);
    throw new Error(error.message);
  }

  console.log("===== GET ALL SHOPS =====");
  console.log("User ID:", user.id);
  console.log("Shops:", data);
  console.log("Shop Count:", data?.length ?? 0);

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

// ตรวจสอบสิทธิ์เจ้าของร้าน
export const VerifyShop = async (shopId: number) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Auth Error:", authError);
    throw new Error(authError.message);
  }

  if (!user) {
    throw new Error("กรุณาเข้าสู่ระบบ");
  }

  const { data, error } = await supabase
    .from("shop")
    .select("id")
    .eq("id", shopId)
    .eq("create_by", user.id)
    .maybeSingle();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("ไม่พบร้านค้าหรือคุณไม่มีสิทธิ์เข้าถึงร้านค้านี้");
  }

  return data;
};

// ตรวจสอบว่าผู้ใช้มีร้านค้าหรือไม่
export const checkUserHasShop = async (userId: string) => {
  const { data, error } = await supabase
    .from("shop")
    .select("id")
    .eq("create_by", userId)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("CHECK USER SHOP ERROR:", error);
    throw new Error(error.message);
  }

  return !!data;
};
