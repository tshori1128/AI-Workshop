# Project state
Last updated: 2026-09-23

## Works
- The Next.js site (App Router, TypeScript, plain CSS) is live on Vercel at https://tiffany-horimoto-site.vercel.app/
- A Supabase project exists and is linked to the repo. The site does not use it yet.

## Broken or flaky
- Nothing known. Not checked this session.

## Environment notes
- Claude Code runs in the browser at claude.ai/code with the repo tshori1128/AI-Workshop already selected.
- Assumed, not confirmed: Vercel redeploys the site whenever main changes.
- Not yet confirmed which Supabase environment variables are set, locally or in Vercel.
- The app uses only fake names and fake content. Secrets never go in chat.

## Next session
- Start slice 1: sign up and log in.
- Open question, Tiffany to decide: turn off "Confirm email" in Supabase Auth settings so test accounts with fake emails can sign up, or keep it on and use real inboxes for testing.
