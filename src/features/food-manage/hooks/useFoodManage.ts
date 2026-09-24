import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateFood,
  DeleteFood,
  GetFoodById,
  GetFoods,
  UpdateFood,
} from "../service/food-manage-api";
import {
  CreateFoodPayload,
  UpdateFoodPayload,
} from "../types/food_manage_type";
import {
  RemoveImg,
  UploadImg,
} from "@/features/upload-img/service/upload-img-api";
import { queryClient } from "@/lib/query-client";

export const useGetFoods = (
  shopId: number,
  page: number,
  pageSize: number,
  search: string,
) => {
  return useQuery({
    queryKey: ["foods", shopId, page, pageSize, search],
    queryFn: () => GetFoods(shopId, page, pageSize, search),

    enabled: !!shopId,
  });
};

export const useGetFoodById = (id: number, shopId: number) => {
  return useQuery({
    queryKey: ["food", id, shopId],
    queryFn: () => GetFoodById(id, shopId),
    enabled: !!id && !!shopId,
  });
};

export const useCreateFood = () => {
  return useMutation({
    mutationFn: async (data: CreateFoodPayload) => {
      let imgFoodUrl: string | null = null;

      if (data.imgUrl instanceof File) {
        imgFoodUrl = await UploadImg(data.imgUrl, "food");
      }

      return await CreateFood({
        shopId: data.shopId,
        typeId: data.typeId,
        name: data.name,
        price: data.price,
        imgUrl: imgFoodUrl,
      });
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["foods", variables.shopId],
      });
    },
  });
};

export const useUpdateFood = () => {
  return useMutation({
    mutationFn: async ({
      oldImgUrl,
      data,
    }: {
      oldImgUrl: string | null;
      data: UpdateFoodPayload;
    }) => {
      let imgUrl: string | null = oldImgUrl;

      if (data.imgUrl && data.imgUrl instanceof File) {
        if (oldImgUrl) {
          await RemoveImg(oldImgUrl);
        }

        imgUrl = await UploadImg(data.imgUrl, "food");
      }

      return await UpdateFood(data.id, {
        id: data.id,
        shopId: data.shopId,
        name: data.name,
        price: data.price,
        typeId: data.typeId,
        imgUrl: imgUrl,
      });
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["foods", variables.data.shopId],
      });

      queryClient.invalidateQueries({
        queryKey: ["food", variables.data.id, variables.data.shopId],
      });
    },
  });
};

export const useDeleteFood = () => {
  return useMutation({
    mutationFn: ({ id, shopId }: { id: number; shopId: number }) =>
      DeleteFood(id, shopId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["foods", variables.shopId],
      });
    },
  });
};
