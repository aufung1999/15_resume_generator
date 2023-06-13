"use client"

import React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PersonalInfo from "./Components/PersonalInfo";

export default function page() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("./login");
    },
  });
  return (
    <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex border-4">
      {/* h-screen */}
      <div className="w-full h-screen flex flex-row border-2">
        <div className="w-full  border border-red-300">Resume</div>
        <div className="w-full border border-red-300">
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
}
