import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "@tanstack/react-form";
import { useCreateShopTable } from "../../hooks/useShopTableManage";
import {
  CreateShopTableRequest,
  shopTableSchema,
} from "../../schemas/shop-table-schemas";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import Swal from "sweetalert2";
import { ShopTableCreateDialogProps } from "../../types/shop_table_manage_type";

export function ShopTableCreateDialog({
  shopId,
  open,
  onOpenChange,
}: ShopTableCreateDialogProps) {
  const { mutateAsync: createShopTable, isPending } =
    useCreateShopTable(shopId);
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      name: "",
    } satisfies CreateShopTableRequest,

    validators: {
      onSubmit: shopTableSchema(t),
    },

    onSubmit: async ({ value }) => {
      try {
        await createShopTable({
          name: value.name,
          shopId,
        });

        form.reset();
        onOpenChange(false);

        await Swal.fire({
          icon: "success",
          title: t.common.success,
          text: t.table.addSuccess,
          confirmButtonText: t.common.ok,
        });
      } catch (error) {
        console.error("Create shop table error:", error);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.table.add}</DialogTitle>

          <DialogDescription>{t.table.description}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* TH */}

          <form.Field
            name="name"
            children={(field) => {
              const error = field.state.meta.errors[0];

              return (
                <div className="space-y-2">
                  <Label htmlFor="table-name">{t.table.name}</Label>

                  <Input
                    id="table-name"
                    placeholder={t.table.tablePlaceholder}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    disabled={isPending}
                  />

                  {error && (
                    <p className="text-sm text-destructive">{error.message}</p>
                  )}
                </div>
              );
            }}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {t.common.cancel}
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? t.common.saving : t.table.add}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
