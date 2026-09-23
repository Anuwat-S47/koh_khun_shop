import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetShop } from "@/features/shop-manage/hooks/useShopManage";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { useLanguageStore } from "@/features/translations/stores/language-store";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SquarePen, Store } from "lucide-react";

export const Route = createFileRoute("/_protected/settings/shop-manage/")({
  staticData: {
    title: "shop.title",
    showBackButton: false,
    className: "w-full max-w-2xl",
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: shop, isLoading } = useGetShop();
  const navigate = useNavigate();

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 ">
      {shop && shop.length > 0 ? (
        shop.map((s) => (
          <div
            key={s.id}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
          >
            {/* ส่วนข้อมูลร้าน */}
            <div className="flex flex-col gap-6 p-5 sm:flex-row">
              {/* Logo */}
              <img
                src={s.logoUrl}
                alt={s.name}
                className="mx-auto h-28 w-28 shrink-0 rounded-xl border border-slate-100 object-cover shadow-sm sm:mx-0"
              />

              {/* ข้อมูลร้าน */}
              <div className="flex w-full min-w-0 flex-col justify-center space-y-2 text-slate-700">
                {/* ชื่อร้าน */}
                <h2 className="flex items-center text-xl font-bold text-slate-800">
                  <span className="w-20 shrink-0 text-sm font-semibold text-slate-500">
                    {t.shop.name}:
                  </span>

                  <span className="wrap-break-word">{s.name}</span>
                </h2>

                {/* เบอร์โทร */}
                <p className="flex items-center text-sm text-slate-600">
                  <span className="w-20 shrink-0 font-semibold text-slate-500">
                    {t.shop.phone}:
                  </span>

                  <span className="font-medium text-slate-800">{s.phone}</span>
                </p>

                {/* ที่อยู่ */}
                <div className="flex items-start text-sm text-slate-600">
                  <span className="w-20 shrink-0 pt-0.5 font-semibold text-slate-500">
                    {t.shop.address}:
                  </span>

                  <p className="min-w-0 flex-1 whitespace-pre-line font-medium leading-relaxed text-slate-800 wrap-break-word">
                    {s.address}
                  </p>
                </div>
              </div>
            </div>

            {/* ปุ่ม */}
            <div className="grid grid-cols-2 gap-3 border-t bg-slate-50/50 p-3">
              {/* จัดการร้าน */}
              <Button
                onClick={() =>
                  navigate({
                    to: "/settings/shop-manage/$shopId",
                    params: {
                      shopId: String(s.id),
                    },
                  })
                }
                variant="outline"
                className="w-full gap-2 border-slate-200 bg-white font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                <Store className="h-4 w-4" />

                {t.shop.manage}
              </Button>

              {/* แก้ไข */}
              <Button
                onClick={() =>
                  navigate({
                    to: "/settings/shop-manage/$shopId/edit-shop",
                    params: {
                      shopId: String(s.id),
                    },
                  })
                }
                variant="outline"
                className="w-full gap-2 border-amber-200 bg-amber-50/50 font-semibold text-amber-700 hover:border-amber-300 hover:bg-amber-100 hover:text-amber-800"
              >
                <SquarePen className="h-4 w-4" />

                {t.common.edit}
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <p className="mb-4 text-slate-500">{t.shop.noShop}</p>

          <Link to="/settings/shop-manage/add-shop">
            <Button>{t.shop.addShop}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
