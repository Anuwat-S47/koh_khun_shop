import {
  createFileRoute,
  Outlet,
  redirect,
  useMatches,
} from "@tanstack/react-router";
import CustomNavbar from "@/components/CustomNavbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";
import { queryClient } from "@/lib/query-client";
import PageLayout from "@/components/layout/PageLayout";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { GetMe } from "@/features/auth/services/user-api";

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
  const { t } = useTranslation();

  return (
    <SidebarProvider>
      <CustomSidebar />

      <SidebarInset>
        <CustomNavbar />

        <div>
          <PageLayout
            title={title ? t(title) : undefined}
            description={description ? t(description) : undefined}
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
