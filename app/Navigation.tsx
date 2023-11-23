import Login from "@/app/Login";

export default function Navigation() {
  return (
    <nav className="flex justify-between p-8">
      <div>
        <h1>Current Weather</h1>
        <small>Next.js showcase app</small>
      </div>
      <div>
        <Login />
      </div>
    </nav>
  );
}
