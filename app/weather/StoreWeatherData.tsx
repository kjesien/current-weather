"use client";

import { CurrentWeatherDataResponse } from "@/app/api/weatherApiClient";
import { Provider } from "react-redux";
import { store } from "@/app/weather/store";
import DataDisplay from "@/app/weather/DataDisplay";
import { setWeatherData } from "@/app/weather/weatherSlice";

export default function StoreWeatherData({
  weatherData,
}: {
  weatherData: CurrentWeatherDataResponse;
}) {
  store.dispatch(setWeatherData(weatherData));

  return (
    <Provider store={store}>
      <DataDisplay />
    </Provider>
  );
}
