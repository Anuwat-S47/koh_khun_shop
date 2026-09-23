import { MultiLangField } from "@/features/translations/types/language-type";

export type ShopTable = {
  id: number;
  name: MultiLangField;
};

export type CreateShopTablePayload = {
  name: MultiLangField;
  shopId: number;
};

export type UpdateShopTablePayload = {
  id: number;
  name: MultiLangField;
  shopId: number;
};

export type ShopTableCreateDialogProps = {
  shopId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type ShopTableEditDialogProps = {
  shopId: number;
  table: ShopTable | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};