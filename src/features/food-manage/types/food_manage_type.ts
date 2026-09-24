export type Food = {
  id: number;
  createdAt: string;
  imgUrl: string;
  name: string;
  price: number;
  typeId: number;
  shopId: number;

  type?: {
    id: number;
    name: string;
  } | null;
};

export type CreateFoodData = {
  shopId: number;
  typeId: number;
  name: string;
  price: number;
  imgUrl: string | null;
};

export type CreateFoodPayload = {
  shopId: number;
  name: string;
  price: number;
  typeId: number;
  imgUrl?: File;
};

export type UpdateFoodData = {
  id: number;
  shopId: number;
  name: string;
  price: number;
  typeId: number;
  imgUrl?: string | null;
};

export type UpdateFoodRequest = {
  id: number;
  shopId: number;
  name: string;
  price: number;
  typeId: number;
  imgUrl?: File;
};

export type UpdateFoodPayload = {
  id: number;
  shopId: number;
  name: string;
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
