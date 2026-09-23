export type ShopTable = {
  id: number;
  name: string;
};

export type CreateShopTablePayload = {
  name: string;
  shopId: number;
};

export type UpdateShopTablePayload = {
  id: number;
  name: string;
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
