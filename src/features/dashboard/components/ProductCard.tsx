import { FoodType, Product } from "../types/categoryId";

interface Props {
  product: Product;
  foodTypes: FoodType[];
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, foodTypes, onSelect }: Props) {
  const foodType = foodTypes.find((type) => type.id === product.type_id);

  return (
    <div
      onClick={() => onSelect(product)}
      className="
        bg-white
        p-4
        rounded-xl
        border
        border-gray-100
        shadow-sm
        hover:shadow-md
        transition-shadow
        cursor-pointer
        flex
        flex-col
        justify-between
      "
    >
      {/* รูป / ราคา */}
      <div className="flex justify-between items-start gap-2">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
          {product.img_url ? (
            <img
              src={product.img_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              ไม่มีรูป
            </div>
          )}
        </div>

        <span className="bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-md text-xs">
          {Number(product.price).toLocaleString()} ฿
        </span>
      </div>

      {/* ข้อมูลสินค้า */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-800 text-sm">{product.name}</h3>

        <p className="text-xs text-gray-400 mt-0.5">
          {foodType?.name ?? "ไม่ระบุประเภท"}
        </p>
      </div>
    </div>
  );
}
