<<<<<<< HEAD
import { CartItem, TableInfo } from "../types/categoryId";

import {
  Trash2,
  Plus,
  Minus,
  QrCode,
  Banknote,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
=======
import { CartItem, TableInfo } from '../types/categoryId';
import { Trash2, Plus, Minus, QrCode, Banknote, RefreshCw } from 'lucide-react';
>>>>>>> 506d95e (yang mai sed)

interface Props {
  tableInfo: TableInfo | null;
  cart: CartItem[];
<<<<<<< HEAD
  onUpdateQty: (id: number, delta: number) => void;
=======
  onUpdateQty: (id: string, delta: number) => void;
>>>>>>> 506d95e (yang mai sed)
  onClear: () => void;
  subtotal: number;
  vat: number;
  total: number;
}

export function CartPanel({
  tableInfo,
  cart,
  onUpdateQty,
  onClear,
  subtotal,
  vat,
  total,
}: Props) {
<<<<<<< HEAD
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isEmpty = cart.length === 0;

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* =================================
          Header : โต๊ะอาหาร
      ================================== */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-amber-50/50 shrink-0">
=======
  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-screen">
      {/* Header โต๊ะอาหาร */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-amber-50/50">
>>>>>>> 506d95e (yang mai sed)
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
            🪑
          </div>
<<<<<<< HEAD

          <div>
            <p className="text-xs text-gray-500">โต๊ะที่กำลังคิดเงิน</p>

            <h2 className="font-bold text-gray-900">
              {tableInfo?.tableNumber || "T01"}
            </h2>
          </div>
        </div>

        <button
          type="button"
          className="
            flex
            items-center
            gap-1.5
            px-3
            py-1.5
            text-xs
            font-medium
            text-amber-700
            bg-white
            border
            border-amber-200
            rounded-lg
            hover:bg-amber-50
            transition-colors
          "
        >
          <RefreshCw className="w-3.5 h-3.5" />
          เปลี่ยนโต๊ะ
        </button>
      </div>

      {/* =================================
          Header : รายการในบิล
      ================================== */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />

          <h3 className="font-semibold text-gray-800 text-sm">
            รายการสั่งซื้อในบิล
          </h3>

          {totalItems > 0 && (
            <span className="text-xs text-gray-400">({totalItems} รายการ)</span>
          )}
        </div>

        {!isEmpty && (
          <button
            type="button"
            onClick={onClear}
            className="
              flex
              items-center
              gap-1
              text-xs
              text-red-500
              hover:text-red-600
              bg-red-50
              hover:bg-red-100
              px-2.5
              py-1
              rounded-md
              transition-colors
            "
          >
            <Trash2 className="w-3 h-3" />
            ล้างตะกร้า
          </button>
        )}
      </div>

      {/* =================================
          รายการอาหาร
      ================================== */}
      <div className="flex-1 overflow-y-auto p-4">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-gray-400" />
              </div>

              <p className="font-medium text-gray-600 text-sm">
                ยังไม่มีรายการสั่งซื้อ
              </p>

              <p className="text-xs text-gray-400 mt-1">
                กรุณาเลือกอาหารจากเมนู
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="
                  p-3
                  bg-gray-50/50
                  rounded-xl
                  border
                  border-gray-100
                  hover:border-gray-200
                  transition-colors
                "
              >
                {/* ชื่อ + ราคา */}
                <div className="flex justify-between items-start mb-2 gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {Number(item.price).toFixed(2)} ฿ / หน่วย
                    </p>
                  </div>

                  <span className="font-semibold text-amber-600 text-sm whitespace-nowrap">
                    {(Number(item.price) * item.quantity).toFixed(2)} ฿
                  </span>
                </div>

                {/* จำนวน */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">จำนวน</span>

                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="
                        w-6
                        h-6
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-100
                        rounded
                        text-gray-600
                        transition-colors
                      "
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <span className="font-semibold text-gray-800 text-sm min-w-5 text-center">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="
                        w-6
                        h-6
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-100
                        rounded
                        text-gray-600
                        transition-colors
                      "
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =================================
          สรุปยอดเงิน
      ================================== */}
      <div className="p-4 border-t border-gray-200 bg-gray-50/50 space-y-2 shrink-0">
        <div className="flex justify-between text-sm text-gray-600">
          <span>ยอดรวมอาหาร</span>
          <span>{subtotal.toFixed(2)} ฿</span>
        </div>

=======
          <div>
            <p className="text-xs text-gray-500">โต๊ะที่กำลังคิดเงิน</p>
            <h2 className="font-bold text-gray-900">{tableInfo?.tableNumber || 'T01'}</h2>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-white border border-amber-200 rounded-lg hover:bg-amber-50">
          <RefreshCw className="w-3.5 h-3.5" /> เปลี่ยนโต๊ะ
        </button>
      </div>

      {/* หัวข้อรายการในบิล */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <h3 className="font-semibold text-gray-800 text-sm">รายการสั่งซื้อในบิล</h3>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 bg-red-50 px-2.5 py-1 rounded-md"
        >
          <Trash2 className="w-3 h-3" /> ล้างตะกร้า
        </button>
      </div>

      {/* รายการอาหารในตะกร้า */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-gray-800 text-sm">{item.name}</span>
              <span className="font-semibold text-amber-600 text-sm">
                {item.price * item.quantity} ฿
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{item.price} ฿ / หน่วย</span>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => onUpdateQty(item.id, -1)}
                  className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-semibold text-gray-800 px-1">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQty(item.id, 1)}
                  className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* สรุปยอดเงินและปุ่มชำระ */}
      <div className="p-4 border-t border-gray-200 bg-gray-50/50 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>ยอดรวมอาหาร (Subtotal)</span>
          <span>{subtotal.toFixed(2)} ฿</span>
        </div>
>>>>>>> 506d95e (yang mai sed)
        <div className="flex justify-between text-sm text-gray-600">
          <span>VAT (7%)</span>
          <span>{vat.toFixed(2)} ฿</span>
        </div>
<<<<<<< HEAD

        <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
          <span>ยอดชำระสุทธิ</span>
          <span className="text-amber-600">{total.toFixed(2)} ฿</span>
        </div>

        {/* =================================
            ปุ่มชำระเงิน
        ================================== */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {/* เงินสด */}
          <button
            type="button"
            disabled={isEmpty}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-emerald-600
              hover:bg-emerald-700
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              text-white
              py-2.5
              rounded-xl
              text-xs
              font-semibold
              shadow-sm
              transition-colors
            "
          >
            <Banknote className="w-4 h-4" />
            ชำระเงินสด
          </button>

          {/* QR */}
          <button
            type="button"
            disabled={isEmpty}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-amber-600
              hover:bg-amber-700
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              text-white
              py-2.5
              rounded-xl
              text-xs
              font-semibold
              shadow-sm
              transition-colors
            "
          >
            <QrCode className="w-4 h-4" />
            สแกน QR / บิล
=======
        <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
          <span>ยอดชำระสุทธิ (Total)</span>
          <span className="text-amber-600">{total.toFixed(2)} ฿</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors">
            <Banknote className="w-4 h-4" /> ชำระเงินสด
          </button>
          <button className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors">
            <QrCode className="w-4 h-4" /> สแกน QR / บิล
>>>>>>> 506d95e (yang mai sed)
          </button>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 506d95e (yang mai sed)
