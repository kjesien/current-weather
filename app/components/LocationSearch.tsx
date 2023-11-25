"use client";
import { type ChangeEventHandler, useState } from "react";
import dynamic from "next/dynamic";
import { ValidCoordinates } from "@/app/api/weatherApiClient";
import { DebounceInput } from "react-debounce-input";
import Link from "next/link";
import { useSearchLocations } from "@/app/hooks/searchLocations";

const DetectLocationBtnDynamic = dynamic(
  () => import("@/app/components/DetectLocationBtn"),
  { ssr: false },
);

export default function LocationSearch() {
  const [query, setQuery] = useState("");

  const { data: options, isLoading, error } = useSearchLocations(query);

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

      {isLoading ? (
        <span className="pt-4">Loading...</span>
      ) : error ? (
        <span className="pt-4 text-red-500 font-medium">
          Something went wrong...
        </span>
      ) : (
        query &&
        (options?.length ? (
          <ul className="list-disc pt-4">
            {options.map((loc, index) => (
              <li key={`${loc.lat}${loc.lon}`} className="pt-2">
                <Link
                  className="group relative w-max"
                  href={`/weather?${new URLSearchParams({
                    lat: loc.lat,
                    lon: loc.lon,
                  } satisfies ValidCoordinates)}`}
                >
                  <span>{`${loc.name}, ${loc.state}, ${loc.country}`}</span>
                  <span className="tooltip">{`lat: ${loc.lat}, lon: ${loc.lon}`}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <span className="pt-4">No results</span>
        ))
      )}
    </div>
  );
}
