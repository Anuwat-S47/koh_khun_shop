import { supabase } from "@/lib/supabase";
import {
  CreateFoodData,
  Food,
  UpdateFoodData,
} from "../types/food_manage_type";
import { RemoveImg } from "@/features/upload-img/service/upload-img-api";

const mapFood = (item: any): Food => ({
  id: item.id,
  createdAt: item.created_at,
  imgUrl: item.img_url,
  name: item.name,
  price: Number(item.price),
  typeId: item.type_id,
  shopId: item.shop_id,

  type: item.type
    ? {
        id: item.type.id,
        name: item.type.name,
      }
    : null,
});

export const GetFoods = async (
  shopId: number,
  page: number = 1,
  pageSize: number = 20,
  search: string = "",
) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("food")
    .select(
      `
    *,
    type:food_type (
      id,
      name
    )
  `,
      { count: "exact" },
    )
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false });

  if (search.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, error, count } = await query
    .order("id", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  const total = count ?? 0;

  return {
    data: data.map(mapFood),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};

export const GetFoodById = async (id: number, shopId: number) => {
  const { data, error } = await supabase
    .from("food")
    .select(
      `
      *,
      type:food_type (
        id,
        name
      )
    `,
    )
    .eq("id", id)
    .eq("shop_id", shopId)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return mapFood(data);
};

export const CreateFood = async (data: CreateFoodData) => {
  const { data: food, error } = await supabase
    .from("food")
    .insert({
      shop_id: data.shopId,
      name: data.name,
      price: data.price,
      type_id: data.typeId,
      img_url: data.imgUrl ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return mapFood(food);
};

export const DeleteFood = async (id: number, shopId: number) => {
  const { data: food, error: getError } = await supabase
    .from("food")
    .select("img_url")
    .eq("id", id)
    .eq("shop_id", shopId)
    .single();

  if (getError) {
    throw new Error(getError.message);
  }

  if (food.img_url) {
    await RemoveImg(food.img_url);
  }

  const { error } = await supabase
    .from("food")
    .delete()
    .eq("id", id)
    .eq("shop_id", shopId);

  if (error) {
    throw new Error(error.message);
  }

  return {
    message: "ลบอาหารสำเร็จ",
  };
};

export const UpdateFood = async (id: number, data: UpdateFoodData) => {
  const { data: food, error } = await supabase
    .from("food")
    .update({
      name: data.name,
      price: data.price,
      type_id: data.typeId,
      img_url: data.imgUrl ?? null,
    })
    .eq("id", id)
    .eq("shop_id", data.shopId)
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return mapFood(food);
};
