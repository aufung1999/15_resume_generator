"use client";
import Link from "next/link";
import React from "react";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <div className="border-2 inline-block me-3">
      <Link href="/login" onClick={() => router.push("./login")}>
        Log In
      </Link>
    </div>
  );
}
