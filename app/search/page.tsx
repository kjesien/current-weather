import { searchLocationByQuery } from "@/app/weatherApiClient/searchLocationByQuery";
import Link from "next/link";
import LocationSearch from "@/app/LocationSearch";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Search({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  const options = searchParams.query
    ? await searchLocationByQuery(searchParams.query)
    : [];

  return (
    <main className="flex flex-col items-center justify-start">
      <div>
        <LocationSearch />
        <ul className="list-disc pt-4">
          {options.map(({ label, coordinates }, index) => (
            <li key={`${label}${index}`}>
              <Link href={`/weather?${new URLSearchParams(coordinates)}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
