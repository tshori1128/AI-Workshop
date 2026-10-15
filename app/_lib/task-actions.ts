"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabase, getCurrentUser } from "./supabase";
import { SKILLS } from "./skills";

// These run on the server when someone adds a task to a list or ticks a checkbox.
// The database's row level security makes sure each person can only
// read and change their own tasks, even if this code had a mistake.

export async function addTask(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const skill = String(formData.get("skill") ?? "");
  const listId = Number(formData.get("list_id"));

  if (!title) {
    redirect("/tasks?error=Type%20a%20task%20first.");
  }
  if (!(SKILLS as readonly string[]).includes(skill)) {
    redirect("/tasks?error=Pick%20a%20skill%20from%20the%20list.");
  }
  if (!Number.isInteger(listId) || listId <= 0) {
    redirect("/tasks?error=Pick%20a%20list%20for%20the%20task.");
  }

  // The database also refuses a list that belongs to someone else.
  const supabase = await createSupabase();
  const { error } = await supabase
    .from("tasks")
    .insert({ title, skill, list_id: listId, user_id: user.id });

  if (error) {
    redirect(`/tasks?list=${listId}&error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/tasks");
  // Show the list the task was just added to.
  redirect(`/tasks?list=${listId}`);
}

export async function setTaskDone(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const id = Number(formData.get("id"));
  const done = formData.get("done") === "true";

  const supabase = await createSupabase();
  const { error } = await supabase
    .from("tasks")
    .update({ done })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    redirect(`/tasks?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/tasks");
}
