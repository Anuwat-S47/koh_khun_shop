import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "@/components/FormField";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";

import { ShopType } from "../types/shop_type";
import { updateShopSchema } from "../schemas/shop-schemas";
import { useUpdateShop } from "../hooks/useShop";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  shop: ShopType;
}

export default function EditShopForm({ shop }: Props) {
  const { mutateAsync: updateShop, isPending } = useUpdateShop();
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string | null>(shop.logoUrl);

  const form = useForm({
    defaultValues: {
      name: shop.name,
      logoUrl: null as File | null,
      address: shop.address,
      phone: shop.phone,
    },

    validators: {
      onSubmit: updateShopSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const res = await updateShop({
          oldLogoUrl: shop.logoUrl,
          data: {
            id: shop.id,
            name: value.name,
            address: value.address,
            phone: value.phone,
            logoUrl: value.logoUrl,
          },
        });

        await Swal.fire({
          icon: "success",
          title: res.message,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate({
          to: "/settings/shop",
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "แก้ไขร้านไม่สำเร็จ",
          text: error.message ?? "เกิดข้อผิดพลาด",
        });
      }
    },
  });

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <form.Field name="logoUrl">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel htmlFor={field.name}>โลโก้ร้าน</FieldLabel>

                        {previewUrl && (
                          <div className="flex justify-center my-3">
                            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs group">
                              <img
                                src={previewUrl}
                                alt="Logo Preview"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          </div>
                        )}

                        <Input
                          id={field.name}
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (!file) return;

                            field.handleChange(file);

                            if (previewUrl?.startsWith("blob:")) {
                              URL.revokeObjectURL(previewUrl);
                            }

                            setPreviewUrl(URL.createObjectURL(file));
                          }}
                          aria-invalid={hasError}
                        />
                      </>
                    )}
                  </FormField>
                )}
              </form.Field>

              <form.Field name="name">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel>ชื่อร้าน</FieldLabel>

                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={hasError}
                        />
                      </>
                    )}
                  </FormField>
                )}
              </form.Field>

              <form.Field name="address">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel>ที่อยู่ร้าน</FieldLabel>

                        <InputGroup>
                          <InputGroupTextarea
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={hasError}
                          />
                        </InputGroup>
                      </>
                    )}
                  </FormField>
                )}
              </form.Field>

              <form.Field name="phone">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel>เบอร์โทร</FieldLabel>

                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={hasError}
                        />
                      </>
                    )}
                  </FormField>
                )}
              </form.Field>
            </FieldGroup>

            <form.Subscribe selector={(state) => state.canSubmit}>
              {(canSubmit) => (
                <div className="mt-6 flex justify-end">
                  <Button type="submit" disabled={!canSubmit || isPending}>
                    {isPending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
                  </Button>
                </div>
              )}
            </form.Subscribe>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
