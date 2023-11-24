import Login from "@/app/navigation/Login";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-between p-8">
      <Link href="/">
        <div className="text-xl">Current Weather</div>
        <div>Next.js showcase app</div>
      </Link>
      <div>
        <Login />
      </div>
    </nav>
  );
}
