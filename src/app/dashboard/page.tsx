import { createClient } from "@/utils/supabase/server";
import ProfileForm from "./ProfileForm";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 flex flex-col items-center">Your Profile</h2>
      <ProfileForm user={user} profile={profile} />
    </>
  );
}
