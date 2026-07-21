import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/utils/supabase";
import CustomNavbar from "@/components/CustomNavbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Layout,
});

function Layout() {
  return (
    <SidebarProvider>
      <CustomSidebar />

      <SidebarInset>
        <CustomNavbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
