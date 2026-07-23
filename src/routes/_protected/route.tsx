import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import CustomNavbar from "@/components/CustomNavbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";
import { GetMe } from "@/services/user-api";
import { queryClient } from "@/lib/query-client";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    try {
      const user = await queryClient.ensureQueryData({
        queryKey: ["me"],
        queryFn: GetMe,
      });

      return {
        user,
      };
    } catch (error) {
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
