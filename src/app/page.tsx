import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SoloBlog | Your Personal Blogging Platform",
  description:
    "Write, share, and connect with other writers on SoloBlog. A simple and powerful platform for your thoughts.",
  keywords: "blog, writing, personal blog, articles, content creation",
};

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-primary">Hello, Tailwind with Nextjs!</h1>
      <h1 className="text-4xl font-bold">Welcome to Blog CMS</h1>
      <p className="mt-4 text-primary">
        Your one-stop solution for managing your blog content.
      </p>

    </div>
  );
}
