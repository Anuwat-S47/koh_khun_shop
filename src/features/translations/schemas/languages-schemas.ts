import z from "zod";

export const createMultiLangSchema = (t: (key: string) => string) =>
  z.object({
    th: z.string().min(1, t("validation.required")),
    lo: z.string(),
  });