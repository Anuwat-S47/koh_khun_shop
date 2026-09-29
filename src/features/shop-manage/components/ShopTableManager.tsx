import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { Pencil, Plus, Trash2, Utensils, Armchair } from "lucide-react";

import {
  useDeleteShopTable,
  useGetShopTables,
} from "../hooks/useShopTableManage";

import { ShopTableEditDialog } from "./shopTable/ShopTableEditDialog";
import { ShopTableCreateDialog } from "./shopTable/ShopTableCreateDialog";
import { ShopTable } from "../types/shop_table_manage_type";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import Swal from "sweetalert2";

type ShopTableManagerProps = {
  shopId: number;
};

export function ShopTableManager({ shopId }: ShopTableManagerProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<ShopTable | null>(null);

  const { t } = useTranslation();
  const { data: tables, isLoading, isError } = useGetShopTables(shopId);
  const { mutateAsync: deleteShopTable, isPending: isDeleting } =
    useDeleteShopTable(shopId);

  const handleAdd = () => {
    setCreateDialogOpen(true);
  };

  const handleEdit = (table: ShopTable) => {
    setSelectedTable(table);
    setEditDialogOpen(true);
  };

  const handleEditOpenChange = (open: boolean) => {
    setEditDialogOpen(open);

    if (!open) {
      setSelectedTable(null);
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: t.common.confirm,
      text: t.table.deleteConfirm,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t.common.delete,
      cancelButtonText: t.common.cancel,
      reverseButtons: true,
      confirmButtonColor: "#ef4444",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await deleteShopTable(id);

        await Swal.fire({
          icon: "success",
          title: t.common.success,
          text: t.table.deleteSuccess,
          confirmButtonText: t.common.ok,
        });
      } catch (error) {
        console.error("Delete shop table error:", error);

        Swal.fire({
          icon: "error",
          title: t.common.error,
          text: t.table.deleteFailed,
          confirmButtonText: t.common.ok,
        });
      }
    });
  };

  return (
    <>
      <Card className="border-slate-200/80 shadow-xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
                <Utensils className="h-5 w-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-bold text-slate-900">
                    {t.table.title}
                  </CardTitle>
                  {tables && (
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-700 font-medium"
                    >
                      {tables.length} โต๊ะ
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-0.5">
                  {t.table.description}
                </p>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="bg-amber-500 hover:bg-amber-600 text-white shadow-xs shrink-0 h-9 text-xs"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              {t.table.add}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* State: Loading */}
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-2xl" />
              ))}
            </div>
          )}

          {/* State: Error */}
          {isError && (
            <div className="py-12 text-center rounded-2xl bg-red-50/50 border border-red-100">
              <p className="text-sm font-medium text-red-600">
                {t.table.loadFailed}
              </p>
            </div>
          )}

          {/* State: Empty */}
          {!isLoading && !isError && (!tables || tables.length === 0) && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Armchair className="h-6 w-6" />
              </div>

              <div className="text-center space-y-1">
                <p className="font-semibold text-slate-700 text-sm">
                  {t.table.empty}
                </p>
                <p className="text-xs text-slate-400">{t.table.description}</p>
              </div>

              <Button
                onClick={handleAdd}
                variant="outline"
                className="mt-1 text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                {t.table.add}
              </Button>
            </div>
          )}

          {/* State: Card Grid View */}
          {!isLoading && !isError && tables && tables.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-amber-400 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                      <Armchair className="h-4 w-4" />
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      #{table.id}
                    </span>
                  </div>

                  <div className="my-3">
                    <h4 className="font-bold text-slate-800 text-base truncate group-hover:text-amber-600 transition-colors">
                      {table.name}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleEdit(table)}
                      className="flex items-center justify-center gap-1 py-1.5 text-xs text-slate-600 hover:text-amber-700 font-medium rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 transition-colors"
                    >
                      <Pencil className="h-3 w-3" />
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => handleDelete(table.id)}
                      className="flex items-center justify-center gap-1 py-1.5 text-xs text-slate-500 hover:text-red-600 font-medium rounded-lg bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-200 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-3 w-3" />
                      ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ShopTableCreateDialog
        shopId={shopId}
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {selectedTable && (
        <ShopTableEditDialog
          shopId={shopId}
          table={selectedTable}
          open={editDialogOpen}
          onOpenChange={handleEditOpenChange}
        />
      )}
    </>
  );
}
