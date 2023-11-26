/**
 * @jest-environment node
 */
import { searchLocationByQuery, LocationData } from "./";

import fetchMock from "jest-fetch-mock";

jest.mock("node-fetch");
fetchMock.enableMocks();

jest.mock("./utils", () => ({
  getApiKey: jest.fn(() => "your-api-key"),
}));

describe("searchLocationByQuery function", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches location data successfully", async () => {
    const mockResponse: LocationData[] = [
      // Mock your response data here
      {
        lat: "0",
        lon: "0",
        name: "City",
        local_names: { en: "City", es: "Ciudad" },
        country: "US",
        state: "NY",
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const response = await searchLocationByQuery("City");

    expect(response).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("http://api.openweathermap.org/geo/1.0/direct"),
      expect.any(Object),
    );
  });

  it("handles fetch error", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false } as Response);

    await expect(searchLocationByQuery("City")).rejects.toThrowError(
      "Error occurred during data fetch",
    );
  });
});
