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
import { useCreateFoodType } from "../hooks/useFoodTypeManage";
import { FoodTypeCreateDialogProps } from "../types/food_type_manage_type";
import { CreateFoodTypeRequest, foodTypeSchema } from "../schemas/food-type-schemas";

export function FoodTypeCreateDialog({
  shopId,
  open,
  onOpenChange,
}: FoodTypeCreateDialogProps) {
  const { mutateAsync: createFoodType, isPending } =
    useCreateFoodType(shopId);
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      name: {
        th: "",
        lo: "",
      },
    } satisfies CreateFoodTypeRequest,

    validators: {
      onSubmit: foodTypeSchema(t),
    },

    onSubmit: async ({ value }) => {
      try {
        await createFoodType({
          name: {
            th: value.name.th,
            lo: value.name.lo,
          },
          shopId,
        });

        form.reset();
        onOpenChange(false);

        await Swal.fire({
          icon: "success",
          title: t.common.success,
          text: t.foodType.addSuccess,
          confirmButtonText: t.common.ok,
        });
      } catch (error) {
        console.error("Create food type error:", error);
      }
    },
  });

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
          <DialogTitle>{t.foodType.add}</DialogTitle>

          <DialogDescription>{t.foodType.description}</DialogDescription>
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
            name="name.th"
            children={(field) => {
              const error = field.state.meta.errors[0];

              return (
                <div className="space-y-2">
                  <Label htmlFor="food-type-name-th">{t.foodType.name}</Label>

                  <Input
                    id="food-type-name-th"
                    placeholder={t.foodType.foodTypePlaceholder}
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

          {/* LO */}

          {/* <form.Field
            name="name.lo"
            children={(field) => {
              const error = field.state.meta.errors[0];

              return (
                <div className="space-y-2">
                  <Label htmlFor="food-type-name-lo">ຊື່ໂຕະ (ລາວ)</Label>

                  <Input
                    id="food-type-name-lo"
                    placeholder="ເຊັ່ນ ໂຕະ 1"
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
          /> */}

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
              {isPending ? t.common.saving : t.foodType.add}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
