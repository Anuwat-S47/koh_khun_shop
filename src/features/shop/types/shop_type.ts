export interface MultiLangField {
  th: string;
  la: string;
}

export type CreateShopPayload = {
  name: MultiLangField;
  logoUrl: string;
  address: MultiLangField;
  phone: string;
};

export type CreateShopWithImgPayload = Omit<CreateShopPayload, "logoUrl"> & {
  logoUrl: File;
};

export type ShopType = {
  id: number;
  name: MultiLangField;
  logoUrl: string;
  address: MultiLangField;
  phone: string;
  createdAt: string;
  createBy: string;
};

export interface UpdateShopPayload {
  id: number;
  name: MultiLangField;
  address: MultiLangField;
  phone: string;
  logoUrl?: string;
}

export type UpdateShopWithImgPayload = {
  id: number;
  name: MultiLangField;
  address: MultiLangField;
  phone: string;
  logoUrl: File | null;
};
