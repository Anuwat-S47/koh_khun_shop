import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FieldGroup, FieldSet } from "@/components/ui/field";
import FormField from "@/components/FormField";

import { useForm } from "@tanstack/react-form";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";

import { useTranslation } from "@/features/translations/hooks/useTranSlation";

import { useGetFoodById, useUpdateFood } from "../hooks/useFoodManage";

import { useGetFoodTypes } from "@/features/food-type-manage/hooks/useFoodTypeManage";

import { FoodTypeSelector } from "@/features/food-type-manage/components/FoodTypeSelector";

import { updateFoodSchema } from "../schemas/food-schemas";
import { UpdateFoodRequest } from "../types/food_manage_type";

type FoodEditDialogProps = {
  foodId: number;
  shopId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FoodEditDialog({
  foodId,
  shopId,
  open,
  onOpenChange,
}: FoodEditDialogProps) {
  const { t } = useTranslation();

  const { data: food, isLoading: isFoodLoading } = useGetFoodById(
    foodId,
    shopId,
  );

  const { mutateAsync: updateFood, isPending: updatingFood } = useUpdateFood();

  const { data: foodTypes, isLoading: isFoodTypeLoading } =
    useGetFoodTypes(shopId);

  const safeFoodTypes = foodTypes ?? [];

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const defaultValues: UpdateFoodRequest = {
    id: foodId,
    shopId,
    name: "",
    price: 0,
    typeId: 0,
    imgUrl: undefined,
  };

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: updateFoodSchema(t),
    },

    onSubmit: async ({ value }) => {
      try {
        await updateFood({
          oldImgUrl: food?.imgUrl ?? null,
          data: {
            id: foodId,
            shopId,
            name: value.name,
            price: value.price,
            typeId: value.typeId,
            imgUrl: value.imgUrl,
          },
        });

        await Swal.fire({
          title: "สำเร็จ",
          text: "แก้ไขอาหารเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        });

        handleClose(false);
      } catch (error) {
        await Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text:
            error instanceof Error ? error.message : "ไม่สามารถแก้ไขอาหารได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    },
  });

  useEffect(() => {
    if (!food || !open) return;

    form.setFieldValue("name", food.name ?? "");
    form.setFieldValue("price", food.price ?? 0);
    form.setFieldValue("typeId", food.typeId ?? 0);
    form.setFieldValue("imgUrl", undefined);

    setPreviewUrl(food.imgUrl ?? null);
  }, [food, open]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleClose = (value: boolean) => {
    if (!value) {
      form.reset();
      setPreviewUrl(null);
    }

    onOpenChange(value);
  };

  const handleImageChange = (field: any, file: File | undefined) => {
    if (!file) return;

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    field.handleChange(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  if (isFoodLoading) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg">
          <div className="py-10 text-center text-muted-foreground">
            {t.food.loadingFood}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t.food.editFood}</DialogTitle>

          <DialogDescription>{t.food.editFoodDescription}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                {/* Image */}
                <form.Field
                  name="imgUrl"
                  children={(field) => (
                    <FormField field={field}>
                      {() => (
                        <div className="space-y-2">
                          <Label>{t.food.imgAlt}</Label>

                          {previewUrl && (
                            <div className="flex justify-center my-3">
                              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs group">
                                <img
                                  src={previewUrl}
                                  alt={t.food.imgAlt}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                            </div>
                          )}

                          <Input
                            id={field.name}
                            name={field.name}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(e) => {
                              const file = e.target.files?.[0];

                              handleImageChange(field, file);
                            }}
                          />

                          <p className="text-xs text-muted-foreground">
                            {t.food.keepImageHint}
                          </p>
                        </div>
                      )}
                    </FormField>
                  )}
                />

                {/* Name */}
                <form.Field
                  name="name"
                  children={(field) => (
                    <FormField field={field}>
                      {(hasError) => (
                        <div className="space-y-2">
                          <Label>{t.food.name}</Label>

                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder={t.food.namePlaceholder}
                            aria-invalid={hasError}
                          />
                        </div>
                      )}
                    </FormField>
                  )}
                />

                {/* Type */}
                <form.Field
                  name="typeId"
                  children={(field) => (
                    <FormField field={field}>
                      {() => (
                        <FoodTypeSelector
                          value={field.state.value}
                          onChange={(id) => field.handleChange(id)}
                          foodTypes={safeFoodTypes}
                          isLoading={isFoodTypeLoading}
                          t={t}
                        />
                      )}
                    </FormField>
                  )}
                />

                {/* Price */}
                <form.Field
                  name="price"
                  children={(field) => {
                    const handleAdjustPrice = (amount: number) => {
                      const currentValue = Number(field.state.value) || 0;
                      const newValue = Math.max(0, currentValue + amount);
                      field.handleChange(newValue);
                    };

                    const negativeSteps = [-100, -50, -10, -1];
                    const positiveSteps = [1, 10, 50, 100];

                    return (
                      <FormField field={field}>
                        {(hasError) => (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="price-input">
                                {t.food.price}
                              </Label>

                              <span className="text-xs text-muted-foreground">
                                {t.common.currency} ({t.food.baht})
                              </span>
                            </div>

                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                                ฿
                              </span>

                              <Input
                                id="price-input"
                                type="number"
                                min="0"
                                placeholder="0.00"
                                className="pl-8 pr-12 font-mono text-base font-semibold"
                                value={field.state.value ?? ""}
                                onChange={(e) =>
                                  field.handleChange(
                                    e.target.value === ""
                                      ? 0
                                      : Number(e.target.value),
                                  )
                                }
                                aria-invalid={hasError}
                              />

                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground pointer-events-none">
                                {t.food.baht}
                              </span>
                            </div>

                            <div className="space-y-1.5 pt-1">
                              <span className="text-xs text-muted-foreground">
                                {t.food.quickPriceUpdate}:
                              </span>

                              <div className="flex flex-wrap items-center gap-1">
                                {negativeSteps.map((step) => (
                                  <button
                                    key={step}
                                    type="button"
                                    onClick={() => handleAdjustPrice(step)}
                                    className="text-xs font-medium px-2 py-1 rounded border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/15 active:scale-95 transition-all"
                                  >
                                    {step}
                                  </button>
                                ))}

                                <button
                                  type="button"
                                  onClick={() => field.handleChange(0)}
                                  className="text-xs font-semibold px-2.5 py-1 rounded border border-input bg-muted hover:bg-accent active:scale-95 transition-all"
                                >
                                  0
                                </button>

                                {positiveSteps.map((step) => (
                                  <button
                                    key={step}
                                    type="button"
                                    onClick={() => handleAdjustPrice(step)}
                                    className="text-xs font-medium px-2 py-1 rounded border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-95 transition-all shadow-sm"
                                  >
                                    +{step}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </FormField>
                    );
                  }}
                />
              </FieldGroup>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClose(false)}
                  disabled={updatingFood}
                >
                  {t.common.cancel}
                </Button>

                <Button type="submit" disabled={updatingFood || isFoodLoading}>
                  {updatingFood ? t.common.saving : t.food.editFood}
                </Button>
              </DialogFooter>
            </FieldSet>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
