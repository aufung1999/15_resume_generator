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
import InsertWorkExp from "./InsertWorkExp";

import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

export default function WorkClient({ data }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const works_redux = useSelector((state: RootState) => state.work);

  // Save to server
  const SubmitHandler = () => {
    console.log("works_redux");
    console.log(works_redux);
    fetch("/api/user/work", {
      method: "POST",
      body: JSON.stringify(works_redux),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Work Updated!"))
      .catch(() => toast.error("Cannot Update!"));

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };
  return (
    <div className="border border-blue-600 flex-1 relative font-sans">
      <Toaster />

      <div className=" border-4 flex flex-col items-center justify-center">
        {/* Control the form size */}
        <InsertWorkExp data={data} />
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
