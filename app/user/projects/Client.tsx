"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import InsertProject from "./InsertProject";

export default function ProjectClient({ data }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const projects_redux = useSelector((state: RootState) => state.projects);

  // Save to server
  const SubmitHandler = () => {
    fetch("/api/user/project", {
      //add this route later
      method: "POST",
      body: JSON.stringify(projects_redux),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Projects Updated!"))
      .catch(() => toast.error("Cannot Update!"));

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };
  return (
    <div className="border border-blue-600 flex-1 font-sans">
      <Toaster />
      <div className=" border-4 flex flex-col items-center justify-center">
        <InsertProject data={data} />
      </div>
      
      <button
        onClick={SubmitHandler}
        className="bp3-button hover:bg-opacity-100 w-full font-bold text-sm bg-opacity-50 bg-white text-red-500 "
      >
        Save
      </button>
    </div>
  );
}
