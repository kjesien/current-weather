import { ValidCoordinates } from "@/app/api/weatherApiClient";
import Link from "next/link";
import { useSearchLocations } from "@/app/hooks/searchLocations";

export default function LocationSearchResults({
  query,
}: {
  query: string | undefined;
}) {
  const { data: options, isLoading, error } = useSearchLocations(query);

  // Show only when query was actually typed
  if (!query) {
    return null;
  }

  if (isLoading) {
    return <span className="pt-4">Loading...</span>;
  }

  if (error) {
    return (
      <span className="pt-4 text-red-500 font-medium">
        Something went wrong...
      </span>
    );
  }

  if (!options?.length) {
    return <span className="pt-4">No results</span>;
  }

  return (
    <ul className="list-disc pt-4">
      {options.map((loc) => (
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
  );
}
