import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateShop,
  GetShop,
  GetShopById,
  UpdateShop,
} from "../service/shop-manage-api";
import { queryClient } from "@/lib/query-client";
import {
  CreateShopWithImgPayload,
  UpdateShopWithImgPayload,
} from "../types/shop_manage_type";
import { RemoveImg, UploadImg } from "@/features/upload-img/service/upload-img-api";

export const shopKeys = {
  all: ["shop"] as const,
  detail: (id: number) => ["shop", id] as const,
};

export function useCreateShop() {
  return useMutation({
    mutationFn: async (data: CreateShopWithImgPayload) => {
      const logoUrl = await UploadImg(data.logoUrl, "shop");

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
          await RemoveImg(oldLogoUrl);
        }
        logoUrl = await UploadImg(data.logoUrl, "shop");
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
