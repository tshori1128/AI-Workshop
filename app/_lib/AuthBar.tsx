import Link from "next/link";
import { getCurrentUser } from "./supabase";
import { logOut } from "./auth-actions";

// The bar across the top of every page.
// Logged out: shows "Log in" and "Sign up". Logged in: shows the email and "Log out".
export default async function AuthBar() {
  const user = await getCurrentUser();

  return (
    <nav className="auth-bar">
      {user ? (
        <>
          <span>{user.email}</span>
          <form action={logOut}>
            <button type="submit">Log out</button>
          </form>
        </>
      ) : (
        <>
          <Link href="/login" className="button">
            Log in
          </Link>
          <Link href="/signup" className="button">
            Sign up
          </Link>
        </>
      )}
    </nav>
  );
}
