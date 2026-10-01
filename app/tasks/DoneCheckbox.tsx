"use client";

import { setTaskDone } from "../_lib/task-actions";

// A checkbox that saves itself as soon as it is ticked or unticked.
// It has to run in the browser ("use client") to notice the click.
export default function DoneCheckbox({
  id,
  done,
  title,
}: {
  id: number;
  done: boolean;
  title: string;
}) {
  return (
    <form action={setTaskDone}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="done" value={done ? "false" : "true"} />
      <input
        type="checkbox"
        checked={done}
        aria-label={`Mark "${title}" as ${done ? "not done" : "done"}`}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      />
    </form>
  );
}
