import z from "zod";

export const loginSchemas = z.object({
  email: z.string().min(1, "กรุณากรอกอิเมล"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

export type LoginRequest = z.infer<typeof loginSchemas>;
