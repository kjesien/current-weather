import { getApiKey } from "./utils";
import { ValidCoordinates } from "./searchLocationByQuery";

export interface CurrentWeatherDataParameters {
  lat: string;
  lon: string;
  appid: string;
  mode?: "xml" | "html"; // if undefined -> JSON
  units?: "standard" | "metric" | "imperial";
  lang?: string;
}

export interface CurrentWeatherDataResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export async function getCurrentWeatherData({
  lat,
  lon,
}: ValidCoordinates): Promise<CurrentWeatherDataResponse> {
  const params = {
    appid: getApiKey(),
    lat,
    lon,
    units: "metric",
  } satisfies CurrentWeatherDataParameters;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${new URLSearchParams(
      params,
    )}`,
    {
      next: { revalidate: 30 * 60 }, // assuming new weather data arrives in 30 mins intervals
    },
  );

  if (!res.ok) {
    throw new Error("Error occurred during data fetch");
  }

  return await res.json();
}
