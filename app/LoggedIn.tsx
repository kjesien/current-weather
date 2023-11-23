import CurrentWeather from "@/app/weather/CurrentWeather";

export default function LoggedIn() {
  return (
    <main className="flex flex-col items-center justify-start p-8">
      <CurrentWeather />
    </main>
  );
}
