import { useQuery } from "@tanstack/react-query";
import { GetFoodTypes } from "../service/food-type-manage-api";

export function useGetFoodTypes(shopId: number) {
  return useQuery({
    queryKey: ["food-types", shopId],
    queryFn: () => GetFoodTypes(shopId),
    enabled: !!shopId,
  });
}
