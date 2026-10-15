import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabase, getCurrentUser } from "../_lib/supabase";
import { addTask } from "../_lib/task-actions";
import { createList } from "../_lib/list-actions";
import { SKILLS } from "../_lib/skills";
import DoneCheckbox from "./DoneCheckbox";

type Task = {
  id: number;
  title: string;
  skill: string;
  done: boolean;
};

type List = {
  id: number;
  name: string;
};

// Only logged-in people can see this page. proxy.ts already redirects
// everyone else; this check is a second lock on the same door.
export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; list?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { error, list: listParam } = await searchParams;

  // Row level security means these only ever return this person's own rows.
  const supabase = await createSupabase();
  const { data: listData, error: listLoadError } = await supabase
    .from("lists")
    .select("id, name")
    .order("created_at", { ascending: true });
  const lists = (listData ?? []) as List[];

  // The list being looked at comes from the address, like /tasks?list=3.
  // With no list in the address, show the first list.
  const currentList =
    lists.find((l) => String(l.id) === listParam) ?? lists[0] ?? null;

  let tasks: Task[] = [];
  let taskLoadError: string | null = null;
  if (currentList) {
    const { data, error: loadError } = await supabase
      .from("tasks")
      .select("id, title, skill, done")
      .eq("list_id", currentList.id)
      .order("created_at", { ascending: true });
    tasks = (data ?? []) as Task[];
    taskLoadError = loadError?.message ?? null;
  }

  return (
    <main className="auth-page">
      <h1>Your tasks</h1>
      <p>Logged in as {user.email}.</p>

      {error && <p className="error">{error}</p>}
      {listLoadError && (
        <p className="error">Could not load your lists: {listLoadError.message}</p>
      )}
      {taskLoadError && (
        <p className="error">Could not load your tasks: {taskLoadError}</p>
      )}

      <nav className="list-menu" aria-label="Your lists">
        {lists.map((list) => (
          <Link
            key={list.id}
            href={`/tasks?list=${list.id}`}
            className={list.id === currentList?.id ? "list-link current" : "list-link"}
            aria-current={list.id === currentList?.id ? "page" : undefined}
          >
            {list.name}
          </Link>
        ))}
      </nav>

      {/* <details> opens and closes by itself, so no browser code is needed. */}
      <details className="new-list" open={lists.length === 0}>
        <summary>New list</summary>
        <form action={createList} className="task-form">
          <label>
            List name
            <input name="name" type="text" required maxLength={100} />
          </label>
          <button type="submit">Save</button>
        </form>
      </details>

      {currentList === null ? (
        <p>Make a list first, then you can add tasks to it.</p>
      ) : (
        <>
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
            <label>
              List
              {/* key makes the dropdown reset to the open list when you switch lists. */}
              <select
                key={currentList.id}
                name="list_id"
                required
                defaultValue={String(currentList.id)}
              >
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Add</button>
          </form>

          <h2>{currentList.name}</h2>
          {tasks.length === 0 ? (
            <p>No tasks in this list yet. Add one above.</p>
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
        </>
      )}
    </main>
  );
}
