import {
  ValidCoordinates,
  getCurrentWeatherData,
} from "@/app/api/weatherApiClient";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import StoreWeatherData from "@/app/weather/StoreWeatherData";

export default async function Weather({
  searchParams,
}: {
  searchParams?: ValidCoordinates;
}) {
  const session = await getServerSession();

  if (!session || !searchParams) {
    redirect("/");
  }

  const weatherData = await getCurrentWeatherData(searchParams);

  return <StoreWeatherData weatherData={weatherData} />;
}
