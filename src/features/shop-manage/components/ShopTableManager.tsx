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
import { useLanguageStore } from "@/features/translations/stores/language-store";

type ShopTableManagerProps = {
  shopId: number;
};

export function ShopTableManager({ shopId }: ShopTableManagerProps) {
  const { data: tables, isLoading, isError } = useGetShopTables(shopId);
  const language = useLanguageStore((state) => state.language);
  const deleteMutation = useDeleteShopTable(shopId);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("คุณต้องการลบโต๊ะนี้หรือไม่?");

    if (!confirmed) return;

    deleteMutation.mutate(id);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
              <Utensils className="h-5 w-5" />
            </div>

            <div>
              <CardTitle>โต๊ะอาหาร</CardTitle>

              <p className="text-sm text-muted-foreground">
                จัดการโต๊ะภายในร้าน
              </p>
            </div>
          </div>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            เพิ่มโต๊ะ
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            กำลังโหลดข้อมูล...
          </div>
        )}

        {isError && (
          <div className="py-10 text-center text-sm text-destructive">
            ไม่สามารถโหลดข้อมูลโต๊ะได้
          </div>
        )}

        {!isLoading && !isError && (!tables || tables.length === 0) && (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <Utensils className="h-10 w-10 text-muted-foreground" />

            <div className="text-center">
              <p className="font-medium">ยังไม่มีโต๊ะ</p>

              <p className="text-sm text-muted-foreground">
                เพิ่มโต๊ะเพื่อเริ่มจัดการโต๊ะในร้าน
              </p>
            </div>

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              เพิ่มโต๊ะ
            </Button>
          </div>
        )}

        {!isLoading && !isError && tables && tables.length > 0 && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>

                  <TableHead>ชื่อโต๊ะ</TableHead>

                  <TableHead className="w-[160px] text-right">
                    การจัดการ
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tables.map((table) => (
                  <TableRow key={table.id}>
                    <TableCell>{table.id}</TableCell>

                    <TableCell className="font-medium">
                      {table.name[language]}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(table.id)}
                          disabled={deleteMutation.isPending}
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
  );
}
