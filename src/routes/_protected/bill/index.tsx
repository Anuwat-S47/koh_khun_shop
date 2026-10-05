import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react"; // หรือไอคอนที่คุณใช้งาน

// สมมติว่าดึง Hook สำหรับรายการประวัติบิลทั้งหมด
// import { useBillHistory } from "@/features/bills/hooks/useBillHistory";

export const Route = createFileRoute("/_protected/bill/")({
  component: RouteComponent,
});

function RouteComponent() {
  // ตัวอย่างข้อมูลจำลอง (ให้เปลี่ยนไปใช้ Hook จริงของคุณ เช่น const { bills, isLoading, error } = useBillHistory();)
  const isLoading = false;
  const error = null;
  const bills = [
    {
      id: 1,
      invoiceNo: "INV-2026-708",
      table: "T01",
      time: "02:34 PM",
      total: 872.05,
      paymentMethod: "เงินสด", // หรือ "cash"
    },
    {
      id: 2,
      invoiceNo: "INV-2026-991",
      table: "T01",
      time: "02:33 PM",
      total: 267.5,
      paymentMethod: "เงินสด",
    },
    {
      id: 3,
      invoiceNo: "INV-2026-001",
      table: "T01",
      time: "10:15",
      total: 250.0,
      paymentMethod: "เงินสด",
    },
    {
      id: 4,
      invoiceNo: "INV-2026-002",
      table: "T03",
      time: "11:30",
      total: 540.0,
      paymentMethod: "QR พร้อมเพย์",
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <p>กำลังโหลดประวัติบิล...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">ไม่สามารถโหลดประวัติบิลได้</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header ตามแบบในภาพ */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎫</span>
            <h1 className="text-2xl font-bold">
              ประวัติบิล และออกใบเสร็จรับเงิน (Bill History)
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            รายการบิลที่ชำระเงินแล้ว
            สามารถพิมพ์ใบเสร็จซ้ำหรือตรวจสอบรายการได้ทันที
          </p>
        </div>

        {/* ตารางแสดงประวัติบิล */}
        <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50/50 text-gray-600">
                <th className="p-4 font-medium">
                  เลขที่บิล (Invoice)
                </th>
                <th className="p-4 font-medium">โต๊ะอาหาร</th>
                <th className="p-4 font-medium">เวลาทำรายการ</th>
                <th className="p-4 font-medium">ยอดสุทธิ</th>
                <th className="p-4 font-medium">ช่องทางชำระ</th>
                <th className="p-4 font-medium text-center">
                  พิมพ์ใบเสร็จ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className="hover:bg-gray-50/55 transition-colors"
                >
                  <td className="p-4 font-semibold text-gray-900">
                    {bill.invoiceNo}
                  </td>
                  <td className="p-4">
                    <span className="rounded bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {bill.table}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{bill.time}</td>
                  <td className="p-4 font-semibold text-amber-600">
                    {bill.total.toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    ฿
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        bill.paymentMethod === "เงินสด"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-teal-50 text-teal-600 border border-teal-200"
                      }`}
                    >
                      {bill.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => {
                        // ฟังก์ชันสำหรับพิมพ์ใบเสร็จซ้ำ
                        console.log(`พิมพ์ใบเสร็จสำหรับบิล: ${bill.invoiceNo}`);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      <Printer className="h-3.5 w-3.5 text-amber-600" />
                      พิมพ์บิล
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
