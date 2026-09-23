import { createFileRoute } from "@tanstack/react-router";
import { usePOS } from "../../features/dashboard/hooks/usePOS";
import { ProductCard } from "../../features/dashboard/components/ProductCard";
import { CartPanel } from "../../features/dashboard/components/CartPanel";
import { Search } from "lucide-react";
export const Route = createFileRoute("/_protected/")({
  staticData: {
    showBackButton: false,
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {
    products,
    tableInfo,
    searchQuery,
    setSearchQuery,
    cart,
    addToCart,
    updateQuantity,
    clearCart,
    subtotal,
    vat,
    total,
  } = usePOS();

  return (
    /* ใช้ -m-6 (หรือค่า margin ติดลบตาม Padding ของ layout แม่) เพื่อดึงให้หน้า POS ขยายชนขอบรอบด้าน */
    <div className="flex w-[calc(100%+3rem)] h-[calc(100%+3rem)] -m-6 bg-gray-50 overflow-hidden">
      {/* ฝั่งซ้าย: เมนูและรายการอาหาร */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Header แถบค้นหา */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍴</span>
            <h1 className="font-bold text-gray-800 text-base">
              เลือกรายการอาหาร
            </h1>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่ออาหาร..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </header>

        {/* เนื้อหารายการสินค้า */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={addToCart}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ฝั่งขวา: ตะกร้าสินค้า */}
      <div className="shrink-0 h-full">
        <CartPanel
          tableInfo={tableInfo}
          cart={cart}
          onUpdateQty={updateQuantity}
          onClear={clearCart}
          subtotal={subtotal}
          vat={vat}
          total={total}
        />
      </div>
    </div>
  );
}
