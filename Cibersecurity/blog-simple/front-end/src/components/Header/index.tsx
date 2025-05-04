import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 p-4">
      <Link href="/" className="text-3xl font-bold cursor-pointer">
        Dev.go
      </Link>
    </header>
  );
}
