import z from "zod";

export const foodTypeSchema = (t: (key: string) => string) => {
  return z.object({
    name: z.string().min(1, t("validation.nameRequired")),
  });
};

export type CreateFoodTypeRequest = z.infer<ReturnType<typeof foodTypeSchema>>;
