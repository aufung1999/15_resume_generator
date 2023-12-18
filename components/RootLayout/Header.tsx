"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { editLayout } from "@/slices/controlSlice";
import Login from "../RootPage/Login";
import Register from "../RootPage/Register";

import { Pacifico, Leckerli_One, Lobster } from "next/font/google";

const leckerli_one = Leckerli_One({
  subsets: ["latin"],
  weight: ["400"],
});

const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Header() {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();
  // const stage_3_ls: any = localStorage.getItem("sta-e_3");

  return (
    <div className="flex justify-between border-2 border-[#102C57] no-wrap">
      <div className=" border-0 flex bg-[#102C57] ">
        <Link href="/">
          <span className=" hover:underline hover:transition hover:duration-500">
            <span
              className={`${lobster.className} text-xl text-white me-0.5 inline-block transform -rotate-[8deg]`}
            >
              Check
            </span>
            <span
              className="font-sans italic text-xl font-bold
              bg-gradient-to-r bg-clip-text  text-transparent
              from-indigo-500 via-white to-indigo-500
              animate-text
            "
            >
              ResumeAi
            </span>
          </span>
        </Link>
        <div className="px-2  flex flex-col justify-center text-white flex-wrap">
          {session?.user?.name && <span className="text-xs">Logged In</span>}
        </div>
      </div>
      <div className=" border-0">
        <Link href="/user" onClick={() => dispatch(editLayout("user"))}>
          <span className="font-sans font-semibold text-xl italic hover:underline transition duration-500">
            User
          </span>
        </Link>
      </div>
      <div className=" border-0">
        <Link href="/analyse" onClick={() => dispatch(editLayout("analyse"))}>
          <span className="font-sans font-semibold text-xl italic hover:underline transition duration-500">
            Analyse
          </span>
        </Link>
      </div>
      <div>
        <Link
          href="/resume"
          onClick={() => dispatch(editLayout("resume"))}
          // className={`${stage_3_ls ? "" : " pointer-events-none opacity-20"}`}
        >
          <span className="font-sans font-semibold text-xl italic hover:underline transition duration-500">
            Resume
          </span>
        </Link>
      </div>

      {/* {console.log(JSON.stringify(session?.user._doc.address, null, 1))} */}
      <div>
        {session?.user && (
          <button
            className="font-sans font-semibold text-xl italic hover:underline transition duration-500"
            onClick={() => signOut()}
          >
            SignOut
          </button>
        )}
        {session?.user === null || (session?.user === undefined && <Login />)}
        {session?.user === null ||
          (session?.user === undefined && <Register />)}
      </div>
    </div>
  );
}
