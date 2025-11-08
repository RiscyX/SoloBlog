import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import "../globals.css";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user) redirect("/login");

  return (
    <main className="min-h-screen bg-bg text-fg transition-colors">
      <section className="max-w-3xl mx-auto p-6">{children}</section>
    </main>
  );
}
