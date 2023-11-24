"use client";
import { type ChangeEventHandler, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const DetectLocationBtnDynamic = dynamic(
  () => import("@/app/components/DetectLocationBtn"),
  { ssr: false },
);

export default function LocationSearch() {
  const currentParams = useSearchParams();
  const [query, setQuery] = useState(currentParams.get("query") || "");

  const onSearchInputChanged: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  return (
    <div className="flex rounded-lg gap-1">
      <input
        type="text"
        placeholder="Search for location"
        value={query}
        onChange={onSearchInputChanged}
      />
      <Link href={`/search?${new URLSearchParams({ query })}`}>
        <button type="submit" className="btn" disabled={!query}>
          Search
        </button>
      </Link>
      <DetectLocationBtnDynamic />
    </div>
  );
}
