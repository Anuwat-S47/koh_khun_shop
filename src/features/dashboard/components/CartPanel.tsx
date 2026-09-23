import { CartItem, TableInfo } from '../types/categoryId';
import { Trash2, Plus, Minus, QrCode, Banknote, RefreshCw } from 'lucide-react';

interface Props {
  tableInfo: TableInfo | null;
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
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
  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-screen">
      {/* Header โต๊ะอาหาร */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-amber-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
            🪑
          </div>
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
        <div className="flex justify-between text-sm text-gray-600">
          <span>VAT (7%)</span>
          <span>{vat.toFixed(2)} ฿</span>
        </div>
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
          </button>
        </div>
      </div>
    </div>
  );
}