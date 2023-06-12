"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <div className="flex justify-between border-4 no-wrap">
      <div className=" flex flex-col justify-center border flex-wrap">
        {session?.user?.name}
      </div>
      <div className=" border-2">
        <Link href="./User">User</Link>
      </div>
      {/* {console.log(JSON.stringify(session?.user._doc.address, null, 1))} */}
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  );
}
