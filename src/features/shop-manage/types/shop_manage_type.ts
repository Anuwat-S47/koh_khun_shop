export type CreateShopPayload = {
  name: string;
  logoUrl: string;
  address: string;
  phone: string;
};

export type CreateShopWithImgPayload = Omit<CreateShopPayload, "logoUrl"> & {
  logoUrl: File;
};

export type ShopType = {
  id: number;
  name: string;
  logoUrl: string;
  address: string;
  phone: string;
  createdAt: string;
  createBy: string;
};

export interface UpdateShopPayload {
  id: number;
  name: string;
  address: string;
  phone: string;
  logoUrl?: string;
}

export type UpdateShopWithImgPayload = {
  id: number;
  name: string;
  address: string;
  phone: string;
  logoUrl: File | null;
};
