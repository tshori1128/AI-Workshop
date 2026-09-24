# CLAUDE.md

## Stack
- Next.js with the App Router, TypeScript, plain CSS (no Tailwind, no CSS libraries)
- Supabase for sign-in and the database
- Deployed on Vercel from the main branch

## Commands
- npm run dev: run the site locally
- npm run build: check that the site builds
- npm run lint: check code style
- If any of these fail, check the scripts section of package.json before guessing.

## Never
- Add a dependency without asking first
- Edit .env or any environment variable
- Change auth configuration without saying what is changing and why
- Create new top-level folders
- Commit without first showing Tiffany what changed, unless her prompt explicitly says to commit or merge
- Put passwords, API keys, or connection strings in code, commits, or chat
- Use real personal data; fake names and fake content only

## Conventions
- Explain every change in plain language, not only in code. Tiffany is new to coding and reviews all work.
- Every Supabase table has row level security turned on, so each person only sees their own rows.
- Pages live in the app folder, following App Router conventions.
- Work on one slice at a time. Anything outside it goes to the Backlog in roadmap.md.

## Current focus
See roadmap.md, work only on the slice marked ACTIVE.
