import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateShop, GetShop, UploadShopImg } from "../service/shop-api";
import { queryClient } from "@/lib/query-client";
import { CreateShopWithImgPayload } from "../types/shop_type";

export function useCreateShop() {
  return useMutation({
    mutationFn: async (data: CreateShopWithImgPayload) => {
      const logoUrl = await UploadShopImg(data.img);

      return await CreateShop({
        name: data.name,
        address: data.address,
        phone: data.phone,
        createBy: data.createBy,
        logoUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop"] });
    },
  });
}

export function useGetShop() {
    return useQuery({
        queryKey: ["shop"],
        queryFn: GetShop
    })
}