import { useQuery } from "@tanstack/react-query";

import { GetFoodTypes } from "../service/pos.service.api";

export function useFoodTypes() {
  return useQuery({
    queryKey: ["food-types"],
    queryFn: GetFoodTypes,
  });
}