import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateShopTable,
  DeleteShopTable,
  GetShopTable,
  UpdateShopTable,
} from "../service/shop-table-manage-api";
import { queryClient } from "@/lib/query-client";
import {
  CreateShopTablePayload,
  UpdateShopTablePayload,
} from "../types/shop_table_manage_type";

export function useGetShopTables(shopId: number) {
  return useQuery({
    queryKey: ["shop-tables", shopId],
    queryFn: () => GetShopTable(shopId),
    enabled: !!shopId,
  });
}

export function useCreateShopTable(shopId: number) {
  return useMutation({
    mutationFn: async (data: CreateShopTablePayload) => {
      return await CreateShopTable({
        name: data.name,
        shopId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop-tables", shopId],
      });
    },
  });
}

export function useUpdateShopTable(shopId: number) {
  return useMutation({
    mutationFn: async (data: UpdateShopTablePayload) => {
      return UpdateShopTable(data.id, {
        id: data.id,
        name: data.name,
        shopId,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop-tables", shopId],
      });
    },
  });
}

export function useDeleteShopTable(shopId: number) {
  return useMutation({
    mutationFn: (id: number) => DeleteShopTable(id, shopId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop-tables", shopId],
      });
    },
  });
}
