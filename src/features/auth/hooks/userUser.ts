import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetProfile, Login, LogOut } from "../services/user-api";
import { UserLoginPayload } from "../types/user-type";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: UserLoginPayload) => Login(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useLogOut() {
  const queryClient = useQueryClient();

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
    queryFn: GetProfile,
    staleTime: 1000 * 60 * 5,
  });
}
