import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pencil,
  Plus,
  Search,
  Tags,
  Trash2,
  UtensilsCrossed,
  X,
  Layers,
} from "lucide-react";
import Swal from "sweetalert2";

import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import {
  useDeleteFoodType,
  useGetFoodTypes,
} from "@/features/food-type-manage/hooks/useFoodTypeManage";
import {
  useDeleteFood,
  useGetFoods,
} from "@/features/food-manage/hooks/useFoodManage";
import { useFoodStore } from "@/features/food-manage/stores/foodStore";

import { FoodType } from "@/features/food-type-manage/types/food_type_manage_type";
import { FoodTypeCreateDialog } from "@/features/food-type-manage/components/FoodTypeCreateDialog";
import { FoodTypeEditDialog } from "@/features/food-type-manage/components/FoodTyoeEditDialog";
import { FoodCreateDialog } from "@/features/food-manage/components/FoodAddDialog";
import { FoodEditDialog } from "@/features/food-manage/components/FoodEditDialog";

type FoodAndTypeManagerProps = {
  shopId: number;
};

export function FoodAndTypeManager({ shopId }: FoodAndTypeManagerProps) {
  const { t } = useTranslation();

  // State สำหรับ Food Type Management
  const [typeCreateOpen, setTypeCreateOpen] = useState(false);
  const [typeEditOpen, setTypeEditOpen] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | null>(
    null,
  );
  const [activeTypeId, setActiveTypeId] = useState<number | null>(null);

  // State สำหรับ Food Management
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [foodCreateOpen, setFoodCreateOpen] = useState(false);
  const [foodEditOpen, setFoodEditOpen] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);

  const { page, pageSize, setPage } = useFoodStore();

  // React Query Hooks
  const {
    data: foodTypes,
    isLoading: isTypesLoading,
    isError: isTypesError,
  } = useGetFoodTypes(shopId);

  const { mutateAsync: deleteFoodType, isPending: isTypeDeleting } =
    useDeleteFoodType(shopId);

  const {
    data: foods,
    isLoading: isFoodsLoading,
    isError: isFoodsError,
  } = useGetFoods(shopId, page, pageSize, searchQuery, activeTypeId);

  const { mutateAsync: deleteFood, isPending: isFoodDeleting } =
    useDeleteFood();

  // Filter รายการอาหารตามประเภทที่เลือกฝั่งซ้าย (ถ้าเลือก "ทั้งหมด" จะไม่กรอง)
  const filteredFoods = foods?.data?.filter((food) => {
    if (activeTypeId === null) return true;
    return food.type?.id === activeTypeId;
  });

  const totalPages = foods?.totalPages ?? 1;

  // Handler: จัดการประเภทอาหาร
  const handleDeleteType = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // ป้องกันการเลือก Type เมื่อกดปุ่มลบ
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
        if (activeTypeId === id) setActiveTypeId(null);
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

  // Handler: จัดการรายการอาหาร
  const handleSearch = () => {
    setSearchQuery(search);
    setPage(1);
  };

  const handleResetSearch = () => {
    setSearch("");
    setSearchQuery("");
    setPage(1);
  };

  const handleDeleteFood = (id: number) => {
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= ฝั่งซ้าย: จัดการประเภทอาหาร (4 คอลัมน์) ================= */}
        <Card className="lg:col-span-4 border-slate-200/80 shadow-xs">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-200/60">
                  <Tags className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    {t.food.type}
                  </CardTitle>
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => setTypeCreateOpen(true)}
                className="h-8 text-xs bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                {t.foodType.add}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-3 space-y-1.5">
            {/* ตัวเลือก: ทั้งหมด */}
            <button
              type="button"
              onClick={() => setActiveTypeId(null)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTypeId === null
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5" />
                <span>หมวดหมู่ทั้งหมด</span>
              </div>
              <Badge
                variant="secondary"
                className={`text-[10px] font-medium ${
                  activeTypeId === null
                    ? "bg-slate-800 text-slate-200"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {foods?.total ?? 0}
              </Badge>
            </button>

            {/* Skeleton Loading สำหรับหมวดหมู่ */}
            {isTypesLoading && (
              <div className="space-y-2 pt-1">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-xl" />
                ))}
              </div>
            )}

            {/* Error State */}
            {isTypesError && (
              <p className="text-xs text-red-500 text-center py-4">
                {t.foodType.loadFailed}
              </p>
            )}

            {/* List รายการ Food Types */}
            {!isTypesLoading &&
              !isTypesError &&
              foodTypes?.map((type) => {
                const isActive = activeTypeId === type.id;
                return (
                  <div
                    key={type.id}
                    onClick={() => {
                      (setActiveTypeId(type.id), setPage(1));
                    }}
                    className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all border ${
                      isActive
                        ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                        : "bg-white border-slate-200/80 text-slate-700 hover:border-amber-300 hover:bg-amber-50/30"
                    }`}
                  >
                    <span className="truncate pr-2 font-semibold">
                      {type.name}
                    </span>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFoodType(type);
                          setTypeEditOpen(true);
                        }}
                        className={`p-1 rounded-md transition-colors ${
                          isActive
                            ? "hover:bg-amber-600 text-white"
                            : "hover:bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        disabled={isTypeDeleting}
                        onClick={(e) => handleDeleteType(type.id, e)}
                        className={`p-1 rounded-md transition-colors ${
                          isActive
                            ? "hover:bg-amber-600 text-white"
                            : "hover:bg-red-50 text-slate-400 hover:text-red-600"
                        }`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        {/* ================= ฝั่งขวา: แสดงรายการอาหาร (8 คอลัมน์) ================= */}
        <Card className="lg:col-span-8 border-slate-200/80 shadow-xs">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-200/60">
                  <UtensilsCrossed className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    {t.food.foodList}
                  </CardTitle>
                  <p className="text-[11px] text-slate-500">
                    {activeTypeId === null
                      ? "แสดงอาหารทั้งหมดในร้าน"
                      : `กำลังแสดงหมวดหมู่: ${
                          foodTypes?.find((t) => t.id === activeTypeId)?.name ||
                          ""
                        }`}
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => setFoodCreateOpen(true)}
                className="h-8 text-xs bg-amber-500 hover:bg-amber-600 text-white shadow-xs shrink-0"
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                {t.food.addFood}
              </Button>
            </div>

            {/* ช่องค้นหาอาหาร */}
            <div className="flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder={t.food.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-8 pr-8 h-8 text-xs bg-slate-50 border-slate-200 focus-visible:ring-amber-500 rounded-xl"
                />
                {search && (
                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <Button
                type="button"
                onClick={handleSearch}
                className="h-8 text-xs bg-slate-800 hover:bg-slate-900 text-white rounded-xl px-3"
              >
                {t.common.search}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            {/* Loading State */}
            {isFoodsLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-56 w-full rounded-2xl" />
                ))}
              </div>
            )}

            {/* Error State */}
            {isFoodsError && (
              <div className="py-12 text-center rounded-2xl bg-red-50/50 border border-red-100">
                <p className="text-sm font-medium text-red-600">
                  {t.foodType.loadFailed}
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isFoodsLoading &&
              !isFoodsError &&
              (!filteredFoods || filteredFoods.length === 0) && (
                <div className="flex flex-col items-center justify-center gap-2 py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <UtensilsCrossed className="h-8 w-8 text-slate-300" />
                  <p className="font-medium text-slate-600 text-xs">
                    {search ? t.food.notFound : t.food.empty}
                  </p>
                </div>
              )}

            {/* Food Grid List */}
            {!isFoodsLoading &&
              !isFoodsError &&
              foods?.data &&
              foods.data.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {foods.data.map((food) => (
                    <div
                      key={food.id}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3 transition-all hover:border-amber-400 hover:shadow-xs"
                    >
                      <div>
                        {/* รูปภาพอาหาร */}
                        <div className="h-28 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-2.5 relative">
                          {food.imgUrl ? (
                            <img
                              src={food.imgUrl}
                              alt={food.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                              {t.food.noImage}
                            </div>
                          )}
                          {food.type?.name && (
                            <span className="absolute top-1.5 left-1.5 bg-slate-900/80 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-md font-medium truncate max-w-[80%]">
                              {food.type.name}
                            </span>
                          )}
                        </div>

                        {/* ชื่อและราคา */}
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-slate-800 text-xs truncate group-hover:text-amber-600 transition-colors">
                            {food.name}
                          </h4>
                          <p className="text-sm font-extrabold text-amber-600">
                            ฿{Number(food.price).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* ปุ่มแก้ไข / ลบ */}
                      <div className="grid grid-cols-2 gap-1.5 pt-2.5 mt-2.5 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFoodId(food.id);
                            setFoodEditOpen(true);
                          }}
                          className="flex items-center justify-center gap-1 py-1 text-[11px] text-slate-700 hover:text-amber-700 font-medium rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-200/80 hover:border-amber-200 transition-colors"
                        >
                          <Pencil className="h-3 w-3" />
                          แก้ไข
                        </button>
                        <button
                          type="button"
                          disabled={isFoodDeleting}
                          onClick={() => handleDeleteFood(food.id)}
                          className="flex items-center justify-center gap-1 py-1 text-[11px] text-red-600 hover:text-red-700 font-medium rounded-lg bg-slate-50 hover:bg-red-50 border border-slate-200/80 hover:border-red-200 transition-colors disabled:opacity-50"
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
              <div className="flex items-center justify-center gap-3 pt-5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="h-7 text-xs rounded-lg"
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
                  className="h-7 text-xs rounded-lg"
                >
                  {t.pagination.next}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog Modals */}
      <FoodTypeCreateDialog
        shopId={shopId}
        open={typeCreateOpen}
        onOpenChange={setTypeCreateOpen}
      />

      {selectedFoodType && (
        <FoodTypeEditDialog
          shopId={shopId}
          foodType={selectedFoodType}
          open={typeEditOpen}
          onOpenChange={(open) => {
            setTypeEditOpen(open);
            if (!open) setSelectedFoodType(null);
          }}
        />
      )}

      <FoodCreateDialog
        shopId={shopId}
        open={foodCreateOpen}
        onOpenChange={setFoodCreateOpen}
      />

      {selectedFoodId && (
        <FoodEditDialog
          foodId={selectedFoodId}
          shopId={shopId}
          open={foodEditOpen}
          onOpenChange={(open) => {
            setFoodEditOpen(open);
            if (!open) setSelectedFoodId(null);
          }}
        />
      )}
    </>
  );
}
