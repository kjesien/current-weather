"use client";
import { type ChangeEventHandler, FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const DetectLocationBtnDynamic = dynamic(
  () => import("@/app/components/DetectLocationBtn"),
  { ssr: false },
);

export default function LocationSearch() {
  const router = useRouter();
  const currentParams = useSearchParams();
  const [query, setQuery] = useState(currentParams.get("query") || "");

  const onSearchInputChanged: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const newQuery = event.target.value;
    console.log(newQuery);
    setQuery(newQuery);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?${new URLSearchParams({ query })}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex rounded-lg gap-1">
        <input
          type="text"
          placeholder="Search for location"
          value={query}
          onChange={onSearchInputChanged}
        />
        <button type="submit" className="btn" disabled={!query}>
          Search
        </button>
        <DetectLocationBtnDynamic />
      </form>
    </div>
  );
}
