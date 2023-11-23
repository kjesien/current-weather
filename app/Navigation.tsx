import Login from "@/app/Login";

export default function Navigation() {
  return (
    <nav className="flex justify-between p-8">
      <div>
        <div className="text-xl">Current Weather</div>
        <div>Next.js showcase app</div>
      </div>
      <div>
        <Login />
      </div>
    </nav>
  );
}
