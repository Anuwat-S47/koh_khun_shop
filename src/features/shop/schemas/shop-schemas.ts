import z from "zod";

export const shopSchemas = z.object({
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อร้าน")
    .max(100, "ชื่อร้านต้องไม่เกิน 100 ตัวอักษร"),

  address: z.string().min(1, "กรุณากรอกที่อยู่ร้าน"),

  phone: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .regex(/^[0-9]{9,10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 9-10 หลัก"),

  logoUrl: z
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
    ),

});

export type CteateShopFprm = z.infer<typeof shopSchemas>;
