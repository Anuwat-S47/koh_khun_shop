// รองรับโครงสร้างที่เป็น Object หลากหลายภาษา
export type MultiLangField = {
  th?: string;
  la?: string;
  [key: string]: string | undefined; // เผื่ออนาคตมีภาษาที่ 3 เพิ่ม
};

/**
 * ฟังก์ชันเลือกข้อความตามภาษาปัจจุบัน
 * @param field ข้อมูลที่เป็น JSONB จาก Supabase (เช่น product.name)
 * @param currentLang ภาษาปัจจุบันของระบบ ('th' หรือ 'la')
 * @param fallbackLang ภาษาสำรองกรณีที่ไม่มีข้อมูล (ค่าเริ่มต้นคือ 'th')
 */
export function getLangText(
  field: MultiLangField | null | undefined,
  currentLang: string,
  fallbackLang: string = "th"
): string {
  if (!field) return "";

  // 1. ลองดึงตามภาษาปัจจุบันก่อน
  if (field[currentLang]) {
    return field[currentLang]!;
  }

  // 2. ถ้าไม่มี ให้ fallback ไปภาษาหลัก (เช่น 'th')
  if (field[fallbackLang]) {
    return field[fallbackLang]!;
  }

  // 3. ถ้าไม่มีทั้งสองภาษา ให้ดึงค่าตัวแรกที่มีอยู่ใน Object ออกมาแสดง
  const firstAvailableKey = Object.keys(field)[0];
  return firstAvailableKey ? field[firstAvailableKey] || "" : "";
}