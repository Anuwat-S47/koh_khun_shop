import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../services/user-api";
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
