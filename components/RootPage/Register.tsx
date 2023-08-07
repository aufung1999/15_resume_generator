"use client";
import Link from "next/link";
import React from "react";

import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  return (
    <div className="border-2 inline-block">
      <Link href="/register" onClick={() => router.push("./register")}>
        Register
      </Link>
    </div>
  );
}
