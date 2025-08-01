import { LoginSchema } from "@/schemas/auth/login.schema";
import { createClient } from "@/utils/supabase/client";

export const login = (credentials: LoginSchema) => {
  const supabase = createClient();

  return supabase.auth.signInWithPassword(credentials);
}