
import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT}.supabase.co`
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY

const supabase = createClient(
    SUPABASE_PROJECT_URL, 
    SUPABASE_API_KEY
);

export const signUpNewUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })
  if (error) {
    throw new Error(error!.message);
  }
  console.log(data)
  return data.user;
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  
  if (error) {
    throw new Error(error!.message);
  }
  console.log(data)
  return {
    accessToken: data.session.access_token,
    userId: data.user.id
  }
}