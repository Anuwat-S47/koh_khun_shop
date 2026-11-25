import { Bill } from "../types/bill_item.type";
import { BillItemSummary } from "./BillItemSummary";
import { useBillItems } from "../hooks/useBillItems";

interface Props {
  bill: Bill;
}

export function BillDetail({ bill }: Props) {
  const { items, isLoading, error } = useBillItems(bill.id);

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-6 text-center text-gray-500">
        กำลังโหลดรายละเอียดบิล...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 text-center text-red-500">
        ไม่สามารถโหลดรายการอาหารได้: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-semibold text-gray-700">
          รายละเอียดบิล BILL-{bill.id}
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          วันที่ทำรายการ: {new Date(bill.created_at).toLocaleString("th-TH")}
        </p>
      </div>

      <BillItemSummary bill={bill} items={items} />
    </div>
  );
}
