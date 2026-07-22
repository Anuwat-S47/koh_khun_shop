import { Button } from "@/components/ui/button";
import AuthProvider from "@/components/AuthProvider";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => {
    return (
      <div className="min-h-dvh w-full flex flex-col items-center justify-center p-6 bg-slate-50/50">
        <div className="relative z-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-primary/10 shadow-sm backdrop-blur-md">
            Koh Khun
          </div>

          <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-primary to-primary/20 select-none opacity-20">
            404
          </h1>

          <div className="-mt-12 md:-mt-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              ไม่พบหน้านี้
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-md mx-auto">
              ขออภัย ไม่พบหน้าที่คุณกำลังตามหา{" "}
              <br className="hidden md:block" />
              กรุณาตรวจสอบ URL อีกครั้งหรือกลับสู่หน้าหลัก
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="ghost">กลับสู่หน้าหลัก</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px] animate-pulse delay-700" />
        </div>
      </div>
    );
  },
});

function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
