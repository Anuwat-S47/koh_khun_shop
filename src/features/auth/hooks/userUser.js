import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../services/user-api";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => Login(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
