"use client";
import { type ChangeEventHandler, useState } from "react";
import dynamic from "next/dynamic";
import { LocationData, ValidCoordinates } from "@/app/api/weatherApiClient";
import { DebounceInput } from "react-debounce-input";
import Link from "next/link";

const DetectLocationBtnDynamic = dynamic(
  () => import("@/app/components/DetectLocationBtn"),
  { ssr: false },
);

const searchLocations = async (query: string): Promise<LocationData[]> => {
  const res = await fetch(
    `/api/location-search?${new URLSearchParams({ query })}`,
  );
  return res.json();
};

export default function LocationSearch() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [options, setOptions] = useState<LocationData[]>([]);

  const onSearchInputChanged: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const newQuery = event.target.value;
    if (!newQuery) {
      setSearched(false);
    }

    if (newQuery) {
      searchLocations(newQuery).then((locations) => {
        setSearched(true);
        setOptions(locations);
      });
    }
  };

  return (
    <div>
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
      {searched &&
        (options.length ? (
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
        ))}
    </div>
  );
}
