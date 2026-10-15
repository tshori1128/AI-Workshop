"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabase, getCurrentUser } from "./supabase";

// Runs on the server when someone saves a new list.
// The database's row level security makes sure each person can only
// read and change their own lists, even if this code had a mistake.

export async function createList(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    redirect("/tasks?error=Type%20a%20list%20name%20first.");
  }

  const supabase = await createSupabase();
  const { data, error } = await supabase
    .from("lists")
    .insert({ name, user_id: user.id })
    .select("id")
    .single();

  if (error || !data) {
    const message = error?.message ?? "Could not save the list.";
    redirect(`/tasks?error=${encodeURIComponent(message)}`);
  }
  revalidatePath("/tasks");
  // Open the new list right away.
  redirect(`/tasks?list=${data.id}`);
}
