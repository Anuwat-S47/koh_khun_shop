import { supabase } from "@/lib/supabase";
import { UserLoginPayload } from "../types/user-type";

export const Login = async (data: UserLoginPayload) => {
  const { data: result, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.error("Supabase Error:", error);

    throw new Error(error.message);
  }

  return {
    user: result.user,
  };
};

export const LogOut = async () => {
  const { error } = await supabase.auth.signOut({
    scope: "local",
  });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }
};

export const GetMe = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return user;
};
