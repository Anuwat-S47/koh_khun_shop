import { BillItem } from "../types/bill_item.type";

interface Props {
  item: BillItem;
}

export function BillItemRow({ item }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3">
      <div className="flex-1">
        <p className="font-medium text-gray-900">
          {item.food_name}
        </p>

        <p className="text-xs text-gray-400">
          {item.price.toFixed(2)} ฿ × {item.quantity}
        </p>
      </div>

      <div className="font-semibold text-amber-600">
        {item.total.toFixed(2)} ฿
      </div>
    </div>
  );
}