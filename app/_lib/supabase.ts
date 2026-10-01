import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Makes a Supabase connection for one page load or one form submit.
// The login session is kept in browser cookies, so this reads and writes them.
export async function createSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Pages can't set cookies, only forms and proxy.ts can.
            // proxy.ts keeps the session fresh, so this is safe to ignore.
          }
        },
      },
    }
  );
}

// Returns the logged-in person, or null if nobody is logged in.
export async function getCurrentUser() {
  const supabase = await createSupabase();
  const { data } = await supabase.auth.getUser();
  return data.user;
}
