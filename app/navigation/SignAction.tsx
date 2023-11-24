"use client";

import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function SignAction({ session }: { session: Session | null }) {
  if (session) {
    return (
      <>
        <button onClick={() => signOut()} type="button" className="btn">
          Sign Out
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() => signIn(undefined, { callbackUrl: "/" })}
          type="button"
          className="btn"
        >
          Sign In
        </button>
      </>
    );
  }
}
