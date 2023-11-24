"use client";
import { useRouter } from "next/navigation";
import { ValidCoordinates } from "@/app/weatherApiClient/searchLocationByQuery";
import { useState } from "react";

export default function DetectLocationBtn() {
  const router = useRouter();
  const [error, setError] = useState<string>();

  const detectLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (detected) => {
        const coordinates: ValidCoordinates = {
          lat: detected.coords.latitude.toString(),
          lon: detected.coords.longitude.toString(),
        };

        router.push(`/weather?${new URLSearchParams(coordinates)}`);
      },
      (error) => {
        setError(error.message);
      },
    );
  };

  return (
    <div className="group relative w-max">
      <button
        type="button"
        className="btn"
        disabled={!window.navigator.geolocation || Boolean(error)}
        onClick={detectLocation}
        title={error}
      >
        Detect
      </button>
      {error && <span className="tooltip">{error}</span>}
    </div>
  );
}
