import { supabase } from "@/lib/supabase";
import { Bill } from "../types/bill_item.type";

export const billHistoryService = {
  // ดึงประวัติบิลตาม Shop ID
  async getByShopId(shopId: number): Promise<Bill[]> {
    if (!shopId || shopId <= 0) {
      throw new Error("ไม่พบ Shop ID");
    }

    const { data, error } = await supabase
      .from("bill")
      .select("*")
      .eq("shop_id", shopId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET BILL ERROR:", error);
      throw error;
    }

    console.log("===== GET BILLS BY SHOP =====");
    console.log("Shop ID:", shopId);
    console.log("Bills:", data);
    console.log("Count:", data?.length ?? 0);

    return (data ?? []) as Bill[];
  },

  // ดึงบิลตาม ID
  async getById(id: number): Promise<Bill | null> {
    const { data, error } = await supabase
      .from("bill")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("GET BILL BY ID ERROR:", error);
      throw error;
    }

    return data as Bill | null;
  },
};
