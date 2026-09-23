import { useMutation, useQuery } from "@tanstack/react-query";
import { GetMe, Login, LogOut } from "../services/user-api";
import { queryClient } from "@/lib/query-client";
import Swal from "sweetalert2";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";

export function useLogin() {
  return useMutation({
    mutationFn: Login
  });
}

export function useLogOut() {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: t("auth.logoutSuccess"),
      });
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
