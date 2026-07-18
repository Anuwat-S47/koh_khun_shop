import { supabase } from "../../../utils/supabase";

export const Login = async (data) => {
  const { data: res, error } = await supabase.auth.signInWithPassword(
    {
      email: data.email,
      password: data.password,
    },
  );

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return res;
};
