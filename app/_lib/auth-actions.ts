"use server";

import { redirect } from "next/navigation";
import { createSupabase } from "./supabase";

// These run on the server when someone submits the sign up, log in,
// or log out form. Passwords never get stored or logged by this code;
// they go straight to Supabase.

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabase();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/tasks");
}

export async function logIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=1");
  }
  redirect("/tasks");
}

export async function logOut() {
  const supabase = await createSupabase();
  await supabase.auth.signOut();
  redirect("/");
}
