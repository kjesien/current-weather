/**
 * @jest-environment node
 */
import { GET } from "./route";
import { searchLocationByQuery } from "@/app/api/weatherApiClient";
import { NextRequest } from "next/server";

jest.mock("@/app/api/weatherApiClient/searchLocationByQuery", () => ({
  searchLocationByQuery: jest.fn(),
}));

describe("GET function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns a 400 response when 'query' parameter is not provided", async () => {
    const req = {
      nextUrl: new URL("http://example.com"),
    } as NextRequest;

    const response = await GET(req);

    expect(response.status).toBe(400);
    expect(response.statusText).toBe('"query" parameter not provided');
    expect(searchLocationByQuery).not.toHaveBeenCalled();
  });

  it("fetches and returns location data when 'query' parameter is provided", async () => {
    const req = new NextRequest("http://example.com?query=City");

    const mockLocations = [
      {
        lat: "0",
        lon: "0",
        name: "City",
        local_names: { en: "City", es: "Ciudad" },
        country: "US",
        state: "NY",
      },
    ];

    (searchLocationByQuery as jest.Mock).mockResolvedValue(mockLocations);

    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockLocations);
    expect(searchLocationByQuery).toHaveBeenCalledWith("City");
  });
});
