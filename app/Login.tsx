import { getServerSession } from "next-auth";
import SignAction from "@/app/SignAction";

export default async function Login() {
  const session = await getServerSession();

  return <SignAction session={session} />;
}
