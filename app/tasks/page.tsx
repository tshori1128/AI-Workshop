import { redirect } from "next/navigation";
import { createSupabase, getCurrentUser } from "../_lib/supabase";
import { addTask } from "../_lib/task-actions";
import { SKILLS } from "../_lib/skills";
import DoneCheckbox from "./DoneCheckbox";

type Task = {
  id: number;
  title: string;
  skill: string;
  done: boolean;
};

// Only logged-in people can see this page. proxy.ts already redirects
// everyone else; this check is a second lock on the same door.
export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { error } = await searchParams;

  // Row level security means this only ever returns this person's own tasks.
  const supabase = await createSupabase();
  const { data, error: loadError } = await supabase
    .from("tasks")
    .select("id, title, skill, done")
    .order("created_at", { ascending: true });
  const tasks = (data ?? []) as Task[];

  return (
    <main className="auth-page">
      <h1>Your tasks</h1>
      <p>Logged in as {user.email}.</p>

      {error && <p className="error">{error}</p>}
      {loadError && (
        <p className="error">Could not load your tasks: {loadError.message}</p>
      )}

      <form action={addTask} className="task-form">
        <label>
          Task
          <input name="title" type="text" required maxLength={200} />
        </label>
        <label>
          Skill
          <select name="skill" required defaultValue="">
            <option value="" disabled>
              Pick a skill
            </option>
            {SKILLS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? "task done" : "task"}>
              <DoneCheckbox id={task.id} done={task.done} title={task.title} />
              <span className="task-title">{task.title}</span>
              <span className="skill-label">{task.skill}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
