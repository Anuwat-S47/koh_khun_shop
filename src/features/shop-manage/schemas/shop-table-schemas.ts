import { createMultiLangSchema } from "@/features/translations/schemas/languages-schemas";
import z from "zod";

export const shopTableSchema = (t: (key: string) => string) => {
  const multiLangSchema = createMultiLangSchema(t);
  return z.object({
    name: multiLangSchema,
  });
}

export type CreateShopTableRequest = z.infer<ReturnType<typeof shopTableSchema>>;