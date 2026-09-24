import { useQuery } from "@tanstack/react-query";

import { GetFoods } from "../service/pos.service.api";
import { Product } from "../types/categoryId";

export function useGetFoods() {
  return useQuery<Product[], Error>({
    queryKey: ["foods"],
    queryFn: GetFoods,
    staleTime: 1000 * 60 * 5,
  });
}
