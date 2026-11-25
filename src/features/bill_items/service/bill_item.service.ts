import { supabase } from "@/lib/supabase";
import { BillItem } from "../types/bill_item.type";

export const billItemService = {
  async getByBillId(billId: number): Promise<BillItem[]> {
    const { data, error } = await supabase
      .from("bill_item")
      .select("*")
      .eq("bill_id", billId)
      .order("id", { ascending: true });

    if (error) {
      console.error("GET BILL ITEMS ERROR:", error);
      throw error;
    }

    return (data ?? []) as BillItem[];
  },
};
