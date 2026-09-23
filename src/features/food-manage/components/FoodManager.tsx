import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteFood, useGetFoods } from "../hooks/useFoodManage";
import { useFoodStore } from "../stores/foodStore";
import Swal from "sweetalert2";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { useState } from "react";
import { FoodCreateDialog } from "./FoodAddDialog";

type FoodManagerProps = {
  shopId: number;
};

export const FoodManager = ({ shopId }: FoodManagerProps) => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { page, pageSize, setPage } = useFoodStore();
  const { t, language } = useTranslation();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const {
    data: foods,
    isLoading,
    isError,
  } = useGetFoods(shopId, page, pageSize, searchQuery);

  const { mutateAsync: deleteFood, isPending: isDeleting } = useDeleteFood();

  const totalPages = foods?.totalPages ?? 1;

  const handleSearch = () => {
    setSearchQuery(search);
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
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await deleteFood({
          id,
          shopId,
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
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{t.food.foodList}</h2>

            <p className="text-sm text-muted-foreground">
              {t.food.all} {foods?.total ?? 0} {t.food.count}
            </p>
          </div>

          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus />
            {t.food.addFood}
          </Button>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <Input
            placeholder={t.food.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {search && (
            <Button type="button" variant="outline" onClick={handleResetSearch}>
              X
            </Button>
          )}

          <Button type="button" onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            {t.common.search}
          </Button>
        </div>

        {/* Food List */}
        <Card>
          <CardHeader>
            <CardTitle>{t.food.title}</CardTitle>
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

            {!isLoading &&
              !isError &&
              (!foods?.data || foods.data.length === 0) && (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  {search ? t.food.notFound : t.food.empty}
                </div>
              )}
            {!isLoading && !isError && foods?.data && foods.data.length > 0 && (
              <div className="space-y-3">
                {foods?.data?.map((food) => (
                  <div
                    key={food.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
                        {food.imgUrl ? (
                          <img
                            src={food.imgUrl}
                            alt={food.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                            {t.food.noImage}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{food.name}</p>

                        <p className="text-sm">
                          {t("food.type")}:{" "}
                          <span className="font-medium">
                            {food.type?.name || "-"}
                          </span>
                        </p>
                        <p className="font-semibold">
                          {Number(food.price).toLocaleString()} {t.food.baht}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.food.addedAt}:
                          {new Date(food.createdAt).toLocaleDateString("th-TH")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Pencil />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        disabled={isDeleting}
                        onClick={() => handleDelete(food.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              {t.pagination.prev}
            </Button>

            <span className="text-sm">
              {t.pagination.page} {page} / {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              {t.pagination.next}
            </Button>
          </div>
        )}
      </div>

      <FoodCreateDialog
        shopId={shopId}
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
};
