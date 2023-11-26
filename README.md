# Current Wether

Main purpose of this project is to allow checking the current weather for given location.

**Used technologies/paradigms:**
- Next.js
- Server Side Rendering & Server Side Data Fetching
- Data Caching
- Google Authentication provided by [Next Auth](https://next-auth.js.org/)
- Dynamic / lazy loaded components
- Tailwind with SCSS preprocessor
- SWR
- Redux 
- Unit tests using Jest 

### Note on Redux
Usage of it is totally not necessary. 

For the current scope the whole functionality of displaying the weather data could be accomplished with pure SSR - which in general is more performant. 
A better use for using Redux to store the data would be if the components designed to present the weather data were more complex - it would prevent prop drilling.

## Getting started
1. install the project dependencies:
```bash
npm install
```

2. Create the `.env.local` file based on `.env.example` filling following environment variables:
- GOOGLE_CLIENT_ID - your personal Google Client ID retrieved from [Google Cloud Console](https://console.cloud.google.com/)
- GOOGLE_SECRET_KEY - your personal Google secret key retrieved from [Google Cloud Console](https://console.cloud.google.com/)
- NEXTAUTH_URL - canonical URL of your site. For development run it's ok to use `http://localhost:3000`. When deploying to Vercel it can be skipped.
- NEXTAUTH_SECRET - used to encrypt the NextAuth.js JWT. Easy way to generate good secret key is to run `openssl rand -base64 32` in terminal.
- NEXT_PUBLIC_OPEN_WEATHER_API_KEY - API key retrieved from [Open Weather](https://openweathermap.org/).

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your favourite browser to see the result.


## Deployment

### You can view the deployed version on this [url](https://current-weather-six.vercel.app/). This demo is hosted with Vercel.
