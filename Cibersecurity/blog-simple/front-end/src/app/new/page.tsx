"use client";
import { api } from "@/utils/api";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function New() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  if (!localStorage.getItem("token")) {
    return router.push("/login");
  }

  function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    api
      .post("/post", {
        title,
        content,
      })
      .then(() => router.push("/"));
  }

  return (
    <>
      <header className="flex flex-col gap-4 items-center justify-center py-4 w-full px-6 h-full border-b-2 border-zinc-800">
        <h1 className="text-2xl font-bold">Novo Post</h1>
      </header>

      <main className="flex flex-col gap-4 items-center py-4 w-full px-6">
        <form className="flex flex-col gap-2 w-2xl" onSubmit={handlePublish}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 rounded-2xl border-zinc-700"
            type="text"
            placeholder="Title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="border p-3 rounded-2xl border-zinc-700"
            placeholder="Content"
          />
          <button
            className="bg-violet-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-violet-600"
            type="submit"
          >
            Publicar
          </button>
        </form>
      </main>
    </>
  );
}
