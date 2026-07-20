# Koh Khun Shop

โปรเจคนี้เป็นแอปเว็บร้านอาหาร/ร้านค้าขนาดเล็กที่พัฒนาด้วยเทคโนโลยีหลักดังนี้:

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Supabase (`@supabase/supabase-js`) สำหรับเชื่อมต่อฐานข้อมูลและระบบ Authentication
- @tanstack/react-router สำหรับจัดการ route
- @tanstack/react-query สำหรับ data fetching และ caching
- @tanstack/react-form สำหรับฟอร์ม
- Zod สำหรับ validation schema
- shadcn/ui และ Base UI สำหรับส่วนประกอบ UI
- SweetAlert2 สำหรับแจ้งเตือนแบบสวยงาม

## วิธีใช้งาน

```bash
npm install
npm run dev
```

## โครงสร้างโปรเจคหลัก

- `src/main.tsx` — entry point ของแอป
- `src/App.tsx` — คอมโพเนนต์หลักของแอป
- `src/routes/` — Route tree ของแอป และหน้าต่าง ๆ
- `src/components/` — คอมโพเนนต์ UI และ layout ที่นำกลับมาใช้ซ้ำได้
- `src/features/` — โมดูลตามฟีเจอร์ เช่น auth, bill, cart, food-type, product, shop, shop-table
- `src/utils/` — โค้ดยูทิลิตี้ เช่น การตั้งค่า Supabase

### รายละเอียดโครงสร้าง

- `src/routes/__root.tsx` — root route ของแอป พร้อม layout หลัก
- `src/routes/_auth/login.tsx` — หน้า login
- `src/routes/_protected/` — หน้าในส่วนของผู้ใช้ที่ล็อกอินแล้ว เช่น bill, cart, product, shop, shop-table
- `src/features/auth/` — logic และคอมโพเนนต์สำหรับ Authentication
- `src/features/*/hooks/` — Hook เฉพาะฟีเจอร์
- `src/features/*/service/` — การเรียก API และ service layer

## การพัฒนาเพิ่มเติม

โปรเจคนี้ออกแบบมาให้เป็น local-first React app ที่เชื่อมต่อกับ Supabase และจัดการ state ด้วย React Query พร้อมระบบ route ที่แยกตามฟีเจอร์ ทำให้ผู้พัฒนาสามารถขยายต่อได้ง่าย
