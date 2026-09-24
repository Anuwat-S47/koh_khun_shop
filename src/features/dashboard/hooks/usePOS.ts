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

      return matchCategory && matchQuery;
    });
  }, [products, selectedCategory, searchQuery]);

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
    cart,
    addToCart,
    updateQuantity,
    clearCart,

    // PRICE
    subtotal,
    vat,
    total,
  };
}
