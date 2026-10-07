import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { useGetFoods } from "../hooks/useFoodManage";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2 } from "lucide-react";

type FoodSlideProps = {
  shopId: number;
  slideIndex: number; // เริ่มที่ 0
  searchQuery: string;
  activeTypeId: number | null;
  isDeleting: boolean;
  FOODS_PER_SLIDE: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

// 1 สไลด์ = 1 หน้า ดึงข้อมูลของหน้านั้นเอง (ถูก cache โดย React Query)
export function FoodSlide({
  shopId,
  slideIndex,
  searchQuery,
  FOODS_PER_SLIDE,
  activeTypeId,
  isDeleting,
  onEdit,
  onDelete,
}: FoodSlideProps) {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetFoods(
    shopId,
    slideIndex + 1,
    FOODS_PER_SLIDE,
    searchQuery,
    activeTypeId,
  );

  const gridClass =
    "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4";

  if (isLoading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center rounded-2xl bg-red-50/50 border border-red-100">
        <p className="text-sm font-medium text-red-600">
          {t.foodType.loadFailed}
        </p>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {data?.data.map((food) => (
        <div
          key={food.id}
          className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-3 transition-all hover:border-amber-400 hover:shadow-md"
        >
          <div>
            {/* รูปภาพอาหาร */}
            <div className="h-32 sm:h-36 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-3 relative">
              {food.imgUrl ? (
                <img
                  src={food.imgUrl}
                  alt={food.name}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400 font-medium">
                  {t.food.noImage}
                </div>
              )}
              {food.type?.name && (
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-2.5 py-0.5 rounded-md font-medium truncate max-w-[80%]">
                  {food.type.name}
                </span>
              )}
            </div>

            {/* ชื่อและราคา */}
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-amber-600 transition-colors">
                {food.name}
              </h4>
              <p className="text-base font-extrabold text-amber-600">
                ฿{Number(food.price).toLocaleString()}
              </p>
            </div>
          </div>

          {/* ปุ่มแก้ไข / ลบ */}
          <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onEdit(food.id)}
              className="flex items-center justify-center gap-1.5 py-2 text-xs text-slate-700 hover:text-amber-700 font-medium rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200/80 hover:border-amber-200 transition-colors active:scale-95"
            >
              <Pencil className="h-3.5 w-3.5" />
              แก้ไข
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => onDelete(food.id)}
              className="flex items-center justify-center gap-1.5 py-2 text-xs text-red-600 hover:text-red-700 font-medium rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200/80 hover:border-red-200 transition-colors disabled:opacity-50 active:scale-95"
            >
              <Trash2 className="h-3.5 w-3.5" />
              ลบ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
