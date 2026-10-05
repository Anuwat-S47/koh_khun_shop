import { supabase } from "@/lib/supabase";
import {
  BillItem,
  CreateBillItem,
} from "../types/bill_item.type";

export const billItemService = {
  async getByBillId(billId: number): Promise<BillItem[]> {
    const { data, error } = await supabase
      .from("bill_item")
      .select("*")
      .eq("bill_id", billId)
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    return data ?? [];
  },

  async getById(id: number): Promise<BillItem | null> {
    const { data, error } = await supabase
      .from("bill_item")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  },

  async create(
    payload: CreateBillItem,
  ): Promise<BillItem> {
    const { data, error } = await supabase
      .from("bill_item")
      .insert({
        bill_id: payload.bill_id,
        food_id: payload.food_id,
        food_name: payload.food_name,
        price: payload.price,
        quantity: payload.quantity,
        total: payload.price * payload.quantity,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async createMany(
    payload: CreateBillItem[],
  ): Promise<BillItem[]> {
    const rows = payload.map((item) => ({
      bill_id: item.bill_id,
      food_id: item.food_id,
      food_name: item.food_name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));

    const { data, error } = await supabase
      .from("bill_item")
      .insert(rows)
      .select();

    if (error) {
      throw error;
    }

    return data ?? [];
  },

  async updateQuantity(
    id: number,
    quantity: number,
  ): Promise<BillItem> {
    const { data, error } = await supabase
      .from("bill_item")
      .update({
        quantity,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from("bill_item")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  },
};