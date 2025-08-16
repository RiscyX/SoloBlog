import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to Blog CMS</h1>
      <p className="mt-4 text-lg">Your one-stop solution for managing your blog content.</p>
    </div>
  );
}
