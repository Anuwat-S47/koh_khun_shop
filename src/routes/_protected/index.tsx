import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";

import { usePOS } from "../../features/dashboard/hooks/usePOS";
import { useGetShop } from "@/features/shop-manage/hooks/useShopManage";

import { ProductCard } from "../../features/dashboard/components/ProductCard";
import { CartPanel } from "../../features/dashboard/components/CartPanel";

import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_protected/")({
  staticData: {
    showBackButton: false,
  },
  component: RouteComponent,
});

function RouteComponent() {
  // =========================
  // SHOP
  // =========================

  const { data: shop, isLoading: isShopLoading } = useGetShop();

  const navigate = useNavigate();

  const { t } = useTranslation();

  // =========================
  // POS
  // =========================

  const {
    products,
    foodTypes,
    selectedCategory,
    setSelectedCategory,

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

    isLoading: isPOSLoading,
    isError,
  } = usePOS();

  // =========================
  // PAGINATION
  // =========================

  const ITEMS_PER_PAGE = 20;

  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // RESET PAGE
  // =========================
  // เมื่อค้นหาหรือเปลี่ยนหมวดหมู่
  // ให้กลับไปหน้าแรก
  // =========================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // =========================
  // PAGINATION CALCULATION
  // =========================

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentProducts = products.slice(startIndex, endIndex);

  // =========================
  // PROTECT CURRENT PAGE
  // =========================
  // ถ้าลบสินค้าแล้วหน้าปัจจุบันเกินจำนวนหน้า
  // ให้กลับไปหน้าสุดท้ายที่มีข้อมูล
  // =========================

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =========================
  // CHANGE PAGE
  // =========================

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  // =========================
  // SHOP LOADING
  // =========================

  if (isShopLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex w-[calc(100%+3rem)] h-[calc(100%+3rem)] -m-6 bg-gray-50 overflow-hidden">
      {/* =====================================
          ฝั่งซ้าย : รายการอาหาร
      ====================================== */}

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* =====================================
            Header
        ====================================== */}

        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍴</span>

            <h1 className="font-bold text-gray-800 text-base">
              {shop?.[0]?.name || "เลือกรายการอาหาร"}
            </h1>
          </div>

          {/* ช่องค้นหา */}

          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="ค้นหาชื่ออาหาร..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full
                pl-9
                pr-4
                py-2
                bg-gray-50
                border
                border-gray-200
                rounded-lg
                text-sm
                focus:outline-none
                focus:border-amber-500
              "
            />
          </div>
        </header>

        {/* =====================================
            เนื้อหารายการสินค้า
        ====================================== */}

        <div className="p-6 flex-1 overflow-y-auto">
          {/* =====================================
              Category
          ====================================== */}

          {!isPOSLoading && !isError && (
            <div className="flex flex-wrap gap-2 mb-6">
              {/* ทั้งหมด */}
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`
      shrink-0
      px-4
      py-2
      rounded-lg
      text-sm
      font-medium
      transition
      whitespace-nowrap
      ${
        selectedCategory === "all"
          ? "bg-amber-500 text-white shadow-sm"
          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
      }
    `}
              >
                ทั้งหมด
              </button>

              {/* ประเภทอาหาร */}
              {foodTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedCategory(type.id)}
                  className={`
        shrink-0
        px-4
        py-2
        rounded-lg
        text-sm
        font-medium
        transition
        whitespace-nowrap
        ${
          selectedCategory === type.id
            ? "bg-amber-500 text-white shadow-sm"
            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
        }
      `}
                >
                  {type.name}
                </button>
              ))}
            </div>
          )}

          {/* =====================================
              Loading
          ====================================== */}

          {isPOSLoading && (
            <div className="flex items-center justify-center py-20">
              <p className="text-sm text-gray-400">กำลังโหลดรายการอาหาร...</p>
            </div>
          )}

          {/* =====================================
              Error
          ====================================== */}

          {isError && !isPOSLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-4xl mb-3">⚠️</div>

                <p className="text-sm text-red-500">
                  ไม่สามารถโหลดรายการอาหารได้
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  กรุณาตรวจสอบการเชื่อมต่อ Supabase
                </p>
              </div>
            </div>
          )}

          {/* =====================================
              Products
          ====================================== */}

          {!isPOSLoading && !isError && (
            <>
              {products.length > 0 ? (
                <>
                  {/* =====================================
                      Product Grid
                  ====================================== */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        foodTypes={foodTypes}
                        onSelect={addToCart}
                      />
                    ))}
                  </div>

                  {/* =====================================
                      Pagination
                  ====================================== */}

                  {totalPages > 1 && (
                    <div className="flex flex-col items-center gap-3 mt-8">
                      {/* จำนวนรายการ */}

                      <p className="text-xs text-gray-400">
                        แสดง {startIndex + 1}
                        {" - "}
                        {Math.min(endIndex, products.length)} จากทั้งหมด{" "}
                        {products.length} รายการ
                      </p>

                      {/* ปุ่ม Pagination */}

                      <div className="flex items-center justify-center gap-2">
                        {/* ก่อนหน้า */}

                        <button
                          type="button"
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="
                            px-4
                            py-2
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            text-sm
                            font-medium
                            text-gray-600
                            hover:bg-gray-50
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            transition
                          "
                        >
                          ← ก่อนหน้า
                        </button>

                        {/* เลขหน้า */}

                        <div className="flex items-center gap-1">
                          {Array.from(
                            {
                              length: totalPages,
                            },
                            (_, index) => index + 1,
                          ).map((page) => (
                            <button
                              key={page}
                              type="button"
                              onClick={() => goToPage(page)}
                              className={`
                                w-10
                                h-10
                                rounded-lg
                                text-sm
                                font-medium
                                transition
                                ${
                                  currentPage === page
                                    ? "bg-amber-500 text-white shadow-sm"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                }
                              `}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        {/* ถัดไป */}

                        <button
                          type="button"
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="
                            px-4
                            py-2
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            text-sm
                            font-medium
                            text-gray-600
                            hover:bg-gray-50
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            transition
                          "
                        >
                          ถัดไป →
                        </button>
                      </div>

                      {/* หน้าปัจจุบัน */}

                      <p className="text-xs text-gray-400">
                        หน้า {currentPage} / {totalPages}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* =====================================
                    ไม่พบสินค้า
                ====================================== */

                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🔍</div>

                    <p className="text-gray-500 text-sm">ไม่พบรายการอาหาร</p>

                    {searchQuery && (
                      <p className="text-gray-400 text-xs mt-1">
                        ไม่พบสินค้าที่ตรงกับ "{searchQuery}"
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* =====================================
          ฝั่งขวา : CartPanel
      ====================================== */}

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
