import { create } from "zustand";
import { FoodStore } from "../types/food_manage_type";

export const useFoodStore = create<FoodStore>((set) => ({
  page: 1,
  pageSize: 20,
  search: "",

  setPage: (page) =>
    set({
      page,
    }),

  setPageSize: (pageSize) =>
    set({
      pageSize,
      page: 1,
    }),

  setSearch: (search) =>
    set({
      search,
      page: 1,
    }),

  resetPage: () =>
    set({
      page: 1,
    }),
}));
