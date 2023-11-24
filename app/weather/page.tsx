import { ValidCoordinates } from "@/app/weatherApiClient/searchLocationByQuery";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Search({
  searchParams,
}: {
  searchParams?: ValidCoordinates;
}) {
  const session = await getServerSession();

  if (!session || !searchParams) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-start p-8">
      <div>{JSON.stringify(searchParams)}</div>
    </main>
  );
}
