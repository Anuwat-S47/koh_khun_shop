import { useQuery } from "@tanstack/react-query";
import { billItemService } from "../service/bill_item.service";

export const useBillItems = (billId?: number) => {
  const query = useQuery({
    queryKey: ["bill-items", billId],

    queryFn: () => billItemService.getByBillId(billId!),

    enabled: billId != null,
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};