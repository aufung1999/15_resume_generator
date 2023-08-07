"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { editLayout } from "@/slices/controlSlice";
import Login from "../RootPage/Login";
import Register from "../RootPage/Register";

export default function Header() {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  return (
    <div className="flex justify-between border-4 no-wrap">
      <div className=" flex flex-col justify-center border flex-wrap">
        {session?.user?.name}
      </div>
      <div className=" border-2">
        <Link href="/user" onClick={() => dispatch(editLayout("user"))}>
          User
        </Link>
      </div>
      <div className=" border-2">
        <Link href="/analyse" onClick={() => dispatch(editLayout("analyse"))}>
          Analyse
        </Link>
      </div>
      <div className=" border-2">
        <Link href="/resume" onClick={() => dispatch(editLayout("resume"))}>
          Resume
        </Link>
      </div>

      {/* {console.log(JSON.stringify(session?.user._doc.address, null, 1))} */}
      <div>
        {session?.user && <button onClick={() => signOut()}>SignOut</button>}
        {session?.user === null || (session?.user === undefined && <Login />)}
        {session?.user === null ||
          (session?.user === undefined && <Register />)}
      </div>
    </div>
  );
}
