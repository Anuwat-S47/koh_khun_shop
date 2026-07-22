import { useMutation, useQuery } from "@tanstack/react-query";
import { GetMe, Login, LogOut } from "../services/user-api";
import { queryClient } from "@/lib/query-client";

export function useLogin() {
  return useMutation({
    mutationFn: Login
  });
}

export function useLogOut() {
  return useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["me"],
      });
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: GetMe,
    staleTime: 1000 * 60 * 5,
  });
}
