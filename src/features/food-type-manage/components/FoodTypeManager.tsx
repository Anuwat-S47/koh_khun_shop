import { useState } from "react";
import { FoodType } from "../types/food_type_manage_type";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { useDeleteFoodType, useGetFoodTypes } from "../hooks/useFoodTypeManage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Plus, Tags, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { FoodTypeCreateDialog } from "./FoodTypeCreateDialog";
import { FoodTypeEditDialog } from "./FoodTyoeEditDialog";

export function FoodTypeManager({ shopId }: { shopId: number }) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | null>(
    null,
  );

  const { t } = useTranslation();
  const { data: foodTypes, isLoading, isError } = useGetFoodTypes(shopId);
  const { mutateAsync: deleteFoodType, isPending: isDeleting } =
    useDeleteFoodType(shopId);

  const handleAdd = () => setCreateDialogOpen(true);

  const handleEdit = (foodType: FoodType) => {
    setSelectedFoodType(foodType);
    setEditDialogOpen(true);
  };

  const handleEditOpenChange = (open: boolean) => {
    setEditDialogOpen(open);
    if (!open) setSelectedFoodType(null);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: t.common.confirm,
      text: t.foodType.deleteConfirm,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t.common.delete,
      cancelButtonText: t.common.cancel,
      reverseButtons: true,
      confirmButtonColor: "#ef4444",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await deleteFoodType(id);
        await Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: t.foodType.deleteSuccess,
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error("Delete food type error:", error);
        Swal.fire({
          icon: "error",
          title: t.common.error,
          text: t.foodType.deleteFailed,
          confirmButtonText: t.common.ok,
        });
      }
    });
  };

  return (
    <>
      <Card className="border-slate-200/80 shadow-xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
                <Tags className="h-5 w-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-bold text-slate-900">
                    {t.foodType.title}
                  </CardTitle>
                  {foodTypes && (
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-700 font-medium"
                    >
                      {foodTypes.length} หมวดหมู่
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.foodType.description}
                </p>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="bg-amber-500 hover:bg-amber-600 text-white shadow-xs shrink-0 h-9 text-xs"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              {t.foodType.add}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-2xl" />
              ))}
            </div>
          )}

          {isError && (
            <div className="py-12 text-center rounded-2xl bg-red-50/50 border border-red-100">
              <p className="text-sm font-medium text-red-600">
                {t.foodType.loadFailed}
              </p>
            </div>
          )}

          {!isLoading && !isError && (!foodTypes || foodTypes.length === 0) && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Tags className="h-6 w-6" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-semibold text-slate-700 text-sm">
                  {t.foodType.empty}
                </p>
                <p className="text-xs text-slate-400">
                  {t.foodType.description}
                </p>
              </div>
              <Button
                onClick={handleAdd}
                variant="outline"
                className="mt-1 text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                {t.foodType.add}
              </Button>
            </div>
          )}

          {!isLoading && !isError && foodTypes && foodTypes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {foodTypes.map((foodType) => (
                <div
                  key={foodType.id}
                  className="group flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                      <Tags className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-sm text-slate-800 truncate">
                      {foodType.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg"
                      onClick={() => handleEdit(foodType)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isDeleting}
                      className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      onClick={() => handleDelete(foodType.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <FoodTypeCreateDialog
        shopId={shopId}
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {selectedFoodType && (
        <FoodTypeEditDialog
          shopId={shopId}
          foodType={selectedFoodType}
          open={editDialogOpen}
          onOpenChange={handleEditOpenChange}
        />
      )}
    </>
  );
}
