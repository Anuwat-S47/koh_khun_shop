export const th = {
  common: {
    save: "บันทึก",
    cancel: "ยกเลิก",
    delete: "ลบ",
    edit: "แก้ไข",
    add: "เพิ่ม",
    search: "ค้นหา",
    loading: "กำลังโหลด...",
    confirm: "ยืนยัน",
    back: "ย้อนกลับ",
  },

  shop: {
    title: "ร้านค้า",
    addShop: "เพิ่มร้าน",
    editShop: "แก้ไขร้าน",
    manage: "จัดการร้าน",
    noShop: "ยังไม่มีข้อมูลร้านค้า",
    name: "ชื่อร้าน",
    address: "ที่อยู่",
    phone: "เบอร์ติดต่อ",
    logo: "โลโก้ร้าน",
  },

  product: {
    title: "สินค้า",
    addProduct: "เพิ่มสินค้า",
    name: "ชื่อสินค้า",
    price: "ราคา",
    type: "ประเภทสินค้า",
  },

  foodType: {
    title: "ประเภทอาหาร",
    add: "เพิ่มประเภทอาหาร",
    name: "ชื่อประเภท",
  },

  table: {
    title: "โต๊ะ",
    add: "เพิ่มโต๊ะ",
    name: "ชื่อโต๊ะ",
  },

  bill: {
    title: "ประวัติการขาย",
    subtotal: "ยอดรวม",
    discount: "ส่วนลด",
    total: "ยอดสุทธิ",
    status: "สถานะ",
    pending: "รอดำเนินการ",
    paid: "ชำระเงินแล้ว",
    cancelled: "ยกเลิก",
  },

  auth: {
    email: "อีเมล",
    password: "รหัสผ่าน",
    login: "เข้าสู่ระบบ",
    logout: "ออกจากระบบ",
    logoutConfirm: "ต้องการออกจากระบบหรือไม่?",
    loginSuccess: "เข้าสู่ระบบสำเร็จ",
    logoutSuccess: "ออกจากระบบสำเร็จ",
  },

  language: {
    title: "ภาษา",
  },

  sidebar: {
    menu: "เมนู",
    dashboard: "แดชบอร์ด",
    settings: "ตั้งค่า",
    shopSetting: "ตั้งค่าร้านค้า",
    otherSettings: "ตั้งค่าอื่นๆ",
  },

  validation: {
    emailRequired: "กรุณากรอกอีเมล",
    passwordRequired: "กรุณากรอกรหัสผ่าน",
  },
} as const;
