import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useCreateShop } from "@/features/shop-manage/hooks/useShopManage";
import { createShopSchema } from "@/features/shop-manage/schemas/shop-schemas";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const Route = createFileRoute("/_protected/settings/shop-manage/add-shop")({
  staticData: {
    title: "shop.addShop",
    showBackButton: true,
    className: "w-full max-w-2xl border-2 p-4 rounded-2xl",
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: createShop, isPending } = useCreateShop();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        lo: "",
      },
      logoUrl: undefined as File | undefined,
      address: {
        th: "",
        lo: "",
      },
      phone: "",
    },
    validators: {
      onSubmit: createShopSchema(t),
    },
    onSubmit: async ({ value }) => {
      if (!value.logoUrl) {
        return;
      }

      try {
        await createShop({
          name: {
            th: value.name.th,
            lo: value.name.lo,
          },
          logoUrl: value.logoUrl,
          address: {
            th: value.address.th,
            lo: value.address.lo,
          },
          phone: value.phone,
        });

        await Swal.fire({
          icon: "success",
          title: t("shop.createSuccess"),
          timer: 1500,
          showConfirmButton: false,
        });
        navigate({
          to: "/settings/shop",
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: t("shop.createFailed"),
          text: error.response?.data?.message ?? t("common.somethingWentWrong"),
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
                      <FieldLabel htmlFor={field.name}>
                        {t.shop.logo}
                      </FieldLabel>

                      {previewUrl && (
                        <div className="flex justify-center my-3">
                          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs group">
                            <img
                              src={previewUrl}
                              alt={t.shop.logo}
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

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
              <form.Field name="name.th">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel htmlFor={field.name}>
                          {t.shop.name} (ภาษาไทย)
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder={t("shop.namePlaceholderTh")}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={hasError}
                        />
                      </>
                    )}
                  </FormField>
                )}
              </form.Field>

              {/* <form.Field name="name.lo">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel htmlFor={field.name}>
                          {t.shop.name} (ພາສາລາວ)
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder={t("shop.namePlaceholderLo")}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={hasError}
                        />
                      </>
                    )}
                  </FormField>
                )}
              </form.Field> */}
            {/* </div> */}

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
              <form.Field name="address.th">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel htmlFor={field.name}>
                          {t.shop.address} (ภาษาไทย)
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id={field.name}
                            name={field.name}
                            placeholder={t("shop.addressPlaceholderTh")}
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

              {/* <form.Field name="address.lo">
                {(field) => (
                  <FormField field={field}>
                    {(hasError) => (
                      <>
                        <FieldLabel htmlFor={field.name}>
                          {t.shop.address} (ພາສາລາວ)
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id={field.name}
                            name={field.name}
                            placeholder={t("shop.addressPlaceholderLo")}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={hasError}
                          />
                        </InputGroup>
                      </>
                    )}
                  </FormField>
                )}
              </form.Field> */}
            {/* </div> */}

            <form.Field name="phone">
              {(field) => (
                <FormField field={field}>
                  {(hasError) => (
                    <>
                      <FieldLabel htmlFor={field.name}>
                        {t.shop.phone}
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder={t("shop.phonePlaceholder")}
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
                {isPending ? t.common.saving : t.shop.addShop}
              </Button>
            )}
          </form.Subscribe>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
