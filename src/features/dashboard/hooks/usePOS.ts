import { useState, useMemo, useEffect } from 'react';
import { CartItem, CategoryId, Product, TableInfo } from '../types/categoryId';
import { posService } from '../service/pos.service';

export function usePOS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [tableInfo, setTableInfo] = useState<TableInfo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([
    // ค่าเริ่มต้นตามภาพตัวอย่าง
    { id: '2', name: 'ต้มยำกุ้งน้ำข้น', price: 220, category: 'soup', categoryName: 'Soup', quantity: 1 },
    { id: '3', name: 'ปลากะพงทอดน้ำปลา', price: 380, category: 'main', categoryName: 'Main', quantity: 1 },
  ]);

  useEffect(() => {
    posService.getProducts().then(setProducts);
    posService.getTableInfo().then(setTableInfo);
  }, []);

  // กรองสินค้าตามหมวดหมู่และคำค้นหา
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  // ฟังก์ชันจัดการตะกร้า
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  // คำนวณราคา
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const vat = useMemo(() => subtotal * 0.07, [subtotal]);
  const total = useMemo(() => subtotal + vat, [subtotal, vat]);

  return {
    products: filteredProducts,
    tableInfo,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cart,
    addToCart,
    updateQuantity,
    clearCart,
    subtotal,
    vat,
    total,
  };
}