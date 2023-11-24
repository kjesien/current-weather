import { ValidCoordinates } from "@/app/weatherApiClient/searchLocationByQuery";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getCurrentWeatherData } from "@/app/weatherApiClient/getCurrentWeatherData";
import Image from "next/image";

export default async function Search({
  searchParams,
}: {
  searchParams?: ValidCoordinates;
}) {
  const session = await getServerSession();

  if (!session || !searchParams) {
    redirect("/");
  }

  const weatherData = await getCurrentWeatherData(searchParams);

  return (
    <main className="flex flex-col items-center justify-start p-8">
      <div className="text-xl pb-3">{weatherData.name}</div>

      <div className="flex flex-col justify-start gap-1">
        <div>Temperature {weatherData.main.temp} °C </div>
        <div>Felt temperature {weatherData.main.feels_like} °C</div>
        <div>
          {weatherData.weather.map((cond) => (
            <div key={cond.id} className="flex flex-row items-center">
              <Image
                src={`https://openweathermap.org/img/wn/${cond.icon}.png`}
                alt={cond.main}
                width={50}
                height={50}
              />
              <div>{cond.description}</div>
            </div>
          ))}
        </div>
        <div>Pressure {weatherData.main.pressure} hPa</div>
        <div>Humidity {weatherData.main.humidity} %</div>
        <div>Visibility {weatherData.visibility} m</div>
        <div>Wind speed {weatherData.wind.speed} m/s</div>
        <div>Cloudiness {weatherData.clouds.all} %</div>
      </div>
    </main>
  );
}
