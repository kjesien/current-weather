import { getServerSession } from "next-auth";
import SignAction from "@/app/components/navigation/SignAction";

export default async function Login() {
  const session = await getServerSession();

  return (
    <div className="flex flex-col items-end">
      <div className="sm:text-xl text-base flex flex-row flex-wrap justify-end gap-1 pb-2">
        <span>Hello</span>
        <span className="whitespace-nowrap">
          {session?.user?.name || "Guest"}
        </span>
      </div>
      <SignAction session={session} />
    </div>
  );
}
