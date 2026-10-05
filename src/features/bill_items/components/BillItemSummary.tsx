import { BillItem } from "../types/bill_item.type";

interface Props {
  items: BillItem[];
}

export function BillItemSummary({ items }: Props) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total = items.reduce(
    (sum, item) => sum + item.total,
    0,
  );

  return (
    <div className="space-y-2 border-t border-gray-200 pt-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">
          ยอดรวม
        </span>

        <span className="font-medium">
          {subtotal.toFixed(2)} ฿
        </span>
      </div>

      <div className="flex justify-between text-base font-bold">
        <span>ยอดสุทธิ</span>

        <span className="text-amber-600">
          {total.toFixed(2)} ฿
        </span>
      </div>
    </div>
  );
}