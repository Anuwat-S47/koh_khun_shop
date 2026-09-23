import { Product } from '../types/categoryId';

interface Props {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: Props) {
  return (
    <div
      onClick={() => onSelect(product)}
      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-xl">
          🍲
        </div>
        <span className="bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-md text-xs">
          {product.price} ฿
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-gray-800 text-sm">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{product.categoryName}</p>
      </div>
    </div>
  );
}