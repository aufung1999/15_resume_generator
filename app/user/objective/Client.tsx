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
import InsertObjective from "./InsertObjective";

export default function ObjectiveClient({ data }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const objectives = useSelector((state: RootState) => state.objectives);
  // Save to server
  const SubmitHandler = () => {
    fetch("/api/user/objective", {
      method: "POST",
      body: JSON.stringify(objectives),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Objective Updated!"))
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
        <div className=" w-full">
          <InsertObjective data={data} />
        </div>
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </div>
  );
}
