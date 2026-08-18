import { MultiLangField } from "@/features/translations/types/language-type";


export type CreateShopTablePayload = {
  name: MultiLangField;
  shopId: number;
};

export type UpdateShopTablePayload = {
  id: number;
  name: MultiLangField;
  shopId: number;
};