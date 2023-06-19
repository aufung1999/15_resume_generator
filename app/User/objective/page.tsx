"use client";
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import InsertObjective from "./Components/InsertObjective";

import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

export default function Page() {
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
      .then(() => toast.success("User Work Info Updated!"))
      .catch(() => toast.error("Cannot Update!"));
  };
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={false}
      elevation={Elevation.TWO}
    >
      <Toaster />
      <h1>Objective</h1>
      <div className=" border-4 flex flex-col items-center justify-center">
        <div className=" w-9/12">
          <InsertObjective />
        </div>
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </Card>
  );
}
