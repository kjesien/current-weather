"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectWeatherState } from "@/app/weather/weatherSlice";

export default function DataDisplay() {
  const weatherData = useSelector(selectWeatherState);

  return (
    <main className="flex flex-col items-center justify-start p-8">
      <div className="text-xl pb-3">{weatherData.name}</div>

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
              <table className="table-auto table-nested">
                <tbody>
                  {weatherData.weather.map((cond) => (
                    <tr key={cond.id}>
                      <td>{cond.description}</td>
                      <td>
                        <Image
                          className="border-2 border-blue-300 rounded"
                          src={`https://openweathermap.org/img/wn/${cond.icon}.png`}
                          alt={cond.main}
                          aria-label={cond.main}
                          width={35}
                          height={35}
                        />
                      </td>
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
    </main>
  );
}
