import { z } from 'zod';

export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.enum(['all', 'main', 'soup', 'appetizer', 'drink']).default('all'),
});

export const checkoutSchema = z.object({
  tableNumber: z.string().min(1, 'กรุณาระบุโต๊ะอาหาร'),
  paymentMethod: z.enum(['cash', 'qr']),
  totalAmount: z.number().positive(),
});

export type SearchInput = z.infer<typeof searchSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;