"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center gap-1">
      <h2>Something went wrong!</h2>
      <span>
        Most likely Open Weather API call failed due to used limit of free
        calls.
      </span>
      <button className="btn" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
