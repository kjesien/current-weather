"use client";
import { useRouter } from "next/navigation";
import { ValidCoordinates } from "@/app/weatherApiClient/searchLocationByQuery";

export default function DetectLocationBtn() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn"
      disabled={!navigator.geolocation}
      onClick={() => {
        navigator.geolocation.getCurrentPosition((detected) => {
          const coordinates: ValidCoordinates = {
            lat: detected.coords.latitude.toString(),
            lon: detected.coords.longitude.toString(),
          };

          router.push(`/weather?${new URLSearchParams(coordinates)}`);
        });
      }}
    >
      Detect
    </button>
  );
}
