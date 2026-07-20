import z from "zod";

export const loginSchemas = z.object({
  email: z.string().email("รูปแบบอิเมลไม่ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านอย่างน้อยต้องมี 6 ตัวอักษร"),
});

export type LoginRequest = z.infer<typeof loginSchemas>;
