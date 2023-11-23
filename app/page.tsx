import { getServerSession } from "next-auth";
import LoggedIn from "@/app/LoggedIn";
import NotLoggedIn from "@/app/NotLoggedIn";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    return <LoggedIn />;
  }

  return <NotLoggedIn />;
}
