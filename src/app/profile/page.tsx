import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Dashboard | SoloBlog",
  description: "Manage your blog posts, profile, and account settings.",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/login");
  }

  if (!user.email_confirmed_at) {
    redirect("/verify");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 flex flex-col items-center">
        Your Profile
      </h2>
      <ProfileForm user={user} profile={profile} />
    </>
  );
}
