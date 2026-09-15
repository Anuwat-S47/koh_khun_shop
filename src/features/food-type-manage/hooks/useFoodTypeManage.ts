import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateFoodType,
  DeleteFoodType,
  GetFoodTypes,
  UpdateFoodType,
} from "../service/food-type-manage-api";
import {
  CreateFoodTypePayload,
  UpdateFoodTypePayload,
} from "../types/food_type_manage_type";
import { queryClient } from "@/lib/query-client";

export function useGetFoodTypes(shopId: number) {
  return useQuery({
    queryKey: ["food-types", shopId],
    queryFn: () => GetFoodTypes(shopId),
    enabled: !!shopId,
  });
}

export function useCreateFoodType(shopId: number) {
  return useMutation({
    mutationFn: async (data: CreateFoodTypePayload) => {
      return await CreateFoodType({
        name: data.name,
        shopId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["food-types", shopId],
      });
    },
  });
}

export function useUpdateFoodType(shopId: number) {
  return useMutation({
    mutationFn: async (data: UpdateFoodTypePayload) => {
      return await UpdateFoodType(data.id, {
        id: data.id,
        name: data.name,
        shopId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["food-types", shopId],
      });
    },
  });
}

export function useDeleteFoodType(shopId: number) {
  return useMutation({
    mutationFn: (id: number) => {
      return DeleteFoodType(id, shopId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["food-types", shopId],
      });
    },
  });
}
