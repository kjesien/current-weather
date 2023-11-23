"use client";
import { DebounceInput } from "react-debounce-input";
import { type ChangeEventHandler, useState } from "react";
import {
  searchLocationByQuery,
  SelectableLocation,
} from "@/app/weather/weatherApiClient/searchLocationByQuery";

export default function LocationSearch() {
  const [options, setOptions] = useState<SelectableLocation[]>([]);
  const [hasError, setHasError] = useState(false);
  const onSearchInputChanged: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const newQuery = event.target.value;
    searchLocationByQuery(newQuery)
      .then((options) => {
        console.log("New options", options);
        setOptions(options);
        setHasError(false);
      })
      .catch((err) => {
        console.log("Error", err);
        setHasError(true);
      });
  };

  const selectOption = (
    selectedCoordinates: SelectableLocation["coordinates"],
  ) => {
    console.log("New location", selectedCoordinates);
  };

  return (
    <div>
      <div>
        <div>
          <DebounceInput
            debounceTimeout={400}
            onChange={onSearchInputChanged}
            placeholder="Search for location"
          />
        </div>
        <div>Use location</div>
      </div>
      <div>
        {hasError ? (
          <div>Ups... Something went wrong. Please try again.</div>
        ) : (
          options.map(({ label, coordinates }, index) => (
            <div
              key={`${label}${index}`}
              onSelect={() => selectOption(coordinates)}
            >
              {label}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
