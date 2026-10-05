export interface BillItem {
  id: number;
  bill_id: number;
  food_id: number;

  food_name: string;
  price: number;
  quantity: number;
  total: number;

  created_at: string;
}

export interface CreateBillItem {
  bill_id: number;
  food_id: number;
  food_name: string;
  price: number;
  quantity: number;
}

export interface UpdateBillItem {
  quantity: number;
}