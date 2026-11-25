import { Bill } from "../types/bill_item.type";
import { BillItem } from "../types/bill_item.type";
import { BillItemList } from "./BillItemList";

interface Props {
  bill: Bill;
  items: BillItem[];
}

export function BillItemSummary({ bill, items }: Props) {
  const subtotal = Number(bill.subtotal ?? 0);
  const discount = Number(bill.discount ?? 0);
  const total = Number(bill.total ?? subtotal - discount);

  return (
    <div className="space-y-4 rounded-lg border bg-white p-4">
      {/* รายการอาหาร */}
      <div>
        <h4 className="mb-3 font-semibold text-gray-800">
          รายการอาหารทั้งหมด ({items.length} รายการ)
        </h4>

        <BillItemList items={items} />
      </div>

      {/* สรุปยอด */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">ยอดรวมอาหาร</span>
          <span>{subtotal.toFixed(2)} ฿</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">ส่วนลด</span>
          <span className="text-red-500">-{discount.toFixed(2)} ฿</span>
        </div>

        <div className="flex justify-between border-t pt-3 font-bold">
          <span>ยอดสุทธิ</span>
          <span className="text-amber-600">{total.toFixed(2)} ฿</span>
        </div>
      </div>
    </div>
  );
}
