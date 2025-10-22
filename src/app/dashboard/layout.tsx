import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {user && (
        <nav className="flex items-center justify-between p-4 bg-purple-600 text-white">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <a href="/logout" className="underline hover:text-gray-200">
            Logout
          </a>
        </nav>
      )}
      <section className="max-w-3xl mx-auto p-6">{children}</section>
    </main>
  );
}
