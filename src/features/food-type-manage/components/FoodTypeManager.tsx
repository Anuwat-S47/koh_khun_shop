import { useState } from "react";
import { FoodType } from "../types/food_type_manage_type";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { useDeleteFoodType, useGetFoodTypes } from "../hooks/useFoodTypeManage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Plus, Tags, Trash2, Utensils } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  const handleAdd = () => {
    setCreateDialogOpen(true);
  };

  const handleEdit = (foodType: FoodType) => {
    setSelectedFoodType(foodType);
    setEditDialogOpen(true);
  };

  const handleEditOpenChange = (open: boolean) => {
    setEditDialogOpen(open);

    if (!open) {
      setSelectedFoodType(null);
    }
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
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await deleteFoodType(id);

        await Swal.fire({
          icon: "success",
          title: t.common.success,
          text: t.foodType.deleteSuccess,
          confirmButtonText: t.common.ok,
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Tags className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>{t.foodType.title}</CardTitle>

                <p className="text-sm text-muted-foreground">
                  {t.foodType.description}
                </p>
              </div>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              {t.foodType.add}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              {t.common.loading}
            </div>
          )}
          {isError && (
            <div className="py-10 text-center text-sm text-destructive">
              {t.foodType.loadFailed}
            </div>
          )}

          {!isLoading && !isError && (!foodTypes || foodTypes.length === 0) && (
            <div className="flex flex-col items-center justify-center gap-3 py-10">
              <Tags className="h-10 w-10 text-muted-foreground" />

              <div className="text-center">
                <p className="font-medium">{t.foodType.empty}</p>

                <p className="text-sm text-muted-foreground">
                  {t.foodType.description}
                </p>
              </div>

              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" />
                {t.foodType.add}
              </Button>
            </div>
          )}
          {!isLoading && !isError && foodTypes && foodTypes.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>

                    <TableHead>{t.foodType.name}</TableHead>

                    <TableHead className="w-[160px] text-right">
                      {t.foodType.manage}
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {foodTypes.map((foodType, index) => (
                    <TableRow key={foodType.id}>
                      <TableCell>{foodTypes.length - index}</TableCell>

                      <TableCell className="font-medium">
                        {foodType.name}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(foodType)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(foodType.id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
