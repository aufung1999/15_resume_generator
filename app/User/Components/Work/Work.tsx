"use client";
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import InsertWorkExp from "./Components/InsertWorkExp";

import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

export default function Work() {
  const works = useSelector((state: RootState) => state.work);
  // Save to server
  const SubmitHandler = () => {
    // console.log(contact);

    fetch("/api/user/work", {
      method: "POST",
      body: JSON.stringify(works),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Contact Info Updated!"))
      .catch(() => toast.error("Cannot Update!"));
  };
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={false}
      elevation={Elevation.TWO}
    >
      <Toaster />
      <h1>Work</h1>
      <div className=" border-4 flex flex-col items-center justify-center">
        <div className=" w-9/12">
          {" "}
          {/* Control the form size */}
          <InsertWorkExp />
        </div>
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </Card>
  );
}
