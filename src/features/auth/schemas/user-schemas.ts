import z from "zod";

export const loginSchemas = (t: (key: string) => string) =>
  z.object({
    email: z.string().min(1, t("validation.emailRequired")),

    password: z.string().min(1, t("validation.passwordRequired")),
  });

export type LoginRequest = z.infer<typeof loginSchemas>;
