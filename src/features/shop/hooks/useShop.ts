import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateShop,
  GetShop,
  GetShopById,
  RemoveShopImg,
  UpdateShop,
  UploadShopImg,
} from "../service/shop-api";
import { queryClient } from "@/lib/query-client";
import {
  CreateShopWithImgPayload,
  UpdateShopWithImgPayload,
} from "../types/shop_type";

export const shopKeys = {
  all: ["shop"] as const,
  detail: (id: number) => ["shop", id] as const,
};

export function useCreateShop() {
  return useMutation({
    mutationFn: async (data: CreateShopWithImgPayload) => {
      const logoUrl = await UploadShopImg(data.logoUrl);

      return await CreateShop({
        name: data.name,
        address: data.address,
        phone: data.phone,
        logoUrl,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: shopKeys.all,
      });
    },
  });
}

export function useUpdateShop() {
  return useMutation({
    mutationFn: async ({
      oldLogoUrl,
      data,
    }: {
      oldLogoUrl: string;
      data: UpdateShopWithImgPayload;
    }) => {
      let logoUrl = oldLogoUrl;

      if (data.logoUrl && data.logoUrl instanceof File) {
        if (oldLogoUrl) {
          await RemoveShopImg(oldLogoUrl);
        }
        logoUrl = await UploadShopImg(data.logoUrl);
      }

      return await UpdateShop(data.id, {
        id: data.id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        logoUrl,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: shopKeys.all,
      });
    },
  });
}

export function useGetShop() {
  return useQuery({
    queryKey: shopKeys.all,
    queryFn: GetShop,
  });
}

export function useGetShopById(id: number) {
  return useQuery({
    queryKey: shopKeys.detail(id),
    queryFn: () => GetShopById(id),
    enabled: !!id,
  });
}
