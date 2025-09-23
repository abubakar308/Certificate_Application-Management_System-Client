"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      }
    }
  }, [router]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="row-start-1">
        <nav>
          <Link href="/profile" className="mx-4">Profile</Link>
        </nav>
      </header>
      <main className="row-start-2">
        <p>This is a simple example of a Next.js application.</p>
      </main>
      <footer className="row-start-3">
        <p>Footer</p>
      </footer>
    </div>
  );
}
