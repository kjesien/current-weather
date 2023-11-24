import { getApiKey } from "./utils";

export interface LocationSearchParameters {
  q: string;
  appid: string;
  limit?: string; //number
}

export type LocationSearchResult = Array<{
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}>;

export interface ValidCoordinates extends Record<string, string> {
  lat: string;
  lon: string;
}

export interface SelectableLocation {
  label: string;
  coordinates: ValidCoordinates;
}

export async function searchLocationByQuery(
  query: string,
): Promise<SelectableLocation[]> {
  const params = {
    appid: getApiKey(),
    q: query,
    limit: "5",
  } satisfies LocationSearchParameters;

  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?${new URLSearchParams(
      params,
    )}`,
    {
      next: { revalidate: 24 * 60 * 60 },
    },
  );

  if (!res.ok) {
    throw new Error("Error occurred during data fetch");
  }

  const data: LocationSearchResult = await res.json();

  return data.map(({ name, country, lat, lon }) => ({
    label: `${name}, ${country}`,
    coordinates: {
      lat: lat.toString(),
      lon: lon.toString(),
    },
  }));
}
