import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LocationSearch from "./LocationSearch";
import { useSearchLocations } from "@/app/hooks/searchLocations";
import { LinkProps } from "next/link";

jest.mock("react-debounce-input", () => {
  return {
    DebounceInput: jest.fn((props) => <input {...props} />),
  };
});

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null;
  DynamicComponent.displayName = "MockedLoadableComponent";
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

jest.mock("@/app/hooks/searchLocations", () => ({
  useSearchLocations: jest.fn(() => ({
    data: [],
    isLoading: false,
    error: null,
  })),
}));

jest.mock(
  "next/link",
  () =>
    function anchor({
      children,
      ...props
    }: LinkProps & {
      children?: React.ReactNode;
    }) {
      return <a {...(props as any)}>{children}</a>;
    },
);

const useSearchLocationsMock = useSearchLocations as jest.Mock;

describe("LocationSearch component", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(<LocationSearch />);
    const searchInput = getByPlaceholderText("Search for location");
    expect(searchInput).toBeInTheDocument();
  });

  it("updates query state on input change", () => {
    const { getByPlaceholderText } = render(<LocationSearch />);
    const searchInput = getByPlaceholderText("Search for location");
    fireEvent.change(searchInput, { target: { value: "New York" } });
    expect(searchInput).toHaveValue("New York");
  });

  it("displays loading message while fetching data", () => {
    useSearchLocationsMock.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    const { getByText } = render(<LocationSearch />);
    const loadingMessage = getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("displays error message when there's an error", () => {
    useSearchLocationsMock.mockReturnValue({
      data: [],
      isLoading: false,
      error: "Error message",
    });

    const { getByText } = render(<LocationSearch />);
    const errorMessage = getByText("Something went wrong...");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays 'No results' message when there are no options", () => {
    useSearchLocationsMock.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    const { getByText, getByPlaceholderText } = render(<LocationSearch />);

    const searchInput = getByPlaceholderText("Search for location");

    fireEvent.change(searchInput, { target: { value: "Los angelos" } });

    const noResultsMessage = getByText("No results");
    expect(noResultsMessage).toBeInTheDocument();
  });

  it("displays search results when options are available", () => {
    useSearchLocationsMock.mockReturnValue({
      data: [
        {
          lat: "123",
          lon: "456",
          name: "City",
          state: "State",
          country: "Country",
        },
      ],
      isLoading: false,
      error: null,
    });

    const { getByText, getByPlaceholderText } = render(<LocationSearch />);

    const searchInput = getByPlaceholderText("Search for location");

    fireEvent.change(searchInput, { target: { value: "City" } });

    const result = getByText("City, State, Country");
    expect(result).toBeInTheDocument();
  });

  it("have valid anchor element leading to the correct weather page", async () => {
    useSearchLocationsMock.mockReturnValue({
      data: [
        {
          lat: "123",
          lon: "456",
          name: "City",
          state: "State",
          country: "Country",
        },
      ],
      isLoading: false,
      error: null,
    });

    const { getByText, getByPlaceholderText } = render(<LocationSearch />);

    const searchInput = getByPlaceholderText("Search for location");

    fireEvent.change(searchInput, { target: { value: "City" } });

    const link = getByText("City, State, Country");

    await waitFor(() => {
      expect(link.closest("a")).toHaveAttribute(
        "href",
        "/weather?lat=123&lon=456",
      );
    });
  });
});
