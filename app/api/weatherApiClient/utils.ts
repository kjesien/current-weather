export function getApiKey() {
  if (!process.env.OPEN_WEATHER_API_KEY) {
    throw new Error("Open Weather API Key not provided");
  }
  return process.env.OPEN_WEATHER_API_KEY;
}
