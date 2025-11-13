"use client";

import { User } from "@supabase/supabase-js";

interface Profile {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
}

export default function ProfileForm({
  user,
  profile,
}: {
  user: User;
  profile: Profile;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // TODO: Implement form submission logic
  }

  function handleAvatarUpload(event: React.FormEvent<HTMLFormElement>) {
    // TODO: Implement avatar upload logic
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 rounded shadow-md dark:shadow-md dark:shadow-primary"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Display Name</label>
        <input
          type="text"
          placeholder={user.email}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          maxLength={150}
          className="border rounded p-2 w-full h-24"
          placeholder="Write something about yourself..."
        />
        <p className="text-xs text-right">
          {/* {bio.length}/150 characters */}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Avatar</label>
        <input type="file" accept="image/*" />
      </div>

      <button
        type="submit"
        //disabled={}
        className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
      >
        Save
      </button>
    </form>
  );
}
