import z from "zod";

export const shopTableSchema = (t: (key: string) => string) => {
  return z.object({
    name: z.string().min(1, t("validation.nameRequired")),
  });
};

export type CreateShopTableRequest = z.infer<
  ReturnType<typeof shopTableSchema>
>;
