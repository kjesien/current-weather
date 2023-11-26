import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import DetectLocationBtn from "./DetectLocationBtn";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("DetectLocationBtn component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<DetectLocationBtn />);
    const buttonElement = getByText("Detect");
    expect(buttonElement).toBeInTheDocument();
  });

  it("disables the button when geolocation is not available", () => {
    const { getByText } = render(<DetectLocationBtn />);
    const buttonElement = getByText("Detect");
    expect(buttonElement).toBeDisabled();
  });

  it("calls router.push with the correct URL when location is detected", async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    const geoLocationMock = {
      getCurrentPosition: jest.fn((successCallback) =>
        successCallback({
          coords: {
            latitude: 123.456,
            longitude: 789.012,
          },
        }),
      ),
    };

    Object.defineProperty(global.navigator, "geolocation", {
      writable: true,
      value: geoLocationMock,
    });

    const { getByText } = render(<DetectLocationBtn />);
    const buttonElement = getByText("Detect");

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(buttonElement).toBeEnabled();
      expect(geoLocationMock.getCurrentPosition).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/weather?lat=123.456&lon=789.012");
    });
  });

  it("displays an error message when location detection fails", async () => {
    const geoLocationMock = {
      getCurrentPosition: jest.fn((_, errorCallback) =>
        errorCallback({
          message: "Geolocation API error",
        }),
      ),
    };

    Object.defineProperty(global.navigator, "geolocation", {
      writable: true,
      value: geoLocationMock,
    });

    const { getByText } = render(<DetectLocationBtn />);
    const buttonElement = getByText("Detect");

    fireEvent.click(buttonElement);

    const errorMessageElement = await waitFor(() =>
      getByText("Geolocation API error"),
    );

    expect(errorMessageElement).toBeInTheDocument();
  });
});
