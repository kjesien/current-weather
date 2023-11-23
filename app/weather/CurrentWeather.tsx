import LocationSearch from "@/app/weather/LocationSearch";

export default async function CurrentWeather() {
  return (
    <div className="flex flex-col items-center">
      <LocationSearch />
    </div>
  );
}
