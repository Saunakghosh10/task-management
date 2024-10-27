import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  const user = {
    firstName: "Test User",
    id: "test-user-id",
    fullName: "Test User",
    username: "testuser",
  };

  return <Dashboard user={user} />;
}
