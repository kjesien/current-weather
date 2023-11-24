import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-end justify-start pr-14 ">
      <h2>Please log in ^</h2>
    </main>
  );
}
