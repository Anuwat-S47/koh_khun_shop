import z from "zod";

export const updateFoodSchema = (t: any) =>
  z.object({
    id: z.number(),
    shopId: z.number(),

    name: z.string().min(1, t("validation.nameRequired")),

    price: z.number().gt(0, t("validation.priceMinZero")),

    typeId: z.number().gt(0, t("validation.typeRequired")),

    imgUrl: z.instanceof(File).optional(),
  });

const createBasefoodSchema = (t: (key: string) => string) => {
  return z.object({
    shopId: z.number(),
    name: z.string().min(1, t("validation.nameRequired")),
    price: z.number().gt(0, t("validation.priceMinZero")),
    typeId: z.number().min(1, t("validation.typeRequired")),
  });
};

const createImgFileSchema = (t: (key: string) => string) =>
  z
    .instanceof(File)
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      t("validation.imgType"),
    )
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      t("validation.imgSize"),
    )
    .optional();

export const createFoodSchema = (t: (key: string) => string) => {
  return createBasefoodSchema(t).extend({ imgUrl: createImgFileSchema(t) });
};

export type CreateFoodRequest = z.infer<ReturnType<typeof createFoodSchema>>;
