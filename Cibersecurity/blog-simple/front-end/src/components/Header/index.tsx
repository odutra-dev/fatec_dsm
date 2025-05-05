import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-3xl font-bold cursor-pointer">
        Dev.go
      </Link>

      <Link
        href="/new"
        className="bg-violet-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-violet-600"
      >
        Novo Post
      </Link>
    </header>
  );
}
