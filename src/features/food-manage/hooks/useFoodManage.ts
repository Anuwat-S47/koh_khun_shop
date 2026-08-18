import { useQuery } from "@tanstack/react-query";
import { GetFoods } from "../service/food-manage-api";

export function useGetFoods(shopId: number) {
  return useQuery({
    queryKey: ["food", shopId],
    queryFn: () => GetFoods(shopId),
    enabled: !!shopId,
  });
}
