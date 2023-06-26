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
import InsertEducation from "./InsertEducation";

export default function EducationClient({ data }: any) {
  const educations = useSelector((state: RootState) => state.education);

  // Save to server
  const SubmitHandler = () => {
    // console.log(contact);

    fetch("/api/user/education", {
      method: "POST",
      body: JSON.stringify(educations),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Education Updated!"))
      .catch(() => toast.error("Cannot Update!"));
  };
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={false}
      elevation={Elevation.TWO}
    >
      <Toaster />
      <h1>Education</h1>

      <div className=" border-4 flex flex-col items-center justify-center">
        {/* Control the form size */}
        <InsertEducation data={data} />
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </Card>
  );
}
