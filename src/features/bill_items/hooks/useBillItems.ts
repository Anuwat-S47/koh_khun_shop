import { useQuery } from "@tanstack/react-query";
import { billItemService } from "../service/bill_item.service";

export function useBillItems(billId?: number) {
  const query = useQuery({
    queryKey: ["bill-items", billId],
    queryFn: () => billItemService.getByBillId(billId!),
    enabled: billId !== undefined,
  });

  return {
    ...query,
    items: query.data ?? [],
  };
}
