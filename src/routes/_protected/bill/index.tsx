import { createFileRoute } from "@tanstack/react-router";
import { useState, Fragment } from "react";
import { Printer, ChevronDown, ChevronUp, Receipt, Store } from "lucide-react";

import { useGetShop } from "@/features/shop-manage/hooks/useShopManage";
import { useBillHistory } from "@/features/bill_items/hooks/useBillHistory";
import { Bill } from "@/features/bill_items/types/bill_item.type";
import { BillDetail } from "@/features/bill_items/components/BillDetail";

export const Route = createFileRoute("/_protected/bill/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [expandedBill, setExpandedBill] = useState<number | null>(null);

  // 1. ดึงร้านค้าทั้งหมดโดยตรง
  const {
    data: shops,
    isLoading: isShopLoading,
    error: shopError,
  } = useGetShop();

  // 2. กำหนดร้านที่เลือก
  const shopList = shops ?? [];

  const activeShopId = selectedShopId ?? shopList[0]?.id ?? null;

  // 3. ดึงบิลเฉพาะร้านที่เลือก
  const {
    bills,
    isLoading: isBillLoading,
    error: billError,
  } = useBillHistory(activeShopId);

  // จัดรูปแบบเงิน
  const formatMoney = (value: number | string | null | undefined) => {
    return Number(value ?? 0).toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // จัดรูปแบบวันที่
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("th-TH");
  };

  // Loading ร้านค้า
  if (isShopLoading) {
    return <div className="p-6 text-gray-500">กำลังโหลดข้อมูลร้านค้า...</div>;
  }

  // Error ร้านค้า
  if (shopError) {
    return (
      <div className="p-6 text-red-500">
        โหลดข้อมูลร้านค้าไม่สำเร็จ: {shopError.message}
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="h-7 w-7 text-amber-600" />

            <h1 className="text-2xl font-bold">
              ประวัติบิล และออกใบเสร็จรับเงิน
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            เลือกร้านค้าเพื่อดูประวัติบิลและพิมพ์ใบเสร็จ
          </p>
        </div>

        {/* เลือกร้านค้า */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Store className="h-5 w-5 text-amber-600" />

            <h2 className="font-semibold text-gray-800">เลือกร้านค้า</h2>

            <span className="ml-auto text-xs text-gray-400">
              ทั้งหมด {shopList.length} ร้าน
            </span>
          </div>

          {shopList.length === 0 ? (
            <p className="py-4 text-center text-gray-400">ไม่พบข้อมูลร้านค้า</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {shopList.map((shop) => {
                const isActive = activeShopId === shop.id;

                return (
                  <button
                    key={shop.id}
                    type="button"
                    onClick={() => {
                      setSelectedShopId(shop.id);
                      setExpandedBill(null);
                    }}
                    className={`min-w-36 rounded-lg border px-5 py-3 text-left transition-all ${
                      isActive
                        ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-amber-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4" />

                      <span className="font-medium">{shop.name}</span>
                    </div>

                    <span className="mt-1 block text-xs opacity-70">
                      Shop ID: {shop.id}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* เนื้อหาประวัติบิล */}
        {activeShopId !== null && (
          <>
            {/* จำนวนบิล */}
            <div className="rounded-lg border bg-white p-4">
              <p className="text-sm text-gray-500">
                จำนวนบิลทั้งหมดของร้านที่เลือก
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {isBillLoading ? "กำลังโหลด..." : `${bills.length} บิล`}
              </p>

              <p className="mt-1 text-xs text-amber-600">
                Shop ID: {activeShopId}
              </p>
            </div>

            {/* Loading */}
            {isBillLoading && (
              <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
                กำลังโหลดประวัติบิล...
              </div>
            )}

            {/* Error */}
            {billError && (
              <div className="rounded-lg border bg-white p-6 text-red-500">
                ไม่สามารถโหลดประวัติบิลได้: {billError.message}
              </div>
            )}

            {/* ตารางบิล */}
            {!isBillLoading && !billError && (
              <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                {bills.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50 text-gray-600">
                          <th className="p-4">เลขที่บิล</th>
                          <th className="p-4">โต๊ะอาหาร</th>
                          <th className="p-4">เวลาทำรายการ</th>
                          <th className="p-4">ยอดรวม</th>
                          <th className="p-4">ส่วนลด</th>
                          <th className="p-4">ยอดสุทธิ</th>
                          <th className="p-4">สถานะบิล</th>
                          <th className="p-4 text-center">จัดการ</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {bills.map((bill: Bill) => (
                          <Fragment key={bill.id}>
                            <tr className="transition-colors hover:bg-gray-50">
                              <td className="p-4 font-semibold text-gray-900">
                                BILL-{bill.id}
                              </td>

                              <td className="p-4">
                                <span className="rounded bg-gray-100 px-2.5 py-1 text-xs">
                                  {bill.table_id ?? "-"}
                                </span>
                              </td>

                              <td className="whitespace-nowrap p-4 text-gray-600">
                                {formatDate(bill.created_at)}
                              </td>

                              <td className="whitespace-nowrap p-4">
                                {formatMoney(bill.subtotal)} ฿
                              </td>

                              <td className="whitespace-nowrap p-4 text-red-500">
                                -{formatMoney(bill.discount)} ฿
                              </td>

                              <td className="whitespace-nowrap p-4 font-semibold text-amber-600">
                                {formatMoney(bill.total)} ฿
                              </td>

                              <td className="p-4">
                                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-600">
                                  {bill.bill_status ?? "-"}
                                </span>
                              </td>

                              <td className="p-4">
                                <div className="flex items-center justify-center gap-2">
                                  {/* รายละเอียด */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedBill(
                                        expandedBill === bill.id
                                          ? null
                                          : bill.id,
                                      )
                                    }
                                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50"
                                  >
                                    {expandedBill === bill.id ? (
                                      <>
                                        <ChevronUp className="h-3.5 w-3.5" />
                                        ซ่อน
                                      </>
                                    ) : (
                                      <>
                                        <ChevronDown className="h-3.5 w-3.5" />
                                        รายละเอียด
                                      </>
                                    )}
                                  </button>

                                  {/* พิมพ์ */}
                                  <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50"
                                  >
                                    <Printer className="h-3.5 w-3.5 text-amber-600" />
                                    พิมพ์
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* รายละเอียดรายการอาหาร */}
                            {expandedBill === bill.id && (
                              <tr>
                                <td colSpan={8} className="bg-gray-50 p-4">
                                  <BillDetail bill={bill} />
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  /* ไม่มีบิล */
                  <div className="py-12 text-center text-gray-400">
                    <Receipt className="mx-auto mb-3 h-12 w-12" />

                    <p className="font-medium">ยังไม่มีประวัติบิลของร้านนี้</p>

                    <p className="mt-1 text-sm">ร้านนี้ยังไม่มีรายการขาย</p>

                    <p className="mt-2 text-xs text-amber-600">
                      Shop ID: {activeShopId}
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
