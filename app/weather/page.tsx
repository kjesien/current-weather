import {
  ValidCoordinates,
  getCurrentWeatherData,
} from "@/app/weatherApiClient";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";

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

  return (
    <main className="flex flex-col items-center justify-start p-8">
      <div className="text-xl pb-3">{weatherData.name}</div>

      <div className="flex flex-col justify-start gap-1">
        <table className="table-auto">
          <tbody>
            <tr>
              <td>Temperature</td>
              <td>{weatherData.main.temp} °C</td>
            </tr>
            <tr>
              <td>Felt temperature</td>
              <td>{weatherData.main.feels_like} °C</td>
            </tr>
            <tr>
              <td>Conditions</td>
              <td>
                <table className="table-auto">
                  <tbody>
                    {weatherData.weather.map((cond) => (
                      <tr key={cond.id}>
                        <td>
                          <Image
                            src={`https://openweathermap.org/img/wn/${cond.icon}.png`}
                            alt={cond.main}
                            width={50}
                            height={50}
                          />
                        </td>
                        <td>{cond.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Pressure</td>
              <td>{weatherData.main.pressure} hPa</td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td>{weatherData.main.humidity} %</td>
            </tr>
            <tr>
              <td>Visibility</td>
              <td>{(weatherData.visibility / 1000).toFixed(2)} km</td>
            </tr>
            <tr>
              <td>Wind speed</td>
              <td>{weatherData.wind.speed} m/s</td>
            </tr>
            <tr>
              <td>Cloudiness</td>
              <td>{weatherData.clouds.all} %</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
