import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetShop } from "@/features/shop/hooks/useShop";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SquarePen, Store } from "lucide-react";
import { getLangText } from "@/utils/lang";

export const Route = createFileRoute("/_protected/settings/shop/")({
  staticData: {
    title: "ตั้งค่าข้อมูลร้านค้า",
    showBackButton: false,
    className: "w-full max-w-2xl ",
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: shop, isLoading } = useGetShop();
  const navigate = useNavigate();

  if (isLoading) return <Skeleton className="h-64 w-full rounded-2xl" />;

  return (
    <div className="space-y-4 mx-auto">
      {shop && shop.length > 0 ? (
        shop.map((s) => (
          <div
            key={s.id}
            className="flex flex-col bg-white border-2 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* ส่วนเนื้อหาหลักด้านบน (รูปภาพ + ข้อมูลร้าน) */}
            <div className="flex flex-col sm:flex-row gap-5 p-5">
              {/* รูปโลโก้ */}
              <img
                src={s.logoUrl}
                alt={`โลโก้ ${s.name}`}
                className="h-28 w-28 shrink-0 rounded-xl object-cover border border-slate-100 mx-auto sm:mx-0 shadow-sm"
              />

              {/* ข้อมูลร้าน */}
              <div className="flex flex-col justify-center space-y-2 text-slate-700 w-full min-w-0">
                <h2 className="text-xl font-bold flex items-center text-slate-800">
                  <span className="font-semibold w-20 shrink-0 text-slate-500 text-sm">
                    ชื่อร้าน:
                  </span>
                  <span className="wrap-break-word">{s.name}</span>
                </h2>

                <p className="text-sm flex items-center text-slate-600">
                  <span className="font-semibold w-20 shrink-0 text-slate-500">
                    เบอร์ติดต่อ:
                  </span>
                  <span className="font-medium text-slate-800 wrap-break-word">
                    {s.phone}
                  </span>
                </p>

                <div className="text-sm flex items-start text-slate-600">
                  <span className="font-semibold w-20 shrink-0 text-slate-500 pt-0.5">
                    ที่อยู่:
                  </span>
                  <p className="font-medium text-slate-800 whitespace-pre-line leading-relaxed wrap-break-word min-w-0 flex-1">
                    {s.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50/50 border-t border-slate-100">
              <Button
                onClick={() =>
                  navigate({
                    to: "/settings/shop/$shopId",
                    params: { shopId: String(s.id) },
                  })
                }
                variant="outline"
                className="w-full gap-2 text-slate-700 border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 font-semibold"
              >
                <Store className="h-4 w-4" />
                จัดการร้าน
              </Button>

              <Button
                onClick={() =>
                  navigate({
                    to: "/settings/shop/$shopId/edit-shop",
                    params: {
                      shopId: String(s.id),
                    },
                  })
                }
                variant="outline"
                className="w-full gap-2 text-amber-700 border-amber-200 bg-amber-50/50 hover:bg-amber-100 hover:text-amber-800 hover:border-amber-300 font-semibold"
              >
                <SquarePen className="h-4 w-4" />
                แก้ไข
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-500 mb-4">ยังไม่มีข้อมูลร้านค้า</p>
          <Link to="/settings/shop/add-shop">
            <Button>เพิ่มร้านค้า</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
