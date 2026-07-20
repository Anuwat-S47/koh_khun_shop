import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { supabase } from "@/utils/supabase"

export const Route = createFileRoute('/_protected')({
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
  component: Outlet,
})

