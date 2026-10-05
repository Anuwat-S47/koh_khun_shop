import { BillItem } from "../types/bill_item.type";
import { BillItemRow } from "./BillItemRow";

interface Props {
  items: BillItem[];
}

export function BillItemList({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-gray-400">
        ไม่มีรายการอาหารในบิล
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {items.map((item) => (
        <BillItemRow
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}