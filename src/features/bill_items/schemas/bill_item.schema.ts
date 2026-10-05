import { z } from "zod";

export const createBillItemSchema = z.object({
  bill_id: z.number(),
  food_id: z.number(),
  food_name: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().int().positive(),
});

export const updateBillItemSchema = z.object({
  quantity: z.number().int().positive(),
});

export type CreateBillItemSchema = z.infer<
  typeof createBillItemSchema
>;

export type UpdateBillItemSchema = z.infer<
  typeof updateBillItemSchema
>;