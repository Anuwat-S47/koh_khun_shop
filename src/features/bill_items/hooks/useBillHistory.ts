import { useQuery } from "@tanstack/react-query";
import { billHistoryService } from "../service/bill_history.service";

export const useBillHistory = (shopId?: number | null) => {
  const query = useQuery({
    queryKey: ["bill-history", shopId],

    queryFn: () => {
      if (shopId == null || shopId <= 0) {
        throw new Error("ไม่พบ Shop ID");
      }

      return billHistoryService.getByShopId(shopId);
    },

    enabled: shopId != null && shopId > 0,

    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  return {
    bills: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
