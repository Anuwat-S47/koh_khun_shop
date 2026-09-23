
import { CartItem, Product, TableInfo } from '../types/categoryId';
// Mock Data จากดีไซน์หน้าจอ
const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'ข้าวผัดปู (จานใหญ่)', price: 180, category: 'main', categoryName: 'Main' },
  { id: '2', name: 'ต้มยำกุ้งน้ำข้น', price: 220, category: 'soup', categoryName: 'Soup' },
  { id: '3', name: 'ปลากะพงทอดน้ำปลา', price: 380, category: 'main', categoryName: 'Main' },
  { id: '4', name: 'ไส้ทอดกระเทียม', price: 120, category: 'appetizer', categoryName: 'Appetizer' },
  { id: '5', name: 'ยำวุ้นเส้นทะเล', price: 150, category: 'appetizer', categoryName: 'Appetizer' },
  { id: '6', name: 'น้ำอัดลม (โค้ก)', price: 35, category: 'drink', categoryName: 'Drink' },
  { id: '7', name: 'ชาไทยเย็น', price: 45, category: 'drink', categoryName: 'Drink' },
  { id: '8', name: 'ข้าวสวย (โถ)', price: 50, category: 'main', categoryName: 'Main' },
];

export const posService = {
  async getProducts(): Promise<Product[]> {
    // จำลองการดึงข้อมูลจาก API
    return Promise.resolve(MOCK_PRODUCTS);
  },

  async getTableInfo(): Promise<TableInfo> {
    return Promise.resolve({
      tableNumber: 'T01',
      status: 'กำลังคิดเงิน',
    });
  },

  async submitOrder(tableNumber: string, items: { id: string; quantity: number }[], paymentMethod: 'cash' | 'qr') {
    // จำลองการส่งข้อมูลสั่งซื้อ
    return Promise.resolve({
      success: true,
      orderId: `ORD-${Date.now()}`,
      tableNumber,
      paymentMethod,
    });
  },
};