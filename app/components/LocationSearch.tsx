"use client";
import { type ChangeEventHandler, useState } from "react";
import dynamic from "next/dynamic";
import { DebounceInput } from "react-debounce-input";
import LocationSearchResults from "@/app/components/LocationSearchResults";

const DetectLocationBtnDynamic = dynamic(
  () => import("@/app/components/DetectLocationBtn"),
  { ssr: false },
);

export default function LocationSearch() {
  const [query, setQuery] = useState("");

  const onSearchInputChanged: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex gap-1 justify-center">
        <DebounceInput
          className="max-w-[200px]"
          placeholder="Search for location"
          value={query}
          debounceTimeout={400}
          onChange={onSearchInputChanged}
        />
        <DetectLocationBtnDynamic />
      </div>
      <LocationSearchResults query={query} />
    </div>
  );
}
