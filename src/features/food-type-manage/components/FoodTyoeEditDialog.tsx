import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import Swal from "sweetalert2";
import { FoodTypeEditDialogProps } from "../types/food_type_manage_type";
import {
  CreateFoodTypeRequest,
  foodTypeSchema,
} from "../schemas/food-type-schemas";
import { useUpdateFoodType } from "../hooks/useFoodTypeManage";

export function FoodTypeEditDialog({
  shopId,
  foodType,
  open,
  onOpenChange,
}: FoodTypeEditDialogProps) {
  const { mutateAsync: updateFoodType, isPending } = useUpdateFoodType(shopId);
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      name: foodType?.name || "",
    } satisfies CreateFoodTypeRequest,

    validators: {
      onSubmit: foodTypeSchema(t),
    },

    onSubmit: async ({ value }) => {
      if (!foodType) return;

      try {
        await updateFoodType({
          id: foodType.id,
          name: value.name,
          shopId,
        });

        form.reset();
        onOpenChange(false);

        Swal.fire({
          icon: "success",
          title: t.common.success,
          text: t.foodType.editSuccess,
          confirmButtonText: t.common.ok,
        });
      } catch (error) {
        console.error("Update food type error:", error);
      }
    },
  });

  if (!foodType) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.foodType.editfoodType}</DialogTitle>

          <DialogDescription>{t.foodType.editDescription}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* TH */}

          <form.Field
            name="name"
            children={(field) => {
              const error = field.state.meta.errors[0];

              return (
                <div className="space-y-2">
                  <Label htmlFor="edit-food-type-name-th">
                    {t.foodType.name}
                  </Label>

                  <Input
                    id="edit-food-type-name-th"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    disabled={isPending}
                  />

                  {error && (
                    <p className="text-sm text-destructive">{error.message}</p>
                  )}
                </div>
              );
            }}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {t.common.cancel}
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? t.common.saving : t.common.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
