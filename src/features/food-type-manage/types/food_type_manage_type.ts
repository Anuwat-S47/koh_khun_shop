export type FoodType = {
  id: number;
  name: string;
};

export type CreateFoodTypePayload = {
  name: string;
  shopId: number;
};

export type UpdateFoodTypePayload = {
  id: number;
  name: string;
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
