import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LocationSearch from "@/app/LocationSearch";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/signIn");
  }

  return (
    <main className="flex flex-col items-center">
      <LocationSearch />
    </main>
  );
}
