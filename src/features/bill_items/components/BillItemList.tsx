import { BillItem } from "../types/bill_item.type";
import { BillItemRow } from "./BillItemRow";

interface Props {
  items: BillItem[];
}

export function BillItemList({ items }: Props) {
  if (!items || items.length === 0) {
    return <p className="py-4 text-center text-gray-400">ไม่พบรายการอาหาร</p>;
  }

  return (
    <div className="divide-y divide-gray-100">
      {items.map((item) => (
        <BillItemRow key={item.id} item={item} />
      ))}
    </div>
  );
}
