import { redirect } from "next/navigation";
import { getCurrentUser } from "../_lib/supabase";

// Only logged-in people can see this page. proxy.ts already redirects
// everyone else; this check is a second lock on the same door.
export default async function TasksPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="auth-page">
      <h1>Your tasks</h1>
      <p>Logged in as {user.email}.</p>
    </main>
  );
}
