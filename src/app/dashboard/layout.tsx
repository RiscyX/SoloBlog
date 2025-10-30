import { createClient } from "@/utils/supabase/server";
import "../globals.css";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-bg text-fg transition-colors">
      {
        /*user && (
            <nav className="flex items-center justify-between p-4 mt-3 bg-purple-600 text-white">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <a href="/logout" className="underline hover:text-gray-200">
                Logout
              </a>
            </nav>
          )*/
        // might not need here, and the user logged in check can be done in a higher layout
      }
      <section className="max-w-3xl mx-auto p-6">{children}</section>
    </main>
  );
}
