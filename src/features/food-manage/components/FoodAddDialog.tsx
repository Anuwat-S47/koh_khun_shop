import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { useCreateFood } from "../hooks/useFoodManage";
import Swal from "sweetalert2";
import { useGetFoodTypes } from "@/features/food-type-manage/hooks/useFoodTypeManage";
type FoodCreateDialogProps = {
  shopId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const FoodCreateDialog = ({
  shopId,
  open,
  onOpenChange,
}: FoodCreateDialogProps) => {
  const createFood = useCreateFood();

  const { data: foodTypes, isLoading: isFoodTypeLoading } =
    useGetFoodTypes(shopId);

  const form = useForm({
    defaultValues: {
      shopId: shopId,
      name: "",
      price: 0,
      typeId: 0,
      imgUrl: "", //แก้
    },

    onSubmit: async ({ value }) => {
      try {
        await createFood.mutateAsync({
          shopId: value.shopId,
          name: value.name,
          price: Number(value.price),
          typeId: Number(value.typeId),
          imgUrl: value.imgUrl || undefined,
        });

        await Swal.fire({
          title: "สำเร็จ",
          text: "เพิ่มอาหารเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        });

        form.reset();

        onOpenChange(false);
      } catch (error) {
        await Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text:
            error instanceof Error ? error.message : "ไม่สามารถเพิ่มอาหารได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    },
  });

  const handleClose = (value: boolean) => {
    if (!value) {
      form.reset();
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>เพิ่มอาหาร</DialogTitle>

          <DialogDescription>เพิ่มรายการอาหารใหม่</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Image */}
          <form.Field
            name="imgUrl"
            children={(field) => (
              <div className="space-y-2">
                <Label>รูปอาหาร</Label>

                <Input
                  type="text"
                  placeholder="URL รูปอาหาร"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />

          <form.Field
            name="name"
            children={(field) => (
              <div className="space-y-2">
                <Label>ชื่ออาหาร</Label>

                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="เช่น ข้าวผัด"
                />
              </div>
            )}
          />

          {/* Type */}
          <form.Field
            name="typeId"
            children={(field) => {
              const selectedType = foodTypes?.find(
                (type) => type.id === field.state.value,
              );

              return (
                <div className="space-y-2">
                  <Label>ประเภทอาหาร</Label>

                  <Select
                    value={field.state.value ? String(field.state.value) : ""}
                    onValueChange={(value) => field.handleChange(Number(value))}
                    disabled={isFoodTypeLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกประเภทอาหาร">
                        {selectedType?.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {foodTypes?.map((type) => (
                        <SelectItem key={type.id} value={String(type.id)}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />

          {/* Price */}
          <form.Field
            name="price"
            children={(field) => (
              <div className="space-y-2">
                <Label>ราคา</Label>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />

                  <span className="text-sm">บาท</span>
                </div>
              </div>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
            >
              ยกเลิก
            </Button>

            <Button type="submit" disabled={createFood.isPending}>
              {createFood.isPending ? "กำลังเพิ่ม..." : "เพิ่มอาหาร"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
