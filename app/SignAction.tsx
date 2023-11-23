"use client";

import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function SignAction({ session }: { session: Session | null }) {
  if (session) {
    return (
      <>
        <button
          onClick={() => signOut()}
          type="button"
          className="btn btn-primary"
        >
          Sign Out
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() => signIn()}
          type="button"
          className="btn btn-primary"
        >
          Sign In
        </button>
      </>
    );
  }
}
