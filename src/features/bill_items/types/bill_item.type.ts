export interface Bill {
  id: number;
  created_at: string;
  subtotal: number;
  shop_id: number;
  table_id: number | null;
  bill_status: string | null;
  discount: number | null;
  total: number | null;
}

export interface BillItem {
  id: number;
  bill_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
  created_at: string;
}

export interface CreateBillItem {
  bill_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface UpdateBillItem {
  quantity: number;
}
