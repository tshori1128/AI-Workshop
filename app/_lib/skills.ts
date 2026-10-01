// The six fixed skills a task can be tagged with.
// The database only accepts these exact words (see the SQL for the tasks table).
export const SKILLS = [
  "Listening",
  "Speaking",
  "Reading",
  "Writing",
  "Vocabulary",
  "Grammar",
] as const;

export type Skill = (typeof SKILLS)[number];
