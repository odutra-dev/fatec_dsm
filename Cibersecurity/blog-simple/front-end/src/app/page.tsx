"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API + "/post").then((response) => {
      setPosts(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <header className="flex items-center justify-between border-b border-zinc-800 p-4">
        <h1 className="text-3xl font-bold">Dev.go</h1>
      </header>

      <main className="flex flex-col items-center p-4">
        <h2 className="text-2xl font-bold">Posts Recentes</h2>

        {posts.map((post) => (
          <Link
            href={`/post/${post.id}`}
            key={post.id}
            className="cursor-pointer hover:bg-zinc-800 w-full max-w-3xl border border-zinc-800 p-4 rounded-2xl mt-4 min-h-28"
          >
            <h3 className="text-lg font-bold line-clamp-1">{post.title}</h3>
            <p className="text-zinc-500 line-clamp-3 ">{post.content}</p>
          </Link>
        ))}
      </main>
    </>
  );
}
