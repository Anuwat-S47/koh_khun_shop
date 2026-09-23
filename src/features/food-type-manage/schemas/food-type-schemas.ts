import { createMultiLangSchema } from "@/features/translations/schemas/languages-schemas";
import z from "zod";

export const foodTypeSchema = (t: (key: string) => string) => {
  const multiLangSchema = createMultiLangSchema(t);
  return z.object({
    name: multiLangSchema,
  });
};

export type CreateFoodTypeRequest = z.infer<ReturnType<typeof foodTypeSchema>>; 