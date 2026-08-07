import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useCreateShop } from "@/features/shop/hooks/useShop";
import { createShopSchema } from "@/features/shop/schemas/shop-schemas";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const Route = createFileRoute("/_protected/settings/shop/add-shop")({
  staticData: {
    title: "เพิ่มร้านค้า",
    showBackButton: true,
    className: "w-full max-w-2xl border-2 p-4 rounded-2xl",
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: createShop, isPending } = useCreateShop();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const form = useForm({
    defaultValues: {
      name: {
        th: "",
        la: "",
      },
      logoUrl: undefined as File | undefined,
      address: {
        th: "",
        la: "",
      },
      phone: "",
    },
    validators: {
      onSubmit: createShopSchema,
    },
    onSubmit: async ({ value }) => {
      if (!value.logoUrl) {
        return;
      }

      try {
        const resData = await createShop({
          name: {
            th: value.name.th,
            la: value.name.la,
          },
          logoUrl: value.logoUrl,
          address: {
            th: value.address.th,
            la: value.address.la,
          },
          phone: value.phone,
        });

        await Swal.fire({
          icon: "success",
          title: resData.message,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate({
          to: "/settings/shop",
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "เพิ่มร้านไม่สำเร็จ",
          text: error.response?.data?.message ?? "เกิดข้อพิดพาดในการเพิ่มร้าน",
        });
      }
    },
  });
  return (
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
                        name={field.name}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (!file) return;

                          field.handleChange(file);
                          const url = URL.createObjectURL(file);
                          setPreviewUrl(url);
                        }}
                        aria-invalid={hasError}
                      />
                    </>
                  )}
                </FormField>
              )}
            </form.Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <form.Field name="name.th">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel htmlFor={field.name}>
                          ชื่อร้าน (ไทย)
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="เช่น: ร้านส้มตํา, ก๋วยเตี๋ยว"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={hasError}
                        />
                      </>
                    )}
                  </FormField>
                )}
              </form.Field>

              <form.Field name="name.la">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel htmlFor={field.name}>
                          ชื่อร้าน (ພາສາລາວ)
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="ເຊັ່ນ: ร้านส้มตํา, ก๋วยเตี๋ยว"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={hasError}
                        />
                      </>
                    )}
                  </FormField>
                )}
              </form.Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <form.Field name="address.th">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel htmlFor={field.name}>
                          ที่อยู่ร้าน (ไทย)
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id={field.name}
                            name={field.name}
                            placeholder="เช่น 123 หมู่ 4 ต.บ้านใหม่"
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

              <form.Field name="address.la">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel htmlFor={field.name}>
                          ที่อยู่ร้าน (ພາສາລາວ)
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id={field.name}
                            name={field.name}
                            placeholder="ເຊັ່ນ: 123 ໝູ່ 4, ບ້ານ ໃໝ່"
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
            </div>

            <form.Field name="phone">
              {(field) => (
                <FormField field={field}>
                  {(hasError) => (
                    <>
                      <FieldLabel htmlFor={field.name}>
                        เบอร์โทรติดต่อ
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="เช่น 099*******"
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
              <Button type="submit" disabled={!canSubmit || isPending}>
                {isPending ? "บันทึก...." : "เพิ่มร้าน"}
              </Button>
            )}
          </form.Subscribe>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
