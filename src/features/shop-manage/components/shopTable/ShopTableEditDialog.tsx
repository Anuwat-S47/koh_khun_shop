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
import { useUpdateShopTable } from "../../hooks/useShopTableManage";
import {
  CreateShopTableRequest,
  shopTableSchema,
} from "../../schemas/shop-table-schemas";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { ShopTableEditDialogProps } from "../../types/shop_table_manage_type";
import Swal from "sweetalert2";

export function ShopTableEditDialog({
  shopId,
  table,
  open,
  onOpenChange,
}: ShopTableEditDialogProps) {
  const { mutateAsync: updateShopTable, isPending } =
    useUpdateShopTable(shopId);
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      name: table?.name,
    } satisfies CreateShopTableRequest,

    validators: {
      onSubmit: shopTableSchema(t),
    },

    onSubmit: async ({ value }) => {
      if (!table) return;

      try {
        await updateShopTable({
          id: table.id,
          name: value.name,
          shopId,
        });

        form.reset();
        onOpenChange(false);

        Swal.fire({
          icon: "success",
          title: t.common.success,
          text: t.table.editSuccess,
          confirmButtonText: t.common.ok,
        });
      } catch (error) {
        console.error("Update shop table error:", error);
      }
    },
  });

  if (!table) {
    return null;
  }

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
          <DialogTitle>{t.table.editTable}</DialogTitle>

          <DialogDescription>{t.table.editDescription}</DialogDescription>
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
                  <Label htmlFor="edit-table-name-th">{t.table.name}</Label>

                  <Input
                    id="edit-table-name-th"
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
              {isPending ? t.common.saving : t.common.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
