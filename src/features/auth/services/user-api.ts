import { supabase } from "../../../utils/supabase";
import { UserLoginPayload } from "../types/user-type";

export const Login = async (data: UserLoginPayload) => {
  const { data: res, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return res;
};

export const LogOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }
};

export const GetProfile = async () => {
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
