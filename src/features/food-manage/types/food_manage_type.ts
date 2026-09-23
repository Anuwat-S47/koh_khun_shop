import { MultiLangField } from "@/features/translations/types/language-type";

export type Food = {
  id: number;
  createdAt: string;
  imgUrl: string;
  name: MultiLangField;
  price: number;
  typeId: number;
  shopId: number;

  type?: {
    id: number;
    name: MultiLangField;
  } | null;
};

export type CreateFoodData = {
  shopId: number;
  typeId: number;
  name: MultiLangField;
  price: number;
  imgUrl: string | null;
};

export type CreateFoodPayload = {
  shopId: number;
  name: MultiLangField;
  price: number;
  typeId: number;
  imgUrl?: File;
};

export type UpdateFoodData = {
  id: number;
  shopId: number;
  name: MultiLangField;
  price: number;
  typeId: number;
  imgUrl?: string | null;
};

export type UpdateFoodPayload = {
  id: number;
  shopId: number;
  name: MultiLangField;
  price: number;
  typeId: number;
  imgUrl?: File;
};

export type FoodStore = {
  page: number;
  pageSize: number;
  search: string;

  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (search: string) => void;
  resetPage: () => void;
};
