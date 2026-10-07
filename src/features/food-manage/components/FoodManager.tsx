import { Pencil, Plus, Search, Trash2, UtensilsCrossed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteFood, useGetFoods } from "../hooks/useFoodManage";
import { useFoodStore } from "../stores/foodStore";
import Swal from "sweetalert2";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { useState } from "react";
import { FoodCreateDialog } from "./FoodAddDialog";
import { FoodEditDialog } from "./FoodEditDialog";

type FoodManagerProps = {
  shopId: number;
};

export function FoodManager({ shopId }: FoodManagerProps) {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { page, pageSize, setPage } = useFoodStore();
  const { t } = useTranslation();

  const {
    data: foods,
    isLoading,
    isError,
  } = useGetFoods(shopId, page, pageSize, searchQuery);

  const { mutateAsync: deleteFood, isPending: isDeleting } = useDeleteFood();

  const totalPages = foods?.totalPages ?? 1;

  const handleSearch = () => {
    setSearchQuery(search);
    setPage(1);
  };

  const handleResetSearch = () => {
    setSearch("");
    setSearchQuery("");
    setPage(1);
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
        await deleteFood({ id, shopId });
        await Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: t.common.success,
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error("Error deleting food:", error);
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
                <UtensilsCrossed className="h-5 w-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-bold text-slate-900">
                    {t.food.foodList}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 font-medium"
                  >
                    {foods?.total ?? 0} {t.food.count}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{t.food.title}</p>
              </div>
            </div>

            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white shadow-xs shrink-0 h-9 text-xs"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              {t.food.addFood}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder={t.food.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-8 pr-8 h-9 text-xs bg-slate-50 border-slate-200 focus-visible:ring-amber-500 rounded-xl"
              />
              {search && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Button
              type="button"
              onClick={handleSearch}
              className="h-9 text-xs bg-slate-800 hover:bg-slate-900 text-white rounded-xl"
            >
              {t.common.search}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-64 w-full rounded-2xl" />
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

          {!isLoading &&
            !isError &&
            (!foods?.data || foods.data.length === 0) && (
              <div className="flex flex-col items-center justify-center gap-3 py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <p className="font-semibold text-slate-700 text-sm">
                  {search ? t.food.notFound : t.food.empty}
                </p>
              </div>
            )}

          {!isLoading && !isError && foods?.data && foods.data.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {foods.data.map((food) => (
                <div
                  key={food.id}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3.5 transition-all hover:border-amber-400 hover:shadow-xs"
                >
                  <div>
                    {/* Image */}
                    <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-3 relative">
                      {food.imgUrl ? (
                        <img
                          src={food.imgUrl}
                          alt={food.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                          {t.food.noImage}
                        </div>
                      )}
                      {food.type?.name && (
                        <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                          {food.type.name}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-amber-600 transition-colors">
                        {food.name}
                      </h4>
                      <p className="text-base font-extrabold text-amber-600">
                        ฿{Number(food.price).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFoodId(food.id);
                        setEditDialogOpen(true);
                      }}
                      className="flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-700 hover:text-amber-700 font-medium rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200/80 hover:border-amber-200 transition-colors"
                    >
                      <Pencil className="h-3 w-3" />
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => handleDelete(food.id)}
                      className="flex items-center justify-center gap-1.5 py-1.5 text-xs text-red-600 hover:text-red-700 font-medium rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200/80 hover:border-red-200 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-3 w-3" />
                      ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="h-8 text-xs rounded-lg"
              >
                {t.pagination.prev}
              </Button>
              <span className="text-xs font-medium text-slate-600">
                {t.pagination.page} {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="h-8 text-xs rounded-lg"
              >
                {t.pagination.next}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <FoodCreateDialog
        shopId={shopId}
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {selectedFoodId && (
        <FoodEditDialog
          foodId={selectedFoodId}
          shopId={shopId}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) setSelectedFoodId(null);
          }}
        />
      )}
    </>
  );
}
