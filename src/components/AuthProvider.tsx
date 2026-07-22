import { queryClient } from "@/lib/query-client";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);
  
  return <>{children}</>;
}
