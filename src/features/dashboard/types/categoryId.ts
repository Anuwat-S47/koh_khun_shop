export type CategoryId = "all" | number;

export interface Product {
  id: number;
  created_at: string;
  img_url: string | null;
  name: string;
  price: number;
  type_id: number;
  shop_id: number;
}

export type FoodType = {
  id: number;
  name: string;
};

export interface CartItem extends Product {
  quantity: number;
}

export interface TableInfo {
  tableNumber: string;
  status: string;
}
