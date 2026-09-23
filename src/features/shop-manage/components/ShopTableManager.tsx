import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pencil, Plus, Trash2, Utensils } from "lucide-react";

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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Utensils className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>{t.table.title}</CardTitle>

                <p className="text-sm text-muted-foreground">
                  {t.table.description}
                </p>
              </div>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              {t.table.add}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              {t.common.loading}
            </div>
          )}
          {isError && (
            <div className="py-10 text-center text-sm text-destructive">
              {t.table.loadFailed}
            </div>
          )}
          {!isLoading && !isError && (!tables || tables.length === 0) && (
            <div className="flex flex-col items-center justify-center gap-3 py-10">
              <Utensils className="h-10 w-10 text-muted-foreground" />

              <div className="text-center">
                <p className="font-medium">{t.table.empty}</p>

                <p className="text-sm text-muted-foreground">
                  {t.table.description}
                </p>
              </div>

              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" />
                {t.table.add}
              </Button>
            </div>
          )}
          {!isLoading && !isError && tables && tables.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>

                    <TableHead>{t.table.name}</TableHead>

                    <TableHead className="w-[160px] text-right">
                      {t.table.manage}
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {tables.map((table, index) => (
                    <TableRow key={table.id}>
                      <TableCell>{tables.length - index}</TableCell>

                      <TableCell className="font-medium">
                        {table.name.th}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(table)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(table.id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
