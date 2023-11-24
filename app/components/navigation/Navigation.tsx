import Login from "@/app/components/navigation/Login";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-between p-8">
      <Link href="/">
        <h1>Current Weather</h1>
        <small>Next.js showcase app</small>
      </Link>
      <Login />
    </nav>
  );
}
