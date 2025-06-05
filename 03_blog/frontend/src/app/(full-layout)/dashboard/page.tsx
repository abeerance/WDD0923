import { auth } from "@/auth";

export default async function DashboardPage() {
  const user = await auth();

  return <h1>This is the dashboard of {user?.username}</h1>;
}
