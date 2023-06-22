"use client";
import React from "react";
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
import InsertAchievement from "./InsertAchievement";

export default function AwardClient({ data }) {
  const awards = useSelector((state: RootState) => state.award);

  // Save to server
  const SubmitHandler = () => {
    // console.log(contact);

    fetch("/api/user/award", {
      method: "POST",
      body: JSON.stringify(awards),
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
      <h1>Achievement</h1>
      <div className=" border-4 flex flex-col items-center justify-center">
        <div className=" w-9/12">
          <InsertAchievement data={data} />
        </div>
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </Card>
  );
}
