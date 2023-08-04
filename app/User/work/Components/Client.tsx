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
import { RootState } from "../../../store/store";

export default function WorkClient({ data }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const works = useSelector((state: RootState) => state.work);

  // Save to server
  const SubmitHandler = () => {
    fetch("/api/user/work", {
      method: "POST",
      body: JSON.stringify(works),
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
    <div className="border border-blue-600 flex-1 relative">
      <Toaster />
      <h1>Work</h1>

      <div className=" border-4 flex flex-col items-center justify-center">
        {/* Control the form size */}
        <InsertWorkExp data={data} />
      </div>
      <Button fill className="top-0" onClick={SubmitHandler}>
        Submit
      </Button>
    </div>
  );
}
