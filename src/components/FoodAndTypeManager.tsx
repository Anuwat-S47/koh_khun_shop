import { useEffect, useRef, useState } from "react";
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
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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

import { FoodType } from "@/features/food-type-manage/types/food_type_manage_type";
import { FoodTypeCreateDialog } from "@/features/food-type-manage/components/FoodTypeCreateDialog";
import { FoodTypeEditDialog } from "@/features/food-type-manage/components/FoodTyoeEditDialog";
import { FoodCreateDialog } from "@/features/food-manage/components/FoodAddDialog";
import { FoodEditDialog } from "@/features/food-manage/components/FoodEditDialog";
import { FoodSlide } from "@/features/food-manage/components/FoodSlide";

// จำนวนอาหารต่อ 1 สไลด์ (1 หน้า) — 8 หารลงตัวกับ 2, 3, 4 คอลัมน์
const FOODS_PER_SLIDE = 8;

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

  // Carousel API สำหรับรู้ว่าอยู่สไลด์ไหน
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // React Query Hooks
  const {
    data: foodTypes,
    isLoading: isTypesLoading,
    isError: isTypesError,
  } = useGetFoodTypes(shopId);

  const { mutateAsync: deleteFoodType } = useDeleteFoodType(shopId);

  const {
    data: foods,
    isLoading: isFoodsLoading,
    isError: isFoodsError,
  } = useGetFoods(shopId, 1, FOODS_PER_SLIDE, searchQuery, activeTypeId);

  const { mutateAsync: deleteFood, isPending: isFoodDeleting } =
    useDeleteFood();

  // จำนวนสไลด์ทั้งหมด คำนวณจากจำนวนอาหารทั้งหมดที่ API ส่งมา
  const totalSlides = Math.ceil((foods?.total ?? 0) / FOODS_PER_SLIDE);

  useEffect(() => {
    if (!carouselApi) return;
    setCurrentSlide(carouselApi.selectedScrollSnap());
    const onSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // เปลี่ยนหน้าแล้วเลื่อนรายการกลับไปบนสุด
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [currentSlide]);

  // Handler: จัดการประเภทอาหาร
  const handleDeleteType = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
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
  };

  const handleResetSearch = () => {
    setSearch("");
    setSearchQuery("");
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
    <div className="flex flex-col lg:flex-row min-h-[600px] border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* ================= ฝั่งซ้าย/แถบบน: ประเภทอาหาร ================= */}
      <aside className="w-full lg:w-72 bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200/80 shrink-0">
        <div className="p-4 border-b border-slate-200/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 font-semibold">
              <Tags className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm text-slate-800">
              {t.food.type}
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => setTypeCreateOpen(true)}
            className="h-8 text-xs bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-xs px-3"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            {t.foodType.add}
          </Button>
        </div>

        {/* แถบหมวดหมู่: บนมือถือเป็น Horizontal Scroll / จอใหญ่เป็น Vertical List */}
        <div className="p-3 overflow-x-auto lg:overflow-y-auto max-h-none lg:max-h-[calc(100vh-200px)]">
          <div className="flex lg:flex-col gap-1.5 min-w-max lg:min-w-0">
            {/* หมวดหมู่ทั้งหมด */}
            <button
              type="button"
              onClick={() => {
                setActiveTypeId(null);
              }}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTypeId === null
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white lg:bg-transparent text-slate-700 hover:bg-slate-200/60 border border-slate-200/60 lg:border-none"
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 shrink-0" />
                <span>หมวดหมู่ทั้งหมด</span>
              </div>
              <Badge
                variant="secondary"
                className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-md ${
                  activeTypeId === null
                    ? "bg-slate-800 text-slate-200"
                    : "bg-slate-200/80 text-slate-600"
                }`}
              >
                {foods?.total ?? 0}
              </Badge>
            </button>

            {/* Loading State */}
            {isTypesLoading && (
              <div className="flex lg:flex-col gap-2 pt-1">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-9 w-28 lg:w-full rounded-xl" />
                ))}
              </div>
            )}

            {/* Error State */}
            {isTypesError && (
              <p className="text-xs text-red-500 py-2 px-3">
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
                    className={`group relative flex items-center justify-between rounded-xl transition-all ${
                      isActive
                        ? "bg-amber-500 text-white shadow-xs font-semibold"
                        : "bg-white lg:bg-transparent text-slate-700 hover:bg-slate-200/60 border border-slate-200/60 lg:border-none font-medium"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTypeId(type.id);
                      }}
                      className="flex-1 text-left px-3 py-2.5 text-xs truncate"
                    >
                      {type.name}
                    </button>

                    {/* Dropdown Menu เพื่อรองรับสัมผัสบนมือถือและ Hover บน Desktop */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={`p-1.5 mr-1 rounded-lg transition-colors ${
                          isActive
                            ? "hover:bg-amber-600 text-white"
                            : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/80"
                        }`}
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedFoodType(type);
                            setTypeEditOpen(true);
                          }}
                          className="text-xs gap-2 cursor-pointer"
                        >
                          <Pencil className="h-3.5 w-3.5 text-slate-500" />
                          แก้ไข
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => handleDeleteType(type.id, e)}
                          className="text-xs gap-2 text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          ลบ
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
          </div>
        </div>
      </aside>

      {/* ================= ฝั่งขวา: รายการอาหาร ================= */}
      <main className="flex-1 flex flex-col bg-white min-w-0">
        {/* Header และช่องค้นหา */}
        <div className="p-4 border-b border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
                <UtensilsCrossed className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.food.foodList}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeTypeId === null
                    ? "แสดงอาหารทั้งหมดในร้าน"
                    : `กำลังแสดงหมวดหมู่: ${
                        foodTypes?.find((ft) => ft.id === activeTypeId)?.name ||
                        ""
                      }`}
                </p>
              </div>
            </div>

            <Button
              size="sm"
              onClick={() => setFoodCreateOpen(true)}
              className="h-9 text-xs bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl shadow-xs shrink-0 px-4"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              {t.food.addFood}
            </Button>
          </div>

          {/* ช่องค้นหาอาหาร */}
          <div className="flex items-center gap-2 pt-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={t.food.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-9 pr-8 h-9 text-xs bg-slate-50 border-slate-200 focus-visible:ring-amber-500 rounded-xl"
              />
              {search && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Button
              type="button"
              onClick={handleSearch}
              className="h-9 text-xs bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl px-4"
            >
              {t.common.search}
            </Button>
          </div>
        </div>

        {/* รายการอาหาร (Carousel) */}
        <div
          ref={listRef}
          className="p-4 flex-1 overflow-y-auto overflow-x-hidden max-h-none lg:max-h-[calc(100vh-200px)]"
        >
          {/* Loading State */}
          {isFoodsLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-64 w-full rounded-2xl" />
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
            (!foods?.data || foods.data.length === 0) && (
              <div className="flex flex-col items-center justify-center gap-2 py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <UtensilsCrossed className="h-10 w-10 text-slate-300" />
                <p className="font-medium text-slate-600 text-xs">
                  {search ? t.food.notFound : t.food.empty}
                </p>
              </div>
            )}

          {/* Food Carousel: 1 สไลด์ = 1 หน้า โหลดทีละหน้าเมื่อเลื่อนมาใกล้ */}
          {!isFoodsLoading && !isFoodsError && totalSlides > 0 && (
            <Carousel
              // key ทำให้ Carousel รีเซ็ตกลับหน้าแรกเมื่อเปลี่ยนหมวด/คำค้นหา
              key={`${activeTypeId}-${searchQuery}`}
              setApi={setCarouselApi}
              opts={{ align: "start" }}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <CarouselItem key={slideIndex} className="basis-full">
                    {/* โหลดเฉพาะสไลด์ปัจจุบัน และสไลด์ก่อน/หลัง 1 หน้า */}
                    {Math.abs(slideIndex - currentSlide) <= 1 ? (
                      <FoodSlide
                        shopId={shopId}
                        slideIndex={slideIndex}
                        searchQuery={searchQuery}
                        FOODS_PER_SLIDE={FOODS_PER_SLIDE}
                        activeTypeId={activeTypeId}
                        isDeleting={isFoodDeleting}
                        onEdit={(id) => {
                          setSelectedFoodId(id);
                          setFoodEditOpen(true);
                        }}
                        onDelete={handleDeleteFood}
                      />
                    ) : (
                      <div className="min-h-[300px]" />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>

        {/* ตัวเปลี่ยนหน้า: อยู่นอกกล่องที่เลื่อน จึงมองเห็นตลอด */}
        {!isFoodsLoading && !isFoodsError && totalSlides > 1 && (
          <div className="flex items-center justify-center gap-3 border-t border-slate-100 px-4 py-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={t.pagination.prev}
              disabled={currentSlide === 0}
              onClick={() => carouselApi?.scrollPrev()}
              className="h-8 w-8 rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {totalSlides <= 7 && (
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${t.pagination.page} ${i + 1}`}
                    onClick={() => carouselApi?.scrollTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentSlide
                        ? "w-6 bg-amber-500"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            )}

            <span className="min-w-20 text-center text-xs font-semibold text-slate-600">
              {t.pagination.page} {currentSlide + 1} / {totalSlides}
            </span>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={t.pagination.next}
              disabled={currentSlide >= totalSlides - 1}
              onClick={() => carouselApi?.scrollNext()}
              className="h-8 w-8 rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>

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
    </div>
  );
}
