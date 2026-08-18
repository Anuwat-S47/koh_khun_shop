import { z } from "zod";

const createMultiLangSchema = (t: (key: string) => string) =>
  z.object({
    th: z.string().min(1, t("validation.thRequired")),
    lo: z.string(),
  });

const createBaseShopSchema = (t: (key: string) => string) => {
  const multiLangSchema = createMultiLangSchema(t);
  return z.object({
    name: multiLangSchema,
    address: multiLangSchema,
    phone: z
      .string()
      .min(1, t("validation.phoneRequired"))
      .regex(/^[0-9]{9,10}$/, t("validation.phoneInvalid")),
  });
};

const createLogoFileSchema = (t: (key: string) => string) =>
  z
    .instanceof(File, {
      message: t("validation.logoRequired"),
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      t("validation.logoType"),
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, t("validation.logoSize"));

export const createShopSchema = (t: (key: string) => string) => {
  return createBaseShopSchema(t).extend({ logoUrl: createLogoFileSchema(t) });
};

export const updateShopSchema = (t: (key: string) => string) => {
  return createBaseShopSchema(t).extend({
    logoUrl: createLogoFileSchema(t).nullable(),
  });
};

export type CreateShopRequest = z.infer<ReturnType<typeof createShopSchema>>;
export type UpdateShopRequest = z.infer<ReturnType<typeof updateShopSchema>>;
