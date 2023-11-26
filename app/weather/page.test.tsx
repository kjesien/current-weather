import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import Weather from "./page";
import {
  ValidCoordinates,
  getCurrentWeatherData,
} from "@/app/api/weatherApiClient";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/app/api/weatherApiClient", () => ({
  getCurrentWeatherData: jest.fn(),
}));

jest.mock("@/app/weather/StoreWeatherData", () => {
  return jest.fn(() => <div>Weather Data</div>);
});

const getServerSessionMock = getServerSession as jest.Mock;
const getCurrentWeatherDataMock = getCurrentWeatherData as jest.Mock;

async function resolvedComponent(
  Component: (props: any) => Promise<ReactElement<any>>,
  props: any = {},
) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe("Weather page component", () => {
  it("redirects to the home page when there is no session", async () => {
    getServerSessionMock.mockResolvedValue(null);

    const searchParams: ValidCoordinates = {
      lat: "123",
      lon: "456",
    };

    const PageResolved = await resolvedComponent(Weather, searchParams);

    render(<PageResolved />);

    // Check if redirect is called
    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("redirects to the home page when searchParams are missing", async () => {
    getServerSessionMock.mockResolvedValue({});

    const PageResolved = await resolvedComponent(Weather);

    render(<PageResolved />);

    // Check if redirect is called
    expect(redirect).toHaveBeenCalledWith("/");
  });
});
