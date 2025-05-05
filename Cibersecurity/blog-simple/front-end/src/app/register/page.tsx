"use client";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
export default function Register() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    api
      .post("/register", {
        name,
        email,
        password,
      })
      .then(() => router.push("/login"));
  }

  return (
    <>
      <main className="flex flex-col gap-4 items-center justify-center py-4 w-full px-6 h-full">
        <h1 className="text-2xl font-bold">Register</h1>
        <form className="flex flex-col gap-2" onSubmit={handleRegister}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-2xl border-zinc-700"
            type="text"
            placeholder="Name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-2xl border-zinc-700"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-2xl border-zinc-700"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-violet-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-violet-600"
          >
            Register
          </button>
        </form>

        <p>
          Ja possui uma conta ?{" "}
          <Link
            className="text-violet-500 hover:text-violet-600 hover:underline"
            href="/login"
          >
            Login
          </Link>
        </p>
      </main>
    </>
  );
}
