"use client";
import { useRouter } from "next/navigation";
import { ValidCoordinates } from "@/app/api/weatherApiClient";
import { useState } from "react";

export default function DetectLocationBtn() {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState<string>(
    "Use Geo Location API to find your location",
  );

  const detectLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (detected) => {
        const coordinates = {
          lat: detected.coords.latitude.toString(),
          lon: detected.coords.longitude.toString(),
        } satisfies ValidCoordinates;

        router.push(`/weather?${new URLSearchParams(coordinates)}`);
      },
      (error) => {
        setHasError(true);
        setMessage(error.message);
      },
    );
  };

  return (
    <div className="group relative w-max">
      <button
        type="button"
        className="btn"
        disabled={!window.navigator.geolocation || hasError}
        onClick={detectLocation}
      >
        Detect
      </button>
      {message && <span className="tooltip">{message}</span>}
    </div>
  );
}
