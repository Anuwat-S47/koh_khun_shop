import { z } from "zod";

const multiLangSchema = z.object({
  th: z.string().min(1, "กรุณากรอกภาษาไทย"),
  la: z.string(),
});

const baseShopSchema = z.object({
  name: multiLangSchema,
  address: multiLangSchema,
  phone: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .regex(/^[0-9]{9,10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 9-10 หลัก"),
});

const logoFileSchema = z
  .instanceof(File, {
    message: "กรุณาเลือกรูปโลโก้",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "รองรับเฉพาะ JPG, PNG และ WebP",
  )
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "รูปภาพต้องมีขนาดไม่เกิน 5MB",
  );

export const createShopSchema = baseShopSchema.extend({
  logoUrl: logoFileSchema,
});

export const updateShopSchema = baseShopSchema.extend({
  logoUrl: logoFileSchema.nullable(),
});
