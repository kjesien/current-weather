import { LocationData } from "@/app/api/weatherApiClient";
import useSWR from "swr";

export async function searchLocations(query: string): Promise<LocationData[]> {
  const res = await fetch(
    `/api/location-search?${new URLSearchParams({ query })}`,
  );
  return res.json();
}

export function useSearchLocations(query: string | undefined) {
  return useSWR(`query:${query}`, async () => {
    if (!query) return [];
    return searchLocations(query);
  });
}
