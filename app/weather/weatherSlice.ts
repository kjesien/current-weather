import { createSlice } from "@reduxjs/toolkit";
import { CurrentWeatherDataResponse } from "@/app/api/weatherApiClient";
import { RootState } from "./store";

export interface WeatherState {
  weatherData: CurrentWeatherDataResponse | undefined;
}

const initialState: WeatherState = {
  weatherData: undefined,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action) {
      state.weatherData = action.payload;
    },
  },
});

export const { setWeatherData } = weatherSlice.actions;

export const selectWeatherState = (state: RootState) => {
  if (!state.weather.weatherData) {
    throw new Error("Weather Data is not in the store!");
  }
  return state.weather.weatherData;
};
