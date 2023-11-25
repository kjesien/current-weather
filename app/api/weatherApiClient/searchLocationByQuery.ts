import { getApiKey } from "./utils";

export interface LocationSearchParameters {
  q: string;
  appid: string;
  limit?: string; //number
}

export interface ValidCoordinates {
  lat: string;
  lon: string;
}

export interface LocationData extends ValidCoordinates {
  name: string;
  local_names: Record<string, string>;
  country: string;
  state: string;
}

export async function searchLocationByQuery(
  query: string,
): Promise<LocationData[]> {
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
      next: { revalidate: 24 * 60 * 60 }, // 24hrs
    },
  );

  if (!res.ok) {
    throw new Error("Error occurred during data fetch");
  }

  return await res.json();
}
