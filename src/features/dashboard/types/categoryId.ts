export type CategoryId = 'all' | 'main' | 'soup' | 'appetizer' | 'drink';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  categoryName: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface TableInfo {
  tableNumber: string;
  status: string;
}