"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { useJwtContext } from "@/context/JwtContext";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setJwt } = useJwtContext();

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    api
      .post("/login", {
        email,
        password,
      })
      .then((data) => {
        setJwt(data.data.jwt);
        router.push("/");
      });
  }

  return (
    <>
      <main className="flex flex-col gap-4 items-center justify-center py-4 w-full px-6 h-full">
        <h1 className="text-2xl font-bold">Entrar</h1>
        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
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
            className="bg-violet-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-violet-600"
            type="submit"
          >
            Entrar
          </button>
        </form>

        <p>
          Nao possui uma conta ?{" "}
          <Link
            className="text-violet-500 hover:text-violet-600 hover:underline"
            href="/register"
          >
            Registre-se
          </Link>
        </p>
      </main>
    </>
  );
}
