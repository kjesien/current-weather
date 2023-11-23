export function getApiKey() {
  if (!process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY) {
    throw new Error("Open Weather API Key not provided");
  }
  return process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
}
