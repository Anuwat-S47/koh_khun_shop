import {
  createFileRoute,
  Outlet,
  redirect,
  useMatches,
} from "@tanstack/react-router";
import CustomNavbar from "@/components/CustomNavbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";
import { GetMe } from "@/services/user-api";
import { queryClient } from "@/lib/query-client";
import PageLayout from "@/components/layout/PageLayout";

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
  const matches = useMatches();

  const currentMatch = matches[matches.length - 1];
  const { title, description, showBackButton, className } =
    (currentMatch?.staticData as {
      title?: string;
      description?: string;
      showBackButton?: boolean;
      className?: string;
    }) || {};

  return (
    <SidebarProvider>
      <CustomSidebar />

      <SidebarInset>
        <CustomNavbar />

        <div>
          <PageLayout
            title={title}
            description={description}
            showBackButton={showBackButton}
            className={className}
          >
            <Outlet />
          </PageLayout>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
