<<<<<<< HEAD
import { useMemo, useState } from "react";

import { CartItem, Product, TableInfo } from "../types/categoryId";

import { useGetFoods } from "./useFoods";
import { useFoodTypes } from "./useFoodTypes";

export function usePOS() {
  // =========================
  // FOOD DATA
  // =========================

  const {
    data: products = [],
    isLoading: isFoodsLoading,
    isError: isFoodsError,
    error: foodsError,
  } = useGetFoods();

  // =========================
  // FOOD TYPE DATA
  // =========================

  const {
    data: foodTypes = [],
    isLoading: isFoodTypesLoading,
    isError: isFoodTypesError,
    error: foodTypesError,
  } = useFoodTypes();

  // =========================
  // TABLE
  // =========================

  const [tableInfo, setTableInfo] = useState<TableInfo | null>(null);

  // =========================
  // CATEGORY
  // =========================

  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all",
  );

  // =========================
  // SEARCH
  // =========================

  const [searchQuery, setSearchQuery] = useState("");

  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState<CartItem[]>([]);

  // =========================
  // FILTER PRODUCT
  // =========================

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product: Product) => {
      // กรองตามประเภทอาหาร
      const matchCategory =
        selectedCategory === "all" || product.type_id === selectedCategory;

      // กรองตามชื่ออาหาร
      const matchQuery =
        query === "" || product.name.toLowerCase().includes(query);

=======
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
>>>>>>> 506d95e (yang mai sed)
      return matchCategory && matchQuery;
    });
  }, [products, selectedCategory, searchQuery]);

<<<<<<< HEAD
  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      // มีสินค้าอยู่แล้ว
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      // ยังไม่มีสินค้า
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          const newQuantity = item.quantity + delta;

          // จำนวน <= 0 → ลบสินค้า
          if (newQuantity <= 0) {
            return null;
          }

          return {
            ...item,
            quantity: newQuantity,
          };
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = () => {
    setCart([]);
  };

  // =========================
  // SUBTOTAL
  // =========================

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
  }, [cart]);

  // =========================
  // VAT
  // =========================

  const vat = useMemo(() => {
    return subtotal * 0.07;
  }, [subtotal]);

  // =========================
  // TOTAL
  // =========================

  const total = useMemo(() => {
    return subtotal + vat;
  }, [subtotal, vat]);

  // =========================
  // API STATE
  // =========================

  const isLoading = isFoodsLoading || isFoodTypesLoading;

  const isError = isFoodsError || isFoodTypesError;

  const error = foodsError || foodTypesError;

  // =========================
  // RETURN
  // =========================

  return {
    // FOOD
    products: filteredProducts,
    allProducts: products,

    // FOOD TYPE
    foodTypes,
    selectedCategory,
    setSelectedCategory,

    // API STATE
    isLoading,
    isError,
    error,

    // TABLE
    tableInfo,
    setTableInfo,

    // SEARCH
    searchQuery,
    setSearchQuery,

    // CART
=======
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
>>>>>>> 506d95e (yang mai sed)
    cart,
    addToCart,
    updateQuantity,
    clearCart,
<<<<<<< HEAD

    // PRICE
=======
>>>>>>> 506d95e (yang mai sed)
    subtotal,
    vat,
    total,
  };
<<<<<<< HEAD
}
=======
}
>>>>>>> 506d95e (yang mai sed)
