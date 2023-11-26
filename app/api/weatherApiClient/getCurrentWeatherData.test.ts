/**
 * @jest-environment node
 */
import {
  getCurrentWeatherData,
  CurrentWeatherDataResponse,
} from "./getCurrentWeatherData";

import fetchMock from "jest-fetch-mock";

jest.mock("node-fetch");
fetchMock.enableMocks();

jest.mock("./utils", () => ({
  getApiKey: jest.fn(() => "your-api-key"),
}));

describe("getCurrentWeatherData function", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches current weather data successfully", async () => {
    const mockResponse: CurrentWeatherDataResponse = {
      // Mock your response data here
      coord: { lon: 0, lat: 0 },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
      ],
      base: "stations",
      main: {
        temp: 20,
        feels_like: 20,
        temp_min: 20,
        temp_max: 20,
        pressure: 1013,
        humidity: 50,
        sea_level: 1013,
        grnd_level: 1013,
      },
      visibility: 10000,
      wind: { speed: 2, deg: 150, gust: 1 },
      rain: { "1h": 0 },
      clouds: { all: 0 },
      dt: 1642496400,
      sys: {
        type: 2,
        id: 2007615,
        country: "US",
        sunrise: 1642482622,
        sunset: 1642519189,
      },
      timezone: -18000,
      id: 2643743,
      name: "London",
      cod: 200,
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const response = await getCurrentWeatherData({ lat: "0", lon: "0" });

    expect(response).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.openweathermap.org/data/2.5/weather",
      ),
      expect.any(Object),
    );
  });

  it("handles fetch error", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false } as Response);

    await expect(
      getCurrentWeatherData({ lat: "0", lon: "0" }),
    ).rejects.toThrowError("Error occurred during data fetch");
  });
});
