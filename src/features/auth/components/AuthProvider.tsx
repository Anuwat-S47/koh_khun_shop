import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

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
