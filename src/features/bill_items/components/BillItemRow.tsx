import { BillItem } from "../types/bill_item.type";

interface Props {
  item: BillItem;
}

export function BillItemRow({ item }: Props) {
  const price = Number(item.price ?? 0);
  const quantity = Number(item.quantity ?? 0);
  const subtotal = Number(item.subtotal ?? price * quantity);

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-900">{item.product_name}</p>

        <p className="text-xs text-gray-400">
          {quantity} × {price.toFixed(2)} ฿
        </p>
      </div>

      <div className="whitespace-nowrap font-semibold text-amber-600">
        {subtotal.toFixed(2)} ฿
      </div>
    </div>
  );
}
