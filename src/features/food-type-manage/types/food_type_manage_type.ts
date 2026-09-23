import { MultiLangField } from "@/features/translations/types/language-type";

export type FoodType = {
  id: number;
  name: MultiLangField;
};

export type CreateFoodTypePayload = {
  name: MultiLangField;
  shopId: number;
};

export type UpdateFoodTypePayload = {
  id: number;
  name: MultiLangField;
  shopId: number;
};

export type FoodTypeCreateDialogProps = {
  shopId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type FoodTypeEditDialogProps = {
  shopId: number;
  foodType: FoodType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
